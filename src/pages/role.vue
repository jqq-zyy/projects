<template>
	<main-layout :isLoad="isLoad">
		<div slot="content" class="content-box">
			<div class="admin-main-wrap">
				<common-nav :nav="'role'"></common-nav>
				<div class="right-content-wrap">
					<common-top-nav></common-top-nav>
					<div class="admin-data-items">
						<div class="right-body">
							<div class="g-title">权限管理</div>
							<div class="bar-box role-bar">
								权限总数：{{roleList.length}}<span
									class="pointer border-btn pointer hb-fill-middle2-bg add-role-btn"
									@click="onClick_addRoleBtn">添加</span>
							</div>
							<div class="admin-calendar-table">
								<table>
									<thead>
									<tr>
										<th>权限名称</th>
										<th><span>|</span>权限范围</th>
										<th><span>|</span>创建时间</th>
										<th><span>|</span>操作</th>
									</tr>
									</thead>
									<tbody>
									<tr v-for="item in roleList">
										<td>{{item.roleName}}</td>
										<td>{{item.permissionDesc}}</td>
										<td>{{item.createTime}}</td>
										<td><span class="pointer border-btn hb-fill-middle2-bg role-del-btn"
												  @click="onClick_delBtn(item.id)">删除</span>
										</td>
									</tr>
									</tbody>
								</table>

							</div>

						</div>
						<common-footer></common-footer>
					</div>
				</div>
			</div>
			<transition name="bounce">
				<div class="affix-box default-pos-type" v-show="isShow_rolePop">
					<div class="pop-edit-password pop-edit function-pop">
						<div class="show-close-btn">
							<img :src="g.config.path.images+'/close.png'"
								 @click="onClick_closeBtn"/>
						</div>
						<div class="pop-tit">
							添加权限
						</div>
						<div class="pop-body ">
							<div class="m-title">
								<span class="name">权限名称：</span>
								<input type="text" placeholder="请输入职务名称" v-model="roleName">
							</div>
							<div class="m-title power-box">
								<span class="name">权限范围：</span>
								<hw-list :listData="powerList" :checkedList="selectKeys" :showArrow="true"
										 @change="onChange_list" class="role-list" :noShowRightList="[99]"></hw-list>
							</div>

							<div class="m-title button-box">
								<div class="button border-btn pointer hb-fill-middle2-bg" @click="onClick_closeBtn">取消
								</div>
								<div class="button bg-btn pointer hb-fill-middle2-rev" @click="onClick_saveBtn">保存</div>
							</div>
						</div>
					</div>
				</div>
			</transition>
			<transition name="bounce">
				<div class="affix-box default-pos-type" v-show="isShow_deletePop">
					<div class="pop-edit-password pop-edit function-pop">
						<div class="show-close-btn">
							<img :src="g.config.path.images+'/close.png'"
								 @click="onClick_closeBtn"/>
						</div>
						<div class="pop-tit">
						</div>
						<div class="pop-body ">
							<div class="m-title">
								该权限下仍有绑定用户，请先解绑用户后再进行删除。
							</div>
							<div class="m-title button-box">
								<div class="save-button bg-btn pointer hb-fill-middle2-rev">保存</div>
							</div>
						</div>
					</div>
				</div>
			</transition>
			<!--二次确认删除-->
			<transition name="bounce">
				<div class="affix-box default-pos-type" v-show="isShow_confirmPop">
					<div class="pop-edit-password pop-edit">
						<div class="show-close-btn">
							<img :src="g.config.path.images+'/close.png'"
								 @click="onClick_closeBtn()"/>
						</div>
						<div class="pop-tit">
							确认删除
						</div>
						<div class="pop-body">
							<div class="m-title text-center">
								确认删除吗？
							</div>
							<div class="m-title button-box">
								<span class="pointer button border-btn hb-fill-middle2-bg"
									  @click="onClick_closeBtn">取消</span>
								<!--<span class="button pointer cancel-btn bg-btn hb-fill-middle2-rev"
									  @click="onClick_confirmBtn">保存</span>-->
							</div>
						</div>

					</div>
				</div>
			</transition>
		</div>
	</main-layout>
</template>

<script type="text/ecmascript-6">
	import g from '../global';
	import MainLayout from './common/mainLayout.vue';
	import CommonNav from './common/CommonNav.vue';
	import CommonTopNav from './common/CommonTopNav.vue';
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
				isAdd: false,
//				isShow_addPop: false,
				isShow_rolePop: false,
				isShow_deletePop: false,
				isShow_confirmPop: false,
				roleList: [],
				roleName: "",
				roleId: "",
				powerList: [],
				selectKeys: [],
				currentRoleList: [],
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
			onClick_closeBtn(){
				this.isShow_rolePop = false;
				this.isShow_deletePop = false;
			},
			onClick_addRoleBtn(){
				this.isShow_rolePop = true;
			},
			onClick_delBtn($id){
				g.net.call("permission/delAdminRole", {
					'roleId': $id
				}).then(($data) =>
				{
					g.data.rolePool.remove($id);
					this.roleList = g.data.rolePool.list;
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onChange_list($data){
				this.currentRoleList = $data
			},
			onClick_saveBtn(){
				var permissionIds = this.currentRoleList.join(",")
				g.net.call("permission/addAdminRole", {
					'roleName': this.roleName,
					'permissionIds': permissionIds
				}).then(($data) =>
				{
					g.data.rolePool.add($data);
					this.roleList = g.data.rolePool.list;
					this.isShow_rolePop = false;
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onClick_confirmBtn()
			{

										}
		}
	}
</script>
<style lang="sass" type="text/scss" rel="stylesheet/scss" scoped>
	@import "../css/role.scss";

	.function-pop .tree-box {
		height: 300px;
		overflow: auto;
		margin-top: 10px;

	}

	.save-button {
		border-radius: 4px;
		width: 130px;
		height: 36px;
		text-align: center;
		line-height: 36px;
		color: #ffffff;
		background: #01aaef;

	}

	.name-box {
		height: 40px;
		line-height: 40px;
		margin-top: 20px;
		padding-left: 40px;
		input {
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

	.power-box {
		height: 300px;
		.role-list {
			height: auto;
			max-height: 258px;
			overflow-y: auto;
		}
	}
</style>