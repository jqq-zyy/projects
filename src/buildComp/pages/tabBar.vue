<template>
	<hw-tabbar :data="list" :currId="currId" @click="onClick_tabBar"></hw-tabbar>
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
				currId: "",
				list: [
					{
						id: 1,
						name: "11"
					},
					{
						id: 2,
						name: "22"
					},
					{
						id: 3,
						name: "33"
					},
					{
						id: 4,
						name: "44",
						children: [
							{
								id: "No2",
								name: "test1"
							},
							{
								id: "No2",
								name: "test1"
							},
							{
								id: "No2",
								name: "test1"
							},
							{
								id: "No2",
								name: "test1"
							}
						]
					},
					{
						id: 5,
						name: "55"
					}],
			}
		},
		methods: {
			init()
			{
				this.currId = g.vue.getQuery('id');
			},
			onClick_tabBar($id)
			{
				g.url = g.currentRoute.path + '?id=' + $id;
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>