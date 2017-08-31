<template>
	<main-layout :isLoad="isLoad">
		<div slot="content" class="content-box">
			<div class="admin-main-wrap my-activity">
				<common-nav :nav="'activity'"></common-nav>
				<div class="right-content-wrap">
					<common-top-nav>
						<input type="text">
					</common-top-nav>
					<div class="admin-data-items">
						<div class="right-body">
							<div class="right-bar">
								<p class="g-title">
									{{g.lang("我的活动")}}
									<span class="pointer border-btn add-activity-btn" @click="onClick_addBtn">{{g.lang("添加新活动")}}</span>
								</p>
								<div class="activity-bar-top">
									<div class="type-item pointer " @click="onClick_changeType(0)"
										 :class="{'acticity-process':dataObj.activityStatus==0}">
										<span><i>{{numObj.activityCount}}</i>个</span>
										<span>全部活动</span>
									</div>
									<div class="type-item pointer" v-for="item in statusList"
										 @click="onClick_changeType(item.stateCode)"
										 :class="{'acticity-process':dataObj.activityStatus==item.stateCode}">
										<span>
											<i style="font-size: 40px">{{numObj[item.stateCountDesc]}}</i>个
										</span>
									<span>
									</span> {{item.stateDesc}}
									</div>

								</div>
								<!--<div class="activity-bar-bottom">

									&lt;!&ndash;<div class="reward-choose pointer" @click="onClick_dropList">&ndash;&gt;
									&lt;!&ndash;请选择&ndash;&gt;
									&lt;!&ndash;<span class="cite"></span>&ndash;&gt;
									&lt;!&ndash;<ul class="reward-droplist" v-show="isShow_dropList">&ndash;&gt;
									&lt;!&ndash;<li><input type="checkbox" name="reward" id="memberReward"&ndash;&gt;
									&lt;!&ndash;v-model="rewardList"&ndash;&gt;
									&lt;!&ndash;value="1"><label for="memberReward">{{g.lang("会员奖励")}}</label>&ndash;&gt;

									&lt;!&ndash;</li>&ndash;&gt;
									&lt;!&ndash;<li class="pointer"><input type="checkbox" name="reward" id="areaReward"&ndash;&gt;
									&lt;!&ndash;v-model="rewardList"&ndash;&gt;
									&lt;!&ndash;value="2"><label for="areaReward">{{g.lang("区域奖励")}}</label>&ndash;&gt;

									&lt;!&ndash;</li>&ndash;&gt;
									&lt;!&ndash;</ul>&ndash;&gt;
									&lt;!&ndash;</div>&ndash;&gt;
									<span class="reward-title">奖励方式 </span>
									<span class="float-left">
										<label>
											<span class="me-checkbox">
												<input class="me-checkbox-input" type="checkbox" name="reward"
													   id="memberReward"
													   v-model="rewardList"
													   value="1">
												<span class="me-checkbox-core"></span>
											</span>
											<span>会员奖励</span>
										</label>
									</span>
									<span class="float-left">
										<label>
											<span class="me-checkbox">
												<input class="me-checkbox-input" type="checkbox" name="reward"
													   id="areaReward"
													   v-model="rewardList"
													   value="2">
												<span class="me-checkbox-core"></span>
											</span>
											<span>{{g.lang("区域奖励")}}</span>
										</label>
									</span>
									<div class="search-box">
										<input type="text" placeholder="搜索活动名" v-model="dataObj.activityName">
										<span class="button pointer bg-btn"
											  @click="onClick_searchBtn">{{g.lang("查询")}}</span>
									</div>
								</div>-->
							</div>
							<div class="search-activity"><input type="text" placeholder="搜索活动名"></div>
							<div class="admin-calendar-table">
								<table>
									<thead>
									<tr>
										<th class="first-col">{{g.lang("活动名称")}}</th>
										<th class="s-col">{{g.lang("状态")}}</th>
										<th>{{g.lang("已领取")}}/{{g.lang("关联红包数")}}</th>
										<th @click="onClick_sortBtn('received_amount')" class="pointer m-width">
											<div>
												{{g.lang("发放金额")}}
												<common-sort :type="dataObj.sortOrder"
															 :target="'received_amount'"
															 :currentField="dataObj.sortField"
												></common-sort>
											</div>
										</th>
										<th @click="onClick_sortBtn('activity_start_time')" class="pointer m-width">

											<div>
												{{g.lang("开始日期")}}

												<common-sort :type="dataObj.sortOrder"
															 :target="'activity_start_time'"
															 :currentField="dataObj.sortField"
												></common-sort>
											</div>
										</th>
										<th class="pointer m-width">
											<div>
												{{g.lang("结束日期")}}
												<common-sort :type="dataObj.sortOrder"
															 :target="'activity_end_time'"
															 :currentField="dataObj.sortField"
												></common-sort>
											</div>
										</th>
										<th @click="onClick_sortBtn('create_time')" class="pointer m-width">
											<div>
												{{g.lang("创建时间")}}
												<common-sort :type="dataObj.sortOrder"
															 :target="'create_time'"
															 :currentField="dataObj.sortField"
												></common-sort>

											</div>
										</th>
										<th class="activity-last-col">{{g.lang("操作")}}</th>
									</tr>
									</thead>
									<!--<transition name="expand">-->
									<tbody>
									<tr v-for="item in activityList">
										<td @click="onClick_detailBtn(item.id,item.activityName)">
											{{item.activityName}}
										</td>
										<td>{{item.statusStr}}</td>
										<td>{{item.receivedCount}}/{{item.relateCount}}</td>
										<td>{{item.receivedAmount}}</td>
										<td>{{item.startTime}}</td>
										<td>{{item.endTime}}</td>
										<td>{{item.createTime}}</td>
										<td>
											<div class="flex">
												<!--<span v-text="onUpdate_operateContent(item.status)"-->
												<!--@click="onClick_itemBtn(item.activityNo,item.status)"></span>-->
												<div class="icon-type ">
													<span class="option-btn pointer bg-btn"
														  @click="onClick_setBtn(item.id,item.status)"
														  v-show="item.status ==1&&item.relateStatus==1">
														设定时间
													</span>
													<span class="option-btn pointer"
														  @click="onClick_setBtn(item.id,item.status)"
														  v-show="item.status ==4">
														继续
													</span>
													<span class="option-btn pointer"
														  @click="onClick_pauseBtn(item.id)"
														  v-show="item.status ==3">
														暂停
													</span>
												</div>
												<div class="icon-type">
													<span class="option-btn pointer border-btn"
														  @click="onClick_contactBtn(item.id)" v-show="item.status !=5">
														关联二维码
													</span>
												</div>

											</div>

										</td>
									</tr>
									</tbody>
									<!--</transition>-->
								</table>
							</div>
							<common-page :index="dataObj.page" :total="totalPage"
										 @change="onChange_currentPage" v-show="totalPage>1"></common-page>
							<common-prompt v-show="activityList.length==0"></common-prompt>
						</div>
						<common-footer></common-footer>
					</div>
				</div>
			</div>
			<transition name="bounce">
				<change-time-pop v-show="isShow_sendPop" @click="onClick_confirmBtn" :id="id"
								 @close="onClick_closeBtn"></change-time-pop>
			</transition>
			<transition name="bounce">
				<release-success-pop v-show="isShow_successPop" @close="onClick_closeBtn" :amount="totalAmount">

				</release-success-pop>
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
	import ChangeTimePop from '../components/activityPop/changeTimePop.vue';
	import ReleaseSuccessPop from '../components/activityPop/releaseSuccessPop.vue';
	import CommonFooter from './common/CommonFooter.vue';
	import CommonPrompt from './common/CommonPrompt.vue';
	import CommonSort from './common/CommonSort.vue';
	export default {
		created(){
			this.isLoad = true;
			this.init();
		},
		data(){
			return {
				isLoad: false,
				isShow_sendPop: false,
				isShow_successPop: false,
				isShow_dropList: false,
				g: g,
				totalPage: 10,
				totalAmount: 0,
				statusList: [],
				operate: "",
				activityId: 0,
				rewardList: [],
				numObj: {
					unpublishedCount: 0,
					unstartedCount: 0,
					onCount: 0,
					pauseCount: 0,
					completeCount: 0,
					activityCount: 0
				},
				activityList: [],
				dataObj: {
					ruleType: "",
					activityName: "",
					page: 1,
					pageSize: g.param.pageSizeList[0],
					activityStatus: 0,
					sortField: "create_time",
					sortOrder: "desc"
				}

			}
		},
		components: {
			MainLayout,
			CommonNav,
			CommonTopNav,
			CommonPage,
			ChangeTimePop,
			ReleaseSuccessPop,
			CommonFooter,
			CommonPrompt,
			CommonSort
		},
		methods: {
			init(){
				this.initData();
				this.statusList = g.data.activityStatusPool.list;
				this.numObj.activityCount = g.data.activityPool.total;
			},
			initData(){
				var info = g.data.activityPool;
				this.numObj.unpublishedCount = info.unpublishedCount;
				this.numObj.unstartedCount = info.unstartedCount;
				this.numObj.ongoingCount = info.onCount;
				this.numObj.pauseCount = info.pauseCount;
				this.numObj.completeCount = info.completeCount;
				this.totalPage = info.totalPage;
				this.activityList = info.list;
			},
			onChange_currentPage($page, $pageSize){
				this.dataObj.page = $page;
				this.dataObj.pageSize = $pageSize;
				this.onUpdate_activityList()
			},
			onUpdate_activityList(){
				g.ui.showLoading();
				this.onUpdate_ruleType();
				g.net.call("activity/getActivityPageList", this.dataObj).then(($data) =>
				{
					g.data.activityPool.removeAll();
					var obj = {};
					obj.resultPageList = $data;
					g.data.activityPool.update(obj);
					this.activityList = g.data.activityPool.list;
					g.ui.hideLoading();
					this.initData();
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onUpdate_ruleType(){
				if (this.rewardList.length == 1)
				{
					this.dataObj.ruleType = this.rewardList[0];
				}
				else if (this.rewardList.length == 2)
				{
					this.dataObj.ruleType = 3;
				}
				else
				{
					this.dataObj.ruleType = "";
				}

			},
			onClick_addBtn(){
				g.url = ("/addactivity")
			},
			onClick_changeType($typeId){
				if (this.dataObj.activityStatus == $typeId)
				{
					return
				}
				this.dataObj.page = 1;
				this.dataObj.activityStatus = $typeId;
				this.onUpdate_activityList()
			},
			onClick_searchBtn(){
				this.onUpdate_activityList()
			},
			onClick_pauseBtn($id){
				g.net.call("activity/updateActivityStatus", {
					'activityId': $id,
					'operateType': 2
				}).then(($data) =>
				{
					g.ui.toast("暂停活动成功");
					this.onUpdate_allData();
				}, (err) =>
				{
					g.func.dealErr(err);
				});

			},
			onClick_setBtn($id, $status){
				this.activityId = $id;
				if ($status == 1)
				{
					this.isShow_sendPop = true;
				}
				else
				{
					g.net.call("activity/updateActivityStatus", {
						'activityId': $id,
						'operateType': 1
					}).then(($data) =>
					{
						g.ui.toast("发布活动成功");
						this.onUpdate_allData();

					}, (err) =>
					{
						g.func.dealErr(err);
					});
				}

			},
			onClick_contactBtn($id){

			},
			onClick_confirmBtn($start, $end){
				g.net.call("activity/publishActivity", {
					"activityId": this.activityId,
					"activityStartTime": $start,
					"activityEndTime": $end
				}).then(($data)=>
				{
					this.onUpdate_allData();
					this.totalAmount = $data.assetCurrentAmount;
					this.isShow_sendPop = false;
					this.isShow_successPop = true;
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onUpdate_allData(){
				this.onUpdate_ruleType();
				g.net.call("activity/getActivityOverview", this.dataObj).then(($data) =>
				{

					g.data.activityPool.removeAll();
					g.data.activityPool.update($data);
					this.init();

				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onClick_itemDetail($id){
				g.url = {
					path: "/activitydetail",
					query: {"activityId": $id}
				}
			},
			onClick_sortBtn($field){
				if (this.dataObj.sortOrder == "desc")
				{
					this.dataObj.sortOrder = "asc"
				}
				else
				{
					this.dataObj.sortOrder = "desc"
				}
				this.dataObj.page = 1;
				this.dataObj.sortField = $field;
				this.onUpdate_activityList();
			},

			onUpdate_operateContent($status){
				if ($status == 2 || $status == 5)
				{
					return "详情"
				}
				else if ($status == 3)
				{
					return "暂停"
				}
				else if ($status == 4 || $status == 1)
				{
					return "发布"
				}
			},
			onClick_itemBtn($id, $status){
				if ($status == 2 || $status == 5)
				{
					this.onClick_itemDetail($id)
				}
				else if ($status == 3)
				{
					this.onClick_pauseBtn($id)
				}
				else if ($status == 4 || $status == 1)
				{
					this.onClick_setBtn($id)
				}
			},
			onClick_dropList(){
				if (this.isShow_dropList)
				{
					this.isShow_dropList = false;
				}
				else
				{
					this.isShow_dropList = true;
				}
			},
			onClick_detailBtn($id, $name){
				g.url = ({
					"path": "/activitydetail",
					"query": {
						"id": $id,
						"name": $name
					}
				})
			},
			onClick_editBtn($id){
				g.url = ({
					"path": "/addactivity",
					"query": {"id": $id}
				})
			},
			onClick_deleteBtn($id){
				g.net.call("activity/deleteActivity", {
					"activityId": $id
				}).then(($data) =>
				{
					this.onUpdate_allData();
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onClick_closeBtn(){
				this.isShow_sendPop = false;
				this.isShow_successPop = false
			},
			onClick_restartBtn(){
				g.url = ("/addactivity")
			},
			onClick_contactBtn(){
				g.url = ("/qrcode")
			}
		}

	}

</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss">
	@import "../css/common.scss";
	@import "../css/myActivity.scss";

	.my-activity .me-checkbox-core {
		margin-left: 10px;
		margin-right: 10px;
	}
</style>