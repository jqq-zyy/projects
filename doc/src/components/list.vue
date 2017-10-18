<template>
	<ul>
		<li v-for="item of data" @click="onClick_item(item,$index)">{{item.name}}</li>
	</ul>
</template>
<style>
</style>
<script>
	export default{
		data(){
			return {
				msg: 'hello vue'
			}
		},
		props: {
			data: {default: []}
		},
		methods: {
			onClick_item($item, $index)
			{
				$item.index = $index
				this.$emit("click", $item);
			}
		}
	}
</script>
