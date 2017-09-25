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
								权限总数：4<span class="pointer border-btn pointer hb-fill-middle2-bg add-role-btn"
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
									<tr>
										<td></td>
										<td></td>
										<td></td>
										<td><span class="pointer border-btn hb-fill-middle2-bg role-del-btn"
												  @click="onClick_delBtn">删除</span>
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
								 @click="onClick_closeBtn" />
						</div>
						<div class="pop-tit">
							添加权限
						</div>
						<div class="pop-body ">
							<div class="m-title">
								<span class="name">权限名称：</span>
								<input type="text" placeholder="请输入职务名称">
							</div>
							<div class="m-title">
								<span class="name">权限范围：</span>
							</div>
							<div class="m-title button-box">
								<div class="button border-btn pointer hb-fill-middle2-bg">取消</div>
								<div class="button bg-btn pointer hb-fill-middle2-rev">保存</div>
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
								 @click="onClick_closeBtn" />
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
				isAdd: false,
//				isShow_addPop: false,
				isShow_rolePop: false,
				isShow_deletePop: false,
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

			onClick_closeBtn(){
				this.isShow_rolePop = false;
				this.isShow_deletePop = false;			},
			onClick_addRoleBtn(){
				this.isShow_rolePop = true;
			},
			onClick_delBtn(){
				this.isShow_deletePop = true;
			}
		}
	}
</script>
<style lang="sass" type="text/scss" rel="stylesheet/scss">
	@import "../css/common.scss";
	@import "../css/role.scss";
	@import "../css/pop.scss";

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
</style>