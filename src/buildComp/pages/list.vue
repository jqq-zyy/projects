<template>
	<div>
		<!--<hw-list :listData="dataList" :checkedList="checkedList" :showArrow="true" @change="onChange_list"></hw-list>-->
		<hw-tree-menu :data="data" @change="onChange_treeMenu" :showArrow="true">
		</hw-tree-menu>
	</div>
</template>
<script type="text/ecmascript-6">
	import g from "../global";
	export default{
		created(){

		},
		data(){
			return {
				g: g,

				dataList: [
					{
						id: "No1-1",
						name: "test",
						children: [
							{
								id: "No2-1",
								name: "test1",
								children: [
									{
										id: "No3",
										name: "test1",
									},
									{
										id: "No4",
										name: "test1",
									},
									{
										id: "No5",
										name: "test1",
									},
									{
										id: "No6",
										name: "test1",
									}
								]
							},
							{
								id: "No2-2",
								name: "test1",
								children: [
									{
										id: "No3",
										name: "test1",
									},
									{
										id: "No4",
										name: "test1",
									},
									{
										id: "No5",
										name: "test1",
									},
									{
										id: "No6",
										name: "test1",
									}
								]
							},
							{
								id: "No2-3",
								name: "test1",
								children: [
									{
										id: "No3",
										name: "test1",
									},
									{
										id: "No4",
										name: "test1",
									},
									{
										id: "No5",
										name: "test1",
									},
									{
										id: "No6",
										name: "test1",
									}
								]
							},
							{
								id: "No2-4",
								name: "test1",
								children: [
									{
										id: "No3",
										name: "test1",
									},
									{
										id: "No4",
										name: "test1",
									},
									{
										id: "No5",
										name: "test1",
									},
									{
										id: "No6",
										name: "test1",
									}
								]
							}
						]
					},
					{
						id: "No1-2",
						name: "test",
						children: [
							{
								id: "No2-1",
								name: "test1",
								children: [
									{
										id: "No3",
										name: "test1",
									},
									{
										id: "No4",
										name: "test1",
									},
									{
										id: "No5",
										name: "test1",
									},
									{
										id: "No6",
										name: "test1",
									}
								]
							},
							{
								id: "No2-2",
								name: "test1",
								children: [
									{
										id: "No3",
										name: "test1",
									},
									{
										id: "No4",
										name: "test1",
									},
									{
										id: "No5",
										name: "test1",
									},
									{
										id: "No6",
										name: "test1",
									}
								]
							},
							{
								id: "No2-3",
								name: "test1",
								children: [
									{
										id: "No3",
										name: "test1",
									},
									{
										id: "No4",
										name: "test1",
									},
									{
										id: "No5",
										name: "test1",
									},
									{
										id: "No6",
										name: "test1",
									}
								]
							},
							{
								id: "No2-4",
								name: "test1",
								children: [
									{
										id: "No3",
										name: "test1",
									},
									{
										id: "No4",
										name: "test1",
									},
									{
										id: "No5",
										name: "test1",
									},
									{
										id: "No6",
										name: "test1",
									}
								]
							}
						]
					},
					{
						id: "No1-3",
						name: "test",
						children: [
							{
								id: "No2-1",
								name: "test1",
								children: [
									{
										id: "No3",
										name: "test1",
									},
									{
										id: "No4",
										name: "test1",
									},
									{
										id: "No5",
										name: "test1",
									},
									{
										id: "No6",
										name: "test1",
									}
								]
							},
							{
								id: "No2-2",
								name: "test1",
								children: [
									{
										id: "No3",
										name: "test1",
									},
									{
										id: "No4",
										name: "test1",
									},
									{
										id: "No5",
										name: "test1",
									},
									{
										id: "No6",
										name: "test1",
									}
								]
							},
							{
								id: "No2-3",
								name: "test1",
								children: [
									{
										id: "No3",
										name: "test1",
									},
									{
										id: "No4",
										name: "test1",
									},
									{
										id: "No5",
										name: "test1",
									},
									{
										id: "No6",
										name: "test1",
									}
								]
							},
							{
								id: "No2-4",
								name: "test1",
								children: [
									{
										id: "No3",
										name: "test1",
									},
									{
										id: "No4",
										name: "test1",
									},
									{
										id: "No5",
										name: "test1",
									},
									{
										id: "No6",
										name: "test1",
									}
								]
							}
						]
					},
					{
						id: "No1-4",
						name: "test",
						children: [
							{
								id: "No2-1",
								name: "test1",
								children: [
									{
										id: "No3",
										name: "test1",
									},
									{
										id: "No4",
										name: "test1",
									},
									{
										id: "No5",
										name: "test1",
									},
									{
										id: "No6",
										name: "test1",
									}
								]
							},
							{
								id: "No2-2",
								name: "test1",
								children: [
									{
										id: "No3",
										name: "test1",
									},
									{
										id: "No4",
										name: "test1",
									},
									{
										id: "No5",
										name: "test1",
									},
									{
										id: "No6",
										name: "test1",
									}
								]
							},
							{
								id: "No2-3",
								name: "test1",
								children: [
									{
										id: "No3",
										name: "test1",
									},
									{
										id: "No4",
										name: "test1",
									},
									{
										id: "No5",
										name: "test1",
									},
									{
										id: "No6",
										name: "test1",
									}
								]
							},
							{
								id: "No2-4",
								name: "test1",
								children: [
									{
										id: "No3",
										name: "test1",
									},
									{
										id: "No4",
										name: "test1",
									},
									{
										id: "No5",
										name: "test1",
									},
									{
										id: "No6",
										name: "test1",
									}
								]
							}
						]
					}
				],
				checkedList: ['No2-2']
			}
		},
		methods: {
			onChange_list($data)
			{
				trace(JSON.stringify($data, null, 4));
			},
			onChange_treeMenu($data)
			{
				trace('onChange_treeMenu', JSON.stringify($data, null, 4))
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>