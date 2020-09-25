<template>
  <div class="login">
    <a-spin :spinning="loading">
      <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
      <h2 class="text-center">{{ login ? "前端小报系统" : "注册账号" }}</h2>
      <a-form-model :model="form" :rules="rules" ref="form">
        <a-form-model-item
          v-if="!login"
          prop="name"
          :rules="[{ required: true, message: '请输入用户名称' }]"
        >
          <a-input v-model="form.name" placeholder="用于展示投稿人">
            <a-icon slot="prefix" type="user" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item prop="email">
          <a-input v-model="form.email" placeholder="小报定时推送的邮箱地址">
            <a-icon slot="prefix" type="mail" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item prop="password">
          <a-input
            v-model="form.password"
            :type="pwdVisible ? 'text' : 'password'"
            placeholder="输入密码"
          >
            <a-icon slot="prefix" type="lock" />
            <a-icon
              v-if="login"
              slot="suffix"
              :type="pwdVisible ? 'eye-invisible' : 'eye'"
              @click="pwdVisible = !pwdVisible"
            />
          </a-input>
        </a-form-model-item>
        <a-form-model-item
          v-if="!login"
          prop="rePassword"
          :rules="[{ validator: this.rePasswordValidate }]"
        >
          <a-input
            v-model="form.rePassword"
            type="password"
            placeholder="确认密码"
          >
            <a-icon slot="prefix" type="lock" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <div class="text-center" v-if="login">
            <a-button
              type="primary"
              @click="handleConfirm"
              :disabled="disabled"
              @keyup.enter.native="handleConfirm"
            >
              Log in
            </a-button>
            <a-button type="link" @click="goRegister">
              暂无账号？前往注册
            </a-button>
          </div>
          <div class="text-center" v-else>
            <a-button
              type="primary"
              @click="handleConfirm"
              :disabled="disabled"
              @keyup.enter.native="handleConfirm"
            >
              Register
            </a-button>
            <a-button style="margin-left:20px" @click="goLogin">
              Cancel
            </a-button>
          </div>
        </a-form-model-item>
      </a-form-model>
    </a-spin>
  </div>
</template>

<script>
const EMAIL_REG = /^[a-zA-Z0-9]+@cloudglab.com$/;
import api from "@/api/index.js";

export default {
  name: "Login",
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        rePassword: "",
      },
      rules: {
        email: [{ validator: this.emailValidate }],
        password: [{ required: true, message: "请输入密码"}],
      },
      login: true,
      pwdVisible: false,
      loading: false,
    };
  },
  computed: {
    disabled() {
      const { email, password, rePassword } = this.form;
      return this.login
        ? !email || !password
        : !email || !password || !rePassword;
    },
  },
  methods: {
    goRegister() {
      this.$refs.form.resetFields();
      this.login = false;
    },
    goLogin() {
      this.$refs.form.resetFields();
      this.login = true;
    },
    handleConfirm() {
      const baseApi = this.login ? api.login : api.register;
      const params = this.login
        ? {
            email: this.form.email,
            password: this.form.password,
          }
        : {
            name: this.form.name,
            email: this.form.email,
            password: this.form.password,
          };
      const sucMsg = this.login ? '登陆成功' : '注册成功'
      const errMsg = this.login ? '登陆失败' : '注册失败'
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          baseApi(params)
            .then(() => {
              this.loading = false;
              this.$message.success(sucMsg)
              this.$router.push("/home");
            })
            .catch(() => {
              this.loading = false;
              this.$message.error(errMsg)
            });
        }
      });
    },
    emailValidate(rule, value, callback) {
      if (!value) {
        callback(new Error("请输入邮箱"));
      } else if (!EMAIL_REG.test(value)) {
        callback(new Error("请输入cloudglab邮箱地址"));
      } else {
        callback();
      }
    },
    rePasswordValidate(rule, value, callback) {
      if (!value) {
        callback(new Error("请确认密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次密码输入不相同"));
      } else {
        callback();
      }
    },
  },
};
</script>
