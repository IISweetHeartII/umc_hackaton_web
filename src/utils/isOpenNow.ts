// src/utils/isOpenNow.ts

function parseDayRange(days: string): number[] {
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const result: number[] = [];

  // 여러개: "월,수,금"
  if (days.includes(",")) {
    return days
      .split(",")
      .map((d) => dayNames.indexOf(d.trim()))
      .filter((x) => x !== -1);
  }
  // 범위: "월-금"
  if (days.includes("-")) {
    const [from, to] = days.split("-").map((d) => dayNames.indexOf(d.trim()));
    if (from !== -1 && to !== -1) {
      // 0~6 사이에서 from부터 to까지
      for (let i = from; ; i = (i + 1) % 7) {
        result.push(i);
        if (i === to) break;
      }
    }
    return result;
  }
  // 단일: "월"
  const idx = dayNames.indexOf(days.trim());
  if (idx !== -1) result.push(idx);
  return result;
}

export function isOpenNow(timeStr: string): boolean {
  const now = new Date();
  const day = now.getDay(); // 0(일)~6(토)
  const hour = now.getHours();
  const min = now.getMinutes();

  const nowMin = hour * 60 + min;

  const segments = timeStr.split("/");
  for (const seg of segments) {
    const part = seg.trim();
    if (!part) continue;

    const [days, times] = part.split(" ");
    if (!days || !times) continue;

    // 요일 매칭
    const daysArr = parseDayRange(days);
    if (!daysArr.includes(day)) continue;

    // 시간 매칭
    const [start, end] = times.split("~").map((t) => t.trim());
    if (!start || !end) continue;

    const [startH, startM] = start.split(":").map(Number);
    const [endH, endM] = end.split(":").map(Number);

    const startMin = startH * 60 + startM;
    let endMin = endH * 60 + endM;
    // 24:00 → 1440분, 00:00 → 0분, 심야영업 처리
    if (endMin === 0 && endH === 0 && endM === 0) endMin = 24 * 60;
    if (endMin < startMin) {
      // 심야영업: 22:00~04:00 → 두 구간 중 하나라도 들어가면 ok
      if (
        (nowMin >= startMin && nowMin < 24 * 60) ||
        (nowMin >= 0 && nowMin <= endMin)
      ) {
        return true;
      }
    } else {
      if (nowMin >= startMin && nowMin <= endMin) {
        return true;
      }
    }
  }
  return false;
}
