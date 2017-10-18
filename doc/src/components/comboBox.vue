<template>
	<div>
		<label @click="onClick_label">
			<span v-if="this.selectName==''"><slot></slot></span>
			<span v-if="this.selectName!=''">{{selectName}}</span>
		</label>
		<list v-show="showList" :data="data" @click="onClick_list"/>
	</div>
</template>
<style>
	.comboBox {

	}
</style>
<script type="text/ecmascript-6">
	import List from './list.vue';

	export default{
		data(){
			return {
				showList: false,
				selectItem: null
			}
		},
		components: {List},
		props: {
			data: {default: []}
		},
		computed: {
			selectName()
			{
				if (this.selectItem)
				{
					return this.selectItem.name;
				}
				return "";
			}
		},
		methods: {
			onClick_list($item)
			{
				this.selectName = $item.name;
				this.$emit("change", $item);
			},
			onClick_label(e)
			{
				this.showList = true;
				document.addEventListener("click", this.onClick_page, this);
				e.stopPropagation();
			},
			onClick_page()
			{
				this.showList = false;
				document.removeEventListener("click", this.onClick_page, this);
			}
		}
	}
</script>
