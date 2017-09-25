<template>
	<div :class="wrapClass">
		<div :class="innerClass" ref="innerBox">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
		<div v-if="text">{{text}}</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import * as util from './../../../js/util';
	const prefixCls = "hw-loading";
	export default{
		name: "hw-loading",
		created(){

		},
		data(){
			return {}
		},
		props: {
			type: {
				type: String,
				validator($value)
				{
					return util.oneOf($value, ["ball", "line"])
				},
				default: "ball"
			},
			text: {
				type: String
			},
			fontColor: {
				type: String,
				default: "#555555"
			},
			bgColor:{
				type: String,
				default: "#555555"
			},
			size: {
				type: String,
				validator($value)
				{
					return util.oneOf($value, ["small", "middle", "large"])
				},
				default: "middle"
			}
		},
		computed: {
			wrapClass()
			{
				return [`${prefixCls}`, `${prefixCls}-wrap`, `${prefixCls}-wrap-${this.size}`]
			},
			innerClass()
			{
				return [`${prefixCls}`, `${prefixCls}-inner`, `${prefixCls}-inner-${this.size}`,
					`${this.type}-spin-fade-loader`]
			}
		},
		methods: {},
		mounted()
		{
			this.$refs.innerBox.style.backgroundColor = this.mainColor;
		}

	}
