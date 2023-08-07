<template>
  <div class="page-box">
    <page-table
      :table-data="tableData"
      :table-form="tableForm"
      :opt-btns="optBtns"
      :page-data="pageData"
      :is-selection="true"
      :show-summary="true"
      :is-count="true"
      :summary-method="getSummaries"
      @chanePage="onClickFun"
      @selectionChange="handleSelectionChange"
    >
      <template #header>
        <search-form ref="searchFormRef" v-model="formDatas" :form-model="formModel" @search="searchQuery" />
      </template>
      <template #footer>
        <div class="total-box">统计：12345</div>
      </template>
    </page-table>
  </div>
</template>

<script>
// import PageTable from "@/components/pageTable/index.vue";
// import SearchForm from "@/components/searchForm/index.vue";
import table from "./table.js";
import searchFormData from "./searchForm.js";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Table",
  components: {
    // SearchForm,
    // PageTable,
  },
  mixins: [searchFormData, table],
  // 定义属性
  data() {
    return {
      values: "",
      list: [],
      options: [],
      value: [],
      queryForm: {
        data: [],
      },
      loading: false,
      formInline: { user: "", region: "" },
      states: [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
      ],
      datePickerdata: {
        typedaterange: "daterange",
        defaultTime: ["00:00:00", "23:59:59"],
        pickerOptions: {},
        dateshow: true,
        // formdata: {
        //   date_type: 1,
        //   date: ['Mon Jul 05 2021 00:00:00 GMT+0800 (中国标准时间)', 'Sun Jul 11 2021 23:59:59 GMT+0800 (中国标准时间)']
        // }
      },
      datePickerdata1: {
        pickerOptions: {
          // ...shortcuts
        },
        typedaterange: "daterange",
        defaultTime: ["00:00:00", "23:59:59"],
      },
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {
    ...mapGetters({ getGameType: "getGameType" }),
    ...mapActions({ postGameType: "game/postGameType" }),
    newDatechange(evt) {
      this.queryForm = { ...evt };
    },
    searchQuery(data) {
      this.formData = data;
      console.log(this.formData);
      this.onClickFun();
    },
    getSummaries(param) {
      // 统计 计算
      const { columns } = param;
      const maxSums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          return;
        }
        if (index === 1) {
          maxSums[index] = "总计";
          return;
        }
        // console.log(column.property, minSums, "---------------");
        if (column.property === "age") {
          maxSums[index] = 100;
        } else {
          maxSums[index] = "";
        }
      });
      return maxSums;
    },
    getRowClasses(column, cellIndex) {
      // 小计处理列处理表格class
      const classes = [column.id, column.align, column.labelClassName];
      if (column.className) {
        classes.push(column.className);
      }
      // if (this.isCellHidden(cellIndex, this.columns, column)) {
      //   classes.push('is-hidden');
      // }
      if (!column.children) {
        classes.push("is-leaf");
      }
      return classes;
    },
    handleSelectionChange(val) {
      // 选中方法
      console.log(val, "------");
    },
    onClickFun(page = 1, pageSize = 20) {
      console.log(page, pageSize, "=========");
      // 请求数据
      this.pageData.page = page;
      this.pageData.pageSize = pageSize;
      this.tableData = [];
      const list = Array(pageSize).fill({});
      this.tableData = list.map((item, index) => {
        return {
          name: this.states[Math.ceil(Math.random() * 49)],
          sex: index % 2 ? 1 : 2,
          age: Math.ceil(Math.random() * 50),
          address: this.states[Math.ceil(Math.random() * 49)],
          date: new Date(),
        };
      });
      this.tableData.push({
        age: "130",
        // name: "小计",
        countTxt: "小计",
      });
      // this.tableData = Array(pageSize).fill({ name: 'owen' + page, sex: '1', age: '30', address: '上海市普陀区金沙江路1518弄', date: new Date() })
      this.pageData.total = 100;
      // console.log(page,'----',pageSize,'------ onClickFun ------')
    },
    remoteMethod(query) {
      // console.log(query.length, '------')
      if (query.length >= 2) {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter((item) => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
  }, // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
.total-box {
  width: 100%;
  height: 30px;
  line-height: 30px;
}
</style>
