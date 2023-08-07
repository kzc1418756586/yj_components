<template>
  <div class="type-date">
    <el-row>
      <el-col v-if="typeSelect" :span="5">
        <el-select v-model="formdata.type" style="width: 100%" :placeholder="formdata.type_placeholder" @change="changeselect">
          <el-option v-for="(item, index) in optionFun(option)" :key="index" :label="item.label" :value="item.value" />
        </el-select>
      </el-col>
      <el-col :span="typeSelect ? 19 : 24">
        <el-date-picker
          style="width: 100%"
          :key="formdata.type + '_' + key"
          v-model="dateTime"
          :type="dateType[formdata.type]"
          :align="'right'"
          unlink-panels
          placeholder="选择"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptionsType[formdata.type]"
          :default-time="defaultTimeTYpe[formdata.type]"
          @change="onPickChange"
        >
        </el-date-picker>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import shortcuts from "./shortcuts";
import { getMonthTime } from "./formatDate";
import { getAnyZone } from "./date.js";
export default {
  name: "DateFrom",
  // components: { DateDown },
  props: {
    value: {
      type: Object,
      default: () => {
        return { date: "", type: "day" };
      },
    },
    typeSelect: {
      // 显示 selet框
      type: Boolean,
      default: false,
    },
    option: {
      type: [Array, Object, Function],
      default: () => [],
    },
  },
  data() {
    return {
      dateTime: [],
      dateType: {
        day: "daterange",
        week: "daterange",
        month: "monthrange",
      },
      defaultTimeTYpe: {
        day: ["00:00:00", "23:59:59"],
        week: ["00:00:00", "23:59:59"],
        month: ["00:00:00", "23:59:59"],
      },
      key: new Date().getTime(),
      defaultTime: [getAnyZone(new Date().getTime()), getAnyZone(new Date().getTime())],
      newDatePicker: {},
      formdata: {},
      pickerOptionsType: {
        day: {
          disabledDate: (time) => {
            return time.getTime() > getAnyZone(new Date().getTime()).setHours(23, 59, 59);
          },
          shortcuts: [
            {
              text: "今天",
              onClick: (picker) => {
                const date = getAnyZone(new Date().getTime());
                const end = new Date(date.setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 - 1);
                const start = new Date(date.setHours(0, 0, 0, 0));
                picker.$emit("pick", [start, end]);
              },
            },
            {
              text: "昨天",
              onClick: (picker) => {
                const date = getAnyZone(new Date().getTime());
                const end = new Date(date.setHours(0, 0, 0, 0) - 1);
                const start = new Date(date.setHours(0, 0, 0, 0) - 24 * 60 * 60 * 1000);
                picker.$emit("pick", [start, end]);
              },
            },
            {
              text: "本周",
              onClick: (picker) => {
                const date = getAnyZone(new Date().getTime());
                const monday = new Date(date.setDate(date.getDate() + 1 - (date.getDay() || 7)));
                const end = new Date(monday.setHours(0, 0, 0, 0) + 7 * 24 * 60 * 60 * 1000 - 1);
                const start = new Date(monday.setHours(0, 0, 0, 0));
                picker.$emit("pick", [start, end]);
              },
            },
            {
              text: "上周",
              onClick: (picker) => {
                const date = getAnyZone(new Date().getTime());
                const monday = new Date(date.setDate(date.getDate() + 1 - (date.getDay() || 7)));
                const end = new Date(monday.setHours(0, 0, 0, 0) - 1);
                const start = new Date(monday.setHours(0, 0, 0, 0) - 7 * 24 * 60 * 60 * 1000);
                picker.$emit("pick", [start, end]);
              },
            },
            {
              text: "本月",
              onClick: (picker) => {
                const now = getAnyZone(new Date().getTime());
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
                const now = getAnyZone(new Date().getTime());
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
                const end = getAnyZone(new Date().getTime());
                const start = getAnyZone(new Date().getTime()).getTime() - 3600 * 1000 * 24 * 7;
                picker.$emit("pick", [start, end]);
              },
            },
            {
              text: "最近一月",
              onClick: (picker) => {
                const end = getAnyZone(new Date().getTime());
                const start = getAnyZone(new Date().getTime());
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit("pick", [start, end]);
              },
            },
          ],
        },
        week: {
          disabledDate: (time) => {
            return time.getTime() > getAnyZone(new Date().getTime()).setHours(23, 59, 59);
          },
          firstDayOfWeek: 1,
        },
        month: {
          disabledDate: (time) => {
            return time.getTime() > getAnyZone(new Date().getTime()).setHours(23, 59, 59);
          },
          shortcuts: [
            {
              text: "本月",
              onClick(picker) {
                picker.$emit("pick", [getAnyZone(new Date().getTime()), getAnyZone(new Date().getTime())]);
              },
            },
            {
              text: "今年至今",
              onClick(picker) {
                const end = getAnyZone(new Date().getTime());
                const start = new Date(new Date().getFullYear(), 0);
                picker.$emit("pick", [start, end]);
              },
            },
            {
              text: "最近六个月",
              onClick(picker) {
                const end = getAnyZone(new Date().getTime());
                const start = getAnyZone(new Date().getTime());
                start.setMonth(start.getMonth() - 6);
                picker.$emit("pick", [start, end]);
              },
            },
          ],
        },
        year: {
          disabledDate: (time) => {
            return time.getTime() > getAnyZone(new Date().getTime()).setHours(23, 59, 59);
          },
        },
      },
    };
  },
  watch: {},
  created() {
    // this.formdata = { ...this.value };
    this.$set(this, "formdata", this.value);
    this.formtr(this.formdata, "-----------");
    this.dateTime = [this.formdata.startTime, this.formdata.endTime];
    // this.formtr(this.dateTime);
  },
  mounted() {},
  methods: {
    optionFun(option) {
      let str = [];
      if (option.constructor === "Array") {
        str = option;
      }
      if (typeof option === "function") {
        str = option();
      }

      return str;
    },
    changeselect(e) {
      this.key = e + new Date().getTime();
      this.dateTime = [];
      // this.$set(this.formdata, "type", e);
      this.$set(this.formdata, "startTime", "");
      this.$set(this.formdata, "endTime", "");
      // this.formtr(this.dateTime);
      // this.change();
      this.$emit("update", this.formdata);
    },
    change(e) {
      const data = this.formdata;
      console.log(data, "==========change========");
      this.$emit("update", data);
      this.$emit("change", data);
      // this.$parent.$parent.$parent.searchChange();
    },
    formtr(times) {
      // 处理日期
      console.log(times, "----------");
      const start = new Date(times[0]).getTime();
      const end = new Date(times[1]).getTime();
      const typeChuangeFun = {
        day: () => {
          return [start, end];
        },
        week: () => {
          return [start, end];
        },
        month: () => {
          const { startDay } = getMonthTime(start);
          const { endDay } = getMonthTime(end);
          return [startDay.getTime(), endDay.getTime()];
        },
      };
      return typeChuangeFun[this.formdata.type]();
    },
    onPickChange(times) {
      // 确定
      //   const dateTimes = this.formtr(times);
      //   this.$set(this.formdata, "startTime", dateTimes[0]);
      //   this.$set(this.formdata, "endTime", dateTimes[1]);
      if (times) {
        const dateTimes = this.formtr(times);
        this.$set(this.formdata, "startTime", dateTimes[0]);
        this.$set(this.formdata, "endTime", dateTimes[1]);
      } else {
        this.$set(this.formdata, "startTime", null);
        this.$set(this.formdata, "endTime", null);
      }
      // this.formdata.startTime = dateTimes[0].getTime();
      // this.formdata.endTime = dateTimes[1].getTime();
      // const start = getMonthTime(times[0]).startDay.getTime();
      // const end = getMonthTime(times[1]).endDay.getTime();
      this.change();
    },
    blur(e) {
      this.$emit("blur", e);
    },
    focus(e) {
      this.$emit("focus", e);
    },
    handle_setTime() {
      const dom = document.querySelectorAll(".domTime input");
      dom[0].setAttribute("readonly", "readonly");
      dom[2].setAttribute("readonly", "readonly");
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .el-row {
    padding: 0 0 !important;
  }
  .el-range-editor.el-input__inner {
    margin-top: 0px !important;
  }
  .el-range-separator {
    line-height: 28px !important;
  }
}
.type-date {
  display: block;
  .date-box {
    display: inline-block;
  }
}
</style>
