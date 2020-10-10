<template>
  <div class="sign-form">
    <div class="sign-form-head">
      <span class="left">
        <a-icon type="arrow-left" @click="$router.push('/')"></a-icon>
      </span>
      <div class="center">
        <h3 class="title">{{ isLogin ? "登录" : "注册" }}</h3>
      </div>
      <span class="right"></span>
    </div>
    <div class="sign-form-body">
      <div id="signup" v-show="activeTab === 'signup'">
        <a-form-model
          :model="form"
          :rules="rules"
          layout="horizontal"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          ref="form"
        >
          <a-form-model-item label="邮箱" required prop="email">
            <a-input v-model="form.email" placeholder="Email"></a-input>
          </a-form-model-item>
          <a-form-model-item
            label="用户名"
            required
            v-if="!isLogin"
            prop="name"
          >
            <a-input v-model="form.name" placeholder="UserName"></a-input>
          </a-form-model-item>
          <a-form-model-item label="密码" required prop="password">
            <a-input-password v-model="form.password" placeholder="Password" />
          </a-form-model-item>
          <a-form-model-item class="action-wrap">
            <a-button v-show="!isLogin" type="link" @click="viewChange"
              >返回登录</a-button
            >
            <a-button type="primary" @click="onSubmit">确 定</a-button>
            <a-button v-show="isLogin" type="link" @click="viewChange"
              >前往注册</a-button
            >
          </a-form-model-item>
        </a-form-model>
      </div>
      <div id="login" v-show="activeTab === 'login'"></div>
    </div>
  </div>
</template>

<script>
const EMAIL_REG = /^[A-Za-z0-9-_\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
import api from "@/api/index.js";

export default {
  name: "SignForm",
  data() {
    const { type } = this.$route.params || "login";
    return {
      isLogin: type === "login",
      activeTab: "signup",
      tabList: [
        { key: "signup", title: "注册", subTitle: "Sign Up for Free" },
        { key: "login", title: "登录", subTitle: "Welcome Back" }
      ],
      form: {
        email: "",
        name: "",
        password: ""
      },
      rules: {
        email: [{ validator: this.emailValidate }],
        password: [{ validator: this.passwordValidate }]
      }
    };
  },
  methods: {
    onTabChange(key) {
      if (key === this.activeTab) return false;
      this.activeTab = key;
    },
    viewChange() {
      this.isLogin = !this.isLogin;
      this.$refs.form.resetFields();
    },
    emailValidate(rule, value, callback) {
      if (!value) {
        callback(new Error("请输入邮箱"));
      } else if (!EMAIL_REG.test(value)) {
        callback(new Error("请输入订阅邮箱地址"));
      } else {
        callback();
      }
    },
    passwordValidate(rule, value, callback) {
      if (!value) {
        callback(new Error("请确认密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次密码输入不相同"));
      } else {
        callback();
      }
    },
    onSubmit() {
      const baseApi = this.isLogin ? api.login : api.register;
      let params = {
        email: this.form.email,
        password: this.form.password
      };
      if (!this.isLogin) {
        params.name = this.form.name;
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true;
          baseApi(params)
            .then(() => {
              this.loading = false;
              this.$message.success(
                `${this.isLogin ? "登录成功" : "注册成功, 请登录"}`
              );
              if (this.isLogin) {
                this.$router.push('/')
              } else {
                this.viewChange()
              }
              // this.$router.push(this.isLogin ? "/" : {name: 'Sign', params: {type: 'login'}})
            })
            .catch(error => {
              console.error(error);
              this.loading = false;
              this.$message.error(`${this.isLogin ? "登录" : "注册"}失败`);
            });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.sign-form {
  background-color: #ffffff;
  box-shadow: 0px 0px 10px -2px rgba(196, 196, 196, 1);
  border-radius: 4px;
  &-head {
    padding: 10px 10px 0;
    display: flex;
    justify-content: space-between;
    .center {
      flex: 1;
      text-align: center;
    }
  }
  &-body {
    padding: 15px 10px 1px;
    .action-wrap {
      &::v-deep .ant-form-item-children {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
