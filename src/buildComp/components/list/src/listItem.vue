<template>
	<li @mouseenter="onMouseEnter_item(itemData,$event)"
		@mouseleave="onMouseLeave_item(itemData,$event)" class="tree-node">
		<div v-if="isValid(itemData)" ref="treeNode" class="tree-node-wrap">
			<hw-icon v-if="showArrow  && noArrow(itemData)"
					 @click="onClick_item(itemData,$event)" class="pointer"
					 :iconClass="isValid(itemData) ? currIdList.indexOf(itemData.id) >= 0 ?'icon-xiajiantou':'icon-youjiantou':''"
			></hw-icon>

			<hw-icon
					:iconClass="checkedChildren.indexOf(itemData.id) >= 0?'icon-fangxingxuanzhong':'icon-fangxingweixuanzhong'"
					@click="onClick_icon(itemData)"
			></hw-icon>

			<span @click="onClick_icon(itemData)" class="pointer item-color">{{itemData.name}}</span>

		</div>
		<ul v-if="isValid(itemData) && currIdList.indexOf(itemData.id) >= 0" class="padleft">
			<list-item :data="child" v-for="child in itemData.children" :showArrow="showArrow"
					   :checkedList="checkedChildren"
					   @change="onChange_list" :noShowRightList="noShowRightList"></list-item>

		</ul>
	</li>

</template>
<script type="text/ecmascript-6">
	const prefixCls = "list-item";
	import * as util from './../../../js/util';
	import Group from './../../group/index';
	export default{
		name: "list-item",
		created(){
			this.itemData = this.data;
			this.checkedChildren = this.checkedList;
			this.checkedAllChildren(this.itemData);
			this.$nextTick(() =>
			{
				console.dir(this.$refs.treeNode);
			})
		},
		data(){
			return {
				currIdList: [],
				itemData: this.data,
				checkedChildren: []
			}
		},
		props: {
			data: {
				type: Object,
				default: function ()
				{
					return {}
				}
			},
			checkedList: {
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
			},
			onClick_icon($item)
			{
				util.insertOneOrZero(this.checkedChildren, $item.id)
				this.checkedAllChildren($item);
				this.$emit('change', this.checkedChildren);
				this.$forceUpdate();
			},
			onChange_list($idList)
			{
				this.checkedChildren = $idList;
				util.splice(this.checkedChildren, this.itemData.id);
				if ($idList.length > 0)
				{
					util.pushIn(this.checkedChildren, this.itemData.id);
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
			},
			noArrow(item)
			{
				return this.noShowRightList.indexOf(item.menuLevel) >= 0;
			}

		}
	}
</script>
<style type="text/scss" lang="sass" rel="stylesheet/scss">
@import "./../../../css/base/base.scss";

	.padleft {
		padding-left: 40px;
	}
	.item-color{
		color : #666;
	}
</style>
