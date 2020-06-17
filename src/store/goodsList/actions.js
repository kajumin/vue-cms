import axios from 'axios'
import { ADD_GOODS, GET_GOODS_LIST, SAVE_GOODS, ADD_NUM, DEL_NUM } from './types.js'
export default {
    [ADD_GOODS]({commit},good) {
        commit(ADD_GOODS, {good});
    }, 
    [ADD_NUM]({commit},obj) {
        commit(ADD_NUM, obj);
    }, 
    [DEL_NUM]({commit},id) {
        commit(DEL_NUM, {id});
    },
    [SAVE_GOODS]({commit}) {
        commit(SAVE_GOODS);
    },
    async [GET_GOODS_LIST]({commit, state}) {
    	// console.log(state.goods)
    	let id = state.goods.map(item => item.id);
    	// console.log(id)
    	if(id.length < 1) return;
    	let url = 'goods/list?id='+id.join(',');
		// console.log(url)
		let goods = (await axios.get(url)).data.data;
		// console.log(goods)
		goods = goods.map(item=>{
			state.goods.forEach(g=>{
				if(g.id == item.id) {
					item.num = g.num;
					return;
				}
			});	
			return item;
		});
		console.log(goods);
		commit('setGoods', {goods});
		
		// console.log(this.GoodsCart);
		// for(let i = 0;i < this.GoodsCart.length;i ++){

		// 	let goods = this.GoodsCart[i];
		// 	let num = test.goodsObj[goods.id];
		// 	console.log(goods,num);
		// 	if(num){
		// 		// 完成响应式 defineProperty
		// 		this.$set(goods, 'buyNum', num);
		// 		this.$set(goods, 'isSelected', false);
		// 		// this.GoodsCart[i].buyNum = num;
		// 		// this.GoodsCart[i].isSelected = false;
		// 	}

		// }
			// console.log(this.GoodsCart)
        // commit('changeNum',num);
    }
}