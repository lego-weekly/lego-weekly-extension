<template>
  <section class="tag-collection-wrap">
    <a-tag
      class="tag-item"
      :color="tag.bgColor"
      v-for="tag in newTagList"
      :key="tag.id"
    >
      <a :href="`${baseHost}/detail/${tag.name}`" target="_black">{{
        tag.name
      }}</a>
    </a-tag>
  </section>
</template>

<script>
import { CustomColor } from "@/constants/tag-color";
import config from "@/config";

export default {
  name: "TagCollection",
  props: {
    selfTagList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      baseHost: config.baseHOST
    };
  },
  computed: {
    newTagList() {
      return this.initTagColor();
    }
  },
  methods: {
    initTagColor() {
      const defaultColor = CustomColor;
      return this.selfTagList.map(tag => {
        const idx = parseInt(Math.random() * defaultColor.length);
        return {
          ...tag,
          bgColor: defaultColor[idx]
        };
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.tag-collection-wrap {
  padding: 12px 0 0;
  .tag-item {
    margin-bottom: 8px;
    cursor: pointer;
  }
}
</style>
