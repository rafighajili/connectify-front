import { formatDistance } from "date-fns";

export function durationCalculator(date: string) {
  const formatFunction = (value: number, unit: string, suffix: string) => {
    const abbreviations: { [key: string]: string } = {
      second: "s",
      minute: "m",
      hour: "h",
      day: "d",
      month: "mo",
      year: "y",
    };

    if (abbreviations[unit]) {
      return abbreviations[unit];
    }

    return value + unit.charAt(0);
  };

  return (
    formatDistance(new Date(date), new Date(), { addSuffix: true })
      .replace(/about /i, "")
      .replace(/(\d+)\s(\w+)\sago/, (match, value, unit) => formatFunction(parseInt(value), unit, "ago")) + " ago"
  );
}
