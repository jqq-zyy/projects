<template>

	<hw-btn text="test-alert" @click="onClick_alert"></hw-btn>
</template>
<script type="text/ecmascript-6">
	export default{
		created(){
			this.$nextTick(() =>
			{

			})

		},
		data(){
			return {
				g: g,
			}
		},
		methods: {
			onClick_alert()
			{
				this.$alert({
					title: "温馨提示",
					desc: "温馨提示-温馨提示-温馨提示-温馨提示-温馨提示",
					btnType: "primary",
					btnText: "确定按钮"
				})
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>