<template>
	<div class="tmpl">		
		<!-- 1.0 头部 -->
		<mt-header fixed title="传智播客.黑马程序员-前端"></mt-header>

		<!-- 2.0 路由占位 -->
		<router-view></router-view>

		<!-- 3.0 底部 -->
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/Home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/member">
				<span class="mui-icon mui-icon-email">
				
				</span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopcar">
				<span class="mui-icon mui-icon-contact">
					<span class="mui-badge">0</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
	</div>
</template>

<script>
	
	// 利用es6语法定义并且导出一个vm对象
	export default{		
		data(){
			return {
				
			}
		},
		methods:{
			
		}
	}

</script>

<style scoped>
	
</style>