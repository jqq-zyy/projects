<template>
	<div :class="wrapClass">
		<div :class="innerClass">
			<img src="upload.jpg" :alt="text" v-if="type=='draggable'">
			<hw-input :htmlType="file" :value="text" :class="inputClass" :disabled="disabled"
					  @change="onChange_upload"></hw-input>
			<hw-icon :iconType="iconType" :iconClass="iconClass"></hw-icon>
		</div>
		<div :class="bottomClass">
			<p v-for="name in nameList">{{name}}</p>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import * as util from './../../../js/util';
	const prefixCls = "hw-upload";

	export default{
		name: "hw-upload",
		created(){

		},
		data(){
			return {
				nameList: []
			}

		},
		props: {
			type: {
				type: String,
				validator($val)
				{
					return util.oneOf($val, ["basic", "dashed", "draggable"])
				},
				default: "basic"
			},
			text: {
				type: String,
				default: "点击上传"
			},
			iconType: {
				type: String,
				default: "upload"
			},
			iconClass: {
				type: String
			},
			showUploadBtn: {
				type: Boolean,
				default: true
			},
			disabled: {
				type: Boolean,
				default: false
			},
			resultType: {
				type: String,
				validator($val)
				{
					return util.oneOf($val, ["file", "base64"])
				},
				default: "fileObj"
			}
		},
		computed: {
			wrapClass()
			{
				return [`${prefixCls}`, `${prefixCls}-wrap`, `${prefixCls}-wrap-${this.type}`, {
					[`${prefixCls}-wrap-disabled`]: this.disabled
				}]
			},
			inputClass()
			{
				return [`${prefixCls}`, `${prefixCls}-input`, `${prefixCls}-input-${this.type}`, {
					[`${prefixCls}-input-showbtn`]: this.showUploadBtn
				}]
			},
			innerClass()
			{
				return [`${prefixCls}`, `${prefixCls}-inner`, `${prefixCls}-inner-${this.type}`, {
					[`${prefixCls}-inner-disabled`]: this.disabled
				}]
			},
			bottomClass()
			{
				return [`${prefixCls}`, `${prefixCls}-bottom`, `${prefixCls}-bottom-${this.type}`, {
					[`${prefixCls}-bottom-disabled`]: this.disabled
				}]
			},
		},
		methods: {
			onChange_upload($event)
			{
				var value = $event.target.value;
				util.insertOneInArray(value, this.nameList);

				if (this.resultType == "fileObj")
				{
					this.$emit('change', $event.target.files[0])
				}
				else if (util.isImg(value))
				{
					var baseData = util.getBase64($event.target.files[0]);
					this.$emit('change', baseData)
				}
				else
				{
					console.error('文件类型转换失效，请确保文件类型正确')
				}
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>