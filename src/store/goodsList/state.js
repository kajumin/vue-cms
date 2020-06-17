import storage from '../../util/GoodsCart.js'
export default {
	goods: storage.readGoods(),
	goodsList: []
}