<template>
	<main-layout :isLoad="isLoad">
		<div slot="content" class="content-box">
			<div class="admin-main-wrap">
				<common-nav></common-nav>
				<div class="right-content-wrap">
					<common-top-nav></common-top-nav>
					<div class="admin-data-items">
						<div class="right-body personal-box">
							<div class="g-title"><span>商户列表</span>/活动详情</div>
							<div class="admin-calendar-table">
								<div>基本信息</div>
								<span>活动名称:{{activityInfo.activityName}}</span>
								<span>创建时间:{{activityInfo.createTime}}</span>
								<span>基础红包设定：</span>
								<span>状态：{{activityInfo.activityStartTimeStr}}
									<span class="button pointer" v-text="onConfirm_freezeStatus(activityInfo.freezeStatus)"
										  @click="onClick_changeStatus(activityInfo.freezeStatus)"></span></span>
								<span>开始时间：{{activityInfo.activityStartTimeStr}}</span>
								<span>结束时间：{{activityInfo.activityEndTimeStr}}</span>
								<span>剩余数量/二维码数量：{{remainQrCodeNum}}/{{totalQrCodeNum}}</span>
								<span>已发放金额：{{totalMakedAmount}}</span>
								<span>是否接受平台红包：</span>
								<span>活动地区：</span>
								<span>会员奖励：</span>
							</div>
							<div class="admin-calendar-table">
								<div>红包信息</div>
								<div>
									<span>标题：{{activityRpInfo.rpTitle}}</span>
									<span>祝福文字：{{activityRpInfo.rpWish}}</span>
									<span>显示图片：<img :src="activityRpInfo.rpLogoUrl" alt=""></span>
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
						<div class="pop-body tree-box">
							<div>确认{{currentTypeDesc}}该活动么</div>
							<div class="m-title">
								<div class="button pointer" @click="onClick_closeBtn">暂不{{currentTypeDesc}}</div>
								<div class="button pointer" @click="onClick_confirmChange">确认{{currentTypeDesc}}</div>
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
	import CommonFooter from './common/CommonFooter.vue';
	export default {
		created(){
			this.isLoad = true;
			this.init();
		},
		data(){
			return {
				isLoad: false,
				isShow_changeTypePop: false,
				currentType: "冻结",
				currentTypeDesc: "",
				g: g,
				activityInfo: {},
				activityRpInfo: {},
				activityRules: [],
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
			CommonFooter
		},
		methods: {
			init(){
				var activityDetail = g.data.activityDetailPool;
				this.activityInfo = activityDetail.activityInfo;
				this.activityRpInfo = activityDetail.activityRpInfo;
				this.activityRules = activityDetail.activityRules;
				this.totalQrCodeNum = activityDetail.totalQrCodeNum;
				this.remainQrCodeNum = activityDetail.remainQrCodeNum;
				this.totalMakedAmount = activityDetail.totalMakedAmount;
				this.totalMakedRpCount = activityDetail.totalMakedRpCount;
			},
			onConfirm_freezeStatus($type){
				if ($type == 1)
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
				if ($type == 1)
				{
					this.currentTypeDesc = "冻结"
				}
				else
				{
					this.currentTypeDesc = "解冻"
				}
				this.isShow_changeTypePop = true

			},
			onClick_closeBtn(){
				this.isShow_changeTypePop = false;
			},
			onClick_confirmChange(){
				var obj = {};
				if (this.currentType == 1)
				{
					obj = {
						"freezeStatus": 0,
						"freezeStatusDesc": "冻结"
					}
				}
				else
				{
					obj = {
						"freezeStatus": 1,
						"freezeStatusDesc": "正常"
					}
				}
				/*g.net.call("/getActivityDetail",{
				 "id":this.shopId
				 }).then(($data) =>
				 {*/
				g.data.userDetailPool.update(obj);
				this.init();
				this.isShow_changeTypePop = false;
//				}, (err) =>
//				{
//					g.func.dealErr(err);
//				});
			},
		}
	}
</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss">

	@import "../css/common.scss";
</style>
<style lang="sass" type="text/scss" rel="stylesheet/scss" scoped>
	@import "../css/personlInfo.scss";

	img {
		width: 50px;
		height: 50px;
	}
</style>






