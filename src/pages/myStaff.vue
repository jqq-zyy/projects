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
								<span class="add-button pointer" @click="onClick_addBtn">添加员工</span>
							</div>
							<div class="staff-bar">
								<p>当前在职员工人数：<i class="staff-number">{{totalStaffNum}}</i> 人</p>

								<!--<div class="search-box">
									<input type="text" class="search" placeholder="搜索姓名" v-model="searchObj.logon">
									<div class="button search-btn pointer" @click="onClick_searchBtn">搜索</div>
								</div>-->
							</div>

							<div class="admin-calendar-table">
								<table>
									<thead>
									<tr>
										<th>员工用户名</th>
										<th>职能</th>
										<th>联系电话</th>
										<th class="pointer">
											<div @click.stop="onClick_showTypeBtn">
												账号状态/{{statusList[searchObj.userStatus]}}
												<span :class="['pointer','drop-icon',isShow_dropList?'rotate':'']"></span>
												<ul class="droplist" v-show="isShow_dropList">
													<li class="pointer" v-for="(item,index) in statusList"
														@click="onClick_typeItem(index)">{{item}}
													</li>
												</ul>
											</div>
										</th>
										<th @click="onClick_sortBtn('create_time')" class="pointer">
											创建时间
											<common-sort :type="searchObj.sortOrder"
														 :target="'create_time'"
														 :currentField="searchObj.sortField"
											></common-sort>
										</th>
										<th>上次冻结时间</th>
										<th>操作</th>
									</tr>
									</thead>
									<tbody>
									<tr v-for="item in staffList">
										<td>{{item.userName}}</td>
										<td>{{item.roleName}}</td>
										<td>{{item.telphone}}</td>
										<td>{{item.userStatusDesc}}</td>
										<td>{{item.createTime}}</td>
										<td></td>
										<td>
												<span class="pointer frozen" v-show="item.userStatus==1"
													  @click="onClick_changeType(item.id,item.userStatus)">冻结
												</span>
												<span class="pointer thaw" v-show="item.userStatus==2"
													  @click="onClick_changeType(item.id,item.userStatus)">解冻</span>
										</td>
									</tr>
									</tbody>
								</table>
							</div>
							<common-page :index="searchObj.page" :total="totalPage"
										 @change="onChange_searchItem" v-show="totalPage>1"></common-page>
							<common-prompt v-show="staffList.length==0"></common-prompt>

						</div>
						<common-footer></common-footer>
					</div>
				</div>
			</div>
			<transition name="bounce">
				<div class="affix-box default-pos-type" v-show="isShow_addStaffPop">
					<div class="pop-edit-password pop-edit add-staff-pop">
						<div class="show-close-btn">
							<img :src="g.config.path.images+'/close.png'"
								 @click="onClick_closeBtn" />
						</div>
						<div class="pop-tit">添加新员工</div>
						<div class="pop-body add-staff-body">
							<div class="m-title msg-box">
								<span class="name">员工用户名:</span>
								<input type="text" placeholder="请输入用户名" v-model="staffObj.logon">
							</div>
							<div class="msg-box m-title">
								<span class="staff-meg name">职能权限:</span>
								<div class="choose-function pointer" @click.stop="onClick_dropListBtn">
									{{roleName}}

								</div>
								<ul class="droplist function-list" v-show="isShow_FunctionList">
									<li v-for="item in roleList"
										@click="onClick_roleItem(item.id,item.roleName)">
										{{item.roleName}}
									</li>
								</ul>
								<div class="clearfix"></div>
							</div>
							<div class="msg-box m-title">
								<span class="staff-meg name">初始密码:</span>
								<span>888888</span>
							</div>
							<div class="m-title msg-box staff-button">
								<div class="staff-btn pointer bg-btn" @click="onClick_confirmBtn">确认添加</div>
								<div class="staff-btn pointer border-btn" @click="onClick_closeBtn">取消</div>

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
	import CommonSort from './common/CommonSort.vue';
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
				isShow_dropList: false,
				isShow_addStaffPop: false,
				isShow_FunctionList: false,
				searchObj: {},
				totalPage: 1,
				statusList: [],
				staffList: [],
				totalStaffNum: 0,
				roleList: [],
				confirmPwd: "",
				roleName: "请选择",
				staffObj: {}

			}
		},
		components: {
			MainLayout,
			CommonNav,
			CommonTopNav,
			CommonPage,
			CommonFooter,
			CommonPrompt,
			CommonSort
		},
		methods: {
			init(){
				this.initAddData();
				this.initSearchData();
				this.initData()

			},
			initData(){
				this.statusList = g.param.staffStatusList;
				this.staffList = g.data.staffPool.list;
				this.totalPage = g.data.staffPool.totalPage;
				this.totalStaffNum = g.data.staffPool.total;
			},
			initAddData(){
				this.staffObj = {
					"logon": "",
					"roleId": "",
					"password": sha256(888888)
				}
			},
			initSearchData(){
				this.searchObj = {
					'page': 1,
					'pageSize': g.param.pageSizeList[0],
					'logon': "",
					'userStatus': 0,
					'sortOrder': "desc",
					'sortField': "create_time"
				}
			},
			initRole(){
				this.roleList = g.data.rolePool.list;
			},
			onClick_searchBtn(){
				this.searchObj.page = 1;
				this.onUpdate_orderList()
			},
			onClick_typeItem($type){
				if (this.searchObj.userStatus == $type)
				{
					return
				}
				this.searchObj.userStatus = $type;
				this.searchObj.page = 1;
				this.onUpdate_orderList()
			},
			onClick_sortBtn($field){
				if (this.searchObj.sortOrder == "desc")
				{
					this.searchObj.sortOrder = "asc"
				}
				else
				{
					this.searchObj.sortOrder = "desc"
				}
				this.searchObj.sortField = $field;
				this.searchObj.page = 1;
				this.onUpdate_orderList()

			},
			onChange_searchItem($page, $pageSize){
				if ($page)
				{
					this.searchObj.page = $page;
				}
				if ($pageSize)
				{
					this.searchObj.pageSize = $pageSize;
				}
				this.onUpdate_orderList()
			},
			onUpdate_orderList(){

				getEmployeeList(this.searchObj, this.initData);
			},
			onClick_showTypeBtn(){
				if (this.isShow_dropList)
				{
					this.isShow_dropList = false;
				}
				else
				{
					this.isShow_dropList = true;
				}
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

				g.net.call("user/updateEmployeeFreeze", {
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
				if (g.data.powerPool.list.length > 0)
				{
					this.initRole();
				}
				this.initAddData();
				getRoleList(this.initRole);
				this.confirmPwd = "";
				this.roleName = "请选择";

				this.isShow_addStaffPop = true;
			},
			onClick_closeBtn(){
				this.isShow_addStaffPop = false;
				this.isShow_FunctionList = false;
			},
			onClick_dropListBtn(){
				if (this.isShow_FunctionList)
				{
					this.isShow_FunctionList = false;
				}
				else
				{
					this.isShow_FunctionList = true;
				}
			},
			onClick_roleItem($id, $name){
				this.staffObj.roleId = $id;
				this.roleName = $name;
				this.isShow_FunctionList = false;
			},
			onClick_confirmBtn(){
				for (var key in this.staffObj)
				{
					if (this.staffObj[key] == "")
					{
						g.ui.toast("请填写全部信息");

						return
					}
				}
				g.net.call("user/saveEmployeeInfo", this.staffObj).then(($data) =>
				{
					this.isShow_addStaffPop = false;
					this.initSearchData();
					this.onUpdate_orderList();
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
	@import "../css/myStaff.scss";
	@import "../css/pop.scss";
</style>







