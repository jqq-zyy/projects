<template>
	<div class="pop-edit-password pop-edit">
		<div class="show-close-btn">
			<img :src="g.config.path.images+'/close.png'"
				 @click="onClick_closeBtn"/>
		</div>
		<div class="pop-tit">
			设置是否支持使用平台红包
		</div>
		<div class="pop-body">
			<div class="input-money set-warn m-title">
				<label>
									<span class="me-radio">
										<input class=" me-radio-input" type="radio" name="batch" value="true" v-model="platformRpSupport">
										<span class="me-radio-core code-id checkbox"></span>
									</span>
					是
				</label>
				<label>
									<span class="me-radio">
										<input class=" me-radio-input" type="radio" name="batch" value="false" v-model="platformRpSupport">
										<span class="me-radio-core code-id checkbox"></span>
									</span>
					否
				</label>
			</div>

			<div class="m-title button-box">
				<div class="button pointer border-btn hb-fill-middle2-bg" @click="onClick_closeBtn">取消</div>
				<div class="button pointer bg-btn hb-fill-middle2-rev" @click="onClick_saveBtn">保存</div>
			</div>

		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import g from './../../global';

	export default{
		created(){
			this.init()
		},
		data(){
			return {
				g:g,
				platformRpSupport:false
			}
		},
		methods: {
			init(){
				this.platformRpSupport =  g.data.rulePool.platformRpSupport;

			},
			onClick_closeBtn(){
				this.$emit('close');
			},
			onClick_saveBtn(){
				var platformRpSupport;
				if(this.platformRpSupport == "false"){
					platformRpSupport = false;
				}else{
					platformRpSupport = true;
				}
				g.net.call("config/updatePlatformRpSupport",{
					'supportTag':platformRpSupport
				}).then(($data) =>
				{
					g.data.rulePool.update({
						'platformRpSupport':platformRpSupport
					})
					this.$emit('close');
					this.$emit('init');
				}, (err) =>
				{
					g.func.dealErr(err);

				});
			}
		}
	}
</script>
