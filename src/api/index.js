import { genPostReq } from "./http";

const mainAPI = {
  getWeeklyList: genPostReq("/weeks/list"),
  getTagList: genPostReq("/categories/list"),
  getArticleList: genPostReq("/article/list"),
  getUserList: genPostReq("/user/list"),
  addArticle: genPostReq("/article/add")
};

export default {
  ...mainAPI
};
