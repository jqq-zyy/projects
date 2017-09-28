<template>
	<ul :class="['hw-navbar-con',vertical?'flow-vertical':'flow-horizontal']">
		<li v-for="item in listData" class="hw-navbar-item">
			<div @click="onClick_item(item.path)" class="hw-navbar-title"
				 :class="[item.lightList.indexOf(currPath) >= 0? 'hw-navbar-active':'']">
				<hw-icon :iconClass="item.iconClass" v-if="item.iconClass"></hw-icon>
				<hw-icon
						:iconUrl="item.lightList.indexOf(currPath) >= 0?item.lightIcon ?item.lightIcon:item.icon:item.icon"
						v-if="item.icon"></hw-icon>
				<span>{{item.name}}</span>
			</div>

			<hw-navbar v-if="checkChildren(item) && selectChild == item.path"
					   :listData="item.children"></hw-navbar>
		</li>
	</ul>
</template>
<script type="text/ecmascript-6">
	import Group from './../../group/index';
	const prefixCls = "hw-navbar";
	export default{
		name: "hw-navbar",
		created(){
		},
		data(){
			return {}
		},
		props: {
			listData: {
				type: Array,
				default: function ()
				{
					return []
				}
			},
			vertical: {
				type: Boolean
			},
			currPath: {
				type: String
			}
		},
		computed: {},
		methods: {
			onClick_item($path)
			{
				g.vue.router.push($path);
			},
			isValid(item)
			{
				return Array.isArray(item.children) && item.children.length > 0
			},
			checkChildren($data)
			{
				if (this.isValid($data))
				{
					return true;
				}
				return false;
			}
		}
	}
</script>
<style type="text/scss" lang="sass" rel="stylesheet/scss">
	.hw-navbar-active {
		color: #01aaef;
		border-bottom: 1px solid #01aaef;
	}

	.flex {
		display: flex;
	}

	.flow-vertical {
		@extend .flex;
		flex-direction: column;
	}

	.flow-horizontal {
		@extend .flex;
		flex-direction: row;
	}

	.hw-navbar-con {
		.hw-navbar-item {
			width: 200px;
			height: 80px;
			line-height: 80px;
			font-size: 20px;
			color: #ffffff;
		}
		.hw-navbar-item:hover {
			color: #01aaef;
			border-bottom: 1px solid #01aaef;
		}
		.hw-navbar-title {
			width: 100%;
			height: 100%;
			text-align: center;;
		}
	}


</style>