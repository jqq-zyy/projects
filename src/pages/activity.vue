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
							<p class="g-title">
								活动列表
							</p>
							<div class="bar-box">
								<div class="bar-top">
									<ul>
										<li>活动状态:</li>
										<li class="type-item pointer " @click="onClick_changeType(0)"
											:class="{'acticity-process':isCurrentType(0)}">
											<span>全部活动</span>
										</li>
										<li class="type-item pointer" v-for="item in statusList"
											@click="onClick_changeType(item.stateCode)"
											:class="{'acticity-process':isCurrentType(item.stateCode)}">
											{{item.stateDesc}}
										</li>
									</ul>
								</div>
								<div class="bar-bottom bar-bottonm-spcial">
									<div class="date-margin">
										<div class="date-box">
											<span class="creat-time">创建时间：从</span>
											<div class="date-from">
												<input type="text" class="startTime date-input pointer"
													   readonly="true">
												<calendar class="drop-time"></calendar>
											</div>
										</div>

										<span class="goto">至</span>
										<div class="date-box">
											<div class="date-from">
												<input type="text" class="endTime date-input pointer">
												<calendar class="drop-time"
												></calendar>
											</div>
										</div>
										<div class="clearfix"></div>
									</div>
									<div class="date-margin data-margin-end">
										<div class="date-box">
											<span class="creat-time">结束时间：从</span>
											<div class="date-from">
												<input type="text" class="startTime date-input pointer"
													   readonly="true">
												<calendar class="drop-time"></calendar>
											</div>
										</div>
										<span class="goto">至</span>
										<div class="date-box">
											<div class="date-from">
												<input type="text" class="endTime date-input pointer">
												<calendar class="drop-time"
												></calendar>
											</div>
										</div>
										<div class="clearfix"></div>
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
									<input type="text" v-model="dataObj.inOutContent" class="float-left search-input">
								<span class="btn pointer search-btn border-btn hb-fill-middle2-bg"
									  @click="onClick_searchBtn">查找</span>
									<div class="clearfix"></div>
								</div>
							</div>
							<div class="all-out">
								<div class=" pointer all-out-btn bg-btn hb-fill-middle2-rev float-right
									" @click="onClick_exportBtn">导出全部
								</div>
							</div>
							<div class="admin-calendar-table">
								<table>
									<thead>
									<tr>
										<th class="first-col">{{g.lang("活动名称")}}</th>
										<th class="s-col"><span>|</span>企业全称</th>
										<th><span>|</span>品牌名称</th>
										<th @click="onClick_sortBtn('received_amount')" class="pointer m-width">
											<span>|</span>
											状态
											<common-sort :type="dataObj.sortOrder"
														 :target="'received_amount'"
														 :currentField="dataObj.sortField"
											></common-sort>

										</th>
										<th @click="onClick_sortBtn('activity_start_time')" class="pointer m-width">
											<span>|</span>
											创建时间

											<common-sort :type="dataObj.sortOrder"
														 :target="'activity_start_time'"
														 :currentField="dataObj.sortField"
											></common-sort>
										</th>
										<th @click="onClick_sortBtn('activity_start_time')" class="pointer m-width">
											<span>|</span>
											{{g.lang("开始日期")}}

											<common-sort :type="dataObj.sortOrder"
														 :target="'activity_start_time'"
														 :currentField="dataObj.sortField"
											></common-sort>
										</th>
										<th class="pointer m-width">
											<span>|</span>
											{{g.lang("结束日期")}}
											<common-sort :type="dataObj.sortOrder"
														 :target="'activity_end_time'"
														 :currentField="dataObj.sortField"
											></common-sort>
										</th>
										<th @click="onClick_sortBtn('create_time')" class="pointer m-width">
											<span>|</span>
											绑定二维码数
											<common-sort :type="dataObj.sortOrder"
														 :target="'create_time'"
														 :currentField="dataObj.sortField"
											></common-sort>

										</th>
										<th @click="onClick_sortBtn('create_time')" class="pointer m-width">
											<span>|</span>
											累计扫码数
											<common-sort :type="dataObj.sortOrder"
														 :target="'create_time'"
														 :currentField="dataObj.sortField"
											></common-sort>
										</th>
										<th @click="onClick_sortBtn('create_time')" class="pointer m-width">
											<span>|</span>
											红包领取金额
											<common-sort :type="dataObj.sortOrder"
														 :target="'create_time'"
														 :currentField="dataObj.sortField"
											></common-sort>
										</th>
										<th @click="onClick_sortBtn('create_time')" class="pointer m-width">
											<span>|</span>
											平台红包领取金额
											<common-sort :type="dataObj.sortOrder"
														 :target="'create_time'"
														 :currentField="dataObj.sortField"
											></common-sort>
										</th>
										<th class="activity-last-col"><span>|</span>{{g.lang("操作")}}</th>
									</tr>
									</thead>
									<tbody>
									<tr v-for="item in activityList">
										<td @click="onClick_detailBtn(item.id)" class="first-td-child">
											{{item.activityName}}
										</td>
										<td>{{item.companyName}}</td>
										<td>{{item.brandName}}</td>
										<td>{{item.activityStatusDesc}}</td>
										<td>{{item.createTime}}</td>
										<td>{{item.startTime}}</td>
										<td>{{item.endTime}}</td>
										<td>{{item.qrCodeNum}}</td>
										<td>{{item.totalScanCount}}</td>
										<td>{{item.useRpAmount}}</td>
										<td>{{item.useRpAmount}}</td>
										<td>
												<span v-text="onConfirm_operation(item.freezeStatus)"
													  @click="onClick_activityItem(item.freezeStatus,item.id)"></span>
										</td>
									</tr>
									</tbody>
									<tfoot>
									<tr>
										<td colspan="7"></td>
										<td>{{resultTotalObj.totalQrCodeNum}}</td>
										<td>{{resultTotalObj.totalScanCount}}</td>
										<td>{{resultTotalObj.RpAmount}}</td>
										<td>{{resultTotalObj.platformAmount}}</td>
										<td></td>
									</tr>
									</tfoot>
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
				g: g,
				totalPage: 10,
				statusList: [],
				activityId: 0,
				activityList: [],
				dataObj: {
					ruleType: "",
					activityName: "",
					page: 1,
					pageSize: g.param.pageSizeList[0],
					activityStatusList: [0],
					sortField: "create_time",
					sortOrder: "desc",
					inOutType: 0,
					inOutContent: ""
				},
				typeList: ['活动名称', '品牌名称', '企业名称'],
				resultTotalObj: {
					totalQrCodeNum: 0,
					totalScanCount: 0,
					RpAmount: 0,
					platformAmount: 0
				}

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
				var info = g.data.activityPool;
				this.totalPage = info.totalPage;
				this.activityList = info.list;
				this.statusList = g.data.activityStatusPool.list;
				this.resultTotalObj.totalQrCodeNum = info.totalQrCodeNum;
				this.resultTotalObj.totalScanCount = info.totalScanCount;
				this.resultTotalObj.RpAmount = info.totalUseRpAmount;
				this.resultTotalObj.platformAmount = info.totalUseRpAmountDesc;
			},

			onChange_currentPage($page, $pageSize){
				this.dataObj.page = $page;
				this.dataObj.pageSize = $pageSize;
				this.onUpdate_activityList()
			},
			onUpdate_activityList(){
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
				if ($typeId == 0)
				{
					this.dataObj.activityStatusList = [0]
				}
				else
				{
					if (activityStatusList.indexOf(0) > -1)
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

				this.onUpdate_activityList()
			},
			onClick_searchBtn(){
				this.onUpdate_activityList()
			},

			onUpdate_allData(){
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
						"id": $id
					}
				})
			},
			isCurrentType($type){
				if (this.dataObj.activityStatusList.indexOf($type) > -1)
				{
					return true
				}
				return false
			},
			onConfirm_operation($type){
				if ($type == 1)
				{
					return "冻结"
				}
				else
				{
					return "解冻"
				}
			},
			onClick_activityItem($type, $id){

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
	.first-td-child:hover{
		text-decoration: underline;
		cursor: pointer;
	}
</style>