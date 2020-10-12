<template>
  <div class="upload-form-wrap">
    <a-form :model="formData" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="文章标题" required>
        <a-input v-model="formData.title" />
      </a-form-item>
      <a-form-item label="推荐理由" required>
        <a-textarea
          v-model="formData.description"
          placeholder="Basic usage"
          :rows="3"
        />
      </a-form-item>
      <a-form-item label="投稿人" required>
        <a-row>
          <a-col :span="12">
            <span class="username">{{ user.name }}</span>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="设置分类" required>
        <a-row type="flex" justify="space-between">
          <a-col :span="12">
            <a-cascader
              v-model="formData.tag"
              :field-names="{
                label: 'name',
                value: 'id',
                children: 'children'
              }"
              :options="tagOptions"
              :display-render="displayRender"
              expand-trigger="hover"
              change-on-select
            />
          </a-col>
          <a-col>
            <a-button type="primary" :disabled="!canSubmit" @click="onSubmit"
              >投稿</a-button
            >
          </a-col>
        </a-row>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import * as types from "@/store/action-types/popup";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("popup");
import api from "@/api";

export default {
  name: "UploadForm",
  props: {
    user: {
      type: Object,
      default() {
        return {};
      }
    },
    selfTagList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      formData: {
        title: "",
        description: "",
        link: "",
        tag: []
      }
    };
  },
  computed: {
    tagOptions() {
      return this.initTreeData(this.selfTagList);
    },
    canSubmit() {
      const { title, description, link, tag } = this.formData;
      return title && description && link && tag.length;
    }
  },
  mounted() {
    this.autoFetch();
    this.getTagList();
    this.getUserList();
    console.log("user", this.user);
  },
  methods: {
    ...mapActions({
      getTagList: types.SET_TAG_LIST,
      getUserList: types.SET_USER_LIST
    }),
    initTreeData(list) {
      let tagMap = {};
      list.forEach(item => {
        if (!item.parentId) {
          tagMap[item.id] = {
            ...item,
            children: []
          };
        } else {
          if (tagMap[item.parentId]) {
            tagMap[item.parentId]["children"].push(item);
          }
        }
      });
      return Object.values(tagMap);
    },
    displayRender({ labels }) {
      return labels[labels.length - 1];
    },
    autoFetch() {
      let host = this;
      // 获取当前窗口 id
      // eslint-disable-next-line no-undef
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true
        },
        function(tabs) {
          let tabId = tabs.length ? tabs[0].id : null;
          // 向当前页面动态注入 JavaScript 脚本
          // chrome.tabs.executeScript(tabId, {code: 'document.body.style.backgroundColor="red"'});
          // eslint-disable-next-line no-undef
          chrome.tabs.executeScript(
            tabId || null,
            {
              file: "./js/crawl.js"
            },
            function(_) {
              // 向目标网页进行通信，向 crawl.js 发送一个消息
              // eslint-disable-next-line no-undef
              let e = chrome.runtime.lastError;
              if (e !== undefined) {
                console.log(tabId, _, e);
              }
              chrome.tabs.sendMessage(
                tabId,
                {
                  message: "GET_TOPIC_INFO"
                },
                function(response) {
                  if (!window.chrome.runtime.lastError) {
                    if (!response) return false;
                    // 获取到返回的文章 title 、url、description
                    host.formData.title = response.title;
                    host.formData.link = response.link;
                    host.formData.description = response.description;
                  }
                  // if (!response) return false;
                  // // 获取到返回的文章 title 、url、description
                  // host.formData.title = response.title;
                  // host.formData.link = response.link;
                  // host.formData.description = response.description;
                }
              );
            }
          );
        }
      );
    },
    async onSubmit() {
      const articleData = { ...this.formData, tag: this.formData.tag[1] };
      try {
        await api.addArticle(articleData);
        this.$message.success("投稿成功！");
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.upload-form-wrap {
  // height: 100%;
  padding: 12px 0 0;
  // box-sizing: border-box;
  &::v-deep .ant-form-item {
    margin-bottom: 14px;
  }
  .username {
    margin-left: 5px;
  }
}
</style>
