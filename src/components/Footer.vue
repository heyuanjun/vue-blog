<template>
  <div v-show="$route.path !== '/home'" id="footer">
    <div class="talk">
       <!--<p><img src="../assets/images/beianicon.png" alt=""></p>-->
    </div>
  </div>
</template>

<script>
  export default {
    name:'down',
    data () {
      return {
          Text:''
      };
    },
  }
</script>

<style lang="scss" scoped>
#footer {
  background: linear-gradient(#fff, #e7e5e5);
  padding: 2rem 0;
  width: 100vw;
  margin-top: 2rem;
  .talk {
    margin:0 1rem;
    color: #f2f2f2;
    font-size: 11px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    img.wx{
      width: 5rem;
      margin-right: 1rem;
    }
    p {
      img {
        margin-left: 1rem;
      }
    }
    a {
      color: #f2f2f2;
    }
  }
}
</style>
