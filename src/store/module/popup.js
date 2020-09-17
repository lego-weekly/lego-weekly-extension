import * as types from "../action-types/popup";
import api from "@/api";

const state = {
  userList: [],
  tagList: [],
  weeklyList: []
};
const mutations = {
  [types.SET_USER_LIST](state, payload) {
    state.userList = [...payload];
  },
  [types.SET_TAG_LIST](state, payload) {
    console.log("payload", payload);
    state.tagList = [...payload];
  },
  [types.SET_WEEKLY_LIST](state, payload) {
    state.weeklyList = [...payload];
  }
};
const actions = {
  async [types.SET_USER_LIST]({ commit }, payload) {
    const userList = await api.getUserList(payload);
    commit(types.SET_USER_LIST, userList);
  },
  async [types.SET_TAG_LIST]({ commit }, payload) {
    const tagList = await api.getTagList(payload);
    commit(types.SET_TAG_LIST, tagList);
  },
  async [types.SET_WEEKLY_LIST]({ commit }, payload) {
    const weeklyList = await api.getWeeklyList(payload);
    commit(types.SET_WEEKLY_LIST, weeklyList);
  }
};
const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
