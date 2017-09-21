<template>
	<main-layout :isLoad="isLoad">
		<div slot="content" class="content-box">
			<div class="admin-main-wrap">
				<common-nav :nav="'role'"></common-nav>
				<div class="right-content-wrap">
					<common-top-nav></common-top-nav>
					<div class="admin-data-items">

						<div class="right-body">
							<div class="g-title">管理</div>

						</div>
						<common-footer></common-footer>
					</div>
				</div>
			</div>


		</div>
	</main-layout>
</template>

<script type="text/ecmascript-6">
	import g from '../global';
	import MainLayout from './common/mainLayout.vue';
	import CommonNav from './common/CommonNav.vue';
	import CommonTopNav from './common/CommonTopNav.vue';
//	import treeMenu from './common/CommonTree.vue';
	import CommonFooter from './common/CommonFooter.vue';

	export default {
		created(){
			this.isLoad = true;
			this.init();
		},
		data(){
			return {
				isLoad: false,
				g: g,
				isShow_setRolePop: false,
				isShow_editNamePop: false,
				isAdd:false,
//				isShow_addPop: false,
				roleList: [],
				roleName: "",
				roleId: "",
				powerList: [],
				selectKeys: [],
				currentRoleList: []
			}
		},
		components: {
			MainLayout,
			CommonNav,
			CommonTopNav,
//			treeMenu,
			CommonFooter
		},
		methods: {
			init(){
				this.roleList = g.data.rolePool.list;
				this.powerList = g.data.powerPool.list;

			},
			onClick_deleteBtn($id){
				g.net.call("permission/delShopRole", {
					'roleId': $id
				}).then(($data) =>
				{
					g.data.rolePool.remove($id);
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onClick_closeBtn(){
				this.isShow_setRolePop = false;
				this.isShow_editNamePop = false;
				this.isShow_addPop = false;
			},
			onClick_saveTreeBtn(){
				this.onGet_treeList();
				var permissionIds = this.currentRoleList.join(",");
				g.net.call("permission/updateShopRolePermission", {
					'roleId': this.roleId,
					'permissionIds':permissionIds
				}).then(($data) =>
				{
					var obj = {};
					obj.permissionIds = permissionIds;
					g.data.rolePool.getDataById(this.roleId).update(obj);
					this.isShow_setRolePop = false;
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onGet_treeList(){
				this.currentRoleList = [];
				var trees = this.$refs.tree;
				for (var i = 0; i < trees.length; i++)
				{
					var roles = trees[i].getAllKeys();
					if (roles.length == 0)
					{
						continue
					}
					this.currentRoleList.push(roles.join(","))
				}
			},

			onClick_setRoleBtn($id){
				this.roleId = $id;
				var roleStr = g.data.rolePool.getDataById($id).roleStr;
				this.selectKeys = roleStr.split(",");
				this.isAdd = false;
				this.isShow_setRolePop = true;
			},
			onClick_editBtn($id){
				this.roleId = $id;
				this.roleName = g.data.rolePool.getDataById($id).roleName;
				this.isShow_editNamePop = true;
			},
			onClick_saveNameBtn(){
				g.net.call("permission/updateShopRoleName", {
					'roleId': this.roleId,
					'roleName': this.roleName
				}).then(($data) =>
				{
					g.data.rolePool.getDataById(this.roleId).update({'roleName': this.roleName});
					this.isShow_editNamePop = false
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onClick_addBtn(){
				this.roleName = "";
				this.selectKeys = [];
				this.isShow_setRolePop = true;
				this.isAdd = true;
			},
			onClick_saveAddBtn(){
				this.onGet_treeList();
				var permissionIds = this.currentRoleList.join(",");
				g.net.call("permission/addShopRole", {
					'roleName': this.roleName,
					"permissionIds":permissionIds
				}).then(($data) =>
				{
					g.data.rolePool.add($data.content);
					this.roleList = g.data.rolePool.list;
					this.isShow_setRolePop = false;

				}, (err) =>
				{
					g.func.dealErr(err);
				});
			}
		}
	}
</script>
<style lang="sass" type="text/scss" rel="stylesheet/scss">
	@import "../css/common.scss";
	@import "../css/membeManage.scss";
	@import "../css/role.scss";
	@import "../css/pop.scss";

	.function-pop .tree-box {
		height: 300px;
		overflow: auto;
		margin-top:10px;
	}
	.save-button{
		border-radius: 4px;
		width: 130px;
		height: 36px;
		text-align: center;
		line-height: 36px;
		color: #ffffff;
		background: #01aaef;
	}
	.name-box{
		height:40px;
		line-height: 40px;
		margin-top:20px;
		padding-left:40px;
		input{
			width: 240px;
			height: 40px;
			box-sizing: border-box;
			border: 1px solid #dddddd;
			line-height: 40px;
			text-indent: 1em;
			border-radius: 3px;
			-webkit-border-radius: 3px;
			-moz-border-radius: 3px;
		}
	}
</style>