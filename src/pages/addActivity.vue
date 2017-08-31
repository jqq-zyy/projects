<template>
	<main-layout :isLoad="isLoad">
		<div slot="content" class="content-box">
			<div class="admin-main-wrap">
				<common-nav :nav="'activity'"></common-nav>
				<div class="right-content-wrap">
					<common-top-nav></common-top-nav>
					<div class="admin-data-items">
						<div class="right-body">
							<h3 class="a-title">我的活动 <span>创建新活动</span></h3>
							<div class="activity-detail-bar">
								<div class="step">
									活动规则设定
									<img src="../../assets/images/step.png" alt=""  v-show="">
									<img src="../../assets/images/step1.png" alt="">
								</div>
								<div class=" " :class="{'step_2':page>1}">
									红包页面设定
									<img src="../../assets/images/step.png" alt=""  >
									<img src="../../assets/images/step1.png" alt="" v-show="">
								</div>
								<div class=" " :class="{'step_3':page==5}">预览并发布</div>

							</div>
							<activity-rule :memberList="memberList" v-show="page == 1"
										   @click="onUpdate_formContent" @next="onTo_nextPage"></activity-rule>
							<activity-page v-show="page != 1" :page="page"
										   @click="onUpdate_formContent" @next="onTo_nextPage"></activity-page>
							<div class="add-activity-button">
								<div class="next-btn pointer border-btn" @click="onClick_prevPage" v-show="page>1&&page<5">
									上一步
								</div>
								<div class="next-btn pointer bg-btn next" v-text="onUpdate_operateContent()"
									 @click="onClick_operateBtn"></div>

							</div>

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
				<release-success-pop v-show="isShow_successPop" @close="onClick_closeBtn"
									 @restart="onClick_restartBtn" @click="onClick_contactBtn" :amount="totalAmount">

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
	import ActivityRule from './common/activity/ActivityRule.vue';
	import ActivityPage from './common/activity/ActivityPage.vue';
	import ChangeTimePop from '../components/activityPop/changeTimePop.vue';
	import ReleaseSuccessPop from '../components/activityPop/releaseSuccessPop.vue';
	import Calendar from './common/Calendar.vue';
	import CommonFooter from './common/CommonFooter.vue';

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
				g: g,
				memberList: [],
				page: 1,
				activityData: {},
				qrcodeUrl: "",
				activityId: "",
				id:"",
				totalAmount: 0,
				bagDefLogo:""

			}
		},
		components: {
			MainLayout,
			CommonNav,
			CommonTopNav,
			ActivityRule,
			ActivityPage,
			ChangeTimePop,
			Calendar,
			ReleaseSuccessPop,
			CommonFooter
		},
		methods: {
			init(){
				this.initActivityData();
				this.memberList = g.data.memberPool.list;
				var id =  g.currentRoute.query.id;
				if(id){
					this.id = id;
				}
			},

			initActivityData(){
				this.activityData = {
					"activityInfo": {
						"activityName": "",
						"activityId": "",
						"isPlatformReward":0
					},
					"memberRules": [],
					"regionRules": [],
					"activityRpInfo": {
						"rpTitle": "",
						"rpLogoUrl": "",
						"rpBrand": "",
						"rpWish": "",
						"rpType": 0,
						"randomMin": 0,
						"randomMax": 0,
						"fixedAmount": 0,
						'randomAvg':0
					}
				}
			},
			onUpdate_formContent($obj){
				$obj.hasOwnProperty('activityName') && (this.activityData.activityInfo.activityName = $obj.activityName);
				$obj.hasOwnProperty('memberRules') && (this.activityData.memberRules = $obj.memberRules);
				$obj.hasOwnProperty('regionRules') && (this.activityData.regionRules = $obj.regionRules);
				$obj.hasOwnProperty('redPacType') && (this.activityData.activityRpInfo.rpType = $obj.redPacType);
				$obj.hasOwnProperty('rpTitle') && (this.activityData.activityRpInfo.rpTitle = $obj.rpTitle);
				$obj.hasOwnProperty('rpLogoUrl') && (this.activityData.activityRpInfo.rpLogoUrl = $obj.rpLogoUrl);
				$obj.hasOwnProperty('rpBrand') && (this.activityData.activityRpInfo.rpBrand = $obj.rpBrand);
				$obj.hasOwnProperty('rpWish') && (this.activityData.activityRpInfo.rpWish = $obj.rpWish);
				if($obj.hasOwnProperty('isPlatformReward')){
					if($obj.isPlatformReward){
						this.activityData.activityInfo.isPlatformReward = 1
					}else{
						this.activityData.activityInfo.isPlatformReward = 0
					}
				}
				if ($obj.redPacType == 1)
				{
					this.activityData.activityRpInfo.randomMin = $obj.startAmount;
					this.activityData.activityRpInfo.randomMax = $obj.endAmount;
					this.activityData.activityRpInfo.randomAvg = $obj.randomAvg;
				}
				else if ($obj.redPacType == 2)
				{
					this.activityData.activityRpInfo.fixedAmount = $obj.fixAmount;

				}
			},
			onClick_closeBtn(){
				this.isShow_sendPop = false;
				this.isShow_successPop = false;
			},
			onClick_nextPage(){
				if (this.page == 1)
				{
					g.event.dispatchEvent('SAVE_ACTIVITY_RULE')
				}
				else if (this.page == 3)
				{
					g.event.dispatchEvent('SAVE_ACTIVITY_PAGE')
				}else{
					this.page += 1;
				}

			},
			onGet_defaultLogo(){
				g.net.call("activity/saveActivityBaseInfo").then(($data)=>
				{
					this.bagDefLogo = $data
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onTo_nextPage(){
				this.page += 1;
			},
			onClick_prevPage(){
				this.page -= 1;
			},
			onClick_saveBtn(){
				if(this.id){
					this.activityData.activityId = this.id;
					this.activityData.activityInfo.activityId = this.id;
				}
				var activityData = JSON.stringify(this.activityData);
				g.net.call("activity/saveActivityBaseInfo", {
					"data": activityData
				}).then(($data)=>
				{
					this.activityId = $data.activityId;
					this.qrcodeUrl = g.param.moduleUrl + "?activityId=" + $data.activityId;
					g.event.dispatchEvent("INIT_QRCODE", this.qrcodeUrl);
					this.page += 1;
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onClick_forwardBtn(){
				this.isShow_sendPop = true;
			},
			onClick_confirmBtn($start,$end){
				g.net.call("/activity/publishActivity", {
					"activityId": this.activityId,
					"activityStartTime": $start,
					"activityEndTime": $end
				}).then(($data)=>
				{
					this.totalAmount = $data.assetCurrentAmount;
					this.isShow_sendPop = false;
					this.isShow_successPop = true;
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onClick_restartBtn(){
				this.init();
				this.page = 1;
				this.isShow_successPop = false;
			},
			onClick_contactBtn(){
				g.url = ("/qrcode")
			},
			onClick_overBtn(){
				g.url = ("/activity")
			},
			onUpdate_operateContent(){
				if (this.page < 4)
				{
					return "下一步"
				}
				else if (this.page == 4)
				{
					return "保存"
				}
				else if (this.page == 5)
				{
					//return "发布"
					return "完成"
				}
			},
			onClick_operateBtn(){
				if (this.page < 4)
				{
					this.onClick_nextPage();
				}
				else if (this.page == 4)
				{
					this.onClick_saveBtn();
				}
				else if (this.page == 5)
				{
					//this.onClick_forwardBtn();
					this.onClick_overBtn()
				}
			}
		}

	}
</script>
<style lang="sass" type="text/scss" rel="stylesheet/scss">
	@import "../css/common.scss";
	@import "../css/animation.scss";
	@import "../css/addActivity.scss";
	@import "../css/pop.scss";

	.set-date {
		input {
			background: url("../../assets/images/date.png") no-repeat 210px center;
		}
	}
</style>

<style lang="sass" type="text/scss" rel="stylesheet/scss" scoped>
	@import "../css/activityDetail.scss";
</style>








