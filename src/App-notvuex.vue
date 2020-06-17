<template>
  <div>
    <mt-header title="信息系统管理系统"></mt-header>
    <transition name="fade" mode="out-in">
      <router-view class= "tmpl"/>
    </transition>

    <mt-tabbar v-model="selected">
      <mt-tab-item id="Home">
      <img slot="icon" src="../static/img/index.png">首页
    </mt-tab-item>
    <mt-tab-item id="Member">
      <img slot="icon" src="../static/img/vip.png">会员
    </mt-tab-item>
    <mt-tab-item id="Shopcart">
      <img slot="icon" src="../static/img/shopcart.png">购物车<mt-badge size="small" type="error">{{totalNum}}</mt-badge>
    </mt-tab-item>
    <mt-tab-item id="Search">
      <img slot="icon" src="../static/img/find.png">查找
    </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
  import myBus from '@/myBus'
  import GoodsTools from '@/GoodsTools'
export default {
  name: 'App',
  data () {
    return {
      selected: '',
      totalNum: 0
    }
  },
  created(){
    myBus.$on('addShopCart',(num)=>{
      this.totalNum += num;
    });
    myBus.$on('shopcartNum',()=>{
      let total = 0;
      Object.values(window.test.goodsObj).forEach(num=>{
        total += num;
      });
      this.totalNum = total;
    });
    myBus.$emit('shopcartNum');

  },
  watch: {
    selected: function(newV,oldV) {
      // console.log(newV);
      this.$router.push({
        name: newV
      });
    }
  }
}
</script>

<style>
.mint-tabbar {
  position: fixed;
  bottom: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
