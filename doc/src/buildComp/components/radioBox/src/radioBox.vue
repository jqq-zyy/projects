<template>
	<label :class="wrapClass">
		<span :class="radioClass">
			<hw-icon :iconClass="iconClass" :iconUrl="iconUrl"></hw-icon>
			<input type="radio" :class="inputClass" :disabled="disabled" @change="onChange_radio"
				   :value="value" :checked="checked" :name="name"/>
		</span>
		{{label}}
	</label>
</template>
<script type="text/ecmascript-6">
	const prefixCls = 'hw-radio';
	export default{
		name: "hw-radio",
		created(){

		},
		data(){
			return {}
		},
		model: {
			prop: 'checked',
			event: 'change'
		},
		props: {
			disabled: {
				type: Boolean,
				default: false
			},
			checked: {
				type: Boolean
			},
			label: {
				type: String,
				required: true
			},
			name: {
				type: String
			},
			value: {
				type: String
			},
			hasCircle: {
				type: Boolean,
				default: true
			},
			iconClass: {
				type: [String, Array]
			},
			iconUrl: {
				type: String
			}
		},
		computed: {
			wrapClass()
			{
				return [
					`${prefixCls}-wrapper`,
					{
						[`${prefixCls}-wrapper-checked`]: !!this.value,
						[`${prefixCls}-wrapper-disabled`]: this.disabled
					}
				]
			},
			radioClass()
			{
				return [
					`${prefixCls}-radio`,
					{
						[`${prefixCls}-radio-checked`]: !!this.value,
						[`${prefixCls}-radio-disabled`]: this.disabled
					}
				]
			},
			inputClass()
			{
				return [
					`${prefixCls}-inner`,
					{
						[`${prefixCls}-inner-checked`]: !!this.value,
						[`${prefixCls}-inner-disabled`]: this.disabled,
						[`${prefixCls}-inner-transparent`]: !this.hasCircle
					}
				]
			}
		},
		methods: {
			onChange_radio($event)
			{
				this.$emit('change', $event.target.checked);
				this.$emit('select', $event.target.value);
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">
	.hw-radio-inner-transparent {
		opacity: 0;
	}
</style>