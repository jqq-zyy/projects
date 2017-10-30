<template>

    <div class="col col-6">
        <div class="panel">

            <div class="panel-heading">性别统计表
                <!--<span class="pointer out-btn bg-btn hb-fill-middle2-rev">导出全部</span>-->
            </div>
            <div class="panel-body">
                <div class="flot-chat">
                    <div class="curve-wrap" id="echartsSex"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import RouterList from './../../../router';
    import g from './../../../global';
    import eCharts from './../../../js/eCharts/main';
    import eCharts_pie from './../../../js/eCharts/template/pie';
    export default {
        created(){
            this.init();
        },
        data(){
            return {
                g: g,
                isShowStartTime: false,
                isShowEndTime: false,
                isShowActivityList: false
            }
        },
        watch: {
            sexList(){
                this.initEcharts()
            }
        },
        props: {
            sexList: {
                default: []
            }
        },
        methods: {
            init(){
                    this.$nextTick(function () {
                        this.initEcharts();
                    })
            },

            initEcharts()
            {


                var dataList =
                        [
                            {
                                name: ['男','女','未知'],
                                type: 'pie',
                                radius: ['50%', '70%'],
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: true,
                                            formatter: '{b} : {c} ({d}%)'
                                        },
                                        labelLine :{show:true}
                                    },
                                    emphasis: {
                                        label: {
                                            show: true,
                                            position: 'center',
                                            textStyle: {
                                                fontSize: '30',
                                                fontWeight: 'bold'
                                            }
                                        }
                                    }
                                },
                                list: this.sexList,
                                isSet: false
                            }
                        ];

                eCharts("echartsSex", eCharts_pie, dataList, '', () => {},6);

            }
        }
    }
</script>




