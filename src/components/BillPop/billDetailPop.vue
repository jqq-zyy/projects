<template>
	<div class="affix-box default-pos-type" v-show="isShow_detailPop">
		<div class="pop-edit-password add-level-pop refund-pop">
			<div class="show-close-btn">
				<img :src="g.config.path.images+'/close.png'"
					 @click="onClick_closeBtn" />
			</div>
			<div class="step-about-tit show-recharge-tips">
				账目详情
			</div>
			<div class="pop-body add-level-body detail-body">
				<div><span class="title">款项说明</span>
					<span class="detail-form">{{itemDetail.orderType}}</span>
				</div>
				<div><span class="title">类型</span>
					<span class="detail-form">{{itemDetail.inOutType}}</span>
				</div>
				<div><span class="title">金额</span>
					<span class="detail-form">{{itemDetail.orderAmount}}元</span>
				</div>
				<div><span class="title">生成时间</span>
					<span class="detail-form"> {{itemDetail.createTime}}</span>
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
		data(){
			return {
				g: g
			}
		},
		props: {
			itemDetail:{
				type:Object
			}
		},
		watch: {

		},
		methods: {

			onClick_closeBtn(){
				this.$emit('close');
			}
		}
	}
</script>
<style lang="sass" type="text/scss" rel="stylesheet/scss">
	@import "../../css/pop";
</style>








