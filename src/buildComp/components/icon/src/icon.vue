<template>
	<i :class="fontClass" @click="onClick_icon"><img :src="iconUrl" alt="" v-if="iconUrl"></i>
</template>
<script>
	const prefixCls = 'hw-icon';
	import * as func from './../../../js/func'

	export default {
		name: 'hw-icon',
		props: {
			iconType: {
				type: String,
				validator (value) {
					return func.oneOf(value, ['download', 'bars', 'envelope', 'eye', 'eye-slash', 'eye-close',
						'close', 'bell', 'calendar', 'upload', 'edit', 'remove', 'check', 'sort-desc', 'sort-up',
						'comment', 'comment-light', 'search', 'copyright', 'volume-on', 'volume-off',
						'user', 'completed', 'process', 'waiting', 'left-arrow',
						'right-arrow', 'prev-song', 'play', 'stop', 'next-song', 'full-screen']);
				}
			},
			iconClass: {
				type: String
			},
			iconUrl: {
				type: String
			},
			className: {
				type: [String, Array]
			}
		},
		computed: {
			fontClass()
			{
				return [
					'iconfont',
					{
						[`${prefixCls}-${this.iconType}`]: !!this.iconType,
						[`${this.iconClass}`]: !!this.iconClass,
						[`${prefixCls}-${this.className}`]: !!this.className
					}
				]
			}
		},
		methods: {
			onClick_icon($event)
			{
				this.$emit('click', $event)
			}
		}
	};
</script>
<style lang="css" type="text/css" rel="stylesheet/css">
	@import "../../../assets/font/iconfont.css";
</style>

