// ── generateAudio.ts ────────────────────────────────────────────
// Foundations-only audio pipeline script for Role On Board TTS.
//
// What this does:
//   1. Ensures the deterministic audio/ directory tree exists for all 4
//      languages (en/fr/es/pt), keyed by the technical rankId/phaseId
//      values from ROLE_ON_BOARD_REGISTRY — never localized labels.
//   2. Reads ROLE_ON_BOARD_REGISTRY read-only and extracts the English text
//      for the 4 audio-covered subsections per phase: overview,
//      responsibilities, commonMistakes ("common_mistakes.mp3"),
//      professionalTips ("professional_tips.mp3").
//   3. Hashes that text (SHA-256) and diffs it against audio/metadata/
//      manifest.json to decide each entry's status: "generated" (unchanged
//      since last real generation), "outdated" (text changed since last
//      generation), or "missing" (never generated).
//   4. Writes the updated manifest and appends a run summary to
//      audio/metadata/generation.log.
//
// What this does NOT do: it never calls Google Cloud TTS, never writes an
// .mp3 file, and never modifies roleOnBoardRegistry.ts. generateAudioFile()
// below is the marked extension point for wiring in the real API call once
// credentials are configured.

import { createHash } from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

import {
  ROLE_ON_BOARD_REGISTRY,
  OPERATIONAL_PHASE_ORDER,
  resolveLocalizedText,
  resolveLocalizedTextList,
} from "../src/core/roleOnBoardRegistry";
import type {
  OperationalPhase,
  OperationalPhaseId,
  SupportedLanguage,
} from "../src/core/roleOnBoardRegistry";
import type { RankId } from "../src/core/rankRegistry";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");
const AUDIO_ROOT = path.join(REPO_ROOT, "audio");
const METADATA_DIR = path.join(AUDIO_ROOT, "metadata");
const MANIFEST_PATH = path.join(METADATA_DIR, "manifest.json");
const LOG_PATH = path.join(METADATA_DIR, "generation.log");

const CONTENT_TYPE = "role_on_board";
const LANGUAGES: SupportedLanguage[] = ["en", "fr", "es", "pt"];

// The 4 audio-covered subsections per phase, in this mission only (equipment,
// risks, bestPractices, notes are out of scope and get no folder/entry).
const AUDIO_SUBSECTIONS = [
  { key: "overview", fileBaseName: "overview" },
  { key: "responsibilities", fileBaseName: "responsibilities" },
  { key: "commonMistakes", fileBaseName: "common_mistakes" },
  { key: "professionalTips", fileBaseName: "professional_tips" },
] as const;

type AudioSubsectionKey = (typeof AUDIO_SUBSECTIONS)[number]["key"];

type ManifestEntryStatus = "generated" | "missing" | "outdated";

interface ManifestEntry {
  textHash: string;
  status: ManifestEntryStatus;
  generatedAt: string | null;
}

interface Manifest {
  engine: string;
  voice: Record<SupportedLanguage, string | null>;
  generationVersion: number;
  entries: Record<string, ManifestEntry>;
}

const DEFAULT_MANIFEST: Manifest = {
  engine: "google-cloud-tts",
  voice: { en: "en-US-Neural2-D", fr: null, es: null, pt: null },
  generationVersion: 1,
  entries: {},
};

// ── Directory tree ─────────────────────────────────────────────

function ensureAudioDirectoryTree(rankIds: RankId[]): void {
  for (const lang of LANGUAGES) {
    const langRoot = path.join(AUDIO_ROOT, lang, CONTENT_TYPE);
    for (const rankId of rankIds) {
      for (const phaseId of OPERATIONAL_PHASE_ORDER) {
        const dir = path.join(langRoot, rankId, phaseId);
        fs.mkdirSync(dir, { recursive: true });
        const gitkeep = path.join(dir, ".gitkeep");
        if (!fs.existsSync(gitkeep)) fs.writeFileSync(gitkeep, "");
      }
    }
  }
  fs.mkdirSync(METADATA_DIR, { recursive: true });
}

// ── Text extraction ─────────────────────────────────────────────

function extractSubsectionText(phase: OperationalPhase | undefined, key: AudioSubsectionKey): string {
  if (key === "overview") {
    return resolveLocalizedText(phase?.overview, "en") ?? "";
  }
  return resolveLocalizedTextList(phase?.[key], "en").join("\n");
}

