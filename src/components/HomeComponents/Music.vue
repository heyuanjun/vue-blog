<template>
  <div id="music_container">
    <p><Icon type="ios-musical-notes" /> 音乐。</p>
    <span class="introduce">听歌。</span>
    <iframe
      frameborder="no"
      border="0"
      marginwidth="0"
      marginheight="0"
      class="musicBox"
      :src="music_link"
    ></iframe>
    <i @click="getMusic(--music_index)" class="prev_Button iconfont icon-icon-arrow-left2"></i>
    <i @click="getMusic(++music_index)" class="next_Button iconfont icon-icon-arrow-right2"></i>
  </div>
</template>

<script>
import {HttpRequest} from "@/request/api";

export default {
  name: "music",
  data() {
    return {
      music_link: "",
      music_index: 1
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getMusic(this.music_index);
    });
  },

  methods: {
    getMusic(id) {
      HttpRequest(`/api/music/${id}`).then(res => {
        if (res) {
          this.music_link = `//music.163.com/outchain/player?type=2&id=${res.music_id}&auto=0&height=66`;
          this.music_index = res.id;
        } else {
          this.$Message.error("网络出错了稍后重试吧!");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#music_container {
  width: 100%;
  margin-bottom: 1rem;
  background: #fff;
  padding:.5rem;
  border: 1px solid #ccc;
  position: relative;
  font-size: 13px;
  border-radius: 8px!important;
  border-bottom-left-radius: 0!important;
  border-bottom-right-radius: 0!important;
  p {
      font-size: 14px;
      padding:0.5rem;
      border-bottom:1.5px solid lightseagreen;
  }
  .musicBox {
    height: 7.2rem;
    width: 100%;
    border-radius: 8px;
  }
  .introduce {
    display: inline-block;
    padding: 1rem 0;
  }
  i.prev_Button,i.next_Button {
    font-size: 1rem;
    margin: 0 0.5rem;
    position: absolute;
    bottom: 0.5rem;
    color: #333;
    cursor: pointer;
    font-weight: bold;
  }
  .prev_Button {
    left: 40%;
  }
  .next_Button {
    right: 40%;
  }
}
i:hover {
  color: red !important;
}
</style>
