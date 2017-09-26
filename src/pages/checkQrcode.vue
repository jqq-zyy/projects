<template>
	<main-layout :isLoad="isLoad">
		<div slot="content" class="content-box">
			<div class="admin-main-wrap">
				<common-nav :nav="'checkqrcode'"></common-nav>
				<div class="right-content-wrap">
					<common-top-nav></common-top-nav>
					<div class="admin-data-items">
						<div class="right-body">
							<div class="g-title">查询二维码</div>
							<div class=" bar-box">
								<div class="search-code-box">
									<span class="search-name">二维码ID:</span>
									<input type="text" class="search-input">
									<span class="btn pointer search border-btn hb-fill-middle2-bg">查找</span>
								</div>
							</div>
							<div class="admin-calendar-table" style="background: #ffffff">
								<div class="check-detail">
									<div class="msg-title">查找结果</div>
									<div class="msg-title">二维码ID：</div>
									<span class="msg-info">所属活动名称:<i class="text-color">123</i></span>
									<span class="msg-info">活动创建时间:</span>
									<span class="msg-info">活动状态:</span>
									<span class="msg-info">所属商户ID:<i class="text-color">123</i></span>
                                    <span class="msg-info">企业全称:
                                        <img :src="g.config.path.images+'/cert.png'" class="cert-img">
                                        <img :src="g.config.path.images+'/cert1.png'" class="cert-img"></span>
									</span>
									<span class="msg-info">商户状态:</span>
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
								 @click="onClick_closeBtn" />
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
	@import "../css/checkQrcode.scss";
</style>






