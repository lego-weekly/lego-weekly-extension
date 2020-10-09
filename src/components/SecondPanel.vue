<template>
  <div class="second-panel">
    <a-tabs class="second-tab-box" default-active-key="1" size="small">
      <a-tab-pane key="1" tab="小报">
        <WeeklyPaper :weeklyList="weeklyList"></WeeklyPaper>
      </a-tab-pane>
      <a-tab-pane key="2" tab="归档">
        <TagCollection :selfTagList="tagList"></TagCollection>
      </a-tab-pane>
      <a-tab-pane key="3" tab="投稿">
        <UploadForm
          v-if="user"
          :user="user"
          :selfTagList="tagList"
        ></UploadForm>
        <NotLogin v-else />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import * as types from "@/store/action-types/popup";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("popup");
import WeeklyPaper from "./WeeklyPaper";
import UploadForm from "./UploadForm";
import TagCollection from "./TagCollection";
import NotLogin from "./NotLogin";

export default {
  name: "SecondPanel",
  components: {
    WeeklyPaper,
    UploadForm,
    TagCollection,
    NotLogin
  },
  computed: {
    ...mapState({
      tagList: state => state.tagList,
      weeklyList: state => state.weeklyList,
      user: state => state.user
    })
  },
  mounted() {
    this.getTagList();
    this.getWeeklyList();
    this.validate();
  },
  methods: {
    ...mapActions({
      validate: types.VALIDATE,
      getTagList: types.SET_TAG_LIST,
      getWeeklyList: types.SET_WEEKLY_LIST
    })
  }
};
</script>

<style lang="scss" scoped>
.second-panel {
  .second-tab-box {
    &::v-deep .ant-tabs-content {
      > .ant-tabs-tabpane {
        padding: 0 !important;
      }
    }
  }
}
</style>
