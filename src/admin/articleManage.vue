<template>
  <div class="articleManage">
    <h2>文章列表详情信息：</h2>
    <Table border
        :columns="columns12"
        :data="lists">
      <template slot-scope="{ row }"
          slot="title">
        <strong>{{ row.title }}</strong>
      </template>
      <template slot-scope="{ row, index }"
          slot="action">
        <Button type="primary"
            size="small"
            style="margin-right: 5px"
            @click="show(index)">修改
        </Button>
        <Button type="error"
            size="small"
            @click="remove(row.id)">删除
        </Button>
      </template>
    </Table>
    <Page :page-size="3"
        @on-change="PageChange"
        style="margin-top:2rem"
        :total="count"
        show-total/>
  </div>
</template>

<script>

import {HttpRequest} from "@/components/NetWork/request";

export default {
  mounted() {
    this.getPage(this.index)
  },
  data() {
    return {
      index: 1,
      count: 0,
      columns12: [
        {
          title: '文章标题',
          slot: 'title'
        },
        {
          title: '文章简介',
          key: 'article_brief'
        },
        {
          title: '文章分类',
          key: 'lable'
        },
        {
          title: 'Action',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      lists: []
    }
  },
  methods: {
    PageChange(index) {
      this.getPage(index)
    },
    getPage() {
      HttpRequest("/admin/articles").then(res => {
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
    show(index) {
      this.$router.push('/admin/article/upload/articleupdate/' + this.lists[index].article_id)
    },
    remove(id) {
      HttpRequest(`/admin/articles/${id}/delete`, {}, 'post').then(res => {
        if (res) {
          this.$Message.error(res.title + '删除成功');
          location.reload();
        } else {
          this.$Message.error("删除失败");
        }
      });
    }
  }
}
</script>

<style lang="scss"
    scoped>
.articleManage {
  padding-top: 4rem;
  padding-right: 15rem;
  position: relative;
  z-index: 99;

  h2 {
    margin-bottom: 1rem;
  }
}
</style>
