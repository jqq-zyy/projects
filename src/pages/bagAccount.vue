<template>
	<main-layout :isLoad="isLoad">
		<div slot="content" class="content-box">
			<div class="admin-main-wrap my-activity">
				<common-nav :nav="'business'"></common-nav>
				<div class="right-content-wrap">
					<common-top-nav>
						<input type="text">
					</common-top-nav>
					<div class="admin-data-items">
						<div class="right-body">
							<p class="g-title">
								二维码账户
							</p>
							<div class="bar-box">
								<div class="bar-top">
									<ul>
										<li>状态：</li>
										<li class="type-item pointer " @click="onClick_changeType(0)"
											 :class="{'acticity-process':isCurrentType(-1)}">
											全部
										</li>
										<li class="type-item pointer" v-for="(item,index) in statusList"
											 @click="onClick_changeType(index)"
											 :class="{'acticity-process':isCurrentType(index)}">
											{{item}}
										</li>
									</ul>
								</div>
								<div class="bar-bottom">
									<div class="date-box">
										<span class="creat-time">创建时间：从</span>
										<div class="date-from">
											<input type="text" class="startTime date-input pointer"
												   v-model="date.startTimeStr"
												   readonly="true"
												   @click.stop="onClick_showCalendar('start')">
											<hw-date type="date" skin="simple" @change="onClick_chooseDateStart" v-model="isShowStartTime"></hw-date>
										</div>
									</div>
									<span class="goto">至</span>
									<div class="date-box">
										<div class="date-from">
											<input type="text" class="endTime date-input pointer"
												   v-model="date.endTimeStr"
												   readonly="true" @click.stop="onClick_showCalendar('end')">
											<hw-date type="date" skin="simple" @change="onClick_chooseDateEnd" v-model="isShowEndTime"></hw-date>
										</div>
									</div>
									<div class="drop-box pointer">
										<div @click.stop="onClick_dropListBtn">
											{{typeList[dataObj.inOutType]}}
											<span :class="['pointer','drop-icon',isShow_dropList?'rotate':'']"
												  @click.stop="onClick_dropListBtn"></span>
										</div>
										<ul class="droplist" v-show="isShow_dropList">
											<li v-for="(item,index) in typeList" class="pointer"
												@click="onClick_dropItem(index)">{{item}}
											</li>
										</ul>
									</div>
									<input type="text" v-model="dataObj.inOutContent" class="search-input">
									<span class="btn pointer search-btn border-btn hb-fill-middle2-bg" @click="onClick_searchBtn">查找</span>
								</div>
							</div>
							<div class="all-out">
								<div class=" pointer all-out-btn bg-btn hb-fill-middle2-rev float-right" @click="onClick_exportBtn">导出全部</div>
							</div>
							<div class="admin-calendar-table">

								<table>
									<thead>
									<tr>
										<th class="first-col">流水ID</th>
										<th class="s-col" @click="onClick_sortBtn('received_amount')">流水类型
											<common-sort :type="dataObj.sortOrder"
														 :target="'received_amount'"
														 :currentField="dataObj.sortField"
											></common-sort>
										</th>
										<th @click="onClick_sortBtn('received_amount')" class="pointer m-width">金额
											<common-sort :type="dataObj.sortOrder"
														 :target="'received_amount'"
														 :currentField="dataObj.sortField"
											></common-sort>
										</th>
										<th @click="onClick_sortBtn('activity_start_time')" class="pointer m-width">

											<div>
												支付方式

												<common-sort :type="dataObj.sortOrder"
															 :target="'activity_start_time'"
															 :currentField="dataObj.sortField"
												></common-sort>
											</div>
										</th>
										<th class="pointer m-width">
											<div>
												状态
												<common-sort :type="dataObj.sortOrder"
															 :target="'activity_end_time'"
															 :currentField="dataObj.sortField"
												></common-sort>
											</div>
										</th>
										<th class="pointer m-width">
											<div>
												发起人
											</div>
										</th>
										<th @click="onClick_sortBtn('create_time')" class="pointer m-width">
											<div>
												发起时间
												<common-sort :type="dataObj.sortOrder"
															 :target="'create_time'"
															 :currentField="dataObj.sortField"
												></common-sort>

											</div>
										</th>
										<th @click="onClick_sortBtn('create_time')" class="pointer m-width">
											<div>
												企业全称
												<common-sort :type="dataObj.sortOrder"
															 :target="'create_time'"
															 :currentField="dataObj.sortField"
												></common-sort>

											</div>
										</th>
										<th class="activity-last-col">{{g.lang("操作")}}</th>
									</tr>
									</thead>
									<tbody>
									<tr v-for="item in bagList">
										<td>{{item.id}}</td>
										<td>{{item.orderTypeDesc}}</td>
										<td>{{item.orderAmount}}</td>
										<td>{{item.payWayDesc}}</td>
										<td>{{item.orderStatusDesc}}</td>
										<td>{{item.qrCodeNum}}</td>
										<td>{{item.createTime}}</td>
										<td>{{item.companyFullName}}</td>
										<td>
												<span @click="onClick_qrcodeItem(item.id)"
													  v-show="item.orderStatus==1">审核
												</span>
										</td>
									</tr>
									</tbody>
									<tfoot>
									<tr>
										<td colspan="2"></td>
										<td>{{rpAmount}}</td>
										<td colspan="6"></td>
									</tr>
									</tfoot>
								</table>
							</div>
							<common-page :index="dataObj.page" :total="totalPage"
										 @change="onChange_currentPage" v-show="totalPage>1"></common-page>
							<common-prompt v-show="qrcodeList.length==0"></common-prompt>
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
	import CommonPage from './common/CommonPage.vue';
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
				isShow_dropList: false,
				isShowStartTime: false,
				isShowEndTime: false,
				g: g,
				totalPage: 1,
				statusList: ["付款中", "付款成功", "付款失败", "申请退款", "退款中", "退款成功", "退款失败"],
				qrcodeList: [],
				date: {
					startTime: 0,
					startTimeStr: "",
					endTimeStr: "",
					endTime: 0
				},
				dataObj: {
					ruleType: "",
					activityName: "",
					page: 1,
					pageSize: g.param.pageSizeList[0],
					activityStatusList: [-1],
					sortField: "create_time",
					sortOrder: "desc",
					inOutType: 0,
					inOutContent: ""
				},
				typeList: ['流水ID', '企业全称', '发起人'],
				rpAmount: 0

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
				var info = g.data.bagPool;
				this.totalPage = info.totalPage;
				this.bagList = info.list;
				this.rpAmount = info.rpAmount;
				this.initDate();
			},
			initDate(){
				this.date.startTime = g.timeTool.getNowStamp() - g.timeTool.getPastSecond();
				this.date.endTime = this.date.startTime;
				this.date.startTimeStr = g.timeTool.getDate(this.date.startTime, true);
				this.date.endTimeStr = g.timeTool.getDate(this.date.endTime, true);
			},
			onChange_currentPage($page, $pageSize){
				this.dataObj.page = $page;
				this.dataObj.pageSize = $pageSize;
				this.onUpdate_qrcodeList()
			},
			onUpdate_qrcodeList(){
				g.ui.showLoading();
				g.net.call("/activity/queryActivityStatisticByPage", this.dataObj).then(($data) =>
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
			onClick_dropItem($type){
				this.dataObj.inOutType = $type;
				this.isShow_dropList = false;
			},
			onClick_dropListBtn(){
				if (this.isShow_dropList)
				{
					this.isShow_dropList = false;
				}
				else
				{
					this.isShow_dropList = true;
				}
			},
			onClick_changeType($typeId){
				this.dataObj.page = 1;
				var activityStatusList = this.dataObj.activityStatusList;
				if ($typeId == -1)
				{
					this.dataObj.activityStatusList = [-1]
				}
				else
				{
					if (activityStatusList.indexOf(-1) > -1)
					{
						this.dataObj.activityStatusList = []

					}
					var index = activityStatusList.indexOf($typeId);
					if (index > -1)
					{
						this.dataObj.activityStatusList.splice(index, 1)
					}
					else
					{
						this.dataObj.activityStatusList.push($typeId)
					}
				}

				this.onUpdate_qrcodeList()
			},
			onClick_searchBtn(){
				this.onUpdate_qrcodeList()
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
				this.onUpdate_qrcodeList();
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
			isCurrentType($type){
				if (this.dataObj.activityStatusList.indexOf($type) > -1)
				{
					return true
				}
				return false
			},
			onClick_showCalendar(str){
				if (str == 'start')
				{
					//this.startTime = 0;
					if (this.isShowStartTime)
					{
						this.isShowStartTime = false;
					}
					else
					{
						this.isShowStartTime = true;
					}
					this.isShowEndTime = false;
				}
				else
				{

					if (this.isShowEndTime)
					{
						this.isShowEndTime = false;
					}
					else
					{
						this.isShowEndTime = true;
					}
					this.isShowStartTime = false;
				}
			},

			onClick_chooseDateStart($timeStamp){
				this.date.startTime = $timeStamp;
				this.date.startTimeStr = g.timeTool.getDate($timeStamp, true);
				if (this.date.startTime > this.date.endTime)
				{
					this.onClick_chooseDateEnd($timeStamp);
				}
				this.isShowStartTime = false;
			},

			onClick_chooseDateEnd($timeStamp){
				this.date.endTime = $timeStamp;
				this.date.endTimeStr = g.timeTool.getDate($timeStamp, true);
				if (this.date.endTime < this.date.startTime)
				{
					this.onClick_chooseDateStart($timeStamp);
				}
				this.isShowEndTime = false;
			},
			onClick_qrcodeItem($type){

			},
			onClick_exportBtn(){

			}

		}

	}

</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss">
	@import "../css/common";
	@import "../css/myActivity";

	.my-activity .me-checkbox-core {
		margin-left: 10px;
		margin-right: 10px;
	}
</style>