<template>
  <div class="select-input-box">
    <el-input
      v-if="!isNumber"
      v-model="qForm.value"
      class="mouse-pointer"
      :disabled="!qForm.type"
      :placeholder="itemData.placeholder"
      clearable
      :maxlength="itemData.maxlength"
      @input="chengeThirdId"
      @clear="clearFun('value')"
    >
      <template #prepend>
        <el-select v-model="qForm.type" clearable @change="chengeThirdName">
          <el-option v-for="(item, index) in itemData.option()" :key="index" :label="item.label" :value="item.value" />
        </el-select>
      </template>
    </el-input>
    <el-input
      v-else
      v-model.number="qForm.value"
      class="mouse-pointer"
      :disabled="!qForm.type"
      :placeholder="itemData.placeholder"
      clearable
      type="number"
      :maxlength="itemData.maxlength"
      @input="chengeThirdId"
      @clear="clearFun('value')"
    >
      <template #prepend>
        <el-select v-model="qForm.type" clearable style="width: 100%" @change="chengeThirdName">
          <el-option v-for="(item, index) in itemData.option()" :key="index" :label="item.label" :value="item.value" />
        </el-select>
      </template>
    </el-input>
  </div>
</template>
<script>
export default {
  name: "SelectInput",
  props: {
    isNumber: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: [Object, Array],
      default: () => {
        return {
          value: undefined,
          type: undefined,
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
      qForm: {
        value: undefined,
        type: undefined,
      },
    };
  },
  created() {
    // console.log(this.modelValue, '----- select-input ------')
    this.qForm = { ...this.modelValue };
    // if (this.modelValue && JSON.stringify(this.modelValue) !== '{}') {
    //   // this.formInline = this.formData
    //   this.modelValue && Object.keys(this.modelValue).forEach(element => {
    //     this.$set(this.qForm, element, this.modelValue[element])
    //   })
    //   // console.log(this.qForm, '--------- select-input ------')
    // }
    // this.qForm = this.model || {
    //   value: undefined,
    //   type: undefined
    // }
  },
  methods: {
    clearFun(e) {
      // 清空组件内容
      this.qForm[e] = null;
      this.chengeThirdId();
    },
    chengeThirdId() {
      // const data = this.$gTools.resetQueryFrom(this.qForm)
      const data = this.qForm;
      this.$emit("update:modelValue", data);
      this.$emit("change", data);
      this.$parent.$parent.$parent.searchChange();
    },
    chengeThirdName() {
      this.qForm.value = null;
      this.chengeThirdId();
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep {
  .mouse-pointer .el-input .el-input__inner {
    cursor: pointer !important;
  }
  .mouse-pointer .el-input .el-select__caret {
    cursor: pointer !important;
  }
  .mouse-pointer .el-input-group__prepend {
    background: #fff;
  }

  .el-select .el-input {
    width: 100px;
  }
}
</style>
