export const CategoryIcons = {
  Comida: "silverware-fork-knife",
  Transporte: "car",
  Salud: "heart-pulse",
  Educación: "school",
  Entretenimiento: "gamepad-variant",
  Hogar: "home",
  Otros: "cash",
} as const;

export type CategoryIconName =
  (typeof CategoryIcons)[keyof typeof CategoryIcons];
