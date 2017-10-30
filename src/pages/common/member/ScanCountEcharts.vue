<template>
        <div class="col col-6">
            <div class="panel">
                <div class="panel-heading ">累计消费次数分布
                    <!--<span class="pointer out-btn bg-btn hb-fill-middle2-rev">导出全部</span>-->
                </div>
                <div class="panel-body">
                    <div class="flot-chat">
                        <div class="curve-wrap" id="eChartsMember"></div>
                    </div>
                </div>
            </div>
        </div>
</template>
<script type="text/ecmascript-6">
    import RouterList from './../../../router';
    import g from './../../../global';
    import eCharts from './../../../js/eCharts/main';
    import eCharts_order from './../../../js/eCharts/template/order';
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
                dataList: [0],
                timeList: [0],
            }
        },
        components: {
        },
        computed: {},

        props: {
            scanList:{
                default:Array
            },
            scanEchartsX:{
                default:Array
            }
        },
        watch:{
            scanList(){
                this.initEcharts();
            },
            scanEchartsX(){
                this.initEcharts();
            },
        },
        methods: {
            init(){
                this.dateList = g.data.staticData['date.json'];
                this.$nextTick(function () {
                    this.initEcharts();
                })
            },

            initEcharts(){
                eCharts("eChartsMember", eCharts_order, [{
                    name: "人数",
                    list: this.scanList,
                    color: "#1cb2f0",
                    type: "bar",
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
                }],this.scanEchartsX, ()=> {},4);
            },

        }
    }
</script>



























