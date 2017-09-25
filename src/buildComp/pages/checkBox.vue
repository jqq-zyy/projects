<template>
	<div>
		<hw-checkbox v-model="checked" label="hahhahaha" refId="sad"></hw-checkbox>
		<hw-checkbox-group :data="checkboxList" @change="onChange_group"></hw-checkbox-group>
	</div>
</template>
<script type="text/ecmascript-6">
	import g from "../global";
	export default{
		created(){
			this.init();
		},
		data(){
			return {
				checked: false,
				value: "",
				checkboxList: []
			}
		},
		methods: {
			init()
			{
				this.checkboxList.push({
					label: "aaaa",
					value: true
				}, {
					label: "baaa",
					value: false
				}, {
					label: "caaa",
					value: false
				}, {
					label: "daaa",
					value: true
				})
			},
			onChange_group($list)
			{
				this.checkboxList = $list;
				trace('this.checkboxList',this.checkboxList);
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>