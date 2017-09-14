<template>
	<ul :vertical="vertical">
		<li v-for="itemData in list"
			@mouseenter="onMouseEnter_item(itemData,$event)"
			@mouseleave="onMouseLeave_item(itemData,$event)">
			<div>
				<hw-icon v-if="showArrow" @click="onClick_item(itemData,$event)"
						 :iconClass="currIdList.indexOf(itemData.id) >= 0 && isValid(itemData)?'icon-xiajiantou':'icon-youjiantou'"
				></hw-icon>
				<hw-icon
						:iconClass="checkedChildren.indexOf(itemData.id) >= 0?'icon-fangxingxuanzhong':'icon-fangxingweixuanzhong'"
						@click="onClick_icon(itemData)"
				></hw-icon>
				<span>{{itemData.name}}</span>
			</div>
			<ul v-show="isValid(itemData) && currIdList.indexOf(itemData.id) >= 0" class="padleft">
				<list-item :data="child" v-for="child in itemData.children" :showArrow="showArrow"
						   @change="onChange_list" :checkedList="checkedChildren"></list-item>
			</ul>
		</li>
	</ul>
</template>
<script type="text/ecmascript-6">
	const prefixCls = "hw-list";
	import * as func from './../../../js/func';

	import ListItem from './../../list/src/listItem.vue';
	import Group from './../../group/index';
	export default{
		name: "hw-list",
		created(){
			this.list = this.dataList;
			this.checkedChildren = this.checkedList;
			for (var item of this.list)
			{
				this.checkedAllChildren(item)
			}
		},
		data(){
			return {
				currIdList: [],
				list: this.dataList,
				tmpItem: {},
				checkedChildren: this.checkedList
			}
		},
		props: {
			dataList: {
				type: Array,
				default: function ()
				{
					return []
				}
			},
			checkedList: {
				type: Array,
				default: function ()
				{
					return []
				}
			},
			showArrow: {
				type: Boolean,
				default: false
			},
			vertical: {
				type: Boolean
			},
			iconType: {
				type: String
			},
			iconClass: {
				type: String
			}
		},
		components: {
			'list-item': ListItem,
			'hw-group': Group
		},
		computed: {
			wrapClass()
			{
				return [
					`${prefixCls}-wrap`
				]
			}
		},
		methods: {
			onClick_item($item, $event)
			{
				func.insertOneOrZero(this.currIdList, $item.id);
				this.tmpItem = $item;
			},
			onClick_icon($item)
			{
				this.tmpItem = $item;
				func.insertOneOrZero(this.checkedChildren, $item.id)
				this.checkedAllChildren($item);
				this.$emit('change', this.checkedChildren);
			},
			onChange_list($idList)
			{
				this.checkedChildren = $idList;
				func.splice(this.checkedChildren, this.tmpItem.id);
				if ($idList.length > 0)
				{
					func.pushIn(this.checkedChildren, this.tmpItem.id);
				}
				this.$emit('change', this.checkedChildren);
			},
			checkedAllChildren($data)
			{
				if (func.typeOf($data['children']) === 'array' && $data['children'].length > 0)
				{
					for (var item of $data['children'])
					{
						if (this.checkedChildren.indexOf($data.id) >= 0)
						{
							func.pushIn(this.checkedChildren, item.id);
						}
						else
						{
							func.splice(this.checkedChildren, item.id)
						}
						this.checkedAllChildren(item);
					}
				}
			},
			onMouseEnter_item($id, $event)
			{
				this.$emit('mouseenter', $id, $event);
			},
			onMouseLeave_item($id, $event)
			{
				this.$emit('mouseleave', $id, $event);
			},
			isValid(item)
			{
				return Array.isArray(item.children) && item.children.length > 0
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">
	@import "../../../css/base/base.scss";

	.padleft {
		padding-left: 40px;
	}
</style>
