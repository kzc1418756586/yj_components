<template>
  <div class="white-box" v-loading="loading">
    <el-dialog class="emaiDetail" :title="title" :top="'20vh'" :visible.sync="open" :close-on-click-modal="false" :show-close="false" :width="popFullscreen ? '90%' : '600px'">
      <template slot="title">
        <div class="title-box">
          <span v-if="title">&nbsp;{{ title }}&nbsp;</span>
        </div>
      </template>
      <div class="content">
        <div class="cur_content">{{ current }}</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { webResource } from "@/api/home";
export default {
  name: "white",
  data() {
    return {
      loading: true,
      open: false,
      current: null,
      title: this.$t("notice.title"),
    };
  },
  computed: {
    lang() {
      return this.$store.getters.getLang;
    },
    popFullscreen() {
      return this.$store.getters.getFullscreen;
    },
    getPacketConfig() {
      return this.$store.getters.getPacketConfig;
    },
  },
  created() {
    this.$isPopShow({ show: false });
    this.WebResource(this.getPacketConfig);
  },
  watch: {
    getPacketConfig: {
      handler(val, oldVal) {
        // 特别注意，不能用箭头函数，箭头函数，this指向全局
        this.WebResource(val);
      },
      immediate: true, // 刷新加载 立马触发一次handler
      deep: true,
    },
  },
  methods: {
    WebResource(val) {
      if (val) {
        if (val.maintain) {
          if (val?.maintain[0]) {
            this.current = val?.maintain?.lang[this.lang];
            this.open = true;
          }
          return;
        } else {
          this.$router.push("/home");
        }
      }
    },
    async getWebResource() {
      const res = await webResource();
      console.log(res, "---------getWebResource-------");
      this.WebResource(res);
    },
  },
};
</script>

<style lang="scss" scoped></style>
