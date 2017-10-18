<template>
	<i :class="fontClass" @click="onClick_icon" v-html="iconCode"><img :src="iconUrl" alt="" v-if="iconUrl"></i>
</template>


<script>

	const prefixCls = 'hw-icon';
	import * as util from './../../../js/util'
	import codeHash from './code';
	export default {
		name: 'hw-icon',
		props: {
			iconType: {
				type: String,
				validator (value) {
					return util.oneOf(value, ["download", "navbar", "envelope", "envelope-fill", "eye", "eye-slash", "close", "upload", "edit", "remove", "check", "sort-desc", "sort-up", "search", "refresh", "square-check", "square-checked", "user", "top-arrow", "bottom-arrow", "left-arrow", "right-arrow", "qrcode", "scan", "question", "member", "recycle-bin", "to-top", "collect", "back", "share", "comment", "like", "info-success", "info-warning", "info-primary", "locate", "add", "setup", "message", "prev-song", "next-song", "full-screen", "play", "pause", "calendar", "enter", "index", "copyright", "completed", "process", "waiting", "right"]);
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
			},
			iconCode()
			{
				if (!this.iconType)
				{
					return '';
				}
				let code = codeHash[this.iconType].replace(/^\"|\"$/g, "");
				trace('code', code);
				return code;
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

