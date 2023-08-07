<template>
  <div class="pay-input-box">
    <el-row>
      <el-col :span="8">
        <el-select v-model="qForm.payment_type" clearable @change="changePay">
          <el-option v-for="(item, index) in paymentType" :key="index" :label="item.label" :value="item.value" /> </el-select
      ></el-col>
      <el-col :span="8">
        <el-select v-model="qForm.way" clearable :disabled="!qForm.payment_type" @change="changeWay">
          <el-option v-for="(item, index) in ways" :key="index" :label="item.label" :value="item.value" />
        </el-select>
      </el-col>
      <el-col :span="8">
        <!-- 商户号 third_account -->
        <el-input v-if="qForm.way === 1 || !qForm.way" v-model="qForm.mch_id" clearable :maxlength="30" :disabled="qForm.way !== 1" @change="changeCon" />
        <!-- 支付场景 third_account -->
        <el-select v-if="qForm.way === 2" v-model="qForm.payment_scenes" clearable :disabled="qForm.way !== 2" @change="changeCon">
          <el-option v-for="(item, index) in paymentScenes" :key="index" :label="item.label" :value="item.value" />
        </el-select>
        <!-- 第三方账号 third_account -->
        <el-input v-if="qForm.way === 3" v-model="qForm.third_account" clearable :maxlength="64" :disabled="qForm.way !== 3" @change="changeCon" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "PayInput",
  components: {},
  props: {
    modelValue: {
      type: Object,
      default: () => {},
    },
  },
  // 定义属性
  data() {
    return {
      qForm: {
        payment_type: undefined, // 登陆方式
        way: undefined, // 搜索的条件
        mch_id: undefined, // 商户号
        payment_scenes: undefined, // 支付场景
        third_account: undefined, // 第三方账号
      },
      paymentType: [],
      ways: [],
      paymentScenes: [],
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.qForm = { ...this.modelValue };
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
  methods: {
    changePay() {
      Object.keys(this.qForm).forEach((elem) => {
        this.qForm[elem] = undefined;
      });
      this.changeCon();
    },
    changeWay() {
      this.qForm.mch_id = undefined;
      this.qForm.payment_scenes = undefined;
      this.qForm.third_account = undefined;
      this.changeCon();
    },
    changeCon() {
      // const data = this.$gTools.resetQueryFrom(this.qForm)
      const data = this.qForm;
      this.$emit("update:modelValue", data);
      this.$emit("change", data);
      this.$parent.$parent.$parent.searchChange();
    },
  }, // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang="scss" scoped>
::v-deep {
  .el-row {
    padding: 0 0 !important;
  }
}
</style>
