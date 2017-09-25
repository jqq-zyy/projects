<template>
	<div @click="onClick_switch" :class="wrapClass">
		<span :class="innerClass">{{msgInfo[currSelect]}}</span>
		<hw-icon :iconClass="iconInfo[currSelect]" v-if="!!iconInfo"></hw-icon>
	</div>
</template>
<script type="text/ecmascript-6">
	import * as util from './../../../js/util';
	import Icon from './../../icon/index';
	const prefixCls = "hw-switch";
	export default{
		name: "hw-switch",
		created(){

		},
		data(){
			return {
				currSelect: this.value
			}
		},
		props: {
			value: {
				type: String,
				validator(value)
				{
					return util.oneOf(value, ['on', 'off'])
				}
			},
			iconInfo: {
				type: Object
			},
			msgInfo: {
				type: Object,
				default: function ()
				{
					return {on: 'on', off: 'off'}
				}
			},
			disabled: {
				type: Boolean
			}
		},
		components: {
			"hw-icon": Icon
		},
		computed: {
			wrapClass()
			{
				return [
					`${prefixCls}-wrap`,
					{
						[`${prefixCls}-wrap-off`]: this.currSelect == 'off',
						[`${prefixCls}-wrap-disabled`]: this.disabled
					}
				]

			},
			innerClass()
			{
				return [
					`${prefixCls}-inner`,
					{
						[`${prefixCls}-inner-off`]: this.currSelect == 'off',
						[`${prefixCls}-inner-disabled`]: this.disabled
					}
				]
			},
		},
		methods: {
			onClick_switch()
			{
				if (this.currSelect === "on")
				{
					this.currSelect = "off";
				}
				else
				{
					this.currSelect = "on";
				}
				this.$emit('input', this.currSelect);
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>