<template>
	<label :class="wrapClass">
		<span :class="checkboxClass">
			<input type="checkbox" @change="onChange_check" :class="innerClass" :disabled="disabled"
				   :name="name" :checked="value" :ref="refId">
			<hw-icon :iconUrl="iconUrl" :iconClass="iconClass"></hw-icon>
		</span>
		{{label}}
	</label>
</template>
<script type="text/ecmascript-6">
	const prefixCls = 'hw-checkbox';
	export default{
		name: "hw-checkbox",
		created(){

		},
		data(){
			return {}
		},
		props: {
			value: {
				type: Boolean
			},
			name: {
				type: String
			},
			refId: {
				type: String
			},
			label: {
				type: String
			},
			hasSquare: {
				type: Boolean
			},
			disabled: {
				type: Boolean
			},
			iconUrl: {
				type: String
			},
			iconClass: {
				type: [String, Array]
			}
		},
		computed: {
			wrapClass()
			{
				return [
					`${prefixCls}-wrapper`,
					{
						[`${prefixCls}-wrapper-checked`]: this.value,
						[`${prefixCls}-wrapper-disabled`]: this.disabled
					}
				]
			},
			checkboxClass()
			{
				return [
					`${prefixCls}-checkbox`,
					{
						[`${prefixCls}-checkbox-checked`]: this.value,
						[`${prefixCls}-checkbox-disabled`]: this.disabled
					}
				]
			},
			innerClass()
			{
				return [
					`${prefixCls}-inner`,
					{
						[`${prefixCls}-inner-checked`]: this.value,
						[`${prefixCls}-inner-disabled`]: this.disabled,
						[`${prefixCls}-inner-transparent`]: !this.hasSquare
					}
				]
			}
		},
		methods: {
			onChange_check($event)
			{
				this.$emit('input', $event.target.checked);
				this.$emit('change',$event);
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">
	.transparent {
		opacity: 0;
	}
</style>