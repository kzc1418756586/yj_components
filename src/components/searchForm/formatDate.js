// 获取某天所在的周的起始日期和结束日期
export function getWeekTime(time) {
  const dayCode = new Date(time).getDay();
  const dayLong = 24 * 60 * 60 * 1000;
  return {
    startDay: new Date(time - dayLong * (dayCode - 1)),
    endDay: new Date(time + dayLong * (8 - dayCode) - 1000),
  };
}

// 获取某天所在的月的起始日期和结束日期
export function getMonthTime(time) {
  const currentDay = new Date(time);
  const currentFullYear = currentDay.getFullYear();
  const currentMonth = currentDay.getMonth();
  return {
    startDay: new Date(currentDay.setDate(1)),
    endDay: new Date(new Date(currentFullYear, currentMonth + 1, 0, 23, 59, 59)),
  };
}
