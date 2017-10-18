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
										<li class="type-item pointer" v-for="(item,index) in statusList"
											 @click="onClick_changeType(index)"
											 :class="{'acticity-process':isCurrentType(index)}">
											{{item}}
										</li>
									</ul>
								</div>
								<div class="bar-bottom">
									<div class="date-margin">
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
									</div>
									<div class="drop-box pointer" @click.stop="onClick_dropListBtn">
										<div @click.stop="onClick_dropListBtn">
											{{currentSearchType}}
											<span :class="['pointer','drop-icon',isShow_dropList?'rotate':'']"></span>
										</div>
										<ul class="droplist" v-show="isShow_dropList">
											<li v-for="item in typeList" class="pointer"
												@click.stop="onClick_dropItem(item.id)">{{item.name}}
											</li>
										</ul>
									</div>
									<input type="text" v-model="inputContent" class="search-input">
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
										<td>{{item.applyUserLogon}}</td>
										<td>{{item.createTime}}</td>
										<td>{{item.companyFullName}}</td>
										<td>
												<span class ="blue_underline pointer"@click="onClick_qrcodeItem(item.id)"
													  v-show="item.orderStatus==1">审核
												</span>
										</td>

									</tr>
									</tbody>
									<tfoot>
									<tr v-show="bagList.length>0">
										<td colspan="2"></td>
										<td>{{rpAmount}}</td>
										<td colspan="6"></td>
									</tr>
									</tfoot>
								</table>
							</div>
							<common-page :index="dataObj.page" :total="totalPage"
										 @change="onChange_currentPage" v-show="bagList.length>=1"></common-page>
							<common-prompt v-show="bagList.length==0"></common-prompt>
						</div>
						<common-footer></common-footer>
					</div>
				</div>
			</div>
			<transition name="bounce">
				<div class="affix-box default-pos-type" v-show="isShow_refusePop">
					<div class="pop-edit-password pop-edit">
						<div class="show-close-btn">
							<img :src="g.config.path.images+'/close.png'"
								 @click="onClick_closeBtn"/>
						</div>
						<div class="pop-tit"></div>
						<div class="pop-body button-box">						<div :class="['m-margin-top',auditStatus==-1?'':'text-center']">审核退款申请：
								<label class="label-left">
									<input type="radio" class="refuse-check"v-model="auditStatus" value="2">通过申请</label>
								<label class="label-right">
									<input type="radio" class="refuse-check"v-model="auditStatus" value="-1">拒绝申请</label>
							</div>
							<div class="m-title" v-show="auditStatus==-1"><span class="">请输入拒绝原因：</span>
								<textarea name="" id="" cols="30" rows="10" class="describle-reasons"
										  v-model="refuseContent" @focus="onFocus_refuseInput"></textarea>
								<div v-show="isShow_hasError">拒绝原因不能为空</div>
							</div>
							<div class="button-box m-margin-up"   v-show="auditStatus==-1">
								<div class="refuse-button pointer border-btn" @click="onClick_closeBtn">暂不拒绝</div>
								<div class="refuse-button pointer bg-btn" @click="onClick_sumbitBtn">确认拒绝并告知商户</div>
							</div>
							<div class=" button-box m-margin-up"   v-show="auditStatus==2">
								<div class="refuse-button pointer border-btn" @click="onClick_closeBtn">暂不通过</div>
								<div class="refuse-button pointer bg-btn" @click="onClick_sumbitBtn">确认通过并告知商户</div>
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
				isShow_hasError: false,
				isShow_refusePop:false,
				g: g,
				totalPage: 1,
				statusList: ["全部", "未付款","付款中", "付款成功", "付款失败", "申请退款", "退款中", "退款成功", "退款失败"],
				bagList: [],
				currentType: "",
				inputContent: "",
				date: {
					startTime: 0,
					startTimeStr: "",
					endTimeStr: "",
					endTime: 0
				},
				activityStatusList: [0],
				dataObj: {},
				typeList: [
					{
						id: 'orderId',
						name: '流水ID'
					}, {
						id: "companyFullName",
						name: '企业全称'
					}, {
						id: "applyUserLogon",
						name: '发起人'
					}
				],
				rpAmount: 0,
				currentId:0,
				auditStatus: 2,
				refuseContent: ""

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
		computed: {
			currentSearchType(){
				for (var i = 0; i < this.typeList.length; i++)
				{
					if (this.typeList[i].id == this.currentType)
					{
						return this.typeList[i].name
					}
				}
			}
		},
		methods: {
			init(){
				this.initDate();
				this.initData();
				this.initSearchData();

			},
			initData(){
				var info = g.data.bagPool;
				this.totalPage = info.totalPage;
				this.bagList = info.list;
				this.rpAmount = info.rpAmount;

			},
			initSearchData(){
				this.dataObj = {
					queryStatus: "",
					startTime: "",
					endTime: "",
					page: 1,
					pageSize: g.param.pageSizeList[0],
					sortField: "create_time",
					sortOrder: "desc"
				}
			},
			initDate(){
				this.date.startTime = g.timeTool.getNowStamp() - g.timeTool.getPastSecond();
				this.date.endTime = this.date.startTime;
				this.date.startTimeStr = g.timeTool.getDate(this.date.startTime, true);
				this.date.endTimeStr = g.timeTool.getDate(this.date.endTime, true);
			},
			onChange_currentPage($page, $pageSize){
				this.dataObj.page = $page;
				if($pageSize!=this.dataObj.pageSize){
					this.dataObj.pageSize = $pageSize;
					this.dataObj.page = 1
				}
				this.onUpdate_qrcodeList()
			},
			onUpdate_qrcodeList(){
				g.ui.showLoading();
				this.dataObj.queryStatus = this.activityStatusList.join(",");
				this.dataObj.startTime = this.date.startTimeStr;
				this.dataObj.endTime = this.date.endTimeStr;
				if (this.currentType)
				{
					this.dataObj[this.currentType] = this.inputContent;
				}
				g.net.call("order/queryRpAccountList", this.dataObj).then(($data) =>
				{
					g.data.bagPool.removeAll();
					g.data.bagPool.update($data);
					if (this.currentType)
					{
						this.dataObj[this.currentType] = "";
					}
					this.initData();
					g.ui.hideLoading();

				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},

			onClick_dropItem($type){
				this.currentType = $type;
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
				var activityStatusList = this.activityStatusList;
				if ($typeId == 0)
				{
					this.activityStatusList = [0]
				}
				else
				{
					if (activityStatusList.indexOf(0) > -1)
					{
						this.activityStatusList = []

					}
					var index = activityStatusList.indexOf($typeId);
					if (index > -1)
					{
						this.activityStatusList.splice(index, 1)
					}
					else
					{
						this.activityStatusList.push($typeId)
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
			onClick_closeBtn(){
				this.isShow_refusePop = false;
			},
			isCurrentType($type){
				if (this.activityStatusList.indexOf($type) > -1)
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


			onClick_qrcodeItem($id){
				this.isShow_refusePop = true;
				this.currentId = $id;

			},
			onClick_sumbitBtn(){
				if (this.refuseContent.trim() == "")
				{
					this.isShow_hasError = true;
					return
				}
				this.updateOrderAuth();
			},
			updateOrderAuth(){
				g.net.call("order/updateOrderRefundAudit", {
					"orderId": this.currentId,
					"auditStatus":this.auditStatus,
					"remark":this.refuseContent
				}).then(($data) =>
				{
					this.isShow_refusePop = false;
					this.onUpdate_qrcodeList();
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onFocus_refuseInput(){
				this.isShow_hasError = false;
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


