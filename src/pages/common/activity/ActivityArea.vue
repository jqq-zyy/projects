<template>
	<div class="choose-area">
		<div class="reward-choose pointer" @click="onClick_areaBox">
			{{areaName}}
			<span class="cite area-icon"></span>
			<ul class="reward-droplist" v-show="isShow_areaList">
				<li @click.stop="onClick_areaItem(-1,'全国')">全国</li>
				<li v-for="item in areaList" @click.stop="onClick_areaItem(item.id,item.name)">
					{{item.name}}
				</li>
			</ul>
		</div>
		<div class="reward-choose pointer" @click="onClick_cityBox">
			{{cityName}}
			<span class="cite area-icon"></span>
			<ul class="reward-droplist" v-show="isShow_cityList">
				<li @click.stop="onClick_cityItem(-1,'所有省市')">所有省市</li>
				<li v-for="item in cityList" @click.stop="onClick_cityItem(item.id,item.name)">
					{{item.name}}
				</li>
			</ul>
		</div>
		<input type="text" class="frame input-number" v-model.number="areaObj.reward">
		倍
	</div>
</template>
<script type="text/ecmascript-6">
	import RouterList from './../../../router';
	import g from './../../../global';
	import * as AppManager from './../../../js/manager/AppManager';
	import addActivity from './../../addActivity';
	export default {
		created(){
			this.areaList = g.data.areaPool.list;
			var id = g.currentRoute.query.id;
			if (id && this.regionItem.provinceName)
			{
				this.areaName = this.regionItem.provinceName;
				this.cityName = this.regionItem.cityName;
				this.areaObj.rule1Id = this.regionItem.rule1Id;
				this.areaObj.rule2Id = this.regionItem.rule2Id;
				this.areaObj.reward = this.regionItem.reward;
			}

		},
		data(){
			return {
				g: g,
				areaList: [],
				cityList: [],
				isShow_areaList: false,
				isShow_cityList: false,
				areaId: -1,
				areaName: "全国",
				cityName: "所有省市",
				cityId: -1,
				areaObj: {
					"ruleType": 2,
					"rule1Id": -1,
					"rule2Id": -1,
					"reward": 1
				}
			}
		},
		watch: {
			areaObj: {
				handler($val) {
					this.$emit("change", $val, this.index);
				},
				deep: true
			},
			reward($val,$oldVal){
				if(isNaN($val)){
					this.areaObj.reward = $oldVal;
				}
			}
		},
		computed: {
			reward(){
				return this.areaObj.reward
			}
		},
		props: {
			index: {
				default: Number
			},
			regionItem: {
				default: Object
			}
		},
		methods: {
			onUpdate_cityList($isDefault){
				if($isDefault){
					this.cityList = [];
				}else{
					this.cityList = g.data.areaPool.getDataById(this.areaObj.rule1Id).cityList;
				}
				this.areaObj.rule2Id = -1;
				this.cityId = -1;
				this.cityName = '所有省市';
			},
			onClick_areaItem($areaId, $areaName){
				if (this.areaObj.rule1Id == $areaId)
				{
					this.isShow_areaList = false;
					return;
				}
				this.areaObj.rule1Id = $areaId;
				this.areaName = $areaName;
				if($areaId !=-1){
					g.func.getCityList($areaId, this.onUpdate_cityList);
				}else{
					this.onUpdate_cityList(true)
				}
				this.isShow_areaList = false;
			},
			onClick_cityItem($cityId, $cityName){
				this.areaObj.rule2Id = $cityId;
				this.cityId = $cityId;
				this.cityName = $cityName;
				this.isShow_cityList = false;
			},
			onClick_areaBox(){
				this.isShow_areaList = !this.isShow_areaList;
				this.isShow_cityList = false;
			},
			onClick_cityBox(){
				if (this.cityId != this.areaObj.rule2Id)
				{
					g.func.getCityList(this.areaObj.rule1Id, this.onUpdate_cityList);
				}
				this.isShow_cityList = !this.isShow_cityList
			}
		}
	}
</script>
<style>

</style>






