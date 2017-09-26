<template>
	<!--<hw-input htmlType="textarea" v-model="value" :noresize="true" label="庄生晓梦"></hw-input>-->
	<hw-input htmlType="text" v-model="value1" label="锦瑟无弦" :regexp="regexp"></hw-input>
</template>

<script type="text/ecmascript-6">
	export default{
		created(){

		},
		data(){
			return {
				value: "北冥有鱼，其翼若坠天之云，抟扶摇而上九万里，绝云气，负青天。",
				rightIcon: "../../assets/images/entry1.png",
				wrongIcon: "../../assets/images/entry2.png",
				regexp: /^[A-Za-z0-9]{4,40}$/,
				value1: "难度华年"

			}
		},
		methods: {},
		watch: {
			value($val)
			{
				trace('value=====', $val);
			},
			value1($val)
			{
				trace('value1=====', $val);
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>