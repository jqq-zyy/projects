<template>
	<div :class="wrapClass">
		<div :class="innerClass">
			<h3>{{title}}</h3>
			<p>{{message}}</p>
			<input type="text" v-model="userInput" v-if="type==='prompt'">
		</div>
		<div>
			<hw-btn type="primary" :text="cancelText" @click="onClick_cancelBtn"/>
			<hw-btn type="primary" :text="confirmText" @click="onClick_confirmBtn"/>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import * as util from './../../../js/util';
	const prefixCls = "hw-message-box";
	export default{
		name: "hw-message-box",
		created(){

		},
		data(){
			return {
				userInput: ""
			}
		},
		props: {
			type: {
				type: String,
				validator($val)
				{
					return util.oneOf($val, ['prompt', 'confirm'])
				}
			},
			title: {
				type: String
			},
			message: {
				type: String
			},
			cancelText: {
				type: String,
				default: "取消"
			},
			cancelCallBack: {
				type: Object
			},
			confirmText: {
				type: String,
				default: "确认"
			},
			confirmCallBack: {
				type: Object
			}
		},
		computed: {
			wrapClass()
			{
				return [
					`${prefixCls}`, `${prefixCls}-wrap`
				]
			},
			innerClass()
			{
				return [
					`${prefixCls}`, `${prefixCls}-inner`
				]
			},
		},
		methods: {
			setDefaults()
			{
				this.userInput = "";
			},
			onClick_cancelBtn(event)
			{
				if (this.cancelCallBack && typeof this.cancelCallBack === "function")
				{
					this.cancelCallBack(event);
				};
				this.close();
				this.setDefaults();
			},
			onClick_confirmBtn(event)
			{
				if (this.confirmCallBack && typeof this.confirmCallBack === "function")
				{
					if (this.type == 'prompt')
					{
						this.confirmCallBack(this.userInput,event)
					}
					else
					{
						this.confirmCallBack(event)
					}
				}
				this.close();
				this.setDefaults();
			},
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>