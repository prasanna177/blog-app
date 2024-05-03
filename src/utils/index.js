export const getTime = (date) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

export const getDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const getDateAndTime = (date, timezone) => {
  if (timezone === "utc") {
    date = new Date(`${date} UTC`);
  }
  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedDateTime = new Date(date).toLocaleDateString("en-US", options);

  return formattedDateTime;
};
