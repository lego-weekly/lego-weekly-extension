<template>
  <div class="second-panel">
    <a-tabs default-active-key="1" size="small">
      <a-tab-pane key="1" tab="小报">
        <WeeklyPaper></WeeklyPaper>
      </a-tab-pane>
      <a-tab-pane key="2" tab="归档">
        <TagCollection></TagCollection>
      </a-tab-pane>
      <a-tab-pane key="3" tab="投稿">
        <UploadForm></UploadForm>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import WeeklyPaper from "./WeeklyPaper";
import UploadForm from "./UploadForm";
import TagCollection from "./TagCollection";
export default {
  name: "SecondPanel",
  components: {
    WeeklyPaper,
    UploadForm,
    TagCollection
  }
};
</script>

<style lang="scss" scoped>
.second-panel {
  box-sizing: border-box;
  // padding: 0px 12px 0;
  // height: 100%;
  // border: 1px solid crimson;
  // &::v-deep .ant-tabs {
  //   height: 100%;
  //   display: flex;
  //   flex-direction: column;
  //   &-bar {
  //     flex: 0;
  //   }
  //   &-top-content {
  //     flex: 1;
  //     border: 1px solid blueviolet;
  //     // overflow-y: scroll;
  //   }
  // }
}
</style>
