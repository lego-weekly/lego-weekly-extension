<template>
  <section class="weekly-paper-wrap">
    <a-row type="flex" justify="space-between">
      <a-col :span="7" v-for="item in weeklyList" :key="item.id">
        <div class="card">
          <div class="card-avatar">
            <img alt="example" :src="item.image"
            />
          </div>
          <div class="card-meta">
            <span>{{ `第 ${item.week} 期` }}</span>
          </div>
        </div>
      </a-col>
    </a-row>
  </section>
</template>

<script>
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
};
</script>

<style lang="scss" scoped>
.weekly-paper-wrap {
  padding-top: 12px;
  height: 420px;
  overflow-y: auto;
  .card {
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
    &:hover{
      box-shadow: 0 2px 0 rgba(171, 171, 171, 0.2);
    }
  }
}
</style>
