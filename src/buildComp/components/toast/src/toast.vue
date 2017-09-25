<template>
	<div :class="wrapClasses">
		<hw-icon :iconClass="iconClass" :iconType="iconType"></hw-icon>
		<p>{{text}}</p>
	</div>
</template>
<script type="text/ecmascript-6">
	import * as util from './../../../js/util'
	const prefixCls = "hw-toast";
	export default{
		name: "hw-toast",
		created(){

		},
		data(){
			return {}
		},
		computed: {
			wrapClasses()
			{
				return [`${prefixCls}`, `${prefixCls}-wrap`, `${prefixCls}-wrap-${this.position}`]
			}
		},
		props: {
			iconClass: {
				type: String
			},
			iconType: {
				type: String
			},
			text: {
				type: String
			},
			position: {
				type: String,
				validator($val)
				{
					return util.oneOf($val, ["top", "middle", "bottom"])
				}
			}
		},
		methods: {}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>