<template>
    <div class="tmpl"> 
        <nav-bar /> 
        <div class="photo-title">
            <p>{{photoInfo.title}}</p>
            <span>{{photoInfo.add_time | convertTime("YYYY年MM月DD日")}}</span>
            <span>{{photoInfo.click}}次浏览</span>
            <span>分类：民生经济</span>
        </div>
        <!-- <vue-preview :slides="photoInfo.img_url" @close="handleClose"></vue-preview> -->
        <my-ul class="my-ul">
            <my-li v-for="(img,index) in photoInfo.img_url" :key="index">
               <img :src="img" class="photoInfo-img">
            </my-li>    
        </my-ul>
        <div class="photo-desc">
            <p v-html="">{{photoInfo.content}}</p>
        </div>

        <!-- 使用评论组件 -->
        <comment :cid = "$route.params.id"/>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                photoInfo: {}
            }
        },
        methods:{
            handleClose(){
                console.log('close')
            },
            getPhotoInfo(pid){
                
                this.$axios.get('photos/list/'+ pid)
                .then(res=>{
                    console.log(res.data.data[0]);
                    this.photoInfo = res.data.data[0];
                })
                .catch(err=>console.log(err));
                // this.photoInfo = this.photomsg.filter(function(item,index){
                //     if(item.id == pid){
                //         item.img_url.forEach(function(value){
                //             value.w = 200;
                //             value.h = 200;
                //             value.msrc = value['src'];
                //         })
                    
                //         return item;
                //         // console.log(item)
                //     }
                // })
                // console.log(this.photoInfo[0].img_url)
            }
        },
        created() {
            let pid = this.$route.params.id;
            console.log(pid);
            this.getPhotoInfo(pid);
        }
    }
</script>
<style scoped>
.photo-title {
    overflow: hidden;
}
.photo-title,
.photo-desc {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}
.photo-title p {
    color: #13c2f7;
    font-size: 20px;
    font-weight: bold;
}
.photo-title span {
    margin-right: 20px;
}
.photo-desc p {
    font-size: 18px;
}
.my-ul {
    margin: 10px 0;
}
.photoInfo-img {
    width: 100%;
    height: 100px;
}
</style>
