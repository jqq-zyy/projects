<template>
	<main-layout :isLoad="isLoad">
		<div slot="content" class="content-box">
			<div class="admin-main-wrap">
				<common-nav :nav="'rule'"></common-nav>
				<div class="right-content-wrap">
					<common-top-nav></common-top-nav>
					<div class="admin-data-items">
						<div class="right-body">
							<div class="g-title">规则设置</div>
							<div class="plat-rule">
								<div class="g-title">平台规则</div>
								<div class="plat-setting">
									账户余额报警门槛：¥10000.00
									<span class="hb-fill-middle2-bg" @click="onClick_setBtn('plat-money')">设置
									</span>
									<p>当账户余额低于报警门槛时，我们会以短信的形式通知您。</p>
								</div>
								<div class="plat-setting">
									平台红包金额范围：1 倍 ~ 2.1 倍
									<span class="hb-fill-middle2-bg" @click="onClick_setBtn('plat-red')">设置</span>
									<p>
										商户送出的每个红包基础上都会额外赠送平台红包，具体金额为商户购买二维码所花单价的倍数区间中的随机金额。
									</p>
								</div>
								<div class="plat-setting">
									扫码限制数：10
									<span class="hb-fill-middle2-bg" @click="onClick_setBtn('plat-count')">设置</span>
									<p>一个消费者支付宝账户在24小时内允许领取的平台红包上限。</p>
								</div>
							</div>

							<div class="seller-rule">
								<div class="g-title">
									商家规则
								</div>
								<div class="seller-setting">
									<div>
										<span class="seller-price">二维码单价：</span>
										<div class="seller-range">
											<p>0 < 数量 <= 10000 时，单价 ¥ 0.05／个</p>
											<p>10000 < 数量 <= 30000 时，单价 ¥ 0.04／个</p>
											<p>50000 <= 数量时，单价 ¥ 0.02／个</p>

										</div>
										<span class="button hb-fill-middle2-bg"
											  @click="onClick_setBtn('ewm-price')">设置</span>
									</div>
								</div>

								<div class="seller-red">
									<p class="seller-support">是否支持使用平台红包：是</p>
									<span class="button hb-fill-middle2-bg" @click="onClick_setBtn('redpack')">设置</span>

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
						<div class="pop-body">
							<div>确认{{currentTypeDesc}}该活动么</div>
							<div class="m-title">
								<div class="button pointer" @click="onClick_closeBtn">暂不{{currentTypeDesc}}</div>
								<div class="button pointer" @click="onClick_confirmChange">确认{{currentTypeDesc}}</div>
							</div>
						</div>
					</div>
				</div>
			</transition>

			<!--账户余额报警门槛-->
			<transition name="bounce">
				<div class="affix-box default-pos-type" v-show="isShow_refusePop === 'plat-money'">
					<div class="pop-edit-password pop-edit">
						<div class="show-close-btn">
							<img :src="g.config.path.images+'/close.png'"
								 @click="onClick_closeBtn" />
						</div>
						<div class="pop-tit pop-tit-center">
							设置账户余额报警门槛
						</div>
						<div class="pop-body tree-box">
							<div class="input-money m-title">
								<span>请输入金额：</span>
								<input type="text">
								<span>元</span>
							</div>
							<p v-show="isShow_moneyTips" class="tips">请输入有效金额</p>
							<div>
								<div class="button hb-fill-middle2-bg">取消</div>
								<div class="button hb-fill-middle2-rev">保存</div>
							</div>

						</div>
					</div>
				</div>
			</transition>

			<!--平台红包金额范围-->
			<transition name="bounce">
				<div class="affix-box default-pos-type" v-show="isShow_refusePop === 'plat-red'">
					<div class="pop-edit-password pop-edit">
						<div class="show-close-btn">
							<img :src="g.config.path.images+'/close.png'"
								 @click="onClick_closeBtn" />
						</div>
						<div class="pop-tit">
							设置平台红包金额范围
						</div>
						<div class="pop-body tree-box">
							<div class="input-money m-title">
								<span>请输入倍数：</span>
								<input type="text" class="multiple"> ~
								<input type="text" class="multiple">
								<span>倍</span>
							</div>
							<p class="count-tipes">精确到小数点后一位</p>
							<div>
								<div class="button hb-fill-middle2-bg">取消</div>
								<div class="button hb-fill-middle2-rev">保存</div>
							</div>
						</div>
					</div>
				</div>
			</transition>

			<!--扫码限制数-->
			<transition name="bounce">
				<div class="affix-box default-pos-type" v-show="isShow_refusePop === 'plat-count'">
					<div class="pop-edit-password pop-edit">
						<div class="show-close-btn">
							<img :src="g.config.path.images+'/close.png'"
								 @click="onClick_closeBtn" />
						</div>
						<div class="pop-tit">
							设置扫码限制数
						</div>
						<div class="pop-body tree-box">
							<div class="input-money m-title">
								<span>请输入数量：</span>
								<input type="text">
								<span>元</span>
							</div>
							<p class="tips">请输入有效数量</p>
							<div>
								<div class="button hb-fill-middle2-bg">取消</div>
								<div class="button hb-fill-middle2-rev">保存</div>
							</div>
						</div>
					</div>
				</div>
			</transition>


			<!--设置二维码单价-->
			<transition name="bounce">
				<div class="affix-box default-pos-type" v-show="isShow_refusePop === 'ewm-price'">
					<div class="pop-edit-password pop-edit">
						<div class="show-close-btn">
							<img :src="g.config.path.images+'/close.png'"
								 @click="onClick_closeBtn" />
						</div>
						<div class="pop-tit">
							设置二维码单价
						</div>
						<div class="pop-body tree-box">
							<div class="input-money" style="margin-top: 25px">
								<span class="count">数量：</span>

								<div class="count-set">
									<div class="count-left">0 ~ <input type="text"></div>
									<div class="count-right">
										单价：¥ <input type="text"> / 个
									</div>
								</div>
								<div class="count-set">
									<div class="count-left">
										<input type="text">
										~
										<input type="text">
									</div>
									<div class="count-right">
										单价：¥ <input type="text"> / 个
										<span class="count-add"></span>
									</div>
								</div>
								<div class="count-set">
									<div class="count-left">
										<input type="text">
										以上
									</div>
									<div class="count-right">
										单价：¥ <input type="text"> / 个
									</div>
								</div>

							</div>
							<p class="count-tips">请输入有效数量</p>
							<div>
								<div class="button hb-fill-middle2-bg">取消</div>
								<div class="button hb-fill-middle2-rev">保存</div>
							</div>
						</div>
					</div>
				</div>
			</transition>

			<!--设置是否支持使用平台红包-->
			<transition name="bounce">
				<div class="affix-box default-pos-type" v-show="isShow_refusePop === 'redpack'">
					<div class="pop-edit-password pop-edit">
						<div class="show-close-btn">
							<img :src="g.config.path.images+'/close.png'"
								 @click="onClick_closeBtn" />
						</div>
						<div class="pop-tit">
							设置账户余额报警门槛
						</div>
						<div class="pop-body tree-box">
							<div class="input-money set-warn">
								<label>
									<span class="me-radio">
										<input class=" me-radio-input" type="checkbox" name="batch">
										<span class="me-radio-core code-id checkbox"></span>
									</span>
									是
								</label>
								<label>
									<span class="me-radio">
										<input class=" me-radio-input" type="checkbox" name="batch">
										<span class="me-radio-core code-id checkbox"></span>
									</span>
									否
								</label>
							</div>

							<div>
								<div class="button hb-fill-middle2-bg">取消</div>
								<div class="button hb-fill-middle2-rev">保存</div>
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
				totalMakedRpCount: 0,
				isShow_refusePop: '',
				isShow_moneyTips: true,
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
			onClick_closeBtn(){
				this.isShow_changeTypePop = false;
				this.isShow_refusePop = "";
			},
			onClick_setBtn($type){
				this.isShow_refusePop = $type;
			}
		}
	}
</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss">
	@import "../css/common.scss";
</style>
<style lang="sass" type="text/scss" rel="stylesheet/scss" scoped>
	@import "../css/personlInfo.scss";
	@import "../css/rule.scss";
	.set-warn{
		margin-top: 25px;
		display: flex;
		/*align-items: center;*/
		justify-content: space-around;
	}
</style>






