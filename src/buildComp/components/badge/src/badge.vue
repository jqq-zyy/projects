<template>
	<div :class="wrapClass" ref="hwBadge" @click="onClick_badge">
		<span :class="innerClass" v-if="type='primary'">{{maxNum}}</span>
	</div>
</template>

<script type="text/ecmascript-6">
	import * as util from './../../../js/util';
	const prefixCls = "hw-badge";
	export default{
		name: "hw-badge",
		created(){
			this.$nextTick(() =>
			{
				this.$refs.hwBadge.parentNode.style.position = "relative";
			})
		},
		data(){
			return {}
		},
		props: {
			maxCount: {
				type: [String, Number],
				validator(value){
					return !isNaN(int(value)) && int(value) > 0;
				},
				default:99
			},
			count: {
				type: [String, Number],
				validator(value){
					return !isNaN(int(value)) && int(value) > 0
				},
				required:true
			},
			type: {
				type: String,
				validator(value){
					return util.oneOf(value, ['primary', 'dot']);
				},
				default: 'primary'
			},
			url: {
				type: String
			}
		},
		computed: {
			maxNum()
			{
				if (int(this.count) >= int(this.maxCount))
				{
					return this.maxCount
				}
				return this.count
			},
			wrapClass()
			{
				return [
					`${prefixCls}-wrap`,
					{
						[`${prefixCls}-wrap-dot`]: this.type == "dot",
						[`${prefixCls}-wrap-primary`]: this.type == "primary"
					}
				]
			},
			innerClass()
			{
				return [
					`${prefixCls}-inner`,
					{
						[`${prefixCls}-inner-primary`]: this.type == "primary"
					}
				]
			},
		},
		methods: {
			onClick_badge()
			{
				if (!!this.url)
				{
					g.url = this.url;
				}
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>