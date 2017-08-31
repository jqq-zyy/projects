<template>
	<main-layout :isLoad="isLoad">
		<div slot="content" class="content-box">
			<div class="admin-main-wrap">
				<common-nav :nav="'activity'"></common-nav>
				<div class="right-content-wrap">
					<common-top-nav></common-top-nav>
					<div class="admin-data-items">
						<div class="right-header">
							<span class="pointer" @click="onClick_myActivityBtn">我的活动</span> - {{activityName}}
						</div>
						<div class="right-bar">
							<ul>
								<li :class="['pointer',isShow_activityDetail?'active':'']"
									@click="onClick_changeType('detail')">活动详情
								</li>
								<li :class="['pointer',isShow_activityRule?'active':'']"
									@click="onClick_changeType('rule')">活动规则
								</li>
								<li :class="['pointer',isShow_bagPage?'active':'']"
									@click="onClick_changeType('bagpage')">红包页面
								</li>
							</ul>
						</div>
						<div class="right-body ">
							<div class="activity-detail-box" v-show="isShow_activityDetail">
								<div class="activity-detail-top">
									<div class="activity-title-detail">
										<p>总计：已关联商品数 <span class="number">{{relateCount}}</span><span>个</span></p>
										<p>红包领取数 <span class="number">{{receiveCount}}</span><span>个</span></p>
										<p>发放金额 <span class="number">{{totalAmount}}</span><span>元</span></p>
									</div>
									<div class="activity-record">
										<p :class="['pointer',isShow_contactProduct? 'selected':'']"
										   @click="onClick_contactProduct">已关联商品</p>
										<p :class="['pointer',isShow_activityRecord? 'selected':'']"
										   @click="onClick_activityRecord">活动修改记录</p>
									</div>
								</div>
								<div class="activity-table" v-show="isShow_contactProduct">
									<table>
										<tr>
											<td>二维码编码</td>
											<td>试用商品</td>
											<td>所属批次号</td>
											<td>已扫描领取</td>
											<td>关联时间</td>
										</tr>
										<tr v-for="item in relateList">
											<td>{{item.qrcodeNo}}</td>
											<td>{{item.batchUse}}</td>
											<td>{{item.batchNo}}</td>
											<td>{{item.statusDesc}}</td>
											<td>{{item.relTime}}</td>
										</tr>
									</table>
									<common-page :index="cantactPage" :total="cantactTotalPage"
												 @change="onChange_cantactPage"
												 v-show="cantactTotalPage>1"></common-page>
									<common-prompt v-show="relateList.length==0"></common-prompt>
								</div>
								<div class="activity-table" v-show="isShow_activityRecord">
									<table>
										<tr>
											<td>有效时间段</td>
											<td>规格</td>
											<td>领取红包数</td>
											<td>发放金额（元）</td>
											<td @click="onClick_sortBtn('modify_time')" class="pointer">
												规则修改时间
												<common-sort :type="sortOrder"
															 :target="'modify_time'"
															 :currentField="sortField"
												></common-sort>
											</td>
										</tr>
										<tr v-for="item in editRecordList">
											<td>{{item.time}}</td>
											<td>
												<!--<label >-->
													<input type="checkbox"
														   :checked="onConfirm_isChecked(item.ruleType,1)" disabled>
													<span class="reward pointer" @click="onClick_checkReward(item.ruleType,1)">会员奖励</span>
												<!--</label>-->
												<!--<label >-->
													<input type="checkbox"
														   :checked="onConfirm_isChecked(item.ruleType,2)" disabled>
													<span class="reward pointer" @click="onClick_checkReward(item.ruleType,2)">区域奖励</span>
												<!--</label>-->


											</td>
											<td>{{item.receivedCount}}</td>
											<td>{{item.receivedAmount}}</td>
											<td>{{item.modifyTime}}</td>
										</tr>
									</table>
									<common-page :index="modPageNum" :total="modTotalPage"
												 @change="onChange_modPage" v-show="modTotalPage>1"></common-page>
									<common-prompt v-show="editRecordList.length==0"></common-prompt>
								</div>

							</div>
							<div><a v-for="item in rpPageCount" @click="onClick_rpPage(item+1)"
									class="button pointer" v-show="page != 1&&isShow_bagPage">{{item}}</a></div>
							<activity-rule :memberList="memberList" v-show="page == 1&&isShow_activityRule"
										   @click="onUpdate_ruleContent" @next="onTo_nextPage"
										   :status="activityStatus"></activity-rule>
							<activity-page v-show="page != 1&&isShow_bagPage" :page="page"
										   @click="onUpdate_rpContent" @next="onTo_nextPage"></activity-page>
							<div class="button" @click="onClick_saveModBtn"
								 v-show="currentPage&&currentPage != 'detail'">
								保存修改
							</div>
						</div>
						<common-footer></common-footer>
					</div>
				</div>
				<transition name="bounce">
					<div class="affix-box default-pos-type" v-show="isShow_memberReward">
						<div class="pop-edit-password member-reward-pop">
							<div class="show-close-btn">
								<img :src="g.config.path.images+'/close.png'"
									 @click="onClick_closeBtn"/>
							</div>
							<div class="step-about-tit show-recharge-tips">
								会员奖励
							</div>
							<div class="pop-body reward-body">
								<div class="form" v-for="item in memberRewardList">
									<span class="member-level">{{item.memberName}}/{{item.reward}}倍</span>
								</div>

							</div>
						</div>
					</div>
				</transition>
				<transition name="bounce">
					<div class="affix-box default-pos-type" v-show="isShow_areaReward">
						<div class="pop-edit-password area-reward-pop">
							<div class="show-close-btn">
								<img :src="g.config.path.images+'/close.png'"
									 @click="onClick_closeBtn"/>
							</div>
							<div class="step-about-tit show-recharge-tips">
								区域奖励
							</div>
							<div class="pop-body">
								<div class="choose-area" v-for="item in areaRewardList">
									<div>{{item.provinceName}}/{{item.cityName}}/{{item.reward}}</div>
								</div>


							</div>
						</div>
					</div>
				</transition>

			</div>
		</div>

	</main-layout>
