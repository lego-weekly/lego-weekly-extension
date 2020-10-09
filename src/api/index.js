import { genPostReq } from "./http";

const loginApi = {
  login: params => {
    return genPostReq("/auth/login")(params).then(res => {
      window.localStorage.setItem("token", res.data.token);
      return res;
    });
  },
  register: params => {
    return genPostReq("/auth/register")(params);
  },
  validate: params => {
    return genPostReq("/auth/validate")(params);
  }
};

const mainAPI = {
  getWeeklyList: genPostReq("/weeks/list"),
  getTagList: genPostReq("/categories/list"),
  getArticleList: genPostReq("/article/list"),
  getUserList: genPostReq("/user/list"),
  addArticle: genPostReq("/article/add")
};

export default {
  ...loginApi,
  ...mainAPI
};
