import Vue from 'vue';
import vuex from 'vuex';
import goods from './goodsList/goodsList.js';
Vue.use(vuex);

let store = new vuex.Store({
	modules: {
		goods
	}
});

export default store;