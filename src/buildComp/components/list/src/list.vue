<template>
	<ul :vertical="vertical">
		<li v-for="itemData in list"
			@mouseenter="onMouseEnter_item(itemData,$event)" @mouseleave="onMouseLeave_item(itemData,$event)">
			<div v-if="isValid(itemData)">
				<hw-icon v-if="showArrow  && isValid(itemData)"
						 @click="onClick_item(itemData,$event)" class="pointer"
						 :iconClass="currIdList.indexOf(itemData.id) >= 0 && isValid(itemData)?'icon-xiajiantou':'icon-youjiantou'"
				></hw-icon>
				<div v-if="!(showArrow  && isValid(itemData))" class="station"></div>
				<hw-icon
						:iconClass="checkedChildren.indexOf(itemData.id) >= 0?'icon-fangxingxuanzhong':'icon-fangxingweixuanzhong'"
						@click="onClick_icon(itemData)"
				></hw-icon>
				<span v-if="itemData.name" @click="onClick_icon(itemData)" class="pointer">{{itemData.name}}</span>
				<img :src="itemData.url" :alt="itemData.alt" v-if="itemData.url">
			</div>
			<ul	v-if="isValid(itemData) && currIdList.indexOf(itemData.id) >= 0"
					class="padleft">
				<list-item :data="child" v-for="child in itemData.children" :showArrow="showArrow"
						   @change="onChange_list" :checkedList="checkedChildren"
						   :noShowRightList="noShowRightList"></list-item>
			</ul>
		</li>
	</ul>
</template>
<script type="text/ecmascript-6">
	const prefixCls = "hw-list";
	import * as util from './../../../js/util';

	import ListItem from './../../list/src/listItem.vue';
	import Group from './../../group/index';
	export default{
		name: "hw-list",
		created(){
			this.list = this.listData;
			this.checkedChildren = this.checkedList;
			for (var item of this.list)
			{
				this.checkedAllChildren(item)
			}
		},
		data(){
			return {
				currIdList: [],
				list: this.listData,
				tmpItem: {},
				checkedChildren: this.checkedList
			}
		},
		props: {
			listData: {
				type: Array,
				default: function ()
				{
					return []
				}
			},
			noShowRightList: {
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
				util.insertOneOrZero(this.currIdList, $item.id);
				this.tmpItem = $item;
			},
			onClick_icon($item)
			{
				this.tmpItem = $item;
				util.insertOneOrZero(this.checkedChildren, $item.id)
				this.checkedAllChildren($item);
				this.$emit('change', this.checkedChildren);
			},
			onChange_list($idList)
			{
				this.checkedChildren = $idList;
				util.splice(this.checkedChildren, this.tmpItem.id);
				if ($idList.length > 0)
				{
					util.pushIn(this.checkedChildren, this.tmpItem.id);
				}
				this.$emit('change', this.checkedChildren);
			},
			checkedAllChildren($data)
			{
				if (util.typeOf($data['children']) === 'array' && $data['children'].length > 0)
				{
					for (var item of $data['children'])
					{
						if (this.checkedChildren.indexOf($data.id) >= 0)
						{
							util.pushIn(this.checkedChildren, item.id);
						}
						else
						{
							util.splice(this.checkedChildren, item.id)
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
				return Array.isArray(item.children) && item.children.length > 0 &&
						this.noShowRightList.indexOf(item.menuLevel) < 0;
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">
	@import "../../../css/base/base.scss";

	.padleft {
		padding-left: 40px;

	}

	.station {
		display: inline-block;
		width: 17px;
		height: 17px;
	}
</style>
