<template>
  <section class="tag-collection-wrap">
    <a-tag class="tag-item" :color="tag.bgColor" v-for="tag in newTagList" :key="tag.id">
      {{
      tag.name
      }}
    </a-tag>
  </section>
</template>

<script>
import { CustomColor } from "@/constants/tag-color";
export default {
  name: "TagCollection",
  props: {
    tagList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    newTagList() {
      return this.initTagColor();
    }
  },
  methods: {
    initTagColor() {
      const defaultColor = CustomColor;
      return this.tagList.map(tag => {
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
