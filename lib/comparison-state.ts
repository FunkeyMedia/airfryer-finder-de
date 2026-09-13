export function readComparisonIds(raw: unknown, availableIds: string[]) {
  if (typeof raw !== "string") return [];
  return [...new Set(raw.slice(0, 1024).split(","))].filter((id) => availableIds.includes(id)).slice(0, 4);
}
export function comparisonPath(ids: string[]) {
  const params = new URLSearchParams();
  if (ids.length) params.set("ids", [...new Set(ids)].slice(0, 4).join(","));
  return `/vergleich${params.size ? `?${params}` : ""}`;
}
