<template>
	<main-layout :isLoad="isLoad">
		<div slot="content" class="content-box">
			<div class="admin-main-wrap">
				<common-nav  :nav="'activity'"></common-nav>
				<div class="right-content-wrap">
					<common-top-nav></common-top-nav>
					<div class="admin-data-items">
						<div class="right-body">
							<div class="g-title"><span>商户列表</span>/活动详情</div>
							<div class="admin-calendar-table user-detail-box">
								<div class="detail-msg">
									<div class="msg-title">基本信息</div>
									<span class="msg-info msf-info-width">活动名称：{{activityInfo.activityName}}</span>
									<span class="msg-info msf-info-width">创建时间：{{activityInfo.createTime}}</span>
									<span class="msg-info msf-info-width">基础红包设定：
										<span v-if="activityRpInfo.fixedAmount">
											固定金额：{{activityRpInfo.fixedAmount/100}}元/个

										</span>
										<span  v-if="activityRpInfo.randomMin">
											随机金额：{{activityRpInfo.randomMin/100}}~{{activityRpInfo.randomMax/100}}元/个（平均金额{{activityRpInfo.randomAvg/100}}元/个）

										</span>
									</span>
									<span class="msg-info msf-info-width">状态：{{activityInfo.activityStatusStr}}
									<span class="pointer border-btn status-btn hb-fill-middle2-bg"
										  v-text="onConfirm_freezeStatus(activityInfo.activityStatus)"
										  @click="onClick_changeStatus(activityInfo.activityStatus)"></span></span>
									<span class="msg-info msf-info-width">开始时间：<span v-text="currentActivity(activityInfo.activityStartTimeStr)"></span></span>
									<span class="msg-info msf-info-width">结束时间：<span v-text="currentActivity(activityInfo.activityEndTimeStr)"></span></span>
									<span class="msg-info msf-info-width">剩余数量/总二维码数量：{{remainQrCodeNum}}/{{totalQrCodeNum}}</span>
									<span class="msg-info msf-info-width">已发放金额：{{totalMakedAmount}}</span>
									<span class="msg-info msf-info-width" style="width: 100%;">是否接受平台红包：<span v-text="isPlatformReward"></span></span>
									<div class="msg-info msf-info-width">
										<span>活动地区：</span>
										<ul v-for="(item,index) in regionRules" v-if="regionRules.length>0">
											<li v-if="item.ruleType==2">{{index+1}}. {{item.provinceName}}（{{item.reward}}  倍）</li>
										</ul>
										<span v-if="regionRules.length==0">暂无</span>
									</div>
									<div class="msg-info msf-info-width">
										<span>会员奖励：</span>
										<ul v-for="(item,index) in memberRules" v-if="memberRules.length>0">
											<li >{{index+1}}. {{item.memberName}}会员（{{item.reward}} 倍）</li>
										</ul>
										<span v-if="memberRules.length==0">暂无</span>
									</div>
								</div>
								<div class="detail-msg">
									<div class="msg-title">红包信息</div>
									<span class="msg-info msf-info-width">标题：{{activityRpInfo.rpTitle}}</span>
									<span class="msg-info msf-info-width">祝福文字：{{activityRpInfo.rpWish}}</span>
									<span class="msg-info msf-info-width">显示图片：<img class="show-img pointer" :src="activityRpInfo.rpLogoUrl"  @click="onClick_seeImage(activityRpInfo.rpLogoUrl)"></span>
								</div>
							</div>
						</div>
						<common-footer></common-footer>

					</div>
				</div>
			</div>
			<transition name="bounce">
				<div class="affix-box default-pos-type" v-show="isShow_changeTypePop">
					<div class="pop-edit-password pop-edit">
						<div class="show-close-btn">
							<img :src="g.config.path.images+'/close.png'"
								 @click="onClick_closeBtn"/>
						</div>
						<div class="pop-tit"></div>
						<div class="pop-body">
							<div class="m-title text-center">确认解冻该用户么</div>
							<div class="m-title button-box">
								<div class="border-btn pointer button hb-fill-middle2-bg" @click="onClick_closeBtn">
									暂不解冻
								</div>
								<div class="bg-btn pointer button hb-fill-middle2-rev" @click="onClick_confirmChange">
									确认解冻
								</div>
							</div>
						</div>
					</div>
				</div>
			</transition>
			<transition name="bounce">
				<div class="affix-box default-pos-type" v-show="isShow_freezePop">
					<div class="pop-edit-password pop-edit">
						<div class="show-close-btn">
							<img :src="g.config.path.images+'/close.png'"
								 @click="onClick_closeBtn"/>
						</div>
						<div class="pop-tit"></div>
						<div class="pop-body">
							<div class="m-title">
								<span class="">请输入冻结原因：</span>
								<textarea name="" cols="30" rows="10" class="describle-reasons"
										  v-model="freezeContent" @focus="onFocus_refuseInput"></textarea>
								<div class="refuse-reason">
									<span v-show="isShow_hasFreezeError">冻结原因不能为空</span>
								</div>
							</div>
							<div class="button-box" style="margin-top: 20px">
								<div class="refuse-button pointer border-btn" @click="onClick_closeBtn">暂不冻结</div>
								<div class="refuse-button pointer bg-btn" @click="onClick_sumbitFreezeBtn">确认冻结并告知商户
								</div>
							</div>
						</div>

					</div>
				</div>
			</transition>
			<see-image v-show ="isShow_seeImage" :imageUrl="currentUrl" @close="onClick_closeBtn"></see-image>
		</div>
	</main-layout>
