<template>
  <div class="home">
    <my-swipe url="swipe"/>
    <div class="grid">
      <my-ul>
        <my-li v-for="(item,index) in modules" :key="item.id">
          <router-link :to="item.route">
            <span :class="item.className"></span>
            <div>{{item.title}}</div>
          </router-link>
        </my-li>      
      </my-ul>
    </div>  
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      modules: [
      {id:1,title:'新闻资讯',className:'news',route:{name:'NewsList'}},
      {id:2,title:'图文分享',className:'picShare',route:{name:'PhotoList',query:{categoryId:0}}},
      {id:3,title:'商品展示',className:'goodsShow',route:{name:'GoodsShow',params:{page:1}}},
      {id:4,title:'留言反馈',className:'feedback',route:{name:'Home'}},
      {id:5,title:'搜索资讯',className:'search',route:{name:'Home'}},
      {id:6,title:'联系我们',className:'callme',route:{name:'Home'}}
      ]
    }
    
  }
}
</script>

<style scoped>
/*九宫格*/
.grid span {
    display: inline-block;
    margin: 10px 0;
    width: 50px;
    height: 50px;
    background-repeat: round;
}
.news {
    background-image: url(../../static/img/news.png);
}
.picShare {
    background-image: url(../../static/img/picShare.png);
}
.goodsShow {
    background-image: url(../../static/img/goodsShow.png);
}
.feedback {
    background-image: url(../../static/img/feedback.png);
}
.search {
    background-image: url(../../static/img/search.png);
}
.callme {
    background-image: url(../../static/img/callme.png);
}
</style>
