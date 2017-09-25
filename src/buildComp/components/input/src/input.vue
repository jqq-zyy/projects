<template>
	<label :class="wrapClass">
		{{label}}
		<div :class="inputClass" v-if="type=='textarea'">
			<textarea v-if="type=='textarea'" :cols="cols" :rows="rows" :disabled="disabled" :class="innerClass"
				  :maxlength="maxlength" :placeholder="placeholder" :value="value" :readonly="readonly"
				  @dblclick="onDbClick_input" @input="onInput_input" @focus="onFocus_input"
				  @blur="onBlur_input"></textarea>
		</div>
		<div :class="inputClass" v-if="type!='textarea'">
			<input :type="status=='hide'?type:'text'" :disabled="disabled"
				   :class="innerClass"
				   :placeholder="placeholder" :value="value" :readonly="readonly" @dblclick="onDbClick_input"
				   :maxlength="maxlength"
				   @input="onInput_input" :max="maxNum" :minNum="minNum" :step="step" @focus="onFocus_input"
				   @blur="onBlur_input" @keyup.enter="onKeyupEnter_searchInput" @click="onClick_input"
				   @change="onChange_input">
			<hw-icon v-if="value.length > 0 && type != 'file'" iconType="close" @click="onClick_delBtn"></hw-icon>
			<hw-icon v-if="htmlType=='password' && canCheckPwd"
					 :iconType="status=='hide'?'eye':'eye-slash'" @click="onClick_togglePwd"></hw-icon>
			<hw-icon v-if="htmlType=='search'" iconType="search" @click="onClick_searchIcon"></hw-icon>
			<slot></slot>

		</div>
	</label>
</template>
<script type="text/ecmascript-6">
	import * as util from './../../../js/util'
	import Icon from './../../icon/index'
	const prefixCls = "hw-input";
	export default{
		name: "hw-input",
		created(){

		},
		data(){
			return {
				state: "",
				status: "hide",
				rightIcon: "",
				wrongIcon: "",
				isFocus: ""
			}
		},
		modal: {
			prop: "value",
			event: "input"
		},
		components: {
			"hw-icon": Icon
		},
		props: {
			htmlType: {
				type: String,
				validator($value)
				{
					return util.oneOf($value, ["number", "search", "text", "textarea", "password", "file"])
				},
				required: true
			},
			label: {
				type: String
			},
			placeholder: {
				type: String
			},
			value: {
				type: [String, Number]
			},
			resizable: {
				type: Boolean
			},
			cols: {
				type: [String, Number],
				default: 30
			},
			rows: {
				type: [String, Number],
				default: 10
			},
			maxlength: {
				type: Number
			},
			disabled: {
				type: Boolean,
				default: false
			},
			readonly: {
				type: Boolean,
				default: false
			},
			className: {
				type: String
			},
			isFilterTag: {
				type: Boolean,
				default: true
			},
			regexp: {
				type: RegExp
			},
			iconClass: {
				type: [Array, String]
			},
			canCheckPwd: {
				type: Boolean,
				default: true
			},
			maxNum: {
				type: Number
			},
			minNum: {
				type: Number
			},
			step: {
				type: Number
			}
		},
		computed: {
			type()
			{
				if (this.htmlType == "search")
				{
					return "text";
				}
				return this.htmlType
			},
			wrapClass()
			{
				return [
					`${prefixCls}-wrap`,
					{
						[`${this.className}`]: !!this.className,
						[`${prefixCls}-wrap-disabled`]: this.disabled,
						[`${prefixCls}-wrap-focus`]: this.isFocus
					}
				]
			},
			inputClass()
			{
				return [
					`${prefixCls}-input`,
					{
						[`${prefixCls}-input-disabled`]: this.disabled,
						[`${prefixCls}-input-focus`]: this.isFocus
					}
				]
			},
			innerClass()
			{
				return [
					`${prefixCls}-inner`,
					{
						[`${prefixCls}-inner-disabled`]: this.disabled,
						[`${prefixCls}-inner-noresize`]: this.noresize,
						[`${prefixCls}-inner-focus`]: this.isFocus
					}
				]
			}
		},
		methods: {
			onDbClick_input($event)
			{
				$event.target.select();
			},
			onInput_input($event)
			{
				var value = $event.target.value;
				if (this.isFilterTag)
				{
					value = util.removeHTMLTag(value)
				}
				this.$emit('input', value)
			},
			onClick_delBtn()
			{
				this.$emit('input', "");
			},
			onClick_togglePwd()
			{
				if (this.status == "show")
				{
					this.status = "hide";
				}
				else
				{
					this.status = "show";
				}
			},
			onFocus_input()
			{
				this.isFocus = true;
			},
			onBlur_input()
			{
				this.isFocus = false;
			},
			onKeyupEnter_searchInput()
			{
				if (this.htmlType == 'search')
				{
					this.onClick_searchIcon();
				}
			},
			onClick_searchIcon()
			{
				this.$emit('click');
			},
			onClick_input($event)
			{
				this.$emit('click', $event);
			},
			onChange_input($event)
			{
				this.$emit('change', $event);
			}
		},
		watch: {
			value($val)
			{
				if (!!this.regexp && String($val).length > 0)
				{
					if (this.regexp.test($val))
					{
						this.state = "right"
					}
					else
					{
						this.state = "wrong"
					}
				}
				else if (!!this.maxlength)
				{
					if (String($val).length > this.maxlength)
					{
						this.state = "wrong"
					}
					else
					{
						this.state = "right"
					}
				}
				else
				{
					this.state = "";
				}
				this.$emit('input', $val)

			}
		}

	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">
	.hw-relative {
		position: relative;
	}
</style>