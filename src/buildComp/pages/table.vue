<template>
	<hw-table :data="data"
			  :boxWidth="boxWidth"
			  :boxHeight="boxHeight"
			  :headerHeight="headerHeight"
			  :bodyHeight="bodyHeight"
			  :fixHeader="fixHeader"
			  :leftFixedCols="leftFixedCols"
			  :rightFixedCols="rightFixedCols"
			  :eachRowHeight="eachRowHeight"
			  :eachColWidth="eachColWidth"
			  @clickBtn="onClick_btn"
			  @sort="onsort_item"
	>
	</hw-table>
</template>


<script type="text/ecmascript-6">
	export default{
		created(){

		},
		data(){
			return {
				g: g,
				data: {
					header: [
						{
							name: '身份识别',
							id: 'id'
						},
						{
							name: '姓名',
							id: 'name'
						}, {
							name: '年龄',
							id: 'age',
							sortBy: "desc",
							params:"create_time"
						},
						{
							name: '省份',
							id: 'province'
						},
						{
							name: '市区',
							id: 'city'
						},
						{
							name: '地址',
							id: 'address',
							colspan: 2
						},
						{
							name: '邮编',
							id: 'zip'
						},
						{
							name: '操作',
							id: 'action'
						}
					],
					body: [
						{
							id: "xiaoming",
							name: '王小明',
							age: 99,
							address: '北京市朝阳区芍药居',
							province: '北京市',
							city: '朝阳区',
							zip: 100000,
							btn: {
								id: "delete",
								name: "删除"
							}
						}

					]

				},
				boxWidth: 1250,
				boxHeight: 350,
				headerHeight: 50,
				bodyHeight: 300,
				fixHeader: true,
				leftFixedCols: 2,
				rightFixedCols: 2,
				eachRowHeight: 50,
				eachColWidth: 250
			}
		},
		methods: {
			onClick_btn(btnId, itemId)
			{
				trace(btnId, itemId)
			},
			onsort_item($list)
			{
				trace($list);
			}
		}
	}


</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>