export const formatDate = (date: string | number | Date): string => {
  const d =
    typeof date === "string"
      ? new Date(date)
      : typeof date === "number"
        ? new Date(date)
        : date;
  return d.toLocaleDateString("ru-RU");
};
