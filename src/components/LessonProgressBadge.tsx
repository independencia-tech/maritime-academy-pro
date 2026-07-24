// LessonProgressBadge — shared "Lesson X of Y" + status indicator.
// Rendered once in MaritimeApp.tsx as a fixed overlay, driven purely by the
// existing `page` state and `completedLessons` array — no new progress data
// source, no per-lesson-file duplication (mission: correction 3/4).

import { MODULES as ALL_MODULES } from "./Dashboard";

// Maps every lesson `page` value used in MaritimeApp's internal routing to the
// exact moduleId-lessonId key used by markLessonCompleted() / completedLessons.
// Extracted directly from the routing switch in MaritimeApp.tsx (single source
// of truth — do not hand-maintain independently from that switch).
export const PAGE_TO_LESSON_KEY: Record<string, string> = {
  "lesson_s1_l1": "s1-l1",
  "lesson_s1_l2": "s1-l2",
  "lesson_s1_l3": "s1-l3",
  "lesson_s1_l4": "s1-l4",
  "lesson_s1_l5": "s1-l5",
  "lesson_s1_l6": "s1-l6",
  "lesson_s2_l1": "s2-l1",
  "lesson_s2_l2": "s2-l2",
  "lesson_s2_l3": "s2-l3",
  "lesson_s2_l4": "s2-l4",
  "lesson_s2_l5": "s2-l5",
  "lesson_safety_s3_l1": "s3-l1",
  "lesson_safety_s3_l2": "s3-l2",
  "lesson_safety_s3_l3": "s3-l3",
  "lesson_safety_s3_l4": "s3-l4",
  "lesson_safety_s3_l5": "s3-l5",
  "lesson_safety_s3_l6": "s3-l6",
  "lesson_safety_s3_l7": "s3-l7",
  "lesson_safety_s3_l8": "s3-l8",
  "lesson_safety_s4_l1": "s4-l1",
  "lesson_safety_s4_l2": "s4-l2",
  "lesson_safety_s4_l3": "s4-l3",
  "lesson_safety_s4_l4": "s4-l4",
  "lesson_safety_s4_l5": "s4-l5",
  "lesson_safety_s4_l6": "s4-l6",
  "lesson_safety_s4_l7": "s4-l7",
  "lesson_safety_s5_l1": "s5-l1",
  "lesson_safety_s5_l2": "s5-l2",
  "lesson_safety_s5_l3": "s5-l3",
  "lesson_safety_s5_l4": "s5-l4",
  "lesson_safety_s6_l1": "s6-l1",
  "lesson_safety_s6_l2": "s6-l2",
  "lesson_safety_s6_l3": "s6-l3",
  "lesson_safety_s6_l4": "s6-l4",
  "lesson_safety_s6_l5": "s6-l5",
  "lesson_safety_s6_l6": "s6-l6",
  "lesson_e2_l1": "e2-l1",
  "lesson_e2_l2": "e2-l2",
  "lesson_e2_l3": "e2-l3",
  "lesson_e2_l4": "e2-l4",
  "lesson_e2_l5": "e2-l5",
  "lesson_e2_l6": "e2-l6",
  "lesson_e2_l7": "e2-l7",
  "lesson_e3_l1": "e3-l1",
  "lesson_e3_l2": "e3-l2",
  "lesson_e3_l3": "e3-l3",
  "lesson_e3_l4": "e3-l4",
  "lesson_e3_l5": "e3-l5",
  "lesson_e6_l1": "e6-l1",
  "lesson_e3_l6": "e3-l6",
  "lesson_e6_l2": "e6-l2",
  "lesson_e6_l3": "e6-l3",
  "lesson_e6_l4": "e6-l4",
  "lesson_e6_l5": "e6-l5",
  "lesson_e6_l6": "e6-l6",
  "lesson_e7_l1": "e7-l1",
  "lesson_e7_l2": "e7-l2",
  "lesson_e7_l3": "e7-l3",
  "lesson_e7_l4": "e7-l4",
  "lesson_e7_l5": "e7-l5",
  "lesson_solas": "d2-l1",
  "lesson_marpol_legal": "d2-l2",
  "lesson_stcw": "d2-l3",
  "lesson_mlc": "d2-l4",
  "lesson_colreg_legal": "d2-l5",
  "lesson_unclos": "d2-l6",
  "lesson_liability_insurance": "d2-l7",
  "lesson_ports_flag_states": "d2-l8",
  "lesson_piracy": "d2-l9",
  "lesson_arbitration": "d2-l10",
  "lesson_iala": "d3-l1",
  "lesson_lights_shapes": "d3-l2",
  "lesson_sound_signals": "d3-l3",
  "lesson_flags": "d3-l4",
  "lesson_vhf": "d3-l5",
  "lesson_ais": "d3-l6",
  "lesson_gmdss": "d3-l7",
  "lesson_sea_l1": "d6-l1",
  "lesson_sea_l2": "d6-l2",
  "lesson_sea_l3": "d6-l3",
  "lesson_sea_l4": "d6-l4",
  "lesson_sea_l5": "d6-l5",
  "lesson_meteo_l1": "d7-l1",
  "lesson_meteo_l2": "d7-l2",
  "lesson_meteo_l3": "d7-l3",
  "lesson_meteo_l4": "d7-l4",
  "lesson_meteo_l5": "d7-l5",
  "lesson_meteo_l6": "d7-l6",
  "lesson_meteo_l7": "d7-l7",
  "lesson_shipcareer_l1": "d5-l1",
  "lesson_shipcareer_l2": "d5-l2",
  "lesson_shipcareer_l3": "d5-l3",
  "lesson_shipcareer_l4": "d5-l4",
  "lesson_shipcareer_l5": "d5-l5",
  "lesson_smcp_l1": "d4-l1",
  "lesson_smcp_l2": "d4-l2",
  "lesson_smcp_l3": "d4-l3",
  "lesson_smcp_l4": "d4-l4",
  "lesson_smcp_l5": "d4-l5",
  "lesson_smcp_l6": "d4-l6",
  "lesson_smcp_l7": "d4-l7",
  "lesson_smcp_l8": "d4-l8",
  "lesson_navigation": "d1-l1",
  "lesson_navire": "d1-l2",
  "lesson_coord": "d1-l3",
  "lesson_carte": "d1-l4",
  "lesson_compas": "d1-l5",
  "lesson_navpratique": "d1-l6",
  "lesson_marees": "d1-l7",
  "lesson_colreg": "d1-l8",
  "lesson_moteur": "e1-l1",
  "lesson_auxiliaires": "e1-l2",
  "lesson_stabilite": "e1-l3",
  "lesson_incendie": "e1-l4",
  "lesson_sauvetage": "e1-l5",
  "lesson_marpol": "e4-l1",
  "lesson_marpol_l2": "e4-l2",
  "lesson_marpol_l3": "e4-l3",
  "lesson_marpol_l4": "e4-l4",
  "lesson_marpol_l5": "e4-l5",
  "lesson_marpol_l6": "e4-l6",
  "lesson_seemp_l1": "e5-l1",
  "lesson_seemp_l2": "e5-l2",
  "lesson_seemp_l3": "e5-l3",
  "lesson_seemp_l4": "e5-l4",
  "lesson_seemp_l5": "e5-l5",
  "lesson_watchkeeping": "e1-l7",
  "lesson_maintenance": "e1-l6",
  "lesson_emergency": "e1-l8",
};

