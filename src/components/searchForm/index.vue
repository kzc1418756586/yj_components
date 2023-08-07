<template>
  <div class="search-form">
    <el-form :inline="true" :model="value" label-width="80" size="mini" class="queryForm">
      <template v-for="(item, index) in formModel">
        <el-form-item :key="index" :label="item.label" v-if="!item.isHide">
          <!-- cascader-form -->
          <cascader-input
            v-if="item.type === 'cascader' && !item.isHide"
            :ref="item.prop + 'Ref'"
            :key="'cascader_' + index"
            v-model="value[item.prop]"
            :item="item"
            :asyncFun="item.asyncFun"
            :asyncPames="item.asyncPeames || []"
            :style="{ width: item.width || '230px' }"
            @change="item.change && item.change(value[item.prop])"
          />
          <!-- /cascader-form -->
          <!-- date-form -->
          <date-from
            v-if="item.type === 'dateForm' && !item.isHide"
            :ref="item.prop + 'Ref'"
            :key="'dateForm_' + index"
            v-model="value[item.prop]"
            :style="{ minWidth: '180px' || 'auto', maxWidth: item.width || '360px' }"
            :type-select="item.typeSelect"
            :option="item.option"
            @change="item.change && item.change(value[item.prop])"
          />
          <!-- /date-form  -->
          <!-- input -->
          <el-input
            v-if="item.type === 'input' && !item.isHide"
            :ref="item.prop + 'Ref'"
            :key="'inputs_' + index"
            v-model="value[item.prop]"
            :placeholder="item.placeholder"
            :style="{ width: item.width || '100px' }"
            :clearable="item.clearable === false ? false : true"
            @clear="clearFun(item.prop)"
            @change="item.change && item.change(value[item.prop])"
          />
          <!-- /input -->

          <!-- select -->
          <el-select
            v-if="item.type === 'select' && !item.isHide"
            :ref="item.prop + 'Ref'"
            :multiple="item.multiple === true ? true : false"
            collapse-tags
            :key="'selects_' + index"
            v-model="value[item.prop]"
            :placeholder="item.placeholder"
            :filterable="!!item.filterable"
            :style="{ width: item.width || 'auto' }"
            :clearable="item.clearable === false ? false : true"
            @clear="clearFun(item)"
            @change="item.change && item.change(value[item.prop])"
          >
            <el-option v-for="opt in optionFun(item)" :key="opt.value + '-' + index" :label="opt.label" :value="opt.value" />
          </el-select>
          <!-- /select -->

          <!-- select-input -->
          <select-input
            v-if="item.type === 'selectInput' && !item.isHide"
            :ref="item.prop + 'Ref'"
            :key="'selectInputs_' + index"
            v-model="value[item.prop]"
            :style="{ width: item.width || '270px' }"
            :item-data="item"
            :is-number="item.isNumber"
            @clear="clearFun(item.prop)"
            @change="item.change && item.change(value[item.prop])"
          />
          <!-- /select-input -->

          <!-- min-max-input -->
          <min-max-input
            v-if="item.type === 'minMax' && !item.isHide"
            :ref="item.prop + 'Ref'"
            :key="'minMaxs_' + index"
            v-model="value[item.prop]"
            :style="{ width: item.width || '230px' }"
            :item-data="item"
            :type-select="item.typeSelect"
            :option="item.option"
            :disabled="optDisabled(formModel, item)"
            @clear="clearFun(item.prop)"
            @change="item.change && item.change(value[item.prop])"
          />
          <!-- /min-max-input -->

          <!-- pay-select -->
          <pay-select-input
            v-if="item.type === 'pay' && !item.isHide"
            :ref="item.prop + 'Ref'"
            :key="'paySelects_' + index"
            v-model="value[item.prop]"
            :style="{ width: item.width || '230px' }"
            :item="item"
            :disabled="optDisabled(formModel, item)"
            @clear="clearFun(item.prop)"
            @change="item.change && item.change(value[item.prop])"
          />
          <!-- /pay-select -->
        </el-form-item>
      </template>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" class="search_btn" @click="searchBtn">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import DateFrom from "./date-from.vue";
import SelectInput from "./select-input.vue";
import MinMaxInput from "./min-max.vue";
import PaySelectInput from "./pay-input.vue";
import CascaderInput from "./cascader-input.vue";
export default {
  name: "SearchForm",
  components: {
    DateFrom,
    SelectInput,
    MinMaxInput,
    PaySelectInput,
    CascaderInput,
  },
  props: {
    formModel: {
      type: [Object, Array],
      default: () => {
        return [];
      },
    },
    value: {
      type: Object,
      default: () => {},
    },
  },
  // 定义属性
  data() {
    return {
      limetData: {},
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {
    // value: {
    //   handler(val, oldVal) {
    //     console.log(val, "------1111xx1-------");
    //     this.limetData = { ...this.limetData, ...val };
    //   },
    //   deep: true,
    //   immediate: true,
    // },
    // limetData: {
    //   handler(val, oldVal) {
    //     console.log(val, "------1111xx1-------");
    //     // this.$emit('update:modelValue', val)
    //     this.searchChange(val);
    //   },
    //   deep: true,
    // },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // console.log(this.modelValue, '---ffffff-----')
    // this.limetData = { ...this.value };
  },
  // 方法集合
  methods: {
    clearFun(opt) {
      // 清空表单
      //  this.$emit('update:modelValue', data)
      // this.limetData[opt.prop] = null;
      opt.clearFun && opt.clearFun();
    },
    optionFun(opt) {
      // select option 选项值
      let objAry = [];
      if (typeof opt.option === "function") {
        objAry = opt.option(opt, opt.prop);
      }
      if (Array.isArray(opt.option)) {
        objAry = opt.option;
      }
      return objAry;
    },
    searchBtn() {
      this.$emit("search", { ...this.value });
      this.$emit("update", { ...this.value });
    },
    optDisabled(row, opt) {
      let str = false;
      if (typeof opt.isDisabled === "boolean") {
        str = opt.isDisabled;
      }
      if (typeof opt.isDisabled === "function") {
        str = opt.isDisabled(row, opt);
      }
      return str;
    },
    searchChange(opt = {}) {
      console.log(opt, "---------modelValue ------");
      // const data = this.$gTools.resetQueryFrom(this.modelValue)
      const data = opt;
      // this.$emit('update:modelValue', data)
      this.$emit("change", data);
    },
    setFromData(opt) {
      // 设置数据
      console.log(1, opt, "----------------");
      // this.limetData = { ...this.limetData, ...opt };
      this.$emit("update", { ...this.value });
    },
  }, // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang="scss" scoped>
::v-deep {
  .search-form .el-row {
    padding: 0px 0 !important;
  }
  .el-form-item {
    margin-bottom: 8px;
    margin-right: 21px;
    .el-input__suffix {
      line-height: 26px;
    }
    .el-input__suffix-inner {
      display: inline-block;
    }
  }
}
</style>
