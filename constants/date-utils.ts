export function getCurrentFormattedDate(): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = new Date().toLocaleDateString("en-US", options);
  return formattedDate;
}
