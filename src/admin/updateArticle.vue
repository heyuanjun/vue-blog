<template>
  <div class="publish">
    <div class="container">
      <h2>
        <i class="iconfont icon-wenzhang"></i> 文章内容编辑与发表
      </h2>
      <p>
        <i class="iconfont icon-lianjie"></i> 文章标题:
      </p>
      <Input v-model="articleData.title"
          style="width:80%"
          placeholder="请输入文章标题..."/>
      <p>
        <img v-show="articleData.article_img"
            :src="articleData.article_img"
            alt="笔记中的图片"/>
      </p>
      <Upload :action="baseURL"
          :on-success="handleSuccess">
        <!-- codelei.cn/api为你的后台地址 -->
        <Button icon="ios-cloud-upload-outline">选择文章封面图片</Button>
      </Upload>
      <p>
        <i class="iconfont icon-lianjie"></i> 文章简介:
      </p>
      <Input
          v-model="articleData.article_brief"
          style="width:80%"
          type="textarea"
          :rows="4"
          placeholder="请输入文章简介..."
      />
      <p>
        <i class="iconfont icon-lianjie"></i> 文章主体内容:
      </p>
      <Input
          v-model="articleData.content"
          style="width:80%"
          type="textarea"
          :rows="16"
          placeholder="请输入文章主体内容..."
      />
      <p>
        <i class="iconfont icon-lianjie"></i> 文章标签:
      </p>
      <Input v-model="articleData.lable"
          style="width:200px"
          placeholder="文章标签"/>
      <p>
        <i class="iconfont icon-lianjie"></i> 文章分类:
      </p>
      <Input v-model="articleData.article_category"
          style="width:200px"
          placeholder="文章分类"/>
      <div class="event-Button">
        <Button @click.native="handlePublish"
            type="primary">修改
        </Button>
        <Button @click.native="handleCancel">取消</Button>
      </div>
    </div>
  </div>
</template>

<script>
import {HttpRequest} from "@/components/NetWork/request";

export default {
  name: "articlePublish",
  created() {
    const id = this.$route.params.id;
    HttpRequest(`/admin/articles/${id}/detail`).then((res) => {
      if (res.data) {
        this.articleData = res.data;
        this.$Message.success("文章信息提取完成!");
      } else {
        this.$Message.error(res.data.message);
      }
    });
  },
  data() {
    return {
      articleData: {},
    };
  },
  computed: {
    baseURL() {
      return `${this.$store.state.baseURL}/upload/imageUpload`;
    },
  },
  methods: {
    handleSuccess(res) {
      this.articleData.article_img = res.url;
    },
    handlePublish() {
      let _article = this.articleData;
      if (!(_article.article_img && _article.content && _article.title && _article.article_brief && _article.lable)
      ) {
        return this.$Message.error("请输入完整的文章信息!");
      }

      HttpRequest("/note/editorArticle", this.articleData).then((res) => {
        if (res.data.err == 0) {
          this.$Message.success(res.data.message);
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
    handleCancel() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss">
.publish {
  .container {
    position: relative;
    z-index: 99;
    display: flex;
    justify-content: space-around;
    flex-direction: column;

    img {
      width: 400px;
      height: 300px;
    }

    p {
      color: #333;
      margin: 1rem 0;
      font-weight: bold;
    }

    .event-Button {
      margin-top: 1rem;

      button {
        margin-right: 1rem;
      }
    }
  }
}
</style>
