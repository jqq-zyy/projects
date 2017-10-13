<template>
	<button :type="htmlType" @click="onClick_btn($event)" :class="classes">{{text}}
		<hw-icon :iconClass="iconClass" :iconType="iconType"></hw-icon>
		<slot></slot>
	</button>
</template>

<script type="text/ecmascript-6">
	import * as util from './../../../js/util'
	const prefixCls = "hw-btn";
	export default{
		name: "hw-btn",
		data(){
			return {}
		},
		props: {
			type: {
				type: String,
				validator (value) {
					return util.oneOf(value, ['default', 'primary', 'success', 'error', 'info', 'warning']);
				},
				default: "default"
			},
			text: {
				type: String,
				default: "确定"
			},
			size: {
				type: String,
				validator (value) {
					return util.oneOf(value, ['small', 'middle', 'large']);
				},
				default: "middle"
			},
			hasBorder: {
				type: Boolean,
				default: false
			},
			iconClass: {
				type: [String, Array]
			},
			iconType: {
				type: String
			},
			iconUrl: {
				type: String
			},
			disabled: {
				type: Boolean,
				default: false
			},
			className: {
				type: String
			},
			htmlType: {
				default: 'button',
				validator (value) {
					return util.oneOf(value, ['button', 'submit', 'reset']);
				}
			}
		},
		computed: {
			classes()
			{
				return [
					`${prefixCls}`, `${prefixCls}-${this.type}`,
					{
						[`${prefixCls}-${this.className}`]: !!this.className,
						[`${prefixCls}-border`]: this.hasBorder,
						[`${prefixCls}-disabled`]: this.disabled,
						[`${prefixCls}-${this.type}-disabled`]: this.disabled,
						[`${prefixCls}-size`]: !!this.size
					}
				]
			}
		},
		methods: {
			onClick_btn($event)
			{
				this.$emit('click', $event);
			},
			onMouseEnter_btn()
			{
				this.isActive = true;
			},
			onMouseLeave_btn()
			{
				this.isActive = false;
			}
		}
	}
</script>

<style lang="css" type="text/css" rel="stylesheet/css">

	.hw-btn-disabled {
		pointer-events: none;

	}
</style>
