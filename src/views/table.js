export default {
  // 定义属性
  data() {
    return {
      tableData: [],
      tableForm: [
        { label: "姓名", prop: "name", width: "60px", align: "center" },
        {
          label: "性别",
          prop: "sex",
          width: "50px",
          color: (row, key) => {
            const objStr = {
              1: "#13ce66",
              2: "#ff4949",
            };
            return objStr[row[key]];
          },
          filter: (row, key) => {
            const strObj = { 1: "男", 2: "女" };
            return strObj[row[key]];
          },
          fun: (row, key) => {
            alert(1);
          },
        },
        { label: "年龄", prop: "age", width: "50px", color: "red", sortable: true },
        { label: "地址", prop: "address", width: "100px" },
        {
          label: "日期",
          prop: "date",
          width: "60px",
          filter: (row, key) => {
            return row[key];
          },
        },
      ],
      optBtns: {
        label: "操作",
        width: "120",
        fixed: true,
        btnData: [
          {
            label: "查看",
            isShow: (row, opt) => {
              return true;
            },
            isDisabled: (row, opt) => {
              return false;
            },
            fun: (row) => {
              alert(JSON.stringify(row));
            },
          },
          {
            label: "编辑",
            isShow: (row, opt) => {
              return true;
            },
            isDisabled: (row, opt) => {
              if (Number(row.sex) === 2) {
                return true;
              }
              return false;
            },
            fun: (row, index) => {
              this.tableData[index].sex = 2;
              console.log(this.tableData[index], index, "--------");
            },
          },
        ],
      },
      pageData: {
        page: 1,
        total: 100,
        pageSize: 20,
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
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {},
  // 方法集合
  methods: {}, // 如果页面有keep-alive缓存功能，这个函数会触发
};
