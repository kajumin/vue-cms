import Vue from 'vue'
import { Tabbar, TabItem, Swipe, SwipeItem, Header, Badge, Button, Lazyload, Indicator,  Loadmore} from 'mint-ui'
// axios
import Axios from 'axios'
import Moment from 'moment'
// 全局组件 开始
import MyUl from '../components/common/MyUl.vue'
import MyLi from '../components/common/MyLi.vue'
import NavBar from '../components/common/NavBar.vue'
import Comment from '../components/common/Comment.vue'
import mySwipe from '../components/common/Swipe.vue'

// console.log(MyUl.name)
// console.log(MyLi.name)
// 全局组件 结束
let mintUI = {};
mintUI.install = function() {
	// console.log('mintUI按需加载')
	// mint-ui 开始
	Vue.component(Tabbar.name, Tabbar);
	Vue.component(TabItem.name, TabItem);
	Vue.component(Swipe.name, Swipe);
	Vue.component(SwipeItem.name, SwipeItem);
	Vue.component(Header.name, Header);
	Vue.component(Badge.name, Badge);
	Vue.component(Button.name, Button);
	Vue.component(Loadmore.name, Loadmore);
	Vue.component(Lazyload);
	Vue.component(Indicator);
	// mint-ui 结束

	Vue.prototype.$axios = Axios
	Axios.defaults.baseURL = 'http://localhost:3000/'
	//设置拦截器
	Axios.interceptors.request.use(function(config){
		// 不可变配置,可以设置一些公共的请求头
		// console.log(config)
		Indicator.open({
	  	text: '玩命加载中...',
	  	spinnerType: 'fading-circle'
		})
		return config
	})
	Axios.interceptors.response.use(function(response){
		// response {config:{},data:{},headers }
		// console.log(response)
		Indicator.close()
		return response
	})
	// 全局组件 开始
	Vue.component(MyUl.name, MyUl)
	Vue.component(MyLi.name, MyLi)
	Vue.component(NavBar.name, NavBar)
	Vue.component(Comment.name, Comment)
	Vue.component(mySwipe.name, mySwipe)
	// 全局组件 结束


	// 全局过滤器 开始
	Moment.locale('zh-cn')
	Vue.filter('convertTime', function(data, formatStr){
		return Moment(data).format(formatStr)
	})
	Vue.filter('convertTitle', function(data, count){
		return data.substr(0,count)
	})
	Vue.filter('relTime', function(time){
		return Moment(time).fromNow()
	})
	Vue.filter('controlShow', function(str,num){
		if(str.length < num ){
			return str
		}else {
			return str.slice(0,num)+ '...'
		}
		
	})
	// 全局过滤器 结束
}
export default mintUI;