import { ADD_GOODS, SET_GOODS,ADD_NUM, DEL_NUM, SAVE_GOODS } from './types.js'
import storage from '../../util/GoodsCart.js'
export default {
    [ADD_GOODS](state,{good}) {
    	var result = state.goods.find((item) => {
    		if(item.id === good.id){
    			item.num += good.num;
    			return true;
    		}
    	});
    	if(!result) {
    		state.goods.push(good);
    	}
    	console.log(state.goods)
    },
    [DEL_NUM](state,{id}) {
    	// console.log(id)
    	// console.log(state.goods)
     //    console.log(state.goodsList)
    	let goodsList = state.goodsList.filter(item=>{
    		console.log()
    		return item.id != id;
    	});
    	let goods = state.goods.filter(item=>{
    		console.log(item.id,id)
    		return item.id != id;
    	});
    	state.goods = goods;
    	state.goodsList = goodsList;
    },
    [SET_GOODS](state,{goods}) {
        state.goodsList = goods;
    },
    [SAVE_GOODS](state) {
        storage.saveGoods(state.goods);
    },
    [ADD_NUM](state,{id,num}) {
    	// console.log(id,num)
        state.goods.map(item=>{
        	if(item.id === id) {
        		item.num += num;
        	}
        	return;
        });
        // console.log(state.goods)
        // console.log(state.goodsList)
    }
}