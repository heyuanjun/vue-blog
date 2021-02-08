<template>
  <div id="logo_content">
    <router-link to="'/'">
      <div class="logo_name">
        <i class="menu iconfont icon-caidan"></i>
        <img v-show="$route.name !== 'home'"
            src="../../assets/images/cat.png"/>
        <p v-show="$route.name !== 'home'">Orange Six</p>
        <i @click="$router.push('/category')"
            class="search iconfont icon-search"></i>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "logo"
};
</script>

<style lang="scss"
    scoped>
@font-face {
  font-family: "../../assets/font/Oh-Chewy-2.ttf";
  src: url("../../assets/font/Oh-Chewy-2.ttf");
}

#logo_content {
  .logo_name {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 1.5rem;
    position: relative;
    user-select: none;
    //background: linear-gradient(#f6f5f5, #e8eef5);
    p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      color: #666;
      animation: triggerColor 7s infinite alternate;
      font-family: "../../assets/font/Oh-Chewy-2.ttf";
    }

    img {
      width: 2.9rem;
      height: 2.5rem;
      margin-top: -2.2rem;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      opacity: .9;
    }
  }

  @media screen and(max-width: 992px) {
    .menu,
    .search {
      display: block !important;
    }
  }

  .menu,
  .search {
    position: absolute;
    font-size: 1.5rem;
    cursor: pointer;
    color: white;
    display: none;
    top: 0.4rem;
  }

  .menu {
    left: 2rem;
  }

  .search {
    right: 2rem;
  }

  .menu:hover,
  .search:hover {
    color: rgb(100, 177, 240);
  }
}
</style>
