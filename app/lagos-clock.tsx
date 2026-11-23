"use client";

import { useEffect, useState } from "react";

const lagosTime = new Intl.DateTimeFormat("en-NG", {
  timeZone: "Africa/Lagos",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export function LagosClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => setTime(lagosTime.format(new Date()));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return <span className="lagos-clock">{time && <time dateTime={time}>{time}</time>} WAT</span>;
}
