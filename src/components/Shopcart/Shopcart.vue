<template>
    <div>
    	<nav-bar title='购物车'/>
        <div class="pay-detail">
            <ul>
                <li class="p-list" v-for="(goods,index) in goodsList" :key="goods.id">
                    <mt-switch v-model="goods.isSelected"></mt-switch>
                    <img :src="goods.img_url">
                    <div class="pay-calc">
                        <p>{{goods.title}}</p>
                        <div class="calc">
                            <span>￥{{goods.sell_price}}</span>
                            <span @click="subStract(goods)">-</span>
                            <span>{{goods.num}}</span>
                            <span @click="add(goods)">+</span>
                            <a href="javascript:;" @click="del(goods)">删除</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="show-price">
            <div class="show-1">
                <p>总计(不含运费):</p>
                <span>已经选择商品{{getPayment.count}}件，总价￥{{getPayment.total}}元</span>
            </div>
            <div class="show-2">
                <mt-button type="danger" size="large">去结算</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
	// import MyBus from '@/myBus'
	import { mapGetters,mapActions } from 'vuex' 
	export default {
		data(){
			return {
			}
		},
		methods:{
			subStract(good){
				console.log('减少')
				good.buyNum --;
				// window.test.goodsObj[good.id] --;
				// this.$store.dispatch('addNumByAct',-1);
				console.log(good.id,good.num)
				this.$store.dispatch('addNum', {id: good.id,num: -1});
			},
			add(good){
				console.log('增加')
				console.log(good.id,good.num)
				good.num ++;
				// this.addNum();
				this.$store.dispatch('addNum', {id: good.id,num: 1});
				// this.$store.dispatch('addNumByAct',1);
				// window.test.goodsObj[good.id] ++;
			},
			del(good){
				console.log('删除')
				let num = parseInt(good.num);
				// console.log(num)
				// 删除数组数据
				// this.GoodsCart.splice(i,1);
				// 删除内存数据
				this.$store.dispatch('delNum',good.id);
				// 删除window.test中的数据
				// delete test.goodsObj[i];
			}
		},
		created(){
			// this.getGoodsList();
			this.$store.dispatch('getGoodsList')
		},
		computed:{
			...mapGetters(['goodsList','getCount','getPayment']),
			...mapActions(['addNum'])
			// ,
			// payment(){
			// 	let count = 0;
			// 	let total = 0;
			// 	this.GoodsCart.forEach(goods=>{
			// 		if(goods.isSelected){
			// 			count += goods.buyNum;
			// 			total += goods.buyNum * goods.sell_price;
			// 		}
			// 	})
			// 	return { total,count };
			// }
		},
		beforeRouteLeave(to,from,next) {
			let result = confirm("您确定要离开吗");
			if(result) {
				next();
				// 保存数据
				// MyBus.$emit('shopcartNum');
				let total = 0;
			    Object.values(window.test.goodsObj).forEach(num=>{
			        total += num;
			    });
				this.$store.dispatch('changeNumByAct',total);
				// console.log(total);
			}else {
				next(false);
			}
		}
	}
</script>
<style scoped>
.pay-detail ul li {
    list-style: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 3px;
}

.pay-detail ul {
    padding-left: 5px;
    margin-top: 5px;
}

.pay-detail ul li img {
    width: 80px;
    height: 80px;
    display: inline-block;
    vertical-align: top;
    margin-top: 10px;
}

.pay-detail ul li >:nth-child(1),
.pay-detail ul li >:nth-child(3) {
    display: inline-block;
}

.pay-calc p {
    display: inline-block;
    width: 250px;
    overflow: hidden;
    color: blue;
    font-size: 15px;
    margin-bottom: 10px;
}

.pay-detail ul li >:nth-child(1) {
    line-height: 80px;
}

.calc:nth-child(1) {
    color: red;
    font-size: 20px;
}

.calc span:not(:nth-child(1)) {
    border: 1px solid rgba(0, 0, 0, 0.3);
    display: inline-block;
    width: 20px;
    text-align: center;
}

.calc a {
    margin-left: 20px;
}

.show-1,
.show-2 {
    display: inline-block;
}

.show-1,
.show-2 {
    margin-left: 30px;
}

.show-price {
    background-color: rgba(0, 0, 0, 0.2);
}
</style>