function sha256(text: string): string {
  return `sha256:${createHash("sha256").update(text, "utf8").digest("hex")}`;
}

// ── Manifest build ───────────────────────────────────────────────

function loadManifest(): Manifest {
  if (!fs.existsSync(MANIFEST_PATH)) {
    return structuredClone(DEFAULT_MANIFEST);
  }
  const raw = fs.readFileSync(MANIFEST_PATH, "utf8");
  return JSON.parse(raw) as Manifest;
}

interface BuildResult {
  manifest: Manifest;
  checked: number;
  newCount: number;
  unchanged: number;
  missingCount: number;
  outdatedCount: number;
}

function buildManifest(rankIds: RankId[]): BuildResult {
  const manifest = loadManifest();
  const existingEntries = manifest.entries;
  const newEntries: Record<string, ManifestEntry> = {};

  let checked = 0;
  let newCount = 0;
  let unchanged = 0;
  let missingCount = 0;
  let outdatedCount = 0;

  for (const rankId of rankIds) {
    const card = ROLE_ON_BOARD_REGISTRY[rankId];
    for (const phaseId of OPERATIONAL_PHASE_ORDER) {
      const phase = card?.operationalPhases?.[phaseId];
      for (const { key, fileBaseName } of AUDIO_SUBSECTIONS) {
        const text = extractSubsectionText(phase, key);
        const hash = sha256(text);
        const manifestKey = `en/${CONTENT_TYPE}/${rankId}/${phaseId}/${fileBaseName}`;
        checked += 1;

        const existing = existingEntries[manifestKey];
        if (!existing) {
          newEntries[manifestKey] = { textHash: hash, status: "missing", generatedAt: null };
          newCount += 1;
          missingCount += 1;
        } else if (existing.textHash === hash) {
          newEntries[manifestKey] = existing;
          unchanged += 1;
          if (existing.status === "missing") missingCount += 1;
          else if (existing.status === "outdated") outdatedCount += 1;
        } else if (existing.status === "generated") {
          newEntries[manifestKey] = { textHash: hash, status: "outdated", generatedAt: existing.generatedAt };
          outdatedCount += 1;
        } else {
          newEntries[manifestKey] = { textHash: hash, status: "missing", generatedAt: null };
          missingCount += 1;
        }
      }
    }
  }

  manifest.entries = newEntries;
  return { manifest, checked, newCount, unchanged, missingCount, outdatedCount };
}

// ── Extension point (not called in this mission) ────────────────
//
// TODO(google-cloud-tts): not implemented — API credentials are not
// configured yet. Once available, this should:
//   1. Apply TTS_PRONUNCIATION_DICTIONARY[lang] substitutions to `text`.
//   2. Call the Google Cloud TTS API using manifest.voice[lang].
//   3. Write the resulting audio to `outputPath` as an mp3.
//   4. Update the corresponding manifest entry to
//      { status: "generated", generatedAt: new Date().toISOString() }.
export interface GenerateAudioParams {
  lang: SupportedLanguage;
  contentType: typeof CONTENT_TYPE;
  rankId: RankId;
  phaseId: OperationalPhaseId;
  subsection: string;
  text: string;
  outputPath: string;
}

export async function generateAudioFile(_params: GenerateAudioParams): Promise<void> {
  throw new Error("generateAudioFile() is not implemented: Google Cloud TTS credentials are not configured yet.");
}

// ── Main ──────────────────────────────────────────────────────────

function main(): void {
  const rankIds = Object.keys(ROLE_ON_BOARD_REGISTRY) as RankId[];

  ensureAudioDirectoryTree(rankIds);
  const { manifest, checked, newCount, unchanged, missingCount, outdatedCount } = buildManifest(rankIds);

  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

  const timestamp = new Date().toISOString();
  const logLine =
    `[${timestamp}] Audio manifest sync — checked: ${checked}, new: ${newCount}, unchanged: ${unchanged}, ` +
    `generated: 0 (no TTS calls made), missing: ${missingCount}, outdated: ${outdatedCount}\n`;
  fs.appendFileSync(LOG_PATH, logLine, "utf8");

  console.log(logLine.trim());
}

main();
