<template>
	<div>
		<hw-list :listData="listData" :checkedList="checkedList" :showArrow="true" @change="onChange_list"></hw-list>
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
				listData: [
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
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>