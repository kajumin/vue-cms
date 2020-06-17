<template>
     <mt-swipe :auto="4000">
        <!-- 组件要加key 提升性能  key= 'index' -->
          <mt-swipe-item v-for='(item,index) in  imgs || myImgs' :key='item.id'>
              <img :src="item.src || item.img_url" :alt='item.id'>
          </mt-swipe-item>
    </mt-swipe>
   
</template>
<script>
    export default  {
    	name: 'my-swipe',
      props:["url","imgs"],
    	data(){
    		return {
    			myImgs: []
    		}
    	},
      
    	created(){
        // console.log(this.imgs);
        // console.log(this.url);
        if(this.url) {
          this.$axios.get(this.url)
          .then(res=>{
            this.myImgs = res.data.data
            console.log(res.data.data)
          })
          .catch(err=>{
            console.log(err)
          })
        } 
    		
    	}
    }

</script>
<style scoped>
.mint-swipe {
  width: 100%;
  height: 200px;
  margin: 0 auto;
}
img{
  /*position: absolute;*/
  /*left: 50%;
  transform: translate(-50%,0);*/
  /*top: 50%;*/
  display: block;
  width: 100%;
  height: 200px;
}
</style>

