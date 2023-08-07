// import { applicationNameList } from '@/api/common'
// import { gameInfoQuerylist } from '@/libs/selectApis'
export default {
  // 定义属性
  data() {
    return {
      gameList: [], // 游戏列表
      formDatas: {
        cascader: {
          parent: 1,
          children: 2,
        },
        payForm: {
          payment_type: "wx", // 登陆方式
          way: undefined, // 搜索的条件
          mch_id: undefined, // 商户号
          payment_scenes: undefined, // 支付场景
          third_account: undefined, // 第三方账号
        },
        name: "owen",
        select: [],
        select1: [],
        accountType: {
          type: "wx",
          value: "1111",
        },
        dateForm: {
          startTime: new Date().getTime(),
          endTime: new Date().getTime(),
          type: "month",
        },
        minMax1: {
          type: "wx",
          min: 20,
          max: 30,
        },
        minMax2: {
          min: 20,
          max: 30,
        },
      },
      formModel: [
        {
          label: "游戏分类",
          type: "cascader",
          prop: "cascader",
          width: "260px",
          change(evt) {
            // console.log(evt, '----- pay  change------')
            // this.queryForm = { ...evt }
          },
        },
        {
          label: "支付方式",
          type: "pay",
          prop: "payForm",
          width: "450px",
          change(evt) {
            // console.log(evt, '----- pay  change------')
            // this.queryForm = { ...evt }
          },
        },
        {
          label: "时间",
          type: "dateForm",
          prop: "dateForm",
          width: "320px",
          typeSelect: true,
          datePickerdata: {},
          option: () => {
            return [
              {
                label: "日",
                value: "day",
              },
              {
                label: "周",
                value: "week",
              },
              {
                label: "月",
                value: "month",
              },
            ];
          },
          change(evt) {
            console.log(evt, "----- change------");
            this.queryForm = { ...evt };
          },
        },
        {
          label: "标题",
          type: "input",
          prop: "name",
          labelWidth: "40px",
          width: "130px",
        },
        {
          label: "游戏名称yy",
          type: "select",
          prop: "select1",
          labelWidth: "75px",
          width: "140px",

          change: (value) => {
            // console.log(value, '------select change------')
          },
          option: () => {
            return [
              {
                label: "游戏1",
                value: "1",
              },
              {
                label: "游戏2",
                value: "2",
              },
              {
                label: "游戏3",
                value: "3",
              },
              {
                label: "游戏4",
                value: "4",
              },
            ];
          },
        },
        {
          label: "游戏名称",
          type: "select",
          prop: "select",
          labelWidth: "75px",
          width: "140px",
          multiple: true,
          change: (value) => {
            // console.log(value, '------select change------')
          },
          option: () => {
            return [
              {
                label: "游戏1",
                value: "1",
              },
              {
                label: "游戏2",
                value: "2",
              },
              {
                label: "游戏3",
                value: "3",
              },
              {
                label: "游戏4",
                value: "4",
              },
            ];
          },
        },
        {
          label: "第三方账号",
          type: "selectInput",
          prop: "accountType",
          width: "240px",
          change: (value) => {
            // console.log(value, '------select change------')
          },
          option: () => {
            return [
              {
                label: "微信",
                value: "wx",
              },
              {
                label: "qq",
                value: "qq",
              },
            ];
          },
        },
        {
          label: "最值最小值1",
          type: "minMax",
          prop: "minMax1",
          precision: 2,
          step: 0.01,
          width: "340px",
          typeSelect: true,
          option: () => [
            {
              label: "微信",
              value: "wx",
            },
            {
              label: "qq",
              value: "qq",
            },
          ],
        },
        {
          label: "最值最小值",
          type: "minMax",
          prop: "minMax2",
          precision: 0,
          step: 1,
          width: "230px",
        },
      ],
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  async created() {
    // this.gameList = await gameInfoQuerylist()
    this.gameList = [];
  },
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
