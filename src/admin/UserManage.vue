<template>
  <div class="articleManage">
    <h2>后台用户管理界面：</h2>
    <Table width="80%"
        border
        :columns="columns12"
        :data="lists">
      <template slot-scope="{ row }"
          slot="username">
        <strong>{{ row.username }}</strong>
      </template>
      <template slot-scope="{ row }"
          slot="action">
        <Button type="error"
            size="small"
            @click="remove(row.id)">删除该用户
        </Button>
      </template>
    </Table>
    <Modal
        v-model="show"
        title="Title"
        :loading="loading"
        @on-ok="deleteUser">
      <p>确定要删除该用户吗？请谨慎操作。😀</p>
    </Modal>
  </div>
</template>

<script>
import {HttpRequest} from "@/request/api"

export default {
  mounted() {
    this.getAdmins(this.index)
  },
  data() {
    return {
      show: false,
      loading: true,
      index: 1,
      columns12: [
        {
          title: '用户名',
          slot: 'username',
          width: 200,
        },
        {
          title: '昵称',
          key: 'name',
          width: 200,
        },
        {
          title: '邮箱',
          key: 'email',
          width: 200,
        },
        {
          title: '简介',
          key: 'info',
          width: 200,
        },
        {
          title: 'Action',
          slot: 'action',
          width: 200,
          align: 'center'
        }
      ],
      lists: []
    }
  },
  methods: {
    getAdmins(index) {
      HttpRequest("/admin/admins", {page: index}).then(res => {
        if (res.data.data.length > 0) {
          this.count = res.data.total;
          this.lists = res.data.data;
        } else {
          this.$Message.error("网络出错了,(ノへ￣、)！");
        }
        this.$store.commit('LoadingTitleChange', {isshow: false, title: ''})
      });
    },
    remove(id) {
      HttpRequest(`/admin/admins/${id}/delete`, {}, 'post').then(res => {
        if (res.data) {
          this.$Message.error(res.data.username + '删除成功');
          location.reload();
        } else {
          this.$Message.error("删除失败");
        }
      });
    },
    deleteUser() {
      HttpRequest('/user/deleteUserInfo', {username: this.data6[this.index].username}, 'post')
          .then(res => {
            if (res.data.err == 0) {
              this.$Message.success(res.data.message)
              this.show = false
            } else {
              this.$Message.error(res.data.message)
            }
          }).catch(reason => {
        this.$Message.error(reason.message)
      })
    }
  }
}
</script>

<style lang="scss"
    scoped>
.articleManage {
  padding-top: 5rem;
  padding-right: 15rem;
  position: relative;
  z-index: 99;

  h2 {
    margin-bottom: 1rem;
  }
}
</style>