</template>

<script type="text/ecmascript-6">
	import g from '../global';
	import MainLayout from './common/mainLayout.vue';
	import CommonNav from './common/CommonNav.vue';
	import CommonTopNav from './common/CommonTopNav.vue';
	import CommonFooter from './common/CommonFooter.vue';
	import SeeImage from './common/SeeImage.vue';
	import {queryActivityDetail} from './activityDetail';
	export default {
		created(){
			this.isLoad = true;
			this.init();
		},
		data(){
			return {
				isLoad: false,
				isShow_changeTypePop: false,
				isShow_freezePop: false,
				isShow_seeImage:false,
				isShow_hasFreezeError:false,
				currentType: "",
				freezeContent: "",
				g: g,
				activityId:"",
				activityInfo: {},
				activityRpInfo: {},
				memberRules: [],
				regionRules: [],
				totalQrCodeNum: 0,
				remainQrCodeNum: 0,
				totalMakedAmount: 0,
				totalMakedRpCount: 0
			}
		},
		components: {
			MainLayout,
			CommonNav,
			CommonTopNav,
			CommonFooter,
			SeeImage
		},
		computed:{
			isPlatformReward(){
				if(this.activityInfo.isPlatformReward){
					return "是"
				}else{
					return "否"
				}
			}
		},
		methods: {
			init(){
				var activityDetail = g.data.activityDetailPool;
				this.activityInfo = activityDetail.activityInfo;
				this.activityRpInfo = activityDetail.activityRpInfo;
				this.memberRules = activityDetail.memberRules;
				this.regionRules = activityDetail.regionRules;
				this.totalQrCodeNum = activityDetail.totalQrCodeNum;
				this.remainQrCodeNum = activityDetail.remainQrCodeNum;
				this.totalMakedAmount = activityDetail.totalMakedAmount;
				this.totalMakedRpCount = activityDetail.totalMakedRpCount;
				this.activityId = g.vue.router.currentRoute.query.id

			},
			onClick_seeImage($url){
				this.currentUrl = $url;
				this.isShow_seeImage = true;

			},
			currentActivity($detail){

				if($detail){
					return $detail
				}else{
					return "暂无"
				}
			},
			onConfirm_freezeStatus($type){
				if ($type != 6)
				{
					return "冻结该活动"
				}
				else
				{
					return "解冻该活动"
				}
			},
			onClick_changeStatus($type){
				this.currentType = $type;
				if ($type != 6) {

					this.isShow_freezePop = true
				}
				else {
					this.isShow_changeTypePop = true
				}

			},
			onClick_closeBtn(){
				this.isShow_changeTypePop = false;
				this.isShow_freezePop = false;
				this.isShow_seeImage = false;
				this.isShow_hasFreezeError = false;
				this.freezeContent = "";

			},
			onFocus_refuseInput(){
				this.isShow_hasFreezeError = false;

			},
			onClick_confirmChange(){
				var obj = {};
				var freezeStatus;
				if (this.currentType != 6)
				{
					freezeStatus = 3
				}
				else
				{
					freezeStatus = 4
				}
				g.net.call("activity/freezeShopActivity", {
					"activityId": this.activityId,
					"operateType": freezeStatus,
					"remark": this.freezeContent
				}).then(($data) => {
					queryActivityDetail(this.activityId,this.init)
					this.onClick_closeBtn();
					g.ui.toast("更新活动状态成功");

				}, (err) => {
					g.func.dealErr(err);
				});
			},
			onClick_sumbitFreezeBtn(){
				if (this.freezeContent.trim() == "") {
					this.isShow_hasFreezeError = true;
					return
				}
				this.onClick_confirmChange()

			}
		}
	}
</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss">
	@import "../css/personlInfo.scss";
	@import "../css/userDetail.scss";

	.show-img {
		width: 50px;
		height: 50px;
		vertical-align: middle;

	}

</style>

