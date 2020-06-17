<template>
    <div>
        <nav-bar :title="title"/>
        <div class="outer-swiper">
            <div class="swiper">
                <my-swipe :imgs="imgs"/>
            </div>
        </div>
        <div class="product-desc">
            <ul>
                <li>
                    <span class="product-desc-span">{{info.title}}</span>
                </li>
                <li class="price-li">市场价：
                    <s>￥{{info.market_price}}</s> 销售价：<span>￥{{info.sell_price}}</span></li>
                <li class="number-li">购买数量：<span @click="substrack">-</span><span>{{buyNum}}</span><span @click="add">+</span></li>
                <li>
                    <mt-button type="primary">立即购买</mt-button>
                    <mt-button type="danger" @click="goShopCart">加入购物车</mt-button>
                </li>
            </ul>
        </div>
        <transition name="ball" @after-enter="afterEnter">
            <div class="ball" v-if="isshow"></div>
        </transition>
        <div class="product-props">
            <ul>
                <li>商品参数</li>
                <li>商品货号：{{info.goods_no}}</li>
                <li>库存情况：{{info.stock_quantity}}件</li>
                <li>上架时间：{{info.add_time | convertTime('YYYY-MM-DD')}}</li>
            </ul>
        </div>
        <div class="product-info">
            <ul>
                <li>
                    <mt-button type="primary" size="large" plain @click="goGoodsInfo">图文介绍</mt-button>
                </li>
                <li>
                    <mt-button type="danger" size="large" plain @click="goGoodsComment">商品评论</mt-button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import myBus from '@/myBus'
    import GoodsTools from '@/GoodsTools'
    export default  {
        data(){
            return {
                title: '商品详情',
                info: [],
                imgs: [{id:1}],
                isshow: false,
                buyNum: 1

            }
        },
        methods: {   
            goGoodsInfo(){
                this.$router.push({
                    name: 'NewsDetail',
                    params: {id: this.$route.params.id}
                });
            },
            goShopCart(){
                this.isshow = true;
            },
            goGoodsComment(){
                this.$router.push({
                    name: 'GoodsComment',
                    params: { id: this.$route.params.id}
                })
            },
            add(){
                
                if(this.buyNum >= this.info.stock_quantity) {
                    return;
                }
                this.buyNum++; 
            },
            substrack(){
                // 减少购买数量
                if(this.buyNum === 1) {
                    return;
                }
                this.buyNum--; 
            },
            afterEnter(){
                this.isshow = false;
                myBus.$emit('addShopCart', this.buyNum);
                GoodsTools.addShopCart({id: this.info.id,num:this.buyNum});
            }

        },
        created(){
            let gid = this.$route.params.id;
            // console.log(gid);
            let imgsReq = this.$axios.get('goods/imgs/' + gid);
            let infoReq = this.$axios.get('goods/list/' + gid);
            this.$axios.all([imgsReq,infoReq])
            .then(this.$axios.spread((imgsRes,infoRes)=>{
                // console.log(imgsRes.data.data);
                // console.log(infoRes.data.data);
                this.imgs = JSON.parse(imgsRes.data.data[0].goods_imgs_url);
                // this.imgs[0].c = 3;
                this.info = infoRes.data.data[0];
                // console.log(this.imgs)
                // console.log(this.info)
            }))
            .catch(err=>{
                console.log(err);
            })
           
            
        }
    }
</script>
<style scoped>
.ball{
    z-index: 999;
}
.ball-leave{
    opacity: 0;
}
.ball-enter-active {
    animation: bounce-in 1s;
}

@keyframes bounce-in {
    0% {
        transform: translate3d(0, 0, 0);
    }
    50% {
        transform: translate3d(80px, -50px, 0);
    }
    75% {
        transform: translate3d(100px, 0px, 0);
    }
    100% {
        transform: translate3d(80px, 300px, 0);
    }
}

.swiper {
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 8px;
    width: 95%;
    border-radius: 15px;
    overflow: hidden;
}

.outer-swiper,
.product-desc,
.product-props,
.product-info {
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 3px;
}


/*请ulpadding*/

.outer-swiper ul,
.product-desc ul,
.product-props ul,
.product-info ul {
    padding: 0;
}

.product-desc ul li,
.product-props ul li,
.product-info ul li {
    list-style: none;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 8px;
    padding-bottom: 8px;
}
.product-props > ul > li:first-child{
    border-bottom: 1px solid red;
}

.product-desc ul >:nth-child(1) span {
    color: blue;
    padding-bottom: 5px;
    font-size: 22px;
    font-weight: bold;
}

.product-desc ul >:nth-child(1) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}

.product-desc ul,
.product-info ul,
.product-props ul {
    padding-left: 10px;
}

.price-li span {
    color: red;
    font-size: 25px;
}

.price-li s {
    margin-right: 16px;
}


/*加减*/

.number-li span {
    display: inline-block;
    border: 2px solid rgba(0, 0, 0, 0.1);
    width: 25px;
}


/*商品参数*/

.product-props ul >:nth-child(1) {
    text-align: left;
}

.product-props ul:not(:nth-child(1)) {
    margin-left: 40px;
}

.product-info ul {
    margin-bottom: 70px;
    padding: 0 5;
}

.number-li span {
    text-align: center;
}

.number-li >:nth-child(2) {
    width: 40px;
}

.ball {
    border-radius: 50%;
    background-color: red;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 440px;
    left: 120px;
    display: inline-block;
    z-index: 9999;
}
</style>
