<!--
 * @Author: owen
 * @Date: 2022-04-07 10:51:44
 * @LastEditors: owen
 * @LastEditTime: 2022-04-09 13:39:56
 * @FilePath: \app-pcweb\src\views\user\accountInfo\index.vue
-->
<template>
  <div class="restriction">
    <div class="main">
      <!-- <img class="img_403" src="@/assets/img/403.png" alt="" /> -->
      <div class="qus">访问受到限制</div>
      <div>IP所在地区不在我们的服务范围内，造成困扰，非常抱歉！</div>
      <div class="qus">Acesso restrito</div>
      <div>O IP está localizado fora da cobertura de serviço. Sentimos muito por qualquer inconveniência.</div>
      <div class="qus">imited access</div>
      <div>The region to which the IP belongs is not within our service scope, sorry for the inconvenience.</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Restriction",
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.restriction {
  min-height: 100%;
  // background: $error_background;
  // color: $error_color_chage;
  .main {
    min-width: 375px;
    max-width: 750px;
    padding: 100px 15px 0;
    margin: 0 auto;
    .img_403 {
      display: block;
      width: 100%;
      max-width: 374px;
      margin: 0 auto;
    }
    .qus {
      // color: $error_card_title;
      margin: 50px 0 5px;
    }
  }
}
</style>
