<template>
	<hw-popup :class="wrapClass" @click="onClick_popUp">
		<div :class="innerClass">
			<h4>
				<hw-icon :iconType="iconType" :iconUrl="iconUrl" :iconClass="iconClass"></hw-icon>
				{{title}}
			</h4>
			<p>{{desc}}</p>
		</div>
		<hw-btn :type="btnType" @click="onClick_okBtn" :text="btnText"></hw-btn>
	</hw-popup>
</template>
<script type="text/ecmascript-6">
	const prefixCls = "hw-alert";
	export default{
		name: "hw-alert",
		created(){

		},
		data(){
			return {

			}
		},
		props: {
			title: {
				type: String,
				default: "系统提示"
			},
			desc: {
				type: String
			},
			btnType: {
				type: String,
				default: "primary"
			},
			btnText: {
				type: String,
				default: "确定"
			},
			iconType: {
				type: String
			},
			iconUrl: {
				type: String
			},
			iconClass: {
				type: String
			},
			callback: {
				type: Object
			}
		},
		computed: {
			wrapClass()
			{
				return [
					`${prefixCls}-wrap`
				]
			},
			innerClass()
			{
				return [
					`${prefixCls}-inner`
				]
			},
		},
		methods: {
			onClick_okBtn()
			{
				if (this.callback && typeof thid.callback === "function")
				{
					this.callback();
				}
				this.close();
			},
			onClick_popUp()
			{
				this.onClick_okBtn();
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>