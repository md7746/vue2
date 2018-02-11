<template>
  <article class="article">
    <header>
      <button class="glyphicon glyphicon-chevron-left has-event" @click="backHandle"></button>
      <span>
        <button class="glyphicon glyphicon-font"></button>
        <button class="glyphicon glyphicon-star-empty"></button>
        <button class="glyphicon glyphicon-share"></button>
      </span>
    </header>
    <div class="content">
      <div>
        <section class="art-con">
          <h2>{{this.artCon.title}}</h2>
          <span>
            {{this.artCon.from}}
            <time>{{this.artCon.time}}</time>
            浏览
            <span>{{this.artCon.looked}}</span>
          </span>
          <p>{{this.artCon.content}}</p>
          <img :src=this.artCon.imgUrl :alt=this.artCon.title>
        </section>
        <div class="gap"></div>
        <section class="art-comment">
          <h2>最新评论</h2>
          <article>
            <div class="comment-l">
              <img src="http://cimg.taohuaan.net/upload/201112/17/142719TKx1S.jpg" alt="">
            </div>
            <div class="comment-r">
              <h3>
                <span>
                  1
                  <button class="glyphicon glyphicon-thumbs-up"></button>
                </span>
                用户昵称
              </h3>
              <time>37分钟前</time>
              <p>用户昵称评论用户昵称评论用户昵称评论用户昵称评论</p>
            </div>            
          </article>
        </section>
      </div>
    </div>
    
    <footer>
      <span>4</span>
      <button class="glyphicon glyphicon-comment"></button>
      <input type="text" placeholder="登录添加评论">
    </footer>
  </article>
</template>

<script>
export default {
  data(){
    return{
      userList:this.$store.state.headLine,
      artCon:{}
    }
  },
  methods:{
    backHandle(){
      this.$router.back()
    },
    getData(){
      if(this.$route.hash=="#headline"){
        console.log(111)
          this.userList = this.$store.state.headLine
      }
      if(this.$route.hash=="#fashion"){
        console.log(222)
         this.userList = this.$store.state.fashion
      }
      let id = this.$route.params.artId;
      if( id ){
        this.artCon = this.userList.filter((item,index)=>{
          return item.id == id
        })[0];
      }
    }
  },
  watch:{
    $route(){
      this.getData()
    }
  },
  created(){
    this.getData()
    // console.log(this.$route.params.artId)
  },
  mounted(){ 
    this.$nextTick( () => {
      this.$common.defineScroll({
        el:this.$el.querySelector('.content'),
        offBar: false
      });
    })
  }
}
</script>