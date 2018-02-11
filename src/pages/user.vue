<template>
  <article class="user">
    <header>
      <button hasevent="yes" class="glyphicon glyphicon-chevron-left has-event" @click="backHandle"></button>
      <h1>个人中心</h1>
    </header>
    <nav>
      <router-link :to="{path:''}" tag="a" class="head-photo has-event">
        <button class="glyphicon glyphicon-chevron-right"></button>
        未登录
        <img src="http://cimg.taohuaan.net/upload/201112/17/142719TKx1S.jpg" alt="">
      </router-link>
      <a class="gap nb"></a>
      <router-link :to="{path:''}" tag="a" class="has-event">
        <button class="glyphicon glyphicon-chevron-right"></button>
        消息
        <button class="glyphicon glyphicon-envelope"></button>
      </router-link>
      <router-link :to="{path:''}" tag="a" class="nb has-event">
        <button class="glyphicon glyphicon-chevron-right"></button>
        收藏
        <button class="glyphicon glyphicon-star"></button>
      </router-link>
    </nav>
  </article>
</template>

<script>
export default {
  methods:{
    backHandle(){
      this.$router.back()
    }
  }
}
</script>