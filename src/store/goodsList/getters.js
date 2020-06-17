import { GET_COUNT, GET_GOODS, GET_PAYMENT, GOODS_LIST } from './types.js'
export default {
	[GET_COUNT](state) { 
		let num = 0;
		state.goods.forEach(item=> num+=item.num);
        return num;
    },
    [GET_GOODS](state) {
    	return state.goods;
    },
    [GOODS_LIST](state) {
    	return state.goodsList;
    },
    [GET_PAYMENT](state) {
		let count = 0;
		let total = 0;
		state.goodsList.forEach(goods=>{
			if(goods.isSelected){
				let good = state.goods.find(item=>item.id==goods.id)
				// console.log(goods,good.num,goods.sell_price)
				count += good.num;
				total += good.num * goods.sell_price;
			}
		});
		// console.log(total,count)
		return { total,count };		
    }
}