const shortcuts = [
  {
    text: "今天",
    onClick: (picker) => {
      const date = new Date();
      const end = new Date(date.setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 - 1);
      const start = new Date(date.setHours(0, 0, 0, 0));
      picker.$emit("pick", [start, end]);
    },
  },
  {
    text: "昨天",
    onClick: (picker) => {
      const date = new Date();
      const end = new Date(date.setHours(0, 0, 0, 0) - 1);
      const start = new Date(date.setHours(0, 0, 0, 0) - 24 * 60 * 60 * 1000);
      picker.$emit("pick", [start, end]);
    },
  },
  {
    text: "本周",
    onClick: (picker) => {
      const date = new Date();
      const monday = new Date(date.setDate(date.getDate() + 1 - (date.getDay() || 7)));
      const end = new Date(monday.setHours(0, 0, 0, 0) + 7 * 24 * 60 * 60 * 1000 - 1);
      const start = new Date(monday.setHours(0, 0, 0, 0));
      picker.$emit("pick", [start, end]);
    },
  },
  {
    text: "上周",
    onClick: (picker) => {
      const date = new Date();
      const monday = new Date(date.setDate(date.getDate() + 1 - (date.getDay() || 7)));
      const end = new Date(monday.setHours(0, 0, 0, 0) - 1);
      const start = new Date(monday.setHours(0, 0, 0, 0) - 7 * 24 * 60 * 60 * 1000);
      picker.$emit("pick", [start, end]);
    },
  },
  {
    text: "本月",
    onClick: (picker) => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      // 本月第一天
      const start = new Date(year, month, 1);
      // 本月最后一天
      const end = new Date(new Date(year, month + 1, 1) - 1);
      picker.$emit("pick", [start, end]);
    },
  },
  {
    text: "上月",
    onClick: (picker) => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      // 本月第一天
      const start = new Date(year, month - 1, 1);
      // 本月最后一天
      const end = new Date(new Date(year, month, 1) - 1);
      picker.$emit("pick", [start, end]);
    },
  },
  {
    text: "最近一周",
    onClick: (picker) => {
      const end = new Date();
      const start = new Date().getTime() - 3600 * 1000 * 24 * 7;
      picker.$emit("pick", [start, end]);
    },
  },
  {
    text: "最近一月",
    onClick: (picker) => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      picker.$emit("pick", [start, end]);
    },
  },
];
let selectDate = "";
const onPick = ({ maxDate, minDate }) => {
  selectDate = minDate.getTime();
  if (maxDate) {
    selectDate = "";
    // maxDate = maxDate.getTime() + 23 * 3600 * 1000 + 59 * 60 * 1000 + 59 * 1000
    // console.log(maxDate)
  }
};
const disabledDate = (time) => {
  if (selectDate !== "") {
    const one = 30 * 24 * 3600 * 1000;
    const minTime = selectDate - one;
    const maxTime = selectDate + one;
    return time.getTime() < minTime || time.getTime() > maxTime;
  }
};
export default { shortcuts, onPick, disabledDate };
