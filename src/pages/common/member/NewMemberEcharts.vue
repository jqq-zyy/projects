<template>
    <div class="echarts-box">
        <div class="data-bar">
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
        <div class="col col-12">
            <div class="panel">
                <div class="panel-heading">新扫码消费者
                    <!--<span class="pointer out-btn bg-btn hb-fill-middle2-rev">导出全部</span>-->
                </div>
                <div class="panel-body">
                    <div id="echartsBox">

                        <div id="echartsConDay" style="height: 450px;"></div>

                    </div>
                </div>
            </div>
        </div>
        <change-activity-pop v-show="isShowActivityList" @close="onClick_closeBtn" @confirm="onConfirm_activityList"></change-activity-pop>

    </div>
</template>
<script type="text/ecmascript-6">
    import RouterList from './../../../router';
    import g from './../../../global';
    import eCharts from './../../../js/eCharts/main';
    import eCharts_order from './../../../js/eCharts/template/order';
    import ChangeActivityPop from './ChangeActivityPop.vue';
    export default {
        created(){
            this.init();
        },
        data(){
            return {
                g: g,
                isShowStartTime: false,
                isShowEndTime: false,
                isShowActivityList:false,
                echartsShow: 'echartsConDay',
                dateType:"",
                activityList:[],
                dataList:[0],
                timeList:[0],
                dateList: [{
                    "id": -6,
                    "type": "最近7天"
                }, {
                    "id": -29,
                    "type": "最近30天"
                }],
                date: {
                    startTime: 0,
                    startTimeStr: "",
                    endTimeStr: "",
                    endTime: 0
                }
            }
        },
        components: {
            ChangeActivityPop
        },
        computed: {},

        props: {},
        methods: {
            init(){
                this.$nextTick(function () {
                    this.initEcharts();
                })
            },
            initDate($num){
                var nowDate = g.timeTool.getNowStamp() - g.timeTool.getPastSecond();
                this.date.startTime = nowDate + (86400 * $num);
                this.date.endTime = nowDate
                this.date.startTimeStr = g.timeTool.getDate(this.date.startTime, true);
                this.date.endTimeStr = g.timeTool.getDate(this.date.endTime, true);
            },
            initEcharts(){
                eCharts("echartsConDay", eCharts_order, [{
                    name: "新增用户数",
                    list: this.dataList,
                    color: "#1cb2f0",
                    type: "line",
                    symbol: 'star',//拐点样式
                    symbolSize: 8,//拐点大小
                    itemStyle: {
                        "show": true,
                        "position": "top",
                        "textStyle": {
                            "color": "#1cb2f0",
                            fontSize: 16
                        }
                    },

                    yAxis: 0,
                    areaStyle: {normal: {}},
                    isSet:false
                }],this.timeList,null,1);
            },
            onClick_searchBtn(){
                this.onUpdate_echartsData();
            },
            onUpdate_echartsData(){

                g.ui.showLoading()
                var activityList = this.activityList.join(",");
                g.net.call("statistic/newMemberStatistic", {
                    'startTime': this.date.startTimeStr,
                    'endTime':this.date.endTimeStr,
                    'activityIds':activityList
                }).then(($data) =>
                {
                    g.data.newMemberEchartsPool.removeAll();
                    g.data.newMemberEchartsPool.update($data.data);
                    this.dataList = g.data.newMemberEchartsPool.dataList;
                    this.timeList = g.data.newMemberEchartsPool.timeList;
					if(_hash){
						_hash = Object.create(null);
					};
                    this.initEcharts();
                    g.ui.hideLoading();

                }, (err) =>
                {
                    this.dataList = [];
                    this.timeList = []
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

