import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const formatDate = (date: string) => {
  const now = dayjs();
  const blogDate = dayjs(date);
  const diffInHours = now.diff(blogDate, "hour");

  if (diffInHours < 24) {
    return blogDate.fromNow();
  } else {
    return blogDate.format("HH:mm - DD/MM/YYYY");
  }
};