<template>
	<li>
		<slot></slot>
		<!-- <div class="icon">
			<slot name="icon"></slot>
		</div> -->
	</li>
</template>
<script>
	export default {
		name: "my-li",
		data(){
			return {

			}
		}
	}
</script>
<style scoped>
.icon img {
	width: 100%;
}
li{
    list-style: none;
    float: left;
    width: 33.333%;
    text-align: center;
}  
</style>