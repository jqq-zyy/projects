<template>
	<div :class="classes" :style="styles">
		<div>{{title}}</div>
		<slot></slot>
	</div>
</template>
<script type="text/ecmascript-6">
	const prefixCls = "hw-group";
	export default{
		name: "hw-group",
		created(){

		},
		data(){
			return {}
		},
		props: {
			vertical: {
				type: Boolean,
				default: false
			},
			title: {
				type: String
			}
		},
		computed: {
			classes()
			{
				return [
					`${prefixCls}`,
					{
						[`${prefixCls}-vertical`]: this.vertical
					}
				]
			}
		},
		methods: {}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>