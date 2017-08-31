<template>
	<div class="affix-box default-pos-type" >
		<div class="pop-edit-password activity-success-pop">
			<div class="show-close-btn">
				<img :src="g.config.path.images+'/close.png'"
					 @click="onClick_closeBtn"/>
			</div>
			<div class="step-about-tit show-recharge-tips">
				{{g.lang("活动发布成功")}}
			</div>

			<div class="activity-success-body">
				<div class="keep-money">请保持账户余额充足以免消费者不能正常领取红包</div>
				<div class="balance">
					<div>{{g.lang("您的账户余额")}}<span>{{amount/100}}</span>{{g.lang("元")}}</div>
				</div>
				<div class="confirm-edit-wrap">
					<a class="button pointer" @click="onClick_backBtn">返回我的活动</a>
					<a class="button back pointer" @click="onClick_rechargeBtn">为红包账户充值</a>
				</div>
			</div>
		</div>
	</div>

</template>
<style>
</style>
<script type="text/ecmascript-6">
	import g from './../../global';
	export default{
		created(){
		},
		data(){
			return {
				g: g
			}
		},

		props: {
			amount:{
				default:0
			}
		},

		methods: {
			onClick_backBtn(){
				this.$emit("close")
			},
			onClick_rechargeBtn(){
				g.url("/bag")
			},
			onClick_closeBtn(){
				this.$emit("close")

			}
		}
	}
</script>
<style lang="sass" type="text/scss" rel="stylesheet/scss">
	@import "../../css/pop";
</style>






