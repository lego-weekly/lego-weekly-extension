<template>
  <section class="weekly-paper-wrap">
    <a-row :gutter="12">
      <a-col :span="8" v-for="item in weeklyList" :key="item.id">
        <div class="card">
          <div class="card-avatar">
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          </div>
          <div class="card-meta">
            <span>{{ item.name }}</span>
          </div>
        </div>
      </a-col>
    </a-row>
  </section>
</template>

<script>
// import * as types from "@/store/action-types";
export default {
  name: "WeeklyPaper",
  data() {
    return {
      weeklyList: [
        { id: 42, name: "第8期" },
        { id: 43, name: "第7期" },
        { id: 16, name: "第6期" },
        { id: 23, name: "第5期" },
        { id: 32, name: "第4期" },
        { id: 19, name: "第3期" },
        { id: 40, name: "第2期" },
        { id: 33, name: "第1期" }
      ]
    };
  },
  mounted() {
    console.log(this.$store);
    // this.$store.dispatch(types.SET_WEEKLY_LIST);
  }
};
</script>

<style lang="scss" scoped>
.weekly-paper-wrap {
  // height: 100%;
  padding: 12px 0 0;
  .card {
    margin-bottom: 10px;
    cursor: pointer;
    &-avatar {
      // border: 1px solid red;
      padding: 4px;
      box-sizing: border-box;
      img {
        width: 100%;
      }
    }
    &-meta {
      text-align: center;
    }
  }
}
</style>
