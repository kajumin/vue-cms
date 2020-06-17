<template>
	<div>
		<nav-bar :title="title"/>
		<div>
	      <div class="news-title">
            <p>{{newsDetail.title}}</p>
            <div>
                <span>{{newsDetail.click}}次点击</span>
                <span>分类: 民生经济</span>
                <span>添加时间: {{newsDetail.add_time | convertTime('YYYY年MM月DD日')}}</span>
            </div>
        </div>
        <div class="news-content" v-html="newsDetail.content">新闻明细</div>	
    </div>

	</div>
</template>
<script>
	export default {
		data(){
			return  {
        title: '新闻详情',
        newsInfo: [],
        newsDetail: []
      }
		},
    beforeRouteEnter(to,from,next){
      let title = '详情';
      if(from.name === 'NewsList'){
        title = '新闻详情';
      }else if(from.name === 'GoodsDetail') {
        title = '商品图文信息'
      }
      next(vm=>{
        vm.title = title;
      })
    },
    created () {
      
      let { id } = this.$route.params;
      let url = `/news/list/${id}`;

      console.log(url); 
      console.log(this.$route.params.id)

      this.$axios.get(url)
      .then(res=>{
        console.log(res.data.data[0]);
        this.newsDetail = res.data.data[0];
      })
      // this.newsInfo = this.newsDetail.filter(function(item,index){
      //     if(item['id'] == id){
      //         return  item;
      //     }
      // });
      // console.log(this.newsInfo)
    }
		
	}
</script>
<style scoped>
.news-title p {
    color: #0a87f8;
    font-size: 20px;
    font-weight: bold;
}
.news-title span {
    margin-right: 30px;
}
.news-title {
    margin-top: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.news-content {
    padding: 10 5;
}
</style>