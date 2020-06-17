<template>
	<div>
		<nav-bar :title="title"/>
		<div class="photo-header">
            <ul>
                <li v-for="category in categories" :key="category.id">
                    <a href="javascript:;" @click="navigateToCateById(category.id)">{{category.title}}</a>
                </li>
            </ul>
        </div>
        <div class="photo-list">
            <ul>
                <li v-for="(img,index) in imgs" :key="img.id">
                    <router-link :to="{name: 'PhotoDetail',params: {id: img.id}}">
                        <img v-if="$route.query.categoryId === 0" v-lazy="img.img_url">
                        <img v-else :src="img.img_url[0]" alt="">
                        <p>
                            <span>{{img.title}}</span>
                            <br>
                            <span>{{img.zhaiyao}}</span>
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>
        	
    </div>

	</div>
</template>
<script>
	export default {
        data () {
            return {
                title: '图文分享',
                imgs: [],
                categories:[], 
            }
        },
        beforeRouteUpdate (to, from, next) {
            // console.log(to);
            // console.log(from);
            let { categoryId } = to.query;
            // // 发请求更改页面数据 
            // console.log(categoryTitle)
            if(categoryId === '0') {
                this.imgs = [];
            }
            this.imgs = this.loadImgsById(categoryId);
            next();
            // 在当前路由改变，但是该组件被复用时调用
            // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
            // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
            // 可以访问组件实例 `this`
        },
        methods:{
            navigateToCateById(categoryId) {
                this.$router.push({
                    name:'PhotoList',
                    query:{ categoryId: categoryId }
                });
            },
            loadImgsById(categoryId) {
                // 2: 发起请求
                // console.log(categoryId)
                let url = '';
                if(categoryId == '0' ){
                    url =  'photos/category/0';    
                }else {
                    url =  'photos/category/' + categoryId;
                }
                this.$axios.get(url)
                .then(res=>{
                    this.imgs = res.data.data;
                    console.log(res.data.data);
                })
                .catch(err=>console.log(err));
            },
        },
        created () {
            
            console.log(this.$route.query.categoryId);
            
            let { categoryId } = this.$route.query;
            this.imgs = this.loadImgsById(categoryId);
            this.$axios.get('photos/category')
            .then(res=>{
                console.log(res.data.data);
                this.categories = res.data.data;
            })
            .catch(err=>console.log(err));
            // console.log(this.loadImgsById)
            // console.log(categoryId)
            
            
        }
    }
</script>
<style scoped>
.photo-header li {
    list-style: none;
    display: inline-block;
    margin-left: 10px;
    height: 30px;
}
.photo-header ul {
    /*强制不换行*/
    white-space: nowrap;
    overflow-x: auto;
    padding-left: 0px;
    margin: 5;
}
/*下面的图片*/

.photo-list li {
    list-style: none;
    position: relative;
}
.photo-list li img {
    width: 100%;
    height: 230px;
    vertical-align: top;
}
.photo-list ul {
    padding-left: 0px;
    margin: 0;
}
.photo-list p {
    position: absolute;
    bottom: 0px;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    margin-bottom: 0px;
}
.photo-list p span:nth-child(1) {
    font-weight: bold;
    font-size: 16px;
}
image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}  
</style>