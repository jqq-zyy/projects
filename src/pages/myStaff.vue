<template>
	<main-layout :isLoad="isLoad">
		<div slot="content" class="content-box">
			<div class="admin-main-wrap">
				<common-nav :nav="'role'"></common-nav>
				<div class="right-content-wrap">
					<common-top-nav></common-top-nav>
					<div class="admin-data-items">
						<div class="right-body">
							<div class="g-title">
								我的员工
							</div>
							<div class="bar-box role-bar">
								员工总人数：{{totalStaffNum}}<span class="add-button border-btn hb-fill-middle2-bg  pointer"
															 @click="onClick_addBtn">添加员工
							</span>
							</div>
							<div class="admin-data-items">
								<div class="admin-calendar-table staff-table">
									<table>
										<thead>
										<tr>
											<th>用户名</th>
											<th><span>|</span>手机号</th>
											<th><span>|</span>权限</th>
											<th><span>|</span>创建时间</th>
											<th><span>|</span>状态</th>
											<th><span>|</span>操作</th>
										</tr>
										</thead>
										<tbody>
										<tr v-for="item in staffList">
											<td>{{item.userName}}</td>
											<td>{{item.telphone}}</td>
											<td>{{item.roleName}}</td>
											<td :title="item.createTime">{{item.createTime}}</td>
											<td class="status" style="width: 8%;">{{item.userStatusDesc}}</td>
											<td>
												<span class="pointer border-btn hb-fill-middle2-bg role-del-btn"
													  @click="onClick_editBtn(item.id)">编辑</span>
												<span class="pointer bg-btn hb-fill-middle2-rev role-del-btn"
													  v-text="staffCurrentStatus(item.userStatus)"
													  @click="onClick_changeType(item.id,item.userStatus)"></span>
											</td>

										</tr>
										</tbody>
									</table>

								</div>
							</div>
							<common-page :index="searchObj.page" :total="totalPage"
										 @change="onChange_searchItem" v-show="staffList.length>=1"></common-page>
							<common-prompt v-show="staffList.length==0"></common-prompt>

						</div>
						<common-footer></common-footer>


					</div>
				</div>
			</div>
			<transition name="bounce">
				<div class="affix-box default-pos-type" v-show="isShow_addStaffPop">
					<div class="pop-edit-password pop-edit" ref="modPwdBox">
						<div class="show-close-btn">
							<img :src="g.config.path.images+'/close.png'"
								 @click="onClick_closeBtn()" />
						</div>
						<div class="pop-tit" v-show="isAdd">
							添加员工
						</div>
						<div class="pop-tit" v-show="!isAdd">
							编辑员工
						</div>
						<div class="pop-body">
							<div class="m-title">
								<span class="name ">用户名：</span>
								<input type="text" v-model="staffObj.logon">
							</div>
							<div class="m-title">
								<span class="name">手机号：</span>
								<input class="input-code" type="text" v-model="staffObj.telphone">
							</div>
							<div class="m-title">
								<span class="name">权限：</span>
								<div class="m-drop" @click="onClick_roleList">
									{{roleName}}
									<span :class="['drop-icon',isShow_roleList?'rotate':'']"></span>
									<ul class="drop-list" v-show="isShow_roleList">
										<li v-for="item in roleList"
											@click="onClick_roleItem(item.id,item.roleName)">
											{{item.roleName}}
										</li>
									</ul>
								</div>
							</div>
							<div class="m-title" v-show="isAdd">
								<span class="name">初始密码：</span>
								<span>888888</span>
							</div>
							<div class="m-title" v-show="!isAdd">
								<span class="name">密码：</span>
								<input class="input-code" type="text" v-model="confirmPwd">
							</div>
							<div class="m-title button-box">
								<span class="pointer button border-btn hb-fill-middle2-bg"
									  @click="onClick_closeBtn">取消</span>
								<span class="button pointer cancel-btn bg-btn hb-fill-middle2-rev"
									  @click="onClick_confirmBtn">保存</span>
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
	import CommonPage from './common/CommonPage.vue';
	import {getRoleList} from './role';
	import {getEmployeeList} from './myStaff';
	import CommonFooter from './common/CommonFooter.vue';
	import CommonPrompt from './common/CommonPrompt.vue';
	import sha256 from 'sha256';

	export default {
		created(){
			this.init();
			this.isLoad = true;
		},
		data(){
			return {
				isLoad: false,
				g: g,
				isShow_addStaffPop: false,
				isShow_roleList: false,
				searchObj: {},
				totalPage: 1,
				staffList: [],
				totalStaffNum: 0,
				roleList: [],
				roleName: "请选择",
				staffObj: {},
				isAdd: false,
				confirmPwd: ""
			}
		},
		components: {
			MainLayout,
			CommonNav,
			CommonTopNav,
			CommonPage,
			CommonFooter,
			CommonPrompt,
		},
		methods: {
			init(){
				this.initAddData();
				this.initSearchData();
				this.initData()

			},
			initData(){
				this.staffList = g.data.staffPool.list;
				this.totalPage = g.data.staffPool.totalPage;
				this.totalStaffNum = g.data.staffPool.total;
			},
			initAddData(){
				this.staffObj = {
					"logon": "",
					"roleId": "",
					"telphone": "",
					"password": sha256('888888')
				}
			},
			initSearchData(){
				this.searchObj = {
					'page': 1,
					'pageSize': g.param.pageSizeList[0],
					'sortOrder': "desc",
					'sortField': "create_time"
				}
			},
			initRole(){
				this.roleList = g.data.rolePool.list;
			},
			onChange_searchItem($page, $pageSize){
				if ($page)
				{
					this.searchObj.page = $page;
				}
				if ($pageSize != this.searchObj.pageSize)
				{
					this.searchObj.pageSize = $pageSize;
					this.searchObj.page = 1;
				}
				this.onUpdate_orderList()
			},
			onUpdate_orderList(){

				getEmployeeList(this.searchObj, this.initData);
			},
			onClick_changeType($id, $type){
				var type;
				var typeDesc;
				if ($type == 1)
				{
					type = 2;
					typeDesc = "冻结"
				}
				else if ($type == 2)
				{
					type = 1;
					typeDesc = "正常"
				}

				g.net.call("user/updateAdminFreeze", {
					'userId': $id,
					'userStatus': type
				}).then(($data) =>
				{
					var obj = {};
					obj.userStatus = type;
					obj.userStatusDesc = typeDesc;
					g.data.staffPool.getDataById($id).update(obj);
				}, (err) =>
				{
					g.func.dealErr(err);
				});

			},
			onClick_addBtn(){
				this.isAdd = true
				if (g.data.powerPool.list.length > 0)
				{
					this.initRole();
				}
				else
				{
					getRoleList(this.initRole);
				}
				this.initAddData();
				this.roleName = "请选择";
				this.isShow_addStaffPop = true;

			},
			onClick_editBtn($id){
				this.isAdd = false;
				if (g.data.powerPool.list.length > 0)
				{
					this.initRole();
				}
				else
				{
					getRoleList(this.initRole);
				}
				var staffObj = g.data.staffPool.getDataById($id)
				this.staffObj.logon = staffObj.userName;
				this.staffObj.roleId = staffObj.roleId;
				this.staffObj.telphone = staffObj.telphone;
				this.staffObj.userId = $id;
				this.staffObj.password = "";
				this.roleName = staffObj.roleName;
				this.isShow_addStaffPop = true;
			},
			onClick_closeBtn(){
				this.isShow_addStaffPop = false;
				this.isShow_FunctionList = false;
			},
			onClick_confirmBtn(){
				for (var key in this.staffObj)
				{
					if (key == "password" && !this.isAdd)
					{
						continue
					}
					if (this.staffObj[key] == "")
					{
						g.ui.toast("请填写全部信息");
						return
					}
				}
				if (!g.param.reg.telphone.test(this.staffObj.telphone))
				{
					g.ui.toast('请填写正确格式的手机');
					return;
				}
				if (this.isAdd)
				{
					this.onConfirm_addUser()
				}
				else
				{
					if (this.confirmPwd)
					{
						this.staffObj.password = sha256(this.confirmPwd);
					}
					this.onConfirm_editUser()
				}
			},
			onConfirm_addUser(){
				g.net.call("user/addAdminUser", this.staffObj).then(($data) =>
				{
					this.isShow_addStaffPop = false;
					this.initSearchData();
					this.onUpdate_orderList();
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onConfirm_editUser(){
				g.net.call("user/updateAdminUser", this.staffObj).then(($data) =>
				{
					this.isShow_addStaffPop = false;
					this.initSearchData();
					this.onUpdate_orderList();
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onClick_roleItem($id, $name){
				this.staffObj.roleId = $id;
				this.roleName = $name;
				this.isShow_FunctionList = false;
			},
			onClick_roleList(){
				this.isShow_roleList = !this.isShow_roleList;
			},
			staffCurrentStatus($status){
				if ($status == 1)
				{
					return "冻结"
				}
				else
				{
					return "解冻"
				}

			}
		}
	}

</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss">
	@import "../css/myStaff.scss";

	.role-bar {
		height: 74px;
		line-height: 74px;
		font-size: 14px;
		margin-bottom: 25px;
	}
</style>