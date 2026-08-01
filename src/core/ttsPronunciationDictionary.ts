// ── ttsPronunciationDictionary.ts ──────────────────────────────
// Centralized pronunciation corrections for maritime terms that a generic
// TTS engine (Google Cloud TTS) mispronounces by default — nautical jargon,
// contractions, and regulatory acronyms. Structured per SupportedLanguage
// so fr/es/pt can be filled in later without touching the en entries or
// the shape consumers rely on.
//
// Foundations only: no audio is generated from this file in this mission.
// It exists so a future TTS pipeline can substitute each `term` occurrence
// in source text with its `ssml` phoneme tag before synthesis.

import type { SupportedLanguage } from "./roleOnBoardRegistry";

export interface PronunciationEntry {
  /** The term as it appears in source text (case-sensitive match target). */
  term: string;
  /** IPA phonetic transcription used to build the SSML fragment. */
  ipa: string;
  /** Ready-to-use SSML fragment for Google Cloud TTS's <phoneme> tag. */
  ssml: string;
}

export type PronunciationDictionary = Record<SupportedLanguage, PronunciationEntry[]>;

function phonemeSSML(word: string, ipa: string): string {
  return `<phoneme alphabet="ipa" ph="${ipa}">${word}</phoneme>`;
}

function entry(term: string, ipa: string): PronunciationEntry {
  return { term, ipa, ssml: phonemeSSML(term, ipa) };
}

// IPA transcriptions below reflect standard maritime-industry pronunciation
// (e.g. acronyms spoken as words where that is the convention, spelled out
// letter-by-letter where it is not). Subject to review by a language
// specialist before large-scale audio generation.
export const TTS_PRONUNCIATION_DICTIONARY: PronunciationDictionary = {
  en: [
    entry("Bosun", "ˈboʊsən"),
    entry("Fo'c'sle", "ˈfoʊksəl"),
    entry("Hawse Pipe", "hɔːz paɪp"),
    entry("Plimsoll", "ˈplɪmsəl"),
    entry("Beaufort", "ˈboʊfərt"),
    entry("ECDIS", "ˈɛkdɪs"),
    entry("STS", "ɛs tiː ɛs"),
    entry("SOLAS", "ˈsoʊləs"),
    entry("MARPOL", "ˈmɑːrpɒl"),
    entry("ISM", "aɪ ɛs ɛm"),
    entry("ISPS", "aɪ ɛs piː ɛs"),
    entry("COLREG", "ˈkɒlrɛg"),
    entry("STCW", "ɛs tiː siː ˈdʌbəljuː"),
    entry("AIS", "eɪ aɪ ɛs"),
    entry("GMDSS", "dʒiː ɛm diː ɛs ɛs"),
    entry("EPIRB", "ˈiːpɜːrb"),
    entry("SART", "sɑːrt"),
    entry("VTS", "viː tiː ɛs"),
    entry("OOW", "oʊ oʊ ˈdʌbəljuː"),
    entry("AB", "eɪ biː"),
  ],
  fr: [],
  es: [],
  pt: [],
};
