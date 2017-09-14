<template>
	<div>
		<hw-list :dataList="dataList" :showArrow="true" @change="onChange_list" :checkedList="checkedList"></hw-list>



		<hw-list :dataList="dataList1" :showArrow="true" @change="onChange_list" :checkedList="checkedList1"></hw-list>


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
						name: "44"
					},
					{
						id: 5,
						name: "55"
					}],
				dataList1: [{
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
				}],
				checkedList1: ['No2-2'],
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
			onChange_list($idList)
			{
				trace('$idList', $idList);
				this.checkedList = $idList;
			},

			onChange_treeMenu($data)
			{
				trace(JSON.stringify($data, null, 4))
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>