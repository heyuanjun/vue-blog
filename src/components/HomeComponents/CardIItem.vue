<template>
  <div id="carditem">
    <div class="md-title">
      <!-- md尺寸的小球 -->
      <!--<div class="right-around md-ball">-->
      <!--  <span :style="{background: ballColor[index]}"-->
      <!--      v-for="(item, index) in 3"-->
      <!--      :key="index"></span>-->
      <!--</div>-->
      <p class="title"><i class="iconfont icon-lianjie"></i> {{ title }}</p>
    </div>
    <img @click="detailPage(article_id)"
        :src="Itemimg"
        v-if="Itemimg"
        alt="封面">
    <img @click="detailPage(article_id)"
        src="../../assets/images/notFindImg.jpeg"
        v-if="!Itemimg"
        alt="封面">
    <Card :contentid="id"
        class="card">
      <!-- xl尺寸显示的三个小球 -->
      <!--<div class="right-around xl-ball">-->
      <!--  <span :style="{background: ballColor[index]}"-->
      <!--      v-for="(item, index) in 3"-->
      <!--      :key="index"></span>-->
      <!--</div>-->
      <!-- 文章标题 -->
      <p class="title"><i class="iconfont icon-lianjie"></i> {{ title }}</p>
      <!-- 文章简介 -->
      <p v-html="content"
          class="content"></p>
      <!-- 文章发布时间，点赞数，访问量 -->
      <div class="article-item-icon">
        <div class="access-me">
          <img src="../../assets/images/six.jpg">
          <p></p>
        </div>
        <p class="public-time">
          <Icon type="ios-clock-outline"/>
          {{ time | timeFilter }}
        </p>
        <p class="box">
          <i @click="likeArticle(id)"
              class="iconfont icon-dianzan"
              :class="{likeStyle:liked(id)}">
          </i>
          <span style="margin-right:0.5rem">{{ like }}</span>
          <i class="iconfont icon-pinglun"></i><span>{{ accessPulish_count }}</span>
          <i class="iconfont icon-fangwen"></i><span>{{ visited }}</span>
        </p>
      </div>
      <!-- 文章标签 -->
      <div class="tags">
        <Tag color="cyan" v-if="category">{{ category }}</Tag>
        <Tag :color="bgColor[index]"
            v-for="(item,index) in labelsList"
            :key="index">{{ item }}
        </Tag>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'card-item',
  props: {
    title: {
      type: String, default: '', required: true
    },
    time: {
      default: '', required: true
    },
    content: {
      default: '', required: true
    },
    Itemimg: {
      default: '', required: true
    },
    visited: {
      type: Number, default: 999, required: true
    },
    like: {
      type: Number, default: 999, required: true
    },
    id: {
      type: Number, default: 0, required: true
    },
    article_id: {
      type: String, default: '', required: true
    },
    accessPulish_count: {
      type: Number, default: 0, required: true
    },
    label: {
      type: String, default: ''
    },
    category: {
      type: String, default: ''
    }
  },
  data() {
    return {
      flag: true,
      bgColor: ['magenta', 'blue', 'red', 'cyan', 'volcano', 'yellow'],
      ballColor: ['orangered', 'yellow', 'lightgreen']
    };
  },
  filters: {
    timeFilter(V) {
      if (V) {
        return V.toString().slice(0, 10)
      }
    }
  },
  methods: {
    detailPage(article_id) {
      this.$router.push(`/detail/${article_id}`)
    },
    likeArticle(id) {
      if (localStorage.getItem('username')) {
        if (localStorage.getItem(`like${id}`)) {
          this.$Message.success("你已经为这篇文章点过赞了噢~o(*￣▽￣*)o")
        } else {
          localStorage.setItem(`like${id}`, id)
          /* 发送请求 */
          this.$emit('changelike', id)
        }
      } else {
        this.$Message.error("请先去登陆再来点赞噢小主！(ノへ￣、)")
      }
    },
  },
  computed: {
    liked() {
      return function (id) {
        return localStorage.getItem(`like${id}`) == id
      }
    },
    labelsList() {
      const regExep = /\w\w*/g
      return this.title.match(regExep)
    }
  }
}

</script>

<style lang="scss"
    scoped>
#carditem {
  display: flex;
  flex-wrap: nowrap;
  border-bottom: 1px solid #ccc;

  .md-title {
    display: none;
    font-size: 16px;
    margin: 1rem 0;
    color: #333;
  }

  .md-ball {
    margin-right: 1rem;
    display: none;
  }

  .right-around {
    float: right;

    span {
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      margin: 0 0.2rem;
      border: 1px solid #f2f2f2;
    }
  }

  .card {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 0 0 0;
    border: 0;

    .title {
      font-size: 16px;
      margin: 1rem 0;
      color: #333;
    }

    .content {
      font-size: 14px;
    }

    .article-item-icon {
      display: flex;
      align-items: center;
      padding: 1rem 0;
      height: 4rem;
      line-height: 4rem;

      .public-time {
        white-space: nowrap;
        margin-left: 3rem;
      }

      .access-me {
        text-align: center;
        padding-top: 1rem;;
        font-size: .8rem;
        color: skyblue;

        img {
          border-radius: 50%;
          width: 30px;
          height: 30px;
          padding: 0;
          margin: 0;
        }

        p {
          transform: translate(35px, -25px);
        }
      }

      .box {
        padding-left: 0.8rem;

        i {
          font-size: 13px;
          margin: 0 0.2rem;
          color: #333;
        }

        i:nth-child(1):hover {
          color: orange;
          cursor: pointer;
        }
      }
    }
  }

  .card:hover {
    transition: transform .6s;
    box-shadow: 0 0 0 #fff;
    transform: scale(0.95);
    cursor: pointer;
  }

  img {
    width: 14rem;
    padding: .4rem;
    border-radius: 10px;
    cursor: pointer;
  }
}

@media screen and (max-width: 992px) {
  #carditem {
    flex-direction: column;

    .md-ball {
      display: inline;
    }

    .xl-ball {
      display: none;
    }

    .md-title {
      display: block;

      p {
        margin-left: 1rem;
      }
    }

    .card {
      .title {
        display: none;
      }
    }

    img {
      width: 92%;
      margin: 0;
      margin: 0 1rem;
    }
  }
}
</style>
