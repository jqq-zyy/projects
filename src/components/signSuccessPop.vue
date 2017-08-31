<template>
	<div class="affix-box default-pos-type">
		<div class="pop-edit-password sign-pop">
			<div class="step-about-tit show-recharge-tips">
				{{g.lang("账号注册成功")}}
			</div>
			<div class="popBody">
				{{g.lang("请完善企业认证信息")}}
			</div>
			<div class="pop-footer">
				<div class="button" @click="onClick_continueBtn">{{g.lang("继续试用")}}</div>
				<div class="button float_right" @click="onClick_closeBtn">{{g.lang("完善企业认证信息")}}</div>
			</div>
		</div>
	</div>

</template>
<style>
</style>
<script type="text/ecmascript-6">
	import g from './../global';
	export default{
		data(){
			return {
				g:g
			}
		},

		methods: {
			onClick_closeBtn(){
				this.$emit('click');
			},
			onClick_continueBtn(){
				g.url = ("/qrcode")
			}
		}
	}
</script>
<style  scoped>
	.popBody{
		padding:50px;
	}
	.pop-footer{
		padding:80px;
	}
	.float_right{
		float:right
	}
</style>












