<template>
  <div id="message">
    <marquee style="color:orange;"
        direction="left">
      大家好，欢迎留言 😊
    </marquee>
    <replyOrpublish
        :messageData='arrMesasgeList'
        publishURL="/api/messages/leave"
        replyURL='/message/replyInfo'
    />
    <Page class="page"
        :page-size="10"
        @on-change="PageChange"
        :total="count"
        show-total/>
  </div>
</template>

<script>
import { PageSizeChange } from '@/components/NetWork/request'
import replyOrpublish from '../components/ReplyOrPublish/replyOrpublish'
  export default {
    name:'leaveMessage',
    data () {
      return {
          value:'',
          arrMesasgeList:[],
          currentSize:1,
          count:0,
          isshow:false,
          replyInfo:{},
          replyValue:''
      };
    },
    mounted() {
      this.PageChange(1)
    },
    components:{ replyOrpublish },
    methods: {
      PageChange() {
        /* 发起请求 */
        this.$store.commit('LoadingTitleChange', {isshow: true, title: '正在获取留言信息~'})
        PageSizeChange('/api/messages').then(res => {
          if(res.data.data.length > 0) {
            this.count = res.data.data.count
            this.arrMesasgeList = res.data.data
            this.$Spin.hide()
          } else {
            this.$Message.error("网络出错了,(ノへ￣、)！")
          }
           this.$store.commit('LoadingTitleChange', {isshow: false, title: ''})
        })
      },
    }
  }
</script>
<style lang="scss" scope>
#message {
    width: 85%;
    height: 100%;
    margin: 0 auto;
    text-align: center;
    padding-top:2rem;
    .page {
      margin:2rem 0;
      position: relative;
      z-index: 99;
    }
}
</style>