</script>
<style type="text/css">

	.line-spin-fade-loader > div {
		border-radius: 2px;
		margin: 2px;
	}

	@-webkit-keyframes line-spin-fade-loader {
		50% {
			opacity: .3
		}
		100% {
			opacity: 1
		}
	}

	@keyframes line-spin-fade-loader {
		50% {
			opacity: .3
		}
		100% {
			opacity: 1
		}
	}

	.line-spin-fade-loader {
		position: relative;
		top: -10px;
		left: -4px
	}

	.line-spin-fade-loader > div:nth-child(1) {
		top: 20px;
		left: 0;
		-webkit-animation: line-spin-fade-loader 1.2s -.84s infinite ease-in-out;
		animation: line-spin-fade-loader 1.2s -.84s infinite ease-in-out
	}

	.line-spin-fade-loader > div:nth-child(2) {
		top: 13.64px;
		left: 13.64px;
		-webkit-transform: rotate(-45deg);
		transform: rotate(-45deg);
		-webkit-animation: line-spin-fade-loader 1.2s -.72s infinite ease-in-out;
		animation: line-spin-fade-loader 1.2s -.72s infinite ease-in-out
	}

	.line-spin-fade-loader > div:nth-child(3) {
		top: 0;
		left: 20px;
		-webkit-transform: rotate(90deg);
		transform: rotate(90deg);
		-webkit-animation: line-spin-fade-loader 1.2s -.6s infinite ease-in-out;
		animation: line-spin-fade-loader 1.2s -.6s infinite ease-in-out
	}

	.line-spin-fade-loader > div:nth-child(4) {
		top: -13.64px;
		left: 13.64px;
		-webkit-transform: rotate(45deg);
		transform: rotate(45deg);
		-webkit-animation: line-spin-fade-loader 1.2s -.48s infinite ease-in-out;
		animation: line-spin-fade-loader 1.2s -.48s infinite ease-in-out
	}

	.line-spin-fade-loader > div:nth-child(5) {
		top: -20px;
		left: 0;
		-webkit-animation: line-spin-fade-loader 1.2s -.36s infinite ease-in-out;
		animation: line-spin-fade-loader 1.2s -.36s infinite ease-in-out
	}

	.line-spin-fade-loader > div:nth-child(6) {
		top: -13.64px;
		left: -13.64px;
		-webkit-transform: rotate(-45deg);
		transform: rotate(-45deg);
		-webkit-animation: line-spin-fade-loader 1.2s -.24s infinite ease-in-out;
		animation: line-spin-fade-loader 1.2s -.24s infinite ease-in-out
	}

	.line-spin-fade-loader > div:nth-child(7) {
		top: 0;
		left: -20px;
		-webkit-transform: rotate(90deg);
		transform: rotate(90deg);
		-webkit-animation: line-spin-fade-loader 1.2s -.12s infinite ease-in-out;
		animation: line-spin-fade-loader 1.2s -.12s infinite ease-in-out
	}

	.line-spin-fade-loader > div:nth-child(8) {
		top: 13.64px;
		left: -13.64px;
		-webkit-transform: rotate(45deg);
		transform: rotate(45deg);
		-webkit-animation: line-spin-fade-loader 1.2s 0s infinite ease-in-out;
		animation: line-spin-fade-loader 1.2s 0s infinite ease-in-out
	}

	.line-spin-fade-loader > div {
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
		position: absolute;
		width: 5px;
		height: 15px
	}

	@-webkit-keyframes ball-spin-fade-loader {
		50% {
			opacity: .3;
			-webkit-transform: scale(.4);
			transform: scale(.4)
		}
		100% {
			opacity: 1;
			-webkit-transform: scale(1);
			transform: scale(1)
		}
	}

	@keyframes ball-spin-fade-loader {
		50% {
			opacity: .3;
			-webkit-transform: scale(.4);
			transform: scale(.4)
		}
		100% {
			opacity: 1;
			-webkit-transform: scale(1);
			transform: scale(1)
		}
	}

	.ball-spin-fade-loader {
		position: relative;
		top: -10px;
		left: -10px
	}

	.ball-spin-fade-loader > div:nth-child(1) {
		top: 25px;
		left: 0;
		-webkit-animation: ball-spin-fade-loader 1s -.96s infinite linear;
		animation: ball-spin-fade-loader 1s -.96s infinite linear
	}

	.ball-spin-fade-loader > div:nth-child(2) {
		top: 17.05px;
		left: 17.05px;
		-webkit-animation: ball-spin-fade-loader 1s -.84s infinite linear;
		animation: ball-spin-fade-loader 1s -.84s infinite linear
	}

	.ball-spin-fade-loader > div:nth-child(3) {
		top: 0;
		left: 25px;
		-webkit-animation: ball-spin-fade-loader 1s -.72s infinite linear;
		animation: ball-spin-fade-loader 1s -.72s infinite linear
	}

	.ball-spin-fade-loader > div:nth-child(4) {
		top: -17.05px;
		left: 17.05px;
		-webkit-animation: ball-spin-fade-loader 1s -.6s infinite linear;
		animation: ball-spin-fade-loader 1s -.6s infinite linear
	}

	.ball-spin-fade-loader > div:nth-child(5) {
		top: -25px;
		left: 0;
		-webkit-animation: ball-spin-fade-loader 1s -.48s infinite linear;
		animation: ball-spin-fade-loader 1s -.48s infinite linear
	}

	.ball-spin-fade-loader > div:nth-child(6) {
		top: -17.05px;
		left: -17.05px;
		-webkit-animation: ball-spin-fade-loader 1s -.36s infinite linear;
		animation: ball-spin-fade-loader 1s -.36s infinite linear
	}

	.ball-spin-fade-loader > div:nth-child(7) {
		top: 0;
		left: -25px;
		-webkit-animation: ball-spin-fade-loader 1s -.24s infinite linear;
		animation: ball-spin-fade-loader 1s -.24s infinite linear
	}

	.ball-spin-fade-loader > div:nth-child(8) {
		top: 17.05px;
		left: -17.05px;
		-webkit-animation: ball-spin-fade-loader 1s -.12s infinite linear;
		animation: ball-spin-fade-loader 1s -.12s infinite linear
	}

	.ball-spin-fade-loader > div, .ball-spin-loader > div {
		-webkit-animation-fill-mode: both;
		position: absolute;
		width: 10px;
		height: 10px;
		border-radius: 50%
	}

	.ball-spin-fade-loader > div {
		margin: 2px;
		animation-fill-mode: both
	}
</style>