<template>
  <div class="not-login-wrap">
    <a-alert
      description="为方便统计投稿信息，请先登录或注册账号！"
      type="warning"
    />
    <div class="action-wrap">
      <a-button type="primary" @click="jumpToSign('login')">登录</a-button>
      <div>
        未有账号?
        <a-button class="text-btn" type="link" @click="jumpToSign('register')"
          >前往注册</a-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotLogin",
  methods: {
    jumpToSign(type) {
      this.$router.push({
        name: "Sign",
        params: { type }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.not-login-wrap {
  padding: 10px 0;
  .action-wrap {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    .text-btn {
      padding: 0;
    }
  }
}
</style>
