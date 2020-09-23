import { genPostReq } from "./http";

const loginApi = {
  login: (params) => {
    // return Promise.resolve({
    //   data: {
    //     msg: 'success',
    //     params,
    //   }
    // })
    return genPostReq("/auth/login")(params)
  },
  register: (params) => {
    return genPostReq("/auth/register")(params)
  },
}

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
