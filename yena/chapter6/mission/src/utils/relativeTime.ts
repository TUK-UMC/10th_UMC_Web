export default function getRelativeTime(dateString?: string | Date) {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
  const diff = (date.getTime() - now.getTime()) / 1000; // 초 단위 차이

    const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 60 * 60 * 24 * 365],
    ["month", 60 * 60 * 24 * 30],
    ["day", 60 * 60 * 24],
    ["hour", 60 * 60],
    ["minute", 60],
    ["second", 1],
    ];

    for (const [unit, secondsInUnit] of units) {
    const value = Math.round(diff / secondsInUnit);
    if (Math.abs(value) >= 1 || unit === "second") {
        return new Intl.RelativeTimeFormat("ko", { numeric: "auto" }).format(
        value,
        unit,
        );
    }
    }
}