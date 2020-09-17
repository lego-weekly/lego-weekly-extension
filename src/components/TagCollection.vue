<template>
  <section class="tag-collection-wrap">
    <a-tag :color="tag.bgColor" v-for="tag in tagList" :key="tag.id">{{
      tag.name
    }}</a-tag>
  </section>
</template>

<script>
// import * as types from "@/store/action-types";
export default {
  name: "TagCollection",
  data() {
    return {
      tagList: [
        { id: 13, name: "HTML", bgColor: "#f50" },
        { id: 22, name: "CSS", bgColor: "#2db7f5" },
        { id: 37, name: "JS", bgColor: "#87d068" },
        { id: 43, name: "NodeJS", bgColor: "#108ee9" },
        { id: 33, name: "微前端", bgColor: "#4d0" }
      ]
    };
  },
  mounted() {
    // this.$store.dispatch(types.SET_TAG_LIST);
  }
};
</script>

<style lang="scss" scoped>
.tag-collection-wrap {
  padding: 12px 0 0;
}
</style>
