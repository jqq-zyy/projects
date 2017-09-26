<template>
	<div class="g-popup">
		<div class="md-modal md-effect-8" :class="value? wrapClass:''" @click="onClick_popUp" >
			<div class="md-content inner-content">
				<slot></slot>
			</div>
		</div>
		<div class="md-overlay" v-show="value"></div>
	</div>
</template>
<script type="text/ecmascript-6">
	const prefixCls = "hw-popup";
	export default{
		name: "hw-popup",
		created(){

		},
		data(){
			return {
				wrapClass:'md-show',
			}
		},
		props: {
			value: {
				type: Boolean
			}
		},
		computed: {
//			wrapClass()
//			{
//				return [
//					`${prefixCls}`, `${prefixCls}-wrap`
//				]
//			},
//			innerClass()
//			{
//				return [
//					`${prefixCls}`, `${prefixCls}-inner`
//				]
//			},
		},
		methods: {
			onClick_popUp(event)
			{
				this.$emit('input',false);
				this.$emit('click', event);
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css" scoped>
.md-modal {
	position: fixed;
	top: 50%;
	left: 50%;
	width: 50%;
	z-index: 2000;
	max-width: 630px;
	min-width: 320px;
	height: auto;
	visibility: hidden;
	-webkit-backface-visibility: hidden;
	-moz-backface-visibility: hidden;
	backface-visibility: hidden;
	-webkit-transform: translateX(-50%) translateY(-50%);
	-moz-transform: translateX(-50%) translateY(-50%);
	-ms-transform: translateX(-50%) translateY(-50%);
	transform: translateX(-50%) translateY(-50%);
}
.md-show {
	visibility: visible;
}
.md-effect-8.md-modal {
	-webkit-perspective: 1300px;
	-moz-perspective: 1300px;
	perspective: 1300px;
}

.md-overlay {
	position: fixed;
	visibility: hidden;
	top: 0;
	left: 0;
	z-index: 1000;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.6);
	-webkit-transition: all 0.3s;
	-moz-transition: all 0.3s;
	transition: all 0.3s;
}

.md-show~.md-overlay {
	visibility: visible;
}

.md-effect-8 .md-content {
	-webkit-transform-style: preserve-3d;
	-moz-transform-style: preserve-3d;
	transform-style: preserve-3d;
	-webkit-transform: rotateY(-70deg);
	-moz-transform: rotateY(-70deg);
	-ms-transform: rotateY(-70deg);
	transform: rotateY(-70deg);
	-webkit-transition: all 0.3s;
	-moz-transition: all 0.3s;
	transition: all 0.3s;
	opacity: 0;
}

.md-show.md-effect-8 .md-content {
	-webkit-transform: rotateY(0deg);
	-moz-transform: rotateY(0deg);
	-ms-transform: rotateY(0deg);
	transform: rotateY(0deg);
	opacity: 1;
}
.inner-content {
	position: relative;
	color: #fff;
	background: #e74c3c;
	margin: 0 auto;
	width: 500px;
	height: 300px;
	border-radius: 3px;

}
</style>