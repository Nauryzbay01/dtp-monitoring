export const formatTime = (time: string | Date): string => {
  const d = typeof time === "string" ? new Date(time) : time;
  return d.toLocaleTimeString("ru-RU");
};
