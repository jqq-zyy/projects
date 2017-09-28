<template>
	<hw-group :class="wrapClass">
	
		<hw-btn iconType="left-arrow" v-if="updateBtn" @click="onClick_prevBtn"></hw-btn>
		<hw-list :class="innerClass" @click="onClick_list" :currId="currId" @mouseenter="onMouseEnter_list"
				 @mouseleave="onMouseLeave_list"></hw-list>
		<ul :class="circleClass" v-if="pageDot">
			<li v-for="(item,index) in data" :key="item" @click="onClick_circle">{{dotNum?(index+1):''}}</li>
		</ul>
		<hw-btn iconType="right-arrow" v-if="updateBtn" @click="onClick_nextBtn"></hw-btn>
	</hw-group>
</template>
<script type="text/ecmascript-6">
	import * as util from './../../../js/util';
	const prefixCls = "hw-carousel";
	let _timerId = 0, _lastClick = 0;
	export default{
		name: "hw-carousel",
		created(){
			this.autoPlaySlide()
		},
		data(){
			return {
				currId: "",
				list: data
			}
		},
		props: {
			data: {
				type: Array,
				default()
				{
					return []
				}
			},
			autoPlay: {
				type: Number,
				default: 3000
			},
			updateBtn: {
				type: Boolean,
				default: false
			},
			pageDot: {
				type: Boolean,
				default: false
			},
			dotType: {
				type: String,
				validator($val)
				{
					return util.oneOf($val, ['circle', 'square'])
				},
				default: 'circle'
			},
			dotPos: {
				type: String,
				validator($val)
				{
					return util.oneOf($val, ['middle', 'right'])
				},
				default: "middle"
			},
			dotNum: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			wrapClass()
			{
				return [
					`${prefixCls}`, `${prefixCls}-wrap`,
					`${prefixCls}-wrap-${this.pageDotType}`,
					`${prefixCls}-wrap-${this.pageDotPos}`
				]
			},
			innerClass()
			{
				return [
					`${prefixCls}`, `${prefixCls}-inner`,
					`${prefixCls}-inner-${this.pageDotType}`,
					`${prefixCls}-inner-${this.pageDotPos}`
				]
			},
			circleClass()
			{
				return [
					`${prefixCls}`, `${prefixCls}-circle`,
					`${prefixCls}-circle-${this.pageDotType}`,
					`${prefixCls}-circle-${this.pageDotPos}`
				]
			}
		},
		methods: {
			onClick_list($id)
			{
				if (this.currId != $id)
				{
					this.currId = $id;
					this.$emit('change', $id);
				}
			},
			onClick_circle($id)
			{
				clearInterval(_timerId);
				this.currId = $id;
			},
			onClick_prevBtn()
			{
				clearInterval(_timerId);
				var index = this.getCurrIndex();
				if ((index - 1) > 0)
				{
					index--
				}
				else
				{
					index = this.list.length - 1;
				}
				this.currId = this.list[index].id;
			},
			onClick_nextBtn()
			{
				clearInterval(_timerId);
				this.updateSlide();
			},
			getCurrIndex()
			{
				for (var item of this.list)
				{
					if (item.id == this.currId)
					{
						var index = this.list.indexOf(item);
					}
				}
				return index;
			},
			updateSlide()
			{

				var index = this.getCurrIndex();
				if ((index + 1) > this.list.length)
				{
					index = 0;
				}
				else
				{
					index++
				}
				this.currId = this.list[index].id;
			},
			onMouseEnter_list()
			{
				clearInterval(_timerId);
			},
			onMouseLeave_list()
			{
				this.autoPlaySlide();
			},
			autoPlaySlide()
			{
				if (this.autoPlay != 0)
				{
					clearInterval(_timerId);
					var self = this;
					_timerId = setInterval(() =>
					{
						self.updateSlide()
					}, this.autoPlay)
				}
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>