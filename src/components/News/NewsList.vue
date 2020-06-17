<template>
	<div>
		<nav-bar :title="title"/>
		<div class="demo">
	      	<ul>
		        <li v-for="(news,index) in newsList" :key="index">
		          <router-link :to="{ name: 'NewsDetail',params:{id: news.id} }">
		            <img :src="news.img_url">
		            <div>
		              <span>{{news.title | convertTitle(14)}}</span>
		              <div class="news-desc">
		                <p>点击数: {{news.click}}</p>
		                <p>发表时间: {{ news.add_time | convertTime('YYYY年MM月DD日')}}</p>
		              </div>
		            </div>
		          </router-link>
		        </li>
	        	<p align="center" class="allLoaded">数据加载完了!</p>
	      	</ul>
    	</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				title: '新闻列表',
				newsList: []
			}
		},
	    created(){
	      this.$axios.get('news/list')
	      .then(res=>{
	        console.log(res.data.data)
	        this.newsList = res.data.data
	      })
	    }
	}
</script>
<style scoped>
.demo a {
  display: block;
  width: 330px;
  /*height: 44px;*/
  color: #000;
}
.demo > ul {
	margin-top: 15px;
	padding-left: 45px;
	padding-bottom: 15px;
}
.demo > ul > li { 
	margin-bottom: 15px;
}
.demo > ul >  li > a:after{
	display: block;
	clear: both;
	content: '';
}
.demo img {
  float: left;
  width: 42px;
  /*height: 42px;*/
  margin-right: 20px;
}

.demo a div {
  float: left;
  width: 238px;
  margin-right: 20px;
}
.demo span {
  display: block;
  width: 100%;
  font-size: 17px;
  line-height: 21px;
}
.news-desc > p {
	font-size: 14px;
	margin-top: 0;
	margin-bottom: 0;
}
.news-desc > p:nth-child(1) {
  float: left;
  color: #0bb0f5;
  line-height: 21px;
}
.news-desc > p:nth-child(2) {
  float: right;
}
.allLoaded {
	margin-top: 0;
}
</style>