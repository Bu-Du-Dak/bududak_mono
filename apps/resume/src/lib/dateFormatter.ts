const formatDate = (dateStr: string) => {
  const parts = dateStr.split(".");

  const yyyy = parts[0];
  const mm = parts[1] ? parts[1].padStart(2, "0") : undefined;
  const dd = parts[2] ? parts[2].padStart(2, "0") : undefined;

  if (yyyy && mm && dd) return `${yyyy}-${mm}-${dd}`;
  if (yyyy && mm) return `${yyyy}-${mm}`;
  return yyyy;
};

export const dateFormatter = (duration: string) => {
  const cleanDuration = duration.replace(/\s+/g, "");
  if (cleanDuration.includes("~")) {
    const [start, end] = cleanDuration.split("~") as [string, string];
    return `${formatDate(start)}/${formatDate(end)}`;
  }
  return formatDate(cleanDuration);
};
