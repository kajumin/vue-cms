<template>
    <div>
        <div class="photo-bottom">
            <ul>
                <li class="photo-comment">
                    <div>
                        <span>提交评论</span>
                        <a href="javacript:;" @click="goback">返回</a>
                    </div>
                </li>
                <li class="txt-comment">
                    <textarea style="width: 100%;" v-model="content"></textarea>
                </li>
                <li> 
                    <mt-button type="primary" size="large" @click="sendMsg">发表评论</mt-button>
                </li>
                <li class="photo-comment">
                    <div>
                        <span>评论列表</span>
                        <span>44条评论</span>
                    </div>
                </li>
            </ul>
            <ul class="comment-list">
                <li v-for="(comment,index) in commentmsg" :key="comment.id">
                   {{comment.user_name}}：{{comment.content}} {{comment.add_time | relTime(comment.add_time)}}
                </li>
            </ul>
           <mt-button type="danger" :disabled="disabled" size="large" plain @click="loadmore">加载更多</mt-button>
        </div>
    </div>
</template>
<script>
     export default{
        name:'comment',
        data(){
            return {
                // 评论信息
                content: '',
                disabled: false,
                page: 1,
                commentmsg:[]
            }
        },
        props:['cid'],
        created(){       
            this.getComment();
        },
        methods: {
            loadmore(){
                this.page++;
                this.getComment();
            },
            getComment(){
                console.log(this.page)
                console.log(this.cid)
                this.$axios.get('photos/comment/'+this.cid+'/'+this.page)
                .then(res=>{
                    console.log(res.data.data);
                    if(res.data.data.length < 5) {
                        this.disabled = true;
                    }
                    if(this.page === 1) {  
                        this.commentmsg = res.data.data;
                    }else{
                        this.commentmsg = this.commentmsg.concat(res.data.data)
                        console.log(this.commentmsg);
                    }
                   
                });
            },
            sendMsg(){
                console.log(this.content)
                let obj = {
                    "photos_id": this.cid,
                    "user_name": "bang",
                    "content": this.content
                };
                console.log(obj)
                this.$axios.post('photos/comment',obj)
                .then(res=>{
                    console.log(res)
                })
                .catch(err=>{
                    console.log(err)
                })
            },
            goback(){
                this.$router.go(-1);
            }
        }
    }
</script>
<style scoped>
.photo-comment > div span {
    float: left;
    font-weight: bold;
    margin-left: 5px;
}
.photo-comment > div a {
    float: right;
    margin-right: 5px;
    padding: 0 5px;
    background-color: #f1f1f1;
}
.photo-comment {
    height: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    line-height: 30px;
}
.txt-comment {
    padding: 5px 5px;
}
.txt-comment textarea {
    margin-bottom: 5px;
}
.comment-list li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

</style>
