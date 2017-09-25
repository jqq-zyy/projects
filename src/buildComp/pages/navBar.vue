<template>
	<hw-navbar :data="data" @click="onClick_navBar" currPath="currPath"></hw-navbar>
</template>
<script type="text/ecmascript-6">
	import g from "../global";
	export default{
		created(){
			this.init();
		},
		data(){
			return {
				g: g,
				currPath: "homePage",
				data: [
					{
						"id": "homePage",
						"path": "/appid",
						"name": "基础信息",
						"highLightList": ["/appid", "/appid:id"],
						"children": [
							{
								"name": "应用ID",
								"path": "/appid",
								"highLightList": ["/appid", "/appid:id"]
							}
						]
					},
					{
						"id": "finial",
						"path": "/financetotal",
						"name": "财务对账",
						"highLightList": ["/appid", "/appid:id"],
						"children": [
							{
								"name": "财务汇总",
								"path": "/financetotal",
								"highLightList": ["/financetotal"]
							}
						]
					},
					{
						"id": "bagData",
						"path": "/bagtotal",
						"name": "红包数据",
						"highLightList": ["/appid", "/appid:id"],
						"children": [
							{
								"name": "红包统计",
								"path": "/bagtotal",
								"highLightList": ["/bagtotal", "/bagtotal:id"]
							},
							{
								"name": "红包发放详情",
								"path": "/bagdetail",
								"highLightList": ["/bagdetail", "/baginfo"]
							},
							{
								"name": "红包用户查询",
								"path": "/baguser",
								"highLightList": ["/baguser"]
							}
						]
					}]
			}
		},
		methods: {
			init()
			{
				this.currPath = g.currentRoute.path;
				if (g.currentRoute.matched[0] && g.currentRoute.matched[0].path)
				{
					this.currPath = g.currentRoute.matched[0].path;
				}
			},
			onClick_navBar($path)
			{
				g.url = $path;
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>