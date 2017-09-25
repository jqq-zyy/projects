<template>
	<div @click="onClick_affix" :class="wrapClass">
		<h4>{{title}}</h4>
		<p>{{content}}</p>
	</div>
</template>
<script type="text/ecmascript-6">
	import * as util from './../../../js/util';
	const prefixCls = "hw-affix";
	export default{
		name: "hw-affix",
		created(){
			this.initOffsetHash();
			this.initEvent();
		},
		data(){
			return {
				g: g,
				isFixed: false,
				offsetList: []
			}
		},
		computed: {
			wrapClass()
			{
				return [
					`${prefixCls}-wrap`, {
						[`${prefixCls}-wrap-fixed`]: this.isFixed
					}
				]
			}
		},
		props: {
			direction: {
				type: String,
				validator($value)
				{
					return util.oneOf($value, ['top', 'bottom', 'right', 'left'])
				},
				default: "top"
			},
			offset: {
				type: [String, Number],
				validator($value)
				{
					return !isNaN(parseInt($value))
				},
				default: 0
			},
			title: {
				type: String,
				default: "标题"
			},
			content: {
				type: String,
				default: "内容"
			}
		},
		methods: {
			initOffsetHash()
			{
				var self = this;
				this.offsetList = [
					{
						direction: "top",
						action()
						{
							return util.scroll.top() > parseInt(self.offset);
						}
					},
					{
						direction: "left",
						action()
						{
							return util.scroll.left() > parseInt(self.offset);

						}
					},
					{
						direction: "bottom",
						action()
						{
							return util.scroll.top() + util.getWindowSize('Height') > (util.scroll.height() - self.offset);

						}
					},
					{
						direction: "right",
						action()
						{
							return util.scroll.left() + util.getWindowSize('Width') > (util.scroll.width() - self.offset);

						}
					}
				];
			},
			addEvent()
			{
				document.addEventListener('scroll', this.handleScroll,false)
			},
			removeEvent()
			{
				document.removeEventListener('scroll', this.handleScroll, false)
			},
			onClick_affix()
			{
				this.$emit('close');
			},
			handleScroll($event)
			{
				for (var item of this.offsetList)
				{
					if (item.direction === this.direction)
					{
						this.isFixed = item.action();
					}
				}
			}
		},
		mounted()
		{
			this.addEvent();
		},
		beforeDestroy()
		{
			this.removeEvent();
		}
	}

</script>
<style type="text/css" lang="sass" rel="stylesheet/css">
	.fixed {
		position: fixed;
		left: 0;
		top: 0;
	}
</style>