<template>
	<div class="tmpl">
		<!-- 1.0 轮播使用的mint-ui中的swipe组件 -->
		<mt-swipe :auto="2000">
		  <mt-swipe-item v-for="item in swipeList">
		  <a :href="item.url">
		  	<img :src="item.img" alt="">
		  </a>
		  </mt-swipe-item>	 
		</mt-swipe>

		<!-- 2.0 9宫格导航区域 使用的mui中的9宫格样式 -->
	</div>
</template>

<script>

export default{
	data(){
		return {
			swipeList:[
					// {
					// url: "http://www.itcast.cn/subject/phoneweb/index.html",
					// img: "http://ofv795nmp.bkt.clouddn.com/vuelogobanner1.jpg"
					// },
					// {
					// url: "http://www.itcast.cn/subject/phoneweb/index.html",
					// img: "http://ofv795nmp.bkt.clouddn.com/vuelogobanner2-1.jpg"
					// }
			]
		}
	},
	methods:{
		// 1.0 获取轮播图数据
		getimglist(){
			this.$http.get('http://vuecms.ittun.com/api/getlunbo')
			.then(res=>{
				// 将数据赋值给swipeList属性，自动导致v-for重新执行
				this.swipeList = res.body.message;
			});
		}
	},
	created(){
		//当进入Home.vue组件的时候请求数据
		this.getimglist();
	}
}
	
</script>

<style scoped>
	.mint-swipe{
		height: 200px;
	}

	.mint-swipe img{
		width: 100%;
	}

	.mint-swipe-item{
		
		color:white;
	}

</style>