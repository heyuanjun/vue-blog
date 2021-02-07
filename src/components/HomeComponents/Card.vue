<template>
  <div id="card">
    <Row>
      <Col :xl="3" :lg="3" :md="2" :sm="1" :xs="0">
        <header>.</header>
      </Col>
      <Col :xl="12" :lg="13" :md="12" :sm="12" :xs="24">
        <div class="article-box">
          <div class="article-category">
            <Icon type="ios-bookmarks-outline" />文章列表
            <div class="article-num">
              共
              <span>{{count}}</span> 篇
            </div>
          </div>
          <div class="card-left">
            <!-- 文章卡片 -->
            <Card-item
              @changelike="changeliked"
              v-for="(item, index) in lists"
              :title="item.title"
              :time="item.time"
              :Itemimg="item.article_img"
              :label="item.label"
              :category="item.article_category"
              :content="item.article_brief"
              :visited="item.visited"
              :like="item.like_Star"
              :id="item.id"
              :article_id="item.article_id"
              :accessPulish_count="item.accessPulish_count"
              :key="index"
            />
            <Page
              ref="page"
              :total="count"
              :page-size="4"
              class="page"
              v-show="pageShow"
              @on-change="PageChange"
              show-total
            />
          </div>
        </div>
      </Col>
      <Col :xl="5" :lg="5" :md="8" :sm="10" :xs="0">
        <div class="right-box">
          <div class="card-right">
            <!-- 搜索框区 -->
            <div class="search">
              <input placeholder="输入文章关键词搜索.." type="text" v-model="likeSearch" />
              <button class="search-btn" @click="searchLike">Search</button>
            </div>
            <!-- 分类区 -->
            <div class="article-category">
              <div class="title">
                <Icon type="ios-aperture-outline" /> 文章分类
                <span>more</span>
              </div>
              <div class="category-item">
                <Badge
                  :count="item['COUNT(article_category)']"
                  :type="categoryColor[index]"
                  v-for="(item, index) in categoriesList"
                  :key="index"
                >
                  <p
                    @click="getCategoryInfo(item.article_category)"
                    class="demo-badge"
                  >{{item.article_category}}</p>
                </Badge>
              </div>
            </div>
            <!-- 标签区 -->
            <div class="article-label">
              <div class="title">
                <Icon type="ios-keypad" /> 文章标签
                <span>more</span>
              </div>
              <Tag
                class="tag"
                @click.native="getLabelInfo(item)"
                :color="bgColor[index]"
                v-for="(item,index) in labelsList"
                :key="index"
              >{{item}}</Tag>
            </div>
            <!-- 最近文章区 -->
            <div class="time-article">
              <div class="title">
                <Icon type="ios-timer" /> 最近文章
                <span>more</span>
              </div>
              <div
                class="ItemList"
                v-for="(item, index) in navList"
                @click="timeArticle(item.article_id)"
                :key="index"
              >
                <Tooltip content="点击跳转到详情">{{item.title}}</Tooltip>
                <span>
                  <Icon type="ios-clock-outline" />
                  {{item.time | dateFilter}}
                </span>
              </div>
            </div>
            <!--<Music />-->
          </div>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import { getNoteDetail, PostMessage, PageSizeChange } from "../NetWork/request";
import CardItem from "./CardIItem";
// import Music from "./Music";
import moment from "moment";
import debounce from "../debounce/debounce";

