const TODOS = 'goodList'
export default {
  saveGoods (goods) {
  	if(goods.length < 1) {
  		window.localStorage.removeItem(TODOS)
  	}else{
  		window.localStorage.setItem(TODOS, JSON.stringify(goods));
  	}
    
  },
  readGoods () {
    return JSON.parse(window.localStorage.getItem(TODOS) || '[]');
  }
}