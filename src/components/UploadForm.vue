<template>
  <div class="upload-form-wrap">
    <a-form :model="formData" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="文章标题">
        <a-input v-model="formData.title" />
      </a-form-item>
      <a-form-item label="推荐理由">
        <a-textarea
          v-model="formData.description"
          placeholder="Basic usage"
          :rows="3"
        />
      </a-form-item>
      <a-form-item label="投稿人">
        <a-row>
          <a-col :span="12">
            <a-select v-model="formData.user">
              <a-select-option
                v-for="user in userList"
                :key="user.id"
                :value="user.id"
                >{{ user.name }}</a-select-option
              >
            </a-select>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="设置分类">
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
              change-on-select
            />
          </a-col>
          <a-col>
            <a-button type="primary" @click="onSubmit">投稿</a-button>
          </a-col>
        </a-row>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import * as types from "@/store/action-types/popup";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("popup");
import api from "@/api";

export default {
  name: "UploadForm",
  props: {
    tagList: {
      type: Array,
      default () {
        return []
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
        user: "",
        tag: []
      }
    };
  },
  computed: {
    ...mapState({
      tagList: state => state.tagList,
      userList: state => state.userList
    }),
    tagOptions() {
      return this.initTreeData(this.tagList);
    }
  },
  mounted() {
    this.autoFetch();
    this.getTagList();
    this.getUserList();
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
            function() {
              // 向目标网页进行通信，向 crawl.js 发送一个消息
              // eslint-disable-next-line no-undef
              chrome.tabs.sendMessage(
                tabId,
                {
                  message: "GET_TOPIC_INFO"
                },
                function(response) {
                  if (!response) return false;
                  // 获取到返回的文章 title 、url、description
                  host.formData.title = response.title;
                  host.formData.link = response.link;
                  host.formData.description = response.description;
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
}
</style>
