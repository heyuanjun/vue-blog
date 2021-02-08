<template>
  <div id="tabbarLink">
    <a v-for="(item, index) in LinkList" :key="index" @click="triggerPage(item.path)" ref="navigators">
      <Icon :type="item.imageURL" /> {{item.name}}
    </a>
  </div>
</template>

<script>
 export default {
    name:'tablink',
    data () {
      return {
        LinkList: [
          {
            name: "HOME",
            imageURL: "md-home",
            path: '/'},
          {
            name: "简记",
            imageURL: 'ios-bookmarks-outline',
            path: '/article'
          },
          {
            name: "时光轴",
            imageURL: 'md-images',
            path: '/photos'
          },
          {
            name: "留言板",
            imageURL: 'ios-create',
            path: '/message'
          },
        ]
      };
    },
    mounted(){
      if(localStorage.getItem('username')) {
        this.$refs.navigators[this.$refs.navigators.length-1].innerHTML
         = this.$refs.navigators[this.$refs.navigators.length-1].innerHTML.replace('登陆 / 注册', '已登录')
      }
    },
    methods: {
        triggerPage(path) {
          if(path == '/login') {
            if(localStorage.getItem('username')) {
              this.$router.push('/logined')
              return
            }
          } else if(path == 'https://github.com/Acmenlei') {
            return window.open(path)
          }
          this.$router.push(path)
        },
    },
  }
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'codeleilei';
  src: url('../../assets/font/2012DingYongKangYingBiKaiShuXinBan-2.ttf');
}
#tabbarLink {
  display: flex;
  height: 3rem;
  justify-content: center;
  align-items: center;
  margin-top: 0.8rem;
  a {
    font-family: '微软雅黑';
    color: #666;
    margin: 0 1rem;
    padding: 0.3rem;
    font-size: 13px;
    transition: all .5s;
    line-height: 1rem;
  }
  a:hover {
    background: #222;
    border-radius: 5px;
    color: #fff;
  }
}
</style>
