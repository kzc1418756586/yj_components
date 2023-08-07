<template>
  <div ref="refPageTable" v-loading="loading" class="page-table">
    <div class="table-header">
      <slot name="header"></slot>
    </div>
    <!-- table 主体 -->
    <el-table
      ref="elPageTable"
      :key="'elPageTable_' + tableForm.length"
      :border="true"
      :show-header="showHeader"
      :data="tableData"
      :stripe="true"
      size="mini"
      style="width: 100%"
      :summary-method="summaryMethod"
      :show-summary="showSummary"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="isSelection" fixed type="selection" width="40" :align="'center'" :selectable="selectable" />
      <el-table-column v-if="indexNum" fixed label="序号" type="index" width="60" :align="'center'">
        <div slot-scope="scope">
          <span v-if="isCount && scope.row.countTxt">
            {{ scope.row.countTxt }}
          </span>
          <span v-else>
            {{ ((pageData.page || 1) - 1) * pageData.pageSize + scope.$index + 1 }}
          </span>
        </div>
      </el-table-column>
      <!--  显示列 -->
      <el-table-column
        v-for="(item, index) in tableForm"
        :key="'pt_' + index"
        :label="item.label"
        :prop="item.prop"
        :sortable="item.sortable"
        :align="item.align || colAlign"
        :min-width="item.width"
        :fixed="item.fixed"
      >
        <div slot-scope="scope">
          <span v-if="isCount && scope.row.countTxt" :style="{ ...styleColor(scope.row, item), ...item.style }">
            {{ scope.row[item.prop] }}
          </span>
          <div v-else :style="{ ...styleColor(scope.row, item), ...item.style }" @click="item.fun && item.fun(scope.row, item.prop)" v-html="viewFun(scope.row, item)"></div>
        </div>
      </el-table-column>
      <!--  /显示列 -->
      <!--  操作列 -->
      <el-table-column
        v-if="optBtns && optBtns.btnData && optBtns.btnData.length"
        :label="optBtns.label"
        :min-width="optBtns.width"
        :align="'center'"
        :fixed="optBtns.fixed ? 'right' : false"
      >
        <template slot-scope="scope">
          <div v-if="isCount && scope.row.countTxt"></div>
          <div v-else>
            <template v-for="bnt in optBtns.btnData">
              <span v-if="bnt.isOk" v-show="optShow(scope.row, bnt)" :key="'popoverBnt_' + viewBtnLabel(scope.row, bnt)">
                <el-popconfirm :title="tipsBtnLabel(scope.row, bnt)" @confirm="btnClick(bnt, scope)">
                  <template slot="reference">
                    <el-button type="text" :disabled="optDisabled(scope.row, bnt)" style="margin-right: 5px; margin-left: 5px">
                      {{ viewBtnLabel(scope.row, bnt) }}
                    </el-button>
                  </template>
                </el-popconfirm>
              </span>
              <span v-else v-show="optShow(scope.row, bnt)" :key="'bnts_' + viewBtnLabel(scope.row, bnt)">
                <el-button style="margin-right: 5px; margin-left: 5px" type="text" :disabled="optDisabled(scope.row, bnt)" @click="bnt.fun && btnClick(bnt, scope)">
                  {{ viewBtnLabel(scope.row, bnt) }}
                </el-button>
              </span>
            </template>
          </div>
        </template>
      </el-table-column>
      <!--  /操作列 -->
      <!-- 无数据处理 -->
      <template slot="empty">
        <div class="tableEmpty" v-html="empty"></div>
        <!--  /无数据处理 -->
      </template>
    </el-table>

    <!-- /table 主体 -->
    <div class="table-footer">
      <slot name="footer"></slot>
    </div>
    <!-- 分页 -->
    <div v-if="isPage" class="pagination-page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageData.page"
        :page-sizes="[10, 20, 50, 100, 200]"
        :page-size="pageData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageData.total || 0"
      >
      </el-pagination>
    </div>
    <!-- /分页 -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "PageTable",
  props: {
    isCount: {
      type: Boolean,
      default: false,
    },
    isSelection: {
      type: Boolean,
      default: false,
    },
    isPage: {
      type: Boolean,
      default: true,
    },
    empty: {
      // 无数据展示
      type: String,
      // default:'<span>暂无数据</span>'
      default: "暂无数据",
    },
    // isPop: { // 是否为弹框
    //   type: Boolean,
    //   default: false
    // },
    showHeader: {
      // 是否显示表头
      type: Boolean,
      default: true,
    },
    indexNum: {
      // 是否显示序号
      type: Boolean,
      default: false,
    },
    optBtns: {
      // 操作按钮设置
      type: Object,
      default: () => {
        return {
          btnData: [],
        };
      },
    },
    height: {
      // 为弹框时 必填
      type: [String, Number],
      default: 0,
    },
    summaryMethod: {
      type: Function,
      default: () => {
        return false;
      },
    },
    showSummary: {
      type: Boolean,
      default: false,
    },
    tableData: {
      //  data 数据
      type: [Object, Array],
      default: () => {
        return [];
      },
    },
    tableForm: {
      // 表头以及表格操作方法
      type: [Object, Array],
      default: () => {
        return [];
      },
    },
    pageData: {
      type: Object,
      default: () => {
        return {
          page: 1,
          total: 0,
          pageSize: 10,
        };
      },
    },
  },
  // 定义属性
  data() {
    return {
      loading: false,
      colAlign: "left",
      tableTopHeight: 0,
      tableTopY: 0,
      multipleSelection: [],
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {
    pageHeight: () => {
      return this.isPage ? 78 : 40;
    },
    ...mapGetters({ getWHeight: "wHeight" }),
  },
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // console.log(this.$refs.elPageTable, 'table')
    // console.log(this.$refs.refPageTable.getBoundingClientRect().top,'-----------')
    // this.getTableTopHeight()
    // window.removeEventListener('resize', this.getTableTopHeight, false)
  },
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {
    this.$nextTick(() => {
      this.$refs["elPageTable"].doLayout();
    });
  }, // 生命周期 - 更新之后
  beforeDestroy() {
    window.removeEventListener("resize", this.getTableTopHeight, false);
  }, // 生命周期 - 销毁之前

  destroyed() {}, // 生命周期 - 销毁完成
  activated() {},
  // 方法集合
  methods: {
    handleSelectionChange(val) {
      // 比表格多选框change事件
      this.multipleSelection = val;
      this.$emit("selectionChange", val);
    },
    getTableTopHeight() {
      // 获取表格离上窗沿的高度
      this.tableTopHeight = this.$refs.refPageTable.getBoundingClientRect().top;
      // this.tableTopY = this.getWHeight - this.tableTopHeight - 58

      // console.log(this.$refs.refPageTable.getBoundingClientRect().top,'-----------')
    },
    styleColor(row, opt) {
      // 处理颜色
      let str = "";
      if (typeof opt.color === "function") {
        str = opt.color(row, opt.prop);
      }
      if (typeof opt.color === "string") {
        str = opt.color;
      }
      return { color: str };
    },
    viewFun(row, opt) {
      // 处理显示 filter
      let str = "";
      if (opt.filter) {
        str = opt.filter(row, opt.prop);
      } else {
        str = row[opt.prop];
      }
      return str;
    },
    viewBtnLabel(row, opt) {
      let str = "";
      if (typeof opt.label === "string") {
        str = opt.label;
      }
      if (typeof opt.label === "function") {
        str = opt.label(row);
      }
      return str;
    },
    optShow(row, opt) {
      let str = true;
      if (typeof opt.isShow === "boolean") {
        str = opt.isShow;
      }
      if (typeof opt.isShow === "function") {
        str = opt.isShow(row, opt);
      }
      return str;
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
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.$emit("chanePage", 1, val);
      // console.log(this.pageData,'------ handleSizeChange -------' )
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.$emit("chanePage", val, this.pageData.pageSize);
      // console.log(this.pageData,'------ handleSizeChange -------' )
    },
    tipsBtnLabel(row, opt, txt = "此操作将永久删除该条数据,是否继续?") {
      let str = txt;
      if (typeof opt.tipsTxt === "string") {
        str = opt.tipsTxt;
      }
      if (typeof opt.tipsTxt === "function") {
        str = opt.tipsTxt(row);
      }
      return str;
    },
    btnClick(opt, scope) {
      if (opt.isOk) {
        opt.fun && opt.fun(scope.row, scope.$index);
        return;
      }
      if (opt.alert) {
        this.$confirm(this.tipsBtnLabel() + "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            opt.fun && opt.fun(scope.row, scope.$index);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
        return;
      }
      opt.fun && opt.fun(scope.row, scope.$index);
    },
    selectable(row, index) {
      return !row.countTxt;
    },
  }, // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang="scss" scoped>
.page-table {
  width: 100%;
  overflow: hidden;
  .table-header {
    margin-bottom: 12px;
  }
  .el-table {
    color: #000;
  }
  :deep(.el-table) {
    th {
      color: #000;
      // padding: 8px 0;
      height: 40px;
      background: #fafafa;
    }
    td {
      padding: 4px 0;
    }
    .el-button--text {
      padding: 8px 0px;
    }
  }

  .pagination-page {
    width: 100%;
    min-height: 38px;
    text-align: right;
    overflow: hidden;

    :v-deep() {
      .el-pagination {
        padding: 8px 5px 0 5px;
        .el-icon {
          display: inline-block;
        }
        .el-pagination__total,
        .el-pagination__jump {
          color: #000;
        }
      }
    }
  }
}
</style>
