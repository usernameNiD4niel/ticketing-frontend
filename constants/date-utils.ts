const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export function getCurrentFormattedDate(): string {
  const formattedDate = new Date().toLocaleDateString("en-US", options);
  return formattedDate;
}

export function getNoSpacingDateToday(): string {
  const currentDate = new Date();
  return currentDate.toLocaleDateString(undefined, options);
}
