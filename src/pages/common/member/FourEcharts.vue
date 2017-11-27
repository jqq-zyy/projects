w<template>
    <div class="echarts-box">
        <div class="data-bar ">
            <div class="recharge-record-left">
                <span class="bag-use pointer" v-for="item in dateList"
                      :class="{'current':dateType==item.id}"
                      @click="onClick_dateBtn(item.id)">{{item.type}}</span>
            </div>
            <div class="recharge-record-right float-left">
                <div class="date-box">
                    <span class="time-range">时间范围：从</span>
                    <div class="date-from">
                        <input type="text" class="startTime date-input pointer"
                               v-model="date.startTimeStr"
                               readonly="true"
                               @click.stop="onClick_showCalendar('start')">
                        <hw-date type="date" skin="simple" @change="onClick_chooseDateStart"
                                 v-model="isShowStartTime"></hw-date>

                    </div>
                </div>
                <span class="goto">至</span>
                <div class="date-box">
                    <div class="date-from">
                        <input type="text" class="endTime date-input pointer"
                               v-model="date.endTimeStr"
                               readonly="true" @click.stop="onClick_showCalendar('end')">
                        <hw-date type="date" skin="simple" @change="onClick_chooseDateEnd"
                                 v-model="isShowEndTime"></hw-date>
                    </div>
                </div>
                <span class="pointer search-btn border-btn hb-fill-middle2-bg" @click="onClick_searchBtn">查询</span>
                <span class="pointer  bg-btn hb-fill-middle2-rev choose-btn" @click="onClick_changeActivity">选择活动</span>
            </div>
            <div class="clearfix"></div>
        </div>
        <div class="">
            <scan-count-echarts :scanEchartsX="scanEchartsX" :scanList="scanList"></scan-count-echarts>
            <map-echarts :mapList="mapList" @click="onUpdate_CityStatistic" :cityList="cityList"></map-echarts>
            <!--<sex-echarts :sexList="sexList"></sex-echarts>-->
        </div>
        <change-activity-pop v-show="isShowActivityList" @close="onClick_closeBtn"
                             @confirm="onConfirm_activityList"></change-activity-pop>

    </div>
</template>
<script type="text/ecmascript-6">
    import RouterList from './../../../router';
    import g from './../../../global';
    import eCharts from './../../../js/eCharts/main';
    import eCharts_order from './../../../js/eCharts/template/order';
    import eCharts_map from './../../../js/eCharts/template/map';
    import ChangeActivityPop from './ChangeActivityPop.vue';
    import ScanCountEcharts from './ScanCountEcharts.vue';
    import MapEcharts from './MapEcharts.vue';
    import SexEcharts from './SexEcharts.vue';
    export default {
        created(){
            this.init();
        },
        data(){
            return {
                g: g,
                isShowStartTime: false,
                isShowEndTime: false,
                isShowActivityList: false,
                echartsShow: 'echartsConDay',
                dateType: "1",
                activityList: [],
                dateList: [],
                scanEchartsX: [0],
                cityList:[],
                mapList: [0],
                scanList: [0],
                // sexList: [0],
                date: {
                    startTime: 0,
                    startTimeStr: "",
                    endTimeStr: "",
                    endTime: 0
                }
            }
        },
        components: {
            ChangeActivityPop,
            ScanCountEcharts,
            MapEcharts,
            SexEcharts
        },
        methods: {
            init(){
                this.dateList = g.data.staticData['date.json'];
            },
            initDate($num){
                var nowDate = g.timeTool.getNowStamp() - g.timeTool.getPastSecond();
                this.date.startTime = nowDate + (86400 * $num);
                if ($num == -1) {
                    this.date.endTime = nowDate + (86400 * $num);
                }
                else {
                    this.date.endTime = nowDate
                }
                this.date.startTimeStr = g.timeTool.getDate(this.date.startTime, true);
                this.date.endTimeStr = g.timeTool.getDate(this.date.endTime, true);
            },
            onClick_searchBtn(){
                this.onUpdate_echartsData();
            },
            onUpdate_echartsData(){
                g.ui.showLoading()
                var activityList = this.activityList.join(",");
                g.net.call("statistic/multipleStatistic", {
                    'startTime': this.date.startTimeStr,
                    'endTime': this.date.endTimeStr,
                    'activityIds': activityList
                }).then(($data) => {
                    g.data.statisticsPool.removeAll();
                    g.data.statisticsPool.update($data);
					if(_hash){
						_hash = Object.create(null);
					}
                    this.scanList = g.data.statisticsPool.scanList;
                    this.scanEchartsX = g.data.statisticsPool.scanEchartsX;
                    this.mapList = g.data.statisticsPool.mapList;
                    // this.sexList = g.data.statisticsPool.sexList;
                    this.cityList=[];

                    g.ui.hideLoading();

                }, (err) => {
                    g.func.dealErr(err);
                });
            },
            onUpdate_CityStatistic($id){
                if(!$id){
                    return
                }

                g.ui.showLoading()
                var activityList = this.activityList.join(",");
                g.net.call("statistic/sweepCityStatistic", {
                    'startTime': this.date.startTimeStr,
                    'endTime': this.date.endTimeStr,
                    'activityIds': activityList,
                    'extParam1':$id
                }).then(($data) => {
                    this.cityList = $data.data;
                    g.ui.hideLoading();

                }, (err) => {
                    g.func.dealErr(err);
                });
            },
            onConfirm_activityList($list){
                this.isShowActivityList = false
                this.activityList = $list
            },
            onClick_dateBtn($num){
                this.dateType = $num;
                this.initDate($num);
                this.onUpdate_echartsData();
            },
            onClick_changeActivity(){
                this.isShowActivityList = true
            },
            onClick_closeBtn(){
                this.isShowActivityList = false
            },
            onClick_showCalendar(str){
                if (str == 'start') {
                    //this.startTime = 0;
                    if (this.isShowStartTime) {
                        this.isShowStartTime = false;
                    }
                    else {
                        this.isShowStartTime = true;
                    }
                    this.isShowEndTime = false;
                }
                else {

                    if (this.isShowEndTime) {
                        this.isShowEndTime = false;
                    }
                    else {
                        this.isShowEndTime = true;
                    }
                    this.isShowStartTime = false;
                }
            },
            onClick_chooseDateStart($timeStamp){
                this.date.startTime = $timeStamp;
                this.date.startTimeStr = g.timeTool.getDate($timeStamp, true);
                if (this.date.startTime > this.date.endTime)
                {
                    this.onClick_chooseDateEnd($timeStamp);
                }
                this.isShowStartTime = false;
            },

            onClick_chooseDateEnd($timeStamp){
                this.date.endTime = $timeStamp;
                this.date.endTimeStr = g.timeTool.getDate($timeStamp, true);
                if (this.date.endTime < this.date.startTime)
                {
                    this.onClick_chooseDateStart($timeStamp);
                }
                this.isShowEndTime = false;
            },

        }
    }
</script>

