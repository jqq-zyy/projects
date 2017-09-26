<template>
	<div>
	</div>
</template>

<script type="text/ecmascript-6">
	import g from "../global";
	export default{
		created(){
			this.$nextTick(() =>
			{
				var self = this;
				this.$messageBox({
					type: "prompt",
					title: "test-title",
					message: "test-message",
					cancelText: "test-cancelText",
					confirmText: "test-confirmText",
					cancelCallBack()
					{
						alert(121321);
					},
					confirmCallBack($inputVal)
					{
						self.username = $inputVal;
						alert(121321);
					}
				})
			})
		},
		data(){
			return {
				g: g,
				username: ""
			}
		},
		methods: {},
		watch: {
			username($val)
			{
				trace($val);
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>