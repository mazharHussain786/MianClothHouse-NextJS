export const SEASONS = [
  { value: "summer", label: "Summer" },
  { value: "winter", label: "Winter" },
  { value: "mix", label: "Mix" },
  { value: "all", label: "All seasons" },
] as const;

export type SeasonValue = (typeof SEASONS)[number]["value"];

export function seasonLabel(value?: string | null) {
  return SEASONS.find((season) => season.value === value)?.label || "All seasons";
}
