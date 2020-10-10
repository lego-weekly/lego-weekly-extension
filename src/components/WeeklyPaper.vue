<template>
  <section class="weekly-paper-wrap">
    <a-row :gutter="16" v-if="weeklyList && weeklyList.length">
      <a-col :span="8" v-for="item in weeklyList" :key="item.id">
        <a class="card" :href="`${baseHost}/detail/${item.id}`" target="_black">
          <div class="card-avatar">
            <img alt="example" :src="item.image" />
          </div>
          <div class="card-meta">
            <span>{{ `第 ${item.week} 期` }}</span>
          </div>
        </a>
      </a-col>
    </a-row>
    <a-alert
      v-else
      showIcon
      description="每周五汇总成小报，期待你的投稿！"
      type="info"
    />
  </section>
</template>

<script>
import config from "@/config";
export default {
  name: "WeeklyPaper",
  props: {
    weeklyList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data () {
    return {
      baseHost: config.baseHOST
    }
  }
};
</script>

<style lang="scss" scoped>
.weekly-paper-wrap {
  padding: 12px 0;
  max-height: 420px;
  overflow-y: auto;
  .card {
    display: block;
    margin-bottom: 10px;
    // box-shadow: 0 2px 0 hsla(0,0%,67%,.1);
    cursor: pointer;
    background: #fff;
    border-radius: 4px;
    border: 1px solid #efefef;
    &-avatar {
      padding: 3px;
      box-sizing: border-box;
      img {
        width: 100%;
        height: 62px;
      }
    }
    &-meta {
      text-align: center;
      line-height: 22px;
    }
    &:hover {
      box-shadow: 0 2px 0 rgba(171, 171, 171, 0.2);
    }
  }
}
</style>
