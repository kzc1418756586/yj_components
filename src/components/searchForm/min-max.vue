<template>
  <div class="input-min-max">
    <div v-if="typeSelect" class="type-sl-box">
      <el-select v-model="qForm.type" style="width: 100%" :placeholder="typePlaceholder" clearable @clear="clearTypeFun" @change="changeSelect">
        <el-option v-for="(item, index) in optionFun(option)" :key="index" :label="item.label" :value="item.value" />
      </el-select>
    </div>
    <div class="number-box" :style="typeSelect ? { width: '28%' } : ''" @mouseenter="min.hovering = true" @mouseleave="min.hovering = false">
      <el-input-number
        v-model="qForm.min"
        style="width: 100%"
        class="balanceInput"
        :controls="false"
        :precision="itemData.precision"
        :step="itemData.step"
        :min="itemData.min"
        placeholder="最小值"
        :max="itemData.max || 999999999"
        :disabled="disabledFun"
        clearable
        @focus="handleFocus('min')"
        @blur="handleBlur('min')"
        @change="chengeEmit"
      />
      <i v-if="showClear('min')" class="el-input__icon el-icon-circle-close el-input__clear" @mousedown.prevent @click="clear('min')"></i>
    </div>

    <span class="balanceSpan">-</span>
    <div class="number-box" :style="typeSelect ? { width: '28%' } : ''" @mouseenter="max.hovering = true" @mouseleave="max.hovering = false">
      <el-input-number
        v-model="qForm.max"
        style="width: 100%"
        class="balanceInput"
        :controls="false"
        :precision="itemData.precision"
        :step="itemData.step"
        :min="qForm.min"
        placeholder="最大值"
        :max="itemData.max || 999999999"
        clearable
        :disabled="disabledFun"
        @focus="handleFocus('max')"
        @blur="handleBlur('max')"
        @change="chengeEmit"
      />
      <i v-if="showClear('max')" class="el-input__icon el-icon-circle-close el-input__clear" @mousedown.prevent @click="clear('max')"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: "MinMaxInput",
  props: {
    typePlaceholder: {
      type: String,
      default: undefined,
    },
    option: {
      type: [Object, Array, Function],
      default: () => [],
    },
    typeSelect: {
      // 是否显示 头部select 框
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: [Object, Array],
      default: () => {
        return {
          min: undefined,
          max: undefined,
        };
      },
    },
    itemData: {
      type: [Object, Array],
      default: () => {},
    },
  },
  data() {
    return {
      max: {
        hovering: false,
        focused: false,
      },
      min: {
        hovering: false,
        focused: false,
      },
      qForm: {
        type: undefined,
        max: null,
        min: null,
      },
    };
  },
  computed: {
    disabledFun() {
      if (this.typeSelect) {
        return this.typeSelect && !this.qForm.type;
      }
      return false;
    },
  },
  created() {
    // console.log(this.modelValue, JSON.stringify(this.modelValue), '----- min-max------')
    this.qForm = { ...this.modelValue };
  },
  methods: {
    showClear(type) {
      // console.log(this.nativeInputValue(type), '---------111-----')
      return this.nativeInputValue(type) && (this[type].focused || this[type].hovering);
      // return true
    },
    nativeInputValue(type) {
      return this.qForm[type] === null || this.qForm[type] === undefined ? "" : String(this.qForm[type]);
    },
    handleBlur(type) {
      this[type].focused = false;
    },
    handleFocus(type) {
      // console.log(e, '-----22------')
      this[type].focused = true;
    },
    clear(type) {
      this.qForm[type] = undefined;
      this.chengeEmit();
      // this.$emit('update:model', this.qForm)
    },
    chengeThirdId() {
      // this.$emit('update:model', this.qForm)
    },
    chengeEmit() {
      // this.qForm.value = null
      // const data = this.$gTools.resetQueryFrom(this.qForm)
      const data = this.qForm;
      if (data.max && data.min && data.min > data.max) {
        data.max = data.min;
      }
      this.$emit("update:modelValue", data);
      this.$emit("change", data);
      this.$parent.$parent.$parent.searchChange();
      // this.$emit('update:model', this.qForm)
    },
    optionFun(option) {
      // console.log(option, '-------')
      let str = [];
      if (option.constructor === "Array") {
        str = option;
      }
      if (typeof option === "function") {
        str = option();
      }

      return str;
    },
    clearTypeFun(type) {
      // 清空表单
      this.qForm.min = undefined;
      this.qForm.max = undefined;
      this.qForm.type = undefined;
      this.chengeEmit();
    },
    changeSelect() {
      // 选择框事件
      this.qForm.min = undefined;
      this.qForm.max = undefined;
      // console.log(this.qForm, '-------')
      this.chengeEmit();
    },
  },
};
</script>
<style lang="scss" scoped>
.input-min-max .balanceSpan {
  // display: inline-block;
  width: 2%;
  // width: 6px;
  text-align: center;
  line-height: 32px;
  margin: 0px 4px;
  color: #c0c4cc;
}
.type-sl-box {
  display: inline-block;
  width: 34%;
  margin-right: 10px;
}
.number-box {
  position: relative;
  display: inline-block;
  width: 45%;
  // overflow: hidden;
  ::v-deep {
    .el-input__clear {
      position: absolute;
      right: -2px;
      top: 0;
      line-height: 30px;
      color: #c0c4cc;
    }
  }
}
</style>
