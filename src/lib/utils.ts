import { format, isToday, isYesterday } from "date-fns";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: number | string | Date, time = true) {
  const parsedDate = new Date(date);

  if (isToday(parsedDate)) {
    if (!time) {
      return "Today";
    }
    return format(parsedDate, "p"); // Shows time, e.g., 3:45 PM
  }

  if (isYesterday(parsedDate)) {
    return "Yesterday";
  }

  return format(parsedDate, "MM/dd/yyyy"); // Shows date, e.g., 10/10/2024
}
