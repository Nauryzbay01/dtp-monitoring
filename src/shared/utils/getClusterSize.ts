export const getClusterSize = (
  pointCount: number,
): "small" | "medium" | "large" => {
  if (pointCount < 10) return "small";
  if (pointCount < 50) return "medium";
  return "large";
};