export default {
  name: "card",
  data() {
    return {
      pageShow: true,
      lists: [],
      count: 0,
      navList: [],
      MyInfo: {},
      username: "",
      flag: false,
      modal1: false,
      value: "",
      labelsList: [],
      categoriesList: [],
      likeSearch: "",
      bgColor: [
        "magenta",
        "blue",
        "red",
        "cyan",
        "volcano",
        "yellow",
        "magenta",
        "blue",
        "red",
        "cyan",
        "volcano",
        "yellow"
      ],
      categoryColor: [
        "primary",
        "success",
        "error",
        "warning",
        "primary",
        "success",
        "error",
        "warning"
      ]
    };
  },
  components: { CardItem },
  filters: {
    dateFilter(V) {
      return moment(V).format("YYYY-MM-DD");
    }
  },
  mounted() {
    /* 默认请求第一页 */
    this.PageChange(1);
    getNoteDetail("/api/articles/recent").then(res => {
      this.navList = res.data.data;
    });
    this.getLabels();
    this.getCategories();
  },
  methods: {
    /* 防抖 */
    searchLike: debounce(function() {
      if (!this.likeSearch) return this.$Message.error("搜索内容不能为空的呀~");
      this.searchContent();
    }, 800),
    // 搜索工具
    searchContent() {
      PageSizeChange("/api/articles", { filter: this.likeSearch }).then(
        res => {
          if (res.data.data.length > 0) {
            this.lists = res.data.data;
            this.count = res.data.data.total;
            if (this.count === 0) {
              this.$Message.success("暂时没有这个区域的内容,欢迎留言建议!");
            } else {
              this.$Message.success("查询成功了!");
            }
          } else {
            this.$Message.error(res.data.message); // 未知错误
          }
        }
      );
    },
    /* 获取标签 */
    getLabels() {
      getNoteDetail("/api/labels").then(res => {
        if (res.data.data.length > 0) {
          let arr = [];
          res.data.data.forEach(ele => {
            arr.push(ele.label);
          });
          this.labelsList = new Set(arr);
        }
      });
    },
    /* 获取标签详情 */
    getLabelInfo(label) {
      this.$Spin.show();
      PostMessage("/api/labels/info", { label: label })
        .then(res => {
          this.$Spin.hide();
          if (res.data) {
            this.lists = res.data;
            this.count = this.lists.length;
            this.pageShow = false;
            this.$Message.success("为您查找到左侧内容!");
          } else {
            this.$Message.error(res.data.message);
          }
        })
        .catch(err => {
          this.$Message.error(err);
        });
    },
    /* 获取分类 */
    getCategories() {
      getNoteDetail("/api/categories")
        .then(res => {
          if (res.data.data.length > 0) {
            this.categoriesList = res.data.data;
          } else {
            this.$Message.error(res.data.message);
          }
        })
        .catch(err => {
          this.$Message.error(err);
        });
    },
    /* 获取分类详情页 */
    getCategoryInfo(category) {
      this.$Spin.show();
      PostMessage("/api/categories/many", { category })
        .then(res => {
          this.$Spin.hide();
          if (res.data) {
            this.lists = res.data;
            this.count = this.lists.length;
            this.pageShow = false;
            this.$Message.success("为您查找到左侧内容!");
          } else {
            this.$Message.error(res.data.message);
          }
        })
        .catch(err => {
          this.$Message.error(err);
        });
    },
    timeArticle(path) {
      this.$router.push(`/detail/${path}`);
    },
    changeliked(id) {
      this.lists.forEach(element => {
        if (element.id == id) {
          element.like_Star += 1;
          PostMessage("/note/notelike", {
            likestar: element.like_Star,
            id: id
          }).then(res => {
            if (res.data.err == 0) {
              this.$Message.success(
                "你为这篇文章增加了一个star谢谢你的支持鸭！(●ˇ∀ˇ●)"
              );
            } else {
              this.$Message.error(
                "网络好像有点差劲呢！小主稍后再来咱们不急！(ノへ￣、)"
              );
            }
          });
        }
      });
    },
    getInfo() {
      this.username = localStorage.getItem("username");
      if (this.username) {
        PostMessage("/user/getuserInfo", { token: this.username }).then(res => {
          if (res.data.err == 0) {
            this.MyInfo = res.data.Info[0];
          } else if (res.data.err == -998) {
            this.$Message.error(res.data.message);
            localStorage.clear();
            setTimeout(() => {
              this.$router.push("/login");
            }, 1500);
          } else {
            this.$Message.error("出错了");
          }
        });
      }
    },
    PageChange() {
      this.$store.commit('LoadingTitleChange', {isshow: true, title: '正在加载文章内容,请稍等...'})
      PageSizeChange("/api/articles", '').then(res => {
        if (res.data.data.length > 0) {
          this.count = res.data.data.count;
          this.lists = res.data.data;
          console.log(this.lists)
        } else {
          this.$Message.error("网络出错了,(ノへ￣、)！");
        }
        this.$store.commit('LoadingTitleChange', {isshow: false, title: ''})
      });
    },
    handleSuccess(response) {
      this.MyInfo.uploadimg = response.url;
    },
    updateInfo() {
      /* 打开我们的编辑框框 */
      this.flag = !this.flag;
    },
    primaryInfo() {
      PostMessage("/user/primaryInfo", {
        token: this.username,
        Info: this.MyInfo.info,
        name: this.MyInfo.name,
        Imgsrc: this.MyInfo.uploadimg
      }).then(res => {
        if (res.data.err == 0) {
          this.flag = false;
          this.$Message.success(res.data.message);
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
    ok() {
      localStorage.clear();
      this.myInfo = {};
      setTimeout(() => {
        location.reload();
      }, 1000);
      this.$Message.success("退出成功");
    },
    cancel() {
      this.$Message.success("不想退出可以多看看噢！(●ˇ∀ˇ●)");
      return;
    }
  }
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "leileiFont";
  src: url("../../assets/font/2012DingYongKangYingBiKaiShuXinBan-2.ttf");
}
#card {
  font-family:"微软雅黑";
  .article-box {
    background: #fff;
    border-radius: 5px;
    margin: 2rem 0;
    .article-category {
      line-height: 20px;
      font-size: 15px;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      .article-num {
        display: inline-block;
        float: right;
        color: #333;
        span {
          color: orange;
          font-size: 20px;
        }
      }
    }
    .card-left {
      border: 1px solid #ccc;
      border-top: 0;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      .page {
        text-align: right;
        margin: 1rem;
      }
    }
  }
  @media screen and (max-width: 568px) {
    .article-box {
      margin: 2rem;
    }
  }
  .right-box {
    margin: 2rem 1rem;
    .card-right {
      .search {
        width: 100%;
        margin-bottom: 1rem;
        input,
        .search-btn {
          outline: none;
          border: 1px solid #ccc;
        }
        input {
          width: 76%;
          border-right: none;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
          padding: 4px 0;
          text-indent: 5px;
        }
        button.search-btn {
          cursor: pointer;
          width: 24%;
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
          background: #ebebeb;
          color: #5e5e5e;
          height: 30.5px;
          font-size: 13px;
        }
      }
      .article-label,
      .article-category,
      .time-article {
        font-size: 14px;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-bottom: 1rem;
        .title {
          line-height: 20px;
          padding: 0.5rem;
          border-bottom: 1.5px solid #5e5e5e;
          span {
            display: block;
            float: right;
            color: #eee;
            font-size: 13px;
            font-weight: bold;
            cursor: pointer;
          }
          span:hover {
            color: orange;
          }
        }
        .tag {
          white-space: pre-wrap;
          margin: 0.4rem;
          cursor: pointer;
        }
        .tag:hover {
          opacity: 0.8;
        }
      }
      .article-category {
        .ivu-badge {
          border: 1px solid #ddd;
          border-radius: 5px;
          margin: 0.5rem;
          padding: 0.2rem;
          transition: opacity 0.6s;
        }
        .ivu-badge:hover {
          opacity: 0.8;
        }
        .category-item {
          margin-top: 0.8rem;
          .demo-badge {
            background: #fff;
            margin: 0.1rem;
            font-size: 13px;
            cursor: pointer;
          }
        }
      }
      .time-article {
        .ItemList {
          padding: 0.8rem 0.5rem;
          cursor: pointer;
          color: #555;
          border-bottom: 1px solid #ccc;
          transition: all 0.6s;
          font-size: 13px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            font-size: 12px;
            color: purple;
            font-weight: bold;
            white-space: nowrap;
          }
        }
        .ItemList:hover {
          background: #f2f2f2;
          color: lightgreen;
          padding-left: 0.8rem;
        }
        .ItemList:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
