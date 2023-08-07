<template>
  <el-dropdown @command="handleCommand">
    <span class="avatar-dropdown">
      <el-avatar class="user-avatar" :src="avatar">{{ username }}</el-avatar>
      <div class="user-name">
        {{ username }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
    </span>

    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapGetters } from "vuex";
import { recordRoute } from "@/config";

export default {
  name: "VabAvatar",
  computed: {
    ...mapGetters({
      avatar: "user/avatar",
      username: "user/username",
    }),
  },
  methods: {
    handleCommand(command) {
      this[command]();
    },
    personalCenter() {
      this.$router.push("/personalCenter/personalCenter");
    },
    logout() {
      this.$confirm("您确定要退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          if (recordRoute) {
            await this.$store.dispatch("user/logout");
            const fullPath = this.$route.fullPath;
            this.$router.push(`/login?redirect=${fullPath}`);
          } else {
            this.$router.push("/login");
          }
        })
        .catch(() => {
          //
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.avatar-dropdown {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
  height: 50px;
  padding: 0;

  .user-avatar {
    width: 40px;
    height: 40px;
    cursor: pointer;
    border-radius: 50%;
  }

  .user-name {
    position: relative;
    margin-left: 5px;
    margin-left: 5px;
    cursor: pointer;
  }
}
</style>
