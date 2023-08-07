<template>
  <div class="cascader-box">
    <el-row>
      <el-col :span="12">
        <el-select v-model="qForm.parent" clearable @change="changeGameType">
          <el-option v-for="(item, index) in gameTypes" :key="index" :label="item.label" :value="item.value" />
        </el-select>
      </el-col>
      <el-col :span="12">
        <el-select v-model="qForm.children" clearable :disabled="!qForm.parent" @change="emitFun">
          <el-option v-for="(item, index) in gameTypeChilds" :key="index" :label="item.label" :value="item.value" />
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { returnFirstLevel } from '@/libs/selectApis'
export default {
  name: "CascaderInput",
  components: {},
  props: {
    modelValue: {
      type: Object,
      default: () => {},
    },
    asyncFun: {
      type: Object,
      default: () => {},
    },
    asyncPames: {
      type: Array,
      default: () => [],
    },
    pPamesName: {
      type: String,
      default: "",
    },
  },
  // 定义属性
  data() {
    return {
      // returnFirstLevel,
      qForm: {},
      gameTypes: [],
      gameTypeChilds: [],
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  async created() {
    // this.gameTypes = await this.returnFirstLevel()
    this.formdata = { ...this.modelValue };
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
    emitFun() {
      // console.log(this.qForm, '-----cascaders2---------')
      // const data = this.$gTools.resetQueryFrom(this.qForm)
      const data = this.qForm;
      // console.log(data, '-----222---------')
      this.$emit("update:modelValue", data);
      this.$emit("change", data);
      this.$parent.$parent.$parent.searchChange();
    },
    async changeGameType(val) {
      this.qForm.children = undefined;
      if (val) {
        const data = this.asyncFunPeames();
        const pames = {
          ...data,
        };
        pames[this.pPamesName] = val;
        this.gameTypeChilds = await this.asyncFun({ ...pames });
      } else {
        this.gameTypeChilds = [];
      }
      this.emitFun();
    },
    asyncFunPeames() {
      const pames = {};
      this.asyncPames.forEach((e) => {
        pames[e] = "";
      });
      return pames;
    },
    clearFun() {
      this.qForm.parent = undefined;
      this.qForm.children = undefined;
      this.emitFun();
    },
    clearFunLast() {
      this.qForm.type2_id = undefined;
      this.emitFun();
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .el-row {
    padding: 0 0 !important;
  }
}
</style>