const T: Record<string, { lesson: string; of: string; inProgress: string; completed: string }> = {
  fr: { lesson: "Leçon", of: "sur", inProgress: "En cours", completed: "Terminé ✓" },
  en: { lesson: "Lesson", of: "of", inProgress: "In progress", completed: "Completed ✓" },
  es: { lesson: "Lección", of: "de", inProgress: "En curso", completed: "Completado ✓" },
  pt: { lesson: "Lição", of: "de", inProgress: "Em curso", completed: "Concluído ✓" },
};

export default function LessonProgressBadge({
  page,
  lang,
  completedLessons = [],
}: {
  page: string;
  lang: string;
  completedLessons: string[];
}) {
  const lessonKey = PAGE_TO_LESSON_KEY[page];
  if (!lessonKey) return null;

  const [moduleId, lessonId] = lessonKey.split("-");
  const allModules = Object.values(ALL_MODULES as any).flat() as any[];
  const mod = allModules.find((m: any) => m.id === moduleId);
  if (!mod || !Array.isArray(mod.lessons)) return null;

  const idx = mod.lessons.findIndex((l: any) => l.id === lessonId);
  if (idx === -1) return null;
  const total = mod.lessons.length;

  const t = T[lang] || T.fr;
  const isDone = completedLessons.includes(lessonKey);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        height: 22,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: 0.5,
        fontFamily: "'Nunito',sans-serif",
        color: "#f0f4ff",
        background: isDone ? "rgba(30,138,74,0.92)" : "rgba(26,111,212,0.92)",
        pointerEvents: "none",
      }}
    >
      <span>{t.lesson} {idx + 1} {t.of} {total}</span>
      <span>·</span>
      <span>{isDone ? t.completed : t.inProgress}</span>
    </div>
  );
}
