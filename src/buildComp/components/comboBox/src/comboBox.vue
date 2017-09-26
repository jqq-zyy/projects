<template>
	<div :class="wrapClasses">
		<div>{{text?'text':defaultText}}</div>
		<hw-scroll-group>
			<hw-input type="search" v-if="hasSearch"></hw-input>
			<hw-list :data="data" @click="onClick_list"></hw-list>
		</hw-scroll-group>
	</div>
</template>
<script type="text/ecmascript-6">
	const prefixCls = "combo-box-item";
	export default{
		name: "hw-combo-box",
		created(){

		},
		data(){
			return {
				list: this.data,
				text: ""
			}
		},
		props: {
			defaultText: {
				type: String,
				default: "请选择"
			},
			data: {
				type: Array,
				default()
				{
					return []
				}
			},
			hasSearch: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			wrapClasses()
			{
				return [`${prefixCls}`, `${prefixCls}-wrap`]
			}
		},
		methods: {
			onClick_list($id)
			{
				for (var item of this.list)
				{
					if (item.id == $id)
					{
						this.text = item.name;
					}
				}
				;
				this.$emit('click', $id);
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>