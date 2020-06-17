<template>

    <div :style="{ height:wrapperHeight + 'px' }" ref="wrapper">
        <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" :auto-fill="autoFill" ref="loadmore" style="margin-bottom: 55px">
        <nav-bar title="商品列表"/>
        <ul>
            <li v-for="goods in goodsList" :key="goods.id">
                <router-link :to="{name: 'GoodsDetail',params:{id:goods.id}}">
                    <img :src="goods.img_url">
                    <div class="title">{{goods.title | controlShow(20)}}</div>
                    <div class="desc">
                        <div class="sell">
                            <span>￥ {{goods.sell_price}}</span>
                            <s>￥ {{goods.market_price}}</s>
                        </div>
                        <div class="detail">
                            <div class="hot">
                                热卖中
                            </div>
                            <div class="count">
                                剩{{goods.stock_quantity}}件
                            </div>
                        </div>
                    </div>
                </router-link>
            </li>
            
                  
          
        </ul>
        </mt-loadmore>
    </div>
</template>
<script>
    export default  {
        data(){
            return {
                goodsList: [],
                allLoaded: false,
                autoFill: false,
                page: this.$route.params.page,
                wrapperHeight: 0 
            }
        },
        methods: {
            loadBottom() {
                
                console.log('上拉加载')
                this.page++;
                this.loadGoodsByPage();
                // 通知状态改变
                this.$refs.loadmore.onBottomLoaded();
                console.log(this.$refs.loadmore)
            },
            handleBottomChange(status) {
                console.log(status);
            },
            loadGoodsByPage(){
                this.$axios.get('goods/list?page='+this.page)
                .then(res => {
                    // console.log(res.data.data);
                    if(this.page ===1 ) {
                        this.goodsList = res.data.data;
                    }else {
                        if(res.data.data.length < 6) {
                            console.log('数据获取完了');
                            this.allLoaded = true;
                            this.$toast('没有更多数据了')
                        }
                        this.goodsList = this.goodsList.concat(res.data.data);
                        console.log('上拉追加数据成功!')
                        
                        
                    }
                    
                });
            }
        },
        created(){
            // let { page } = this.$route.params;
            // console.log(page);
            this.loadGoodsByPage();
            
        },
        mounted(){
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        }
    }
</script>
<style scoped>
ul {
    overflow: hidden;
}
li {
    width: 50%;
    float: left;
    padding: 6px;
    box-sizing: border-box;
}
li > a:not(.mui-btn) {
    margin: 0px;
    padding: 0px;
    border: 1px solid #5c5c5c;
    box-shadow: 0 0 4px #666;
    width: 100%;
    display: block;
}
li > a:not(.mui-btn) img {
     width: 100%;
}
.sell > span {
    float: left;
    color: red;
    text-align: left;
}
.detail >.hot {
    float: left;
    text-align: left;
    font-size: 15px;
}
.detail >.count {
    float: right;
    text-align: right;
    font-size: 15px;
}
/*撑开，去除浮动没有的高度*/

.detail {
    overflow: hidden;
}
.desc {
    color: rgba(92, 92, 92, 0.8);
    background-color: rgba(0, 0, 0, 0.2);
}
img {
    height: 200px;
}
</style>
