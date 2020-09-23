<template>
  <div class="fe-weekly-popup">
    <a-tabs class="popup-tab-box" type="card" default-active-key="2">
      <a-tab-pane key="1">
        <span slot="tab">
          <a-icon type="fire" />常用推荐
        </span>
        Content of Tab Pane 1
      </a-tab-pane>
      <a-tab-pane key="2">
        <span slot="tab">
          <a-icon type="bank" />前端学院
        </span>
        <SecondPanel></SecondPanel>
      </a-tab-pane>
      <a-tab-pane key="3">
        <span slot="tab">
          <a-icon type="book" />前端文档
        </span>
        Content of Tab Pane 3
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
export default {
  name: "App",
}
</script>
<style lang="scss">
html,
body {
  height: auto !important;
}
.fe-weekly-popup {
  overflow: hidden;
  box-sizing: border-box;
  width: 360px;
  .popup-tab-box {
    box-shadow: 0px 0px 10px -2px rgba(196, 196, 196, 1);
    &::v-deep .ant-tabs-content {
      > .ant-tabs-tabpane {
        background-color: #fff;
        padding: 0 16px;
      }
    }
    &::v-deep .ant-tabs-bar {
      border-color: #fff;
      margin-bottom: 0;
      .ant-tabs-tab {
        border-color: transparent;
        background: transparent;
      }
      .ant-tabs-tab-active {
        border-color: #fff;
        background: #fff;
      }
    }
  }
}
</style>