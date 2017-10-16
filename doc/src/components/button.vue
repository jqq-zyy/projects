<template>
	<div :class="{btn:true , down:btnIsDown}" @click="onClick_btn" @mousedown="onMouseDown_btn">
		<slot></slot>
	</div>
</template>
<style lang="sass" rel="stylesheet/scss" type="text/css" scoped>
	.btn {
		.down {
		}
	}

	.btn:hover {

	}
</style>
<script type="text/ecmascript-6">
	export default{
		data(){
			return {
				tid: 0,
				btnIsDown: false
			}
		},
		props: {
			data: {defualt: ""},
			hold: {default: 0}
		},
		methods: {
			onClick_btn(e)
			{
				this.btnIsDown = false;
				e.stopPropagation();
				if (this.hold > 0)
				{
					if (this.tid > 0)
					{
						clearTimeout(this.tid);
					}
				}
				else
				{
					this.$emit("click", this.data);
				}
			},
			onMouseDown_btn(e)
			{
				this.btnIsDown = true;
				if (this.hold > 0)
				{
					this.tid = setTimeout(()=>
					{
						this.btnIsDown = false;
						this.tid = 0;
						this.$emit("click", this.data);
					}, this.hold * 1000);
				}
			}
		}
	}
</script>
