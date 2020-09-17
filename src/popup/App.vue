<template>
  <div class="fe-weekly-popup">
    <a-tabs class="popup-tab-box" type="card" default-active-key="1">
      <a-tab-pane key="1" tab="常用推荐">Content of Tab Pane 1</a-tab-pane>
      <a-tab-pane key="2" tab="前端学院" force-render>
        <SecondPanel></SecondPanel>
      </a-tab-pane>
      <a-tab-pane key="3" tab="前端文档">Content of Tab Pane 3</a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import SecondPanel from "@/components/SecondPanel";
import axios from "axios";

export default {
  name: "App",
  components: { SecondPanel },
  data() {
    return {
      recommend: []
    };
  },
  mounted() {
    //this.getData();
  },
  methods: {
    getData() {
      axios
        .get("https://icanhazdadjoke.com/", {
          headers: { Accept: "application/json" }
        })
        .then(res => {
          this.joke = res.data.joke;
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="scss">
html, body{
  height: auto !important;
}
</style>

<style lang="scss" scoped>
.fe-weekly-popup {
  background: #f5f5f5;
  overflow: hidden;
  box-sizing: border-box;
  padding: 8px;
  width: 360px;
  .popup-tab-box {
    box-shadow: 0px 0px 10px -2px rgba(196,196,196,1);
    &::v-deep .ant-tabs-content {
      .ant-tabs-tabpane {
        background: #fff;
        padding: 0 12px 12px;
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
