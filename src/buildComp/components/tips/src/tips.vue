<template>
	<span :class="Classes">{{text}}</span>
</template>
<script type="text/ecmascript-6">
	import * as util from './../../../js/util';
	const prefixCls = "hw-tips";

	export default{
		name: "hw-tips",
		created(){

		},
		data(){
			return {}
		},
		props: {
			text: {
				type: String
			},
			position: {
				type: String,
				validator($val)
				{
					return util.oneOf($val, ["top", "bottom", "left", "right"]);
				},
				default: "top"
			}
		},
		computed: {
			Classes()
			{
				return [`${prefixCls}`]
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">
	.hw-tips {
		position: absolute;
		top: 0;
		left: 0;
	}
</style>