</template>


<script type="text/ecmascript-6">
	import g from '../global';
	import MainLayout from './common/mainLayout.vue';
	import CommonNav from './common/CommonNav.vue';
	import CommonTopNav from './common/CommonTopNav.vue';
	import ActivityRule from './common/activity/ActivityRule.vue';
	import ActivityPage from './common/activity/ActivityPage.vue';
	import {getDetail} from './activityDetail';
	import {getActivity} from './addActivity';
	import CommonPage from './common/CommonPage.vue';
	import CommonFooter from './common/CommonFooter.vue';
	import CommonPrompt from './common/CommonPrompt.vue';
	import CommonSort from './common/CommonSort.vue';
	export default {
		created(){
			g.event.addEventListener("UPDATE_DATA", this.initData);
			this.init();
		},
		data(){
			return {
				isLoad: false,
				g: g,
				relateCount: 0,
				receiveCount: 0,
				totalAmount: 0,
				activityId: 0,
				relateList: [],
				memberList: [],
				areaRewardList: [],
				memberRewardList: [],
				page: 1,
				cantactPage: 1,
				cantactTotalPage: 1,
				modPageNum: 1,
				modTotalPage: 1,
				rpPageCount: 1,
				activityName: "",
				currentPage: 'detail',
				sortField: 'modify_time',
				editRecordList: [],
				sortOrder: 'desc',
				activityStatus: "",
				rpInfo: {},
				ruleData: {},
				isShow_memberReward: false,
				isShow_areaReward: false,
				isShow_contactProduct: true,
				isShow_activityRecord: false,
				isShow_activityDetail: true,
				isShow_activityRule: false,
				isShow_bagPage: false
			}
		},
		components: {
			MainLayout,
			CommonNav,
			ActivityRule,
			ActivityPage,
			CommonTopNav,
			CommonPage,
			CommonFooter,
			CommonPrompt,
			CommonSort

		},
		methods: {
			init(){
				this.currentPage = g.currentRoute.query.type;
				this.activityName = g.currentRoute.query.name;
				this.rpPageCount = g.param.rpPageCount;

				this.initData();
				this.initActivityRule();
				this.initRpInfo();
				this.isLoad = true;
			},
			initActivityRule(){
				this.ruleData = {
					"activityInfo": {
						"activityName": "",
						"activityId": "",
						"activityStartTime": "",
						"activityEndTime": "",
						"isPlatformReward": 0
					},
					"memberRules": [],
					"regionRules": [],
					"activityRpInfo": {
						"rpType": 0,
						"randomMin": 0,
						"randomMax": 0,
						"fixedAmount": 0,
						"randomAvg": 0
					}
				}
			},
			initRpInfo(){
				this.rpInfo = {
					"rpTitle": "",
					"rpLogoUrl": "",
					"rpBrand": "",
					"rpWish": "",
					"activityId": ""
				}
			},

			initData(){
				this.activityId = g.currentRoute.query.id;
				if (this.currentPage == "detail" || !this.currentPage)
				{
					this.initDetailData();
					this.onUpdate_URLPage("detail");
				}
				else if (this.currentPage == "rule")
				{
					getActivity(this.initRulePage);
					this.onUpdate_URLPage("rule");
				}
				else if (this.currentPage == "bagpage")
				{
					this.initRulePage();
					this.onUpdate_URLPage("bagpage");
				}
			},

			initDetailData(){
				var dataObj = g.data.activityDetailPool;
				this.relateList = dataObj.list;
				this.relateCount = dataObj.relateCount;
				this.receiveCount = dataObj.receiveCount;
				this.totalAmount = dataObj.totalAmount;
				this.cantactTotalPage = dataObj.totalPage;
			},
			initRulePage(){
				this.memberList = g.data.memberPool.list;
				this.activityStatus = g.data.activityRolePool.status;
			},
			onUpdate_URLPage($type){
				if ($type == "detail")
				{
					this.isShow_activityDetail = true;
					this.isShow_activityRule = false;
					this.isShow_bagPage = false;
				}
				else if ($type == "rule")
				{
					this.isShow_activityDetail = false;
					this.isShow_activityRule = true;
					this.isShow_bagPage = false;
					this.page = 1;
				}
				else if ($type == "bagpage")
				{
					this.isShow_activityDetail = false;
					this.isShow_activityRule = false;
					this.isShow_bagPage = true;
					this.page = 2;
				}
			},
			onClick_memberReward(){
				this.isShow_memberReward = true;
			},
			onClick_closeBtn(){
				this.isShow_memberReward = false;
				this.isShow_areaReward = false;
				this.isShow_cancelContact = false;
			},
			onClick_areaReward(){
				this.isShow_areaReward = true;
			},
			onClick_contactProduct(){
				this.isShow_contactProduct = true;
				this.isShow_activityRecord = false;
			},
			onClick_activityRecord(){
				this.onUpdate_recordList();
			},
			onUpdate_recordList(){
				g.net.call("activity/getActivityEditRecordPageList", {
					'activityId': this.activityId,
					'page': this.modPageNum,
					'pageSize': g.param.pageSizeList[0],
					'sortField': this.sortField,
					'sortOrder': this.sortOrder
				}).then(($data) =>
				{
					g.data.activityRecordPool.removeAll();
					g.data.activityRecordPool.update($data);
					this.editRecordList = g.data.activityRecordPool.list;
					this.modTotalPage = g.data.activityRecordPool.totalPage;
					this.isShow_activityRecord = true;
					this.isShow_contactProduct = false;
				}, (err) =>
				{
					g.func.dealErr(err);

				});
			},
			onClick_sortBtn($field){
				if (this.sortOrder == "desc")
				{
					this.sortOrder = "asc"
				}
				else
				{
					this.sortOrder = "desc"
				}
				this.sortField = $field;
				this.modPageNum = 1;
				this.onUpdate_recordList();

			},

			onChange_modPage($page, pageSize){
				if ($page)
				{
					this.modPageNum = $page;
				}
				if ($pageSize)
				{
					this.pageSize = $pageSize;
				}
				this.onUpdate_recordList()
			},
			onClick_cancleCantact(){
				this.isShow_cancelContact = true;
			},
			onClick_nextBtn(){
				this.page += 1;
			},
			onClick_preBtn(){
				this.page -= 1;
			},
			onClick_changeType($type){
				if ($type == this.currentPage)
				{
					return
				}
				this.currentPage = $type;
				g.url = ({
					'path': '/activitydetail',
					'query': {
						'type': $type,
						'id': this.activityId,
						'name': this.activityName
					}
				});
			},

			onClick_myActivityBtn(){
				g.url = ("/activity")
			},
			onClick_modBtn(){
				g.url = ({
					'path': '/addactivity',
					'query': {
						'id': this.activityId
					}
				});
			},
			onChange_cantactPage($page, $pageSize){
				if ($page == this.cantactPage)
				{
					return
				}
				var obj = {};
				this.cantactPage = $page;
				obj.activityId = this.activityId;
				obj.page = $page;
				obj.pageSize = $pageSize;
				getDetail(obj, this.initDetailData);

			},
			onConfirm_isChecked($ruleType, $currentType){
				if ($ruleType == 3 || $ruleType == $currentType)
				{
					return true
				}
				else
				{
					return false
				}
			},
			onTo_nextPage(){
				return;
			},
			onClick_saveModBtn(){
				if (this.page == 1)
				{
					g.event.dispatchEvent('SAVE_ACTIVITY_RULE')
				}
				else if (this.page != 1)
				{
					g.event.dispatchEvent('SAVE_ACTIVITY_PAGE')
				}
			},
			onUpdate_ruleContent($obj){
				$obj.hasOwnProperty('activityName') && (this.ruleData.activityInfo.activityName = $obj.activityName);
				$obj.hasOwnProperty('activityStartTime') && (this.ruleData.activityInfo.activityStartTime = $obj.activityStartTime);
				$obj.hasOwnProperty('activityEndTime') && (this.ruleData.activityInfo.activityEndTime = $obj.activityEndTime);
				$obj.hasOwnProperty('memberRules') && (this.ruleData.memberRules = $obj.memberRules);
				$obj.hasOwnProperty('regionRules') && (this.ruleData.regionRules = $obj.regionRules);
				$obj.hasOwnProperty('redPacType') && (this.ruleData.activityRpInfo.rpType = $obj.redPacType);
				$obj.hasOwnProperty('randomAvg') && (this.ruleData.activityRpInfo.randomAvg = $obj.randomAvg);
				this.ruleData.activityInfo.activityId = this.activityId;
				if ($obj.redPacType == 1)
				{
					this.ruleData.activityRpInfo.randomMin = $obj.startAmount;
					this.ruleData.activityRpInfo.randomMax = $obj.endAmount;
				}
				else if ($obj.redPacType == 2)
				{
					this.ruleData.activityRpInfo.fixedAmount = $obj.fixAmount;
				}
				if ($obj.hasOwnProperty('isPlatformReward') && $obj.isPlatformReward)
				{
					this.ruleData.activityInfo.isPlatformReward = 1
				}
				else
				{
					this.ruleData.activityInfo.isPlatformReward = 0
				}
				this.onSave_ruleContent()
			},
			onSave_ruleContent(){
				var ruleData = JSON.stringify(this.ruleData);
				g.net.call("activity/editActivityRuleInfo", {
					'data': ruleData
				}).then(($data) =>
				{
					g.ui.toast("活动规则修改成功")
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onUpdate_rpContent($obj){
				$obj.hasOwnProperty('rpTitle') && (this.rpInfo.rpTitle = $obj.rpTitle);
				$obj.hasOwnProperty('rpLogoUrl') && (this.rpInfo.rpLogoUrl = $obj.rpLogoUrl);
				$obj.hasOwnProperty('rpBrand') && (this.rpInfo.rpBrand = $obj.rpBrand);
				$obj.hasOwnProperty('rpWish') && (this.rpInfo.rpWish = $obj.rpWish);
				this.rpInfo.activityId = this.activityId;
				this.onSave_rpContent()
			},
			onSave_rpContent(){
				g.net.call("activity/editActivityRpInfo", this.rpInfo).then(($data) =>
				{
					g.ui.toast("红包信息修改成功")
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onClick_rpPage($page){
				if (this.page != $page)
				{
					this.page = $page
				}
			},
			onClick_checkReward($ruleType, $currentType){
				if ($ruleType == 3 || $ruleType == $currentType)
				{
					g.net.call("activity/getActivityRules", {
						"ruleType": $currentType,
						"activityId": this.activityId
					}).then(($data) =>
					{
						if ($currentType == 1)
						{
							this.isShow_memberReward = true;
							this.memberRewardList = $data.data
						}
						else if ($currentType == 2)
						{
							this.isShow_areaReward = true;
							this.areaRewardList = $data.data
						}
					}, (err) =>
					{
						g.func.dealErr(err);
					});
				}
			}
		}
	}
</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss">
	@import "../css/common.scss";
</style>

<style lang="sass" type="text/scss" rel="stylesheet/scss" scoped>
	@import "../css/activityDetail.scss";

	.logo {
		width: 100%;
		height: 100%;
	}

	.logoBox {
		width: 180px;
		height: 180px;
	}

	.mod-btn {
		width: 190px;
		height: 42px;
		line-height: 42px;
		text-align: center;
		display: inline-block;
		background: #01aaef;
		color: #ffffff;
		border-radius: 4px;
	}

	.activity-rule .button-box {
		width: 100%;
		padding-top: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>