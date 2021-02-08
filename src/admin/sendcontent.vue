<template>
  <div class="send_content">
    <h2>上传照片到相册</h2>
    <!-- 内容 -->
    <Input
        v-model="content"
        maxlength="300"
        show-word-limit
        type="textarea"
        placeholder="输入图片描述..."
        style="width: 500px;"
    />
    <!-- 图片上传 -->
    <p>
      <img v-show="filepath"
          :src="filepath"
          alt="说说图片"/>
    </p>
    <Upload :action="uploadUrl"
        :on-success="handleSuccess">
      <Button icon="ios-cloud-upload-outline">选择图片</Button>
    </Upload>
    <Button @click.native="sendTalk"
        type="primary">发表说说
    </Button>
  </div>
</template>

<script>
import {HttpRequest} from "@/request/api";

export default {
  name: "sendcontent",
  data() {
    return {
      content: "",
      filepath: ""
    };
  },
  computed: {
    uploadUrl() {
      return `${this.$store.state.baseURL}/admin/photos/upload`;
    },
  },
  methods: {
    handleSuccess(res) {
      console.log(res)
      this.filepath = res.filepath;
    },
    sendTalk() {
      if (this.filepath && this.content) {
        const params = {
          contents: this.content,
          imgsrc: this.filepath,
        }
        HttpRequest('/admin/photos/write', params, 'post').then((res) => {
          console.log(res)
          if (res.data) {
            this.$Message.success(res.statusText)
            location.reload()
          } else {
            this.$Message.error(res.statusText)
          }
        });
      } else {
        this.$Message.error("内容不能为空!");
      }
    },
  },
};
</script>

<style lang="scss"
    scoped>
.send_content {
  padding-top: 5rem;
  position: relative;
  z-index: 5;

  button {
    margin-top: 1rem;
  }

  img {
    margin-top: 2rem;
    width: 200px;
    height: 200px;
  }
}
</style>
