<template>
  <article class="home">
    <header>
      <h1>新闻资讯</h1>
      <router-link :to="{path:'/user'}" class="glyphicon glyphicon-user has-event" tag="button"></router-link>
      <button hasevent="yes" class="glyphicon glyphicon-search has-event"></button>
      <div class="clear"></div>
      <nav>
        <router-link exact to="?news=headLine" class="has-event">头条</router-link>
        <router-link exact to="?news=fashion" class="has-event">时尚</router-link>
        <button class="glyphicon glyphicon-play has-event"></button>
      </nav>
    </header>
    <section class="main" ref="main">
      <div>
        <router-link v-for="item,index in newsDate" key="index" :to="{path:'/article/'+item.id+'#'+item.belong}" tag="figure" class="has-event">
          <img :src="item.imgUrl" :alt="item.title">
          <figcaption>{{index+1}}{{' - '+item.title}}{{item.id}}</figcaption> 
          <p>{{item.from}}<span>{{item.looked}}</span>人看过</p>
        </router-link>
        <div class="load-down" @click="loadMore">{{loadDownStatus}}</div>
      </div>
    </section>
  </article>
</template>

<script>
import {css} from '@/assets/script/m.Tween.js'
import Local from '@/assets/script/local.js'

export default {
  data(){
    return{
      "headLineCount":Local.getLen("headlineLen"),
      "fashionCount":Local.getLen("fashionLen"),
      "loadDownStatus":"点击加载",

      "headLineY":0,//用来记录每项新闻的滚动位置
      "fashionY":0
    }
  },
  computed:{
    newsDate(){
      //默认不带news查询的时候加载头条数据
      if((this.$route.name=="Home" && !this.$route.query.news) || this.$route.query.news=="headLine"){
        console.log("load headline")
        //本地存储中获取数据,如果没有,则请求数据
        if(!Local.fetch("headline").data){
          this.$store.dispatch("headLineAction")
        }
        if(this.$store.state.headLine){
          return this.$store.state.headLine.filter((item,index)=>{
            return index<this.headLineCount;
          })
        }
      }
      //加载时尚数据
      if(this.$route.query.news=="fashion"){
        console.log("load fashion")
        if(!Local.fetch("fashion").data){
          this.$store.dispatch("fashionAction")
        }
        if(this.$store.state.fashion){
          return this.$store.state.fashion.filter((item,index)=>{
              return index<this.fashionCount;
          })
        }
      }

    }
  },
  methods:{
    loadMore(){
      if(this.$route.name=="Home" || this.$route.query.news=="headLine"){
        console.log(1)
        setTimeout(()=>{
          if(this.headLineCount>=Local.fetch("headline").data.length){
            this.headLineCount = Local.fetch("headline").data.length;
            setTimeout(()=>{
              this.loadDownStatus = "已经到底了!"
            },300)
          }else{
            this.headLineCount +=5;
          }
          Local.saveLen("headlineLen",this.headLineCount)
        },500)
      }
      if(this.$route.query.news=="fashion"){
        console.log(2)
        setTimeout(()=>{
          if(this.fashionCount>=Local.fetch("fashion").data.length){
            this.fashionCount = Local.fetch("fashion").data.length;
            setTimeout(()=>{
              this.loadDownStatus = "已经到底了!"
            },300)
          }else{
            this.fashionCount +=5;
          }
          Local.saveLen("fashionLen",this.fashionCount)
        },500)
      }
    }
  },
  watch:{
    $route(to,from){
      if(from.query.news=="headLine"){  
        this.headLineY = css(window.document.querySelector(".main").children[0],"translateY");
        console.log("from headLine"+this.headLineY)
      }
      if(from.query.news=="fashion"){
        this.fashionY = css(window.document.querySelector(".main").children[0],"translateY");
        console.log("from fashion"+this.fashionY)
      }
      if(to.query.news=="headLine"){
        console.log("to headLine"+this.headLineY)
        css(window.document.querySelector(".main").children[0],"translateY",this.headLineY);
      }
      if(to.query.news=="fashion"){
        console.log("to fashion"+this.fashionY)
        css(window.document.querySelector(".main").children[0],"translateY",this.fashionY);
      }
    }
  },
  created(){
    //默认显示头条信息
    if(this.$route.name=="Home" && !this.$route.query.news){
      this.$router.push("?news=headLine")
    }
  },
  mounted(){
    css(window.document.querySelector(".main").children[0],"translateY",this.$store.state.leavePosition)
    var that = this;
    this.$nextTick( () => {
      this.$common.defineScroll({
        el:this.$refs.main,
        offBar: false,
        type:"easeOut"
      })
    })
  },
  beforeRouteLeave(to,from,next){
    this.$store.commit("postPostion",css(window.document.querySelector(".main").children[0],"translateY"))
    next()
  },
  beforeRouteUpdate(to,from,next){
    this.loadDownStatus = "点击加载!"
    next()
  }
}
</script>