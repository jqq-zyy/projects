<template>
    <main-layout :isLoad="isLoad">
        <div slot="content" class="content-box">
            <div class="admin-main-wrap my-activity">
                <common-nav :nav="'chart'"></common-nav>
                <div class="right-content-wrap">
                    <common-top-nav>
                        <input type="text">
                    </common-top-nav>
                    <div class="admin-data-items">
                        <div class="right-body">
                            <p class="g-title">
                                平台财务流水
                            </p>

                        </div>
                        <common-footer></common-footer>
                    </div>
                </div>
            </div>
            <transition name="bounce">
                <div class="affix-box default-pos-type" v-show="isShow_detailPop">
                    <div class="pop-edit-password pop-edit">
                        <div class="show-close-btn">
                            <img :src="g.config.path.images+'/close.png'"
                                 @click="onClick_closeBtn" />
                        </div>
                        <div class="step-about-tit show-recharge-tips">
                            平台流水详情
                        </div>
                        <div class="pop-body tree-box">
                            <div class="base-info">基本信息1111</div>
                            <div>流水ID:2356</div>
                            <div>发起人：</div>
                            <div>流水类型：</div>
                            <div>发起时间：</div>
                            <div>流水金额：</div>
                            <div>备注：</div>
                            <div>支付方式：</div>
                            <div>目标账户：</div>
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
    import CommonPage from './common/CommonPage.vue';
    import CommonFooter from './common/CommonFooter.vue';
    import CommonPrompt from './common/CommonPrompt.vue';
    import CommonSort from './common/CommonSort.vue';
    export default {
        created(){
            this.isLoad = true;
            this.init();
        },
        data(){
            return {
                isLoad: false,
                isShow_dropList: false,
                isShow_detailPop: false,
                g: g,
                totalPage: 1,
                statusList: [],
                typeList: ['流水ID', '发起人'],
                currentType: '流水ID',
                platformList: [],
                currnetPlatform: {},
                dataObj: {
                    'recordTypes': [-1],
                    'beginTimeStart': "",
                    'beginTimeEnd': "",
                    "recordId": "",
                    "author": "",
                    'page': 1,
                    'pageSize': g.param.pageSizeList[0],
                    'sortField': "",
                    'sortOrder': "desc"
                },
                totalAmount: 0,
                payAmount: 0,
                balanceAmount: 0
            }
        },
        components: {
            MainLayout,
            CommonNav,
            CommonTopNav,
            CommonPage,
            CommonFooter,
            CommonPrompt,
            CommonSort
        },
        methods: {
            init(){
                var info = g.data.platformPool;
                this.totalPage = info.totalPage;
                this.platformList = info.list;
                this.totalAmount = info.totalIncome;
                this.payAmount = info.totalDisburse;
                this.balanceAmount = info.balance;
                this.statusList = info.typeData;
            },

            onChange_currentPage($page, $pageSize){
                this.dataObj.page = $page;
                this.dataObj.pageSize = $pageSize;
                this.onUpdate_bagList()
            },
            onUpdate_bagList(){
//				g.ui.showLoading();
//				g.net.call("/activity/queryActivityStatisticByPage", this.dataObj).then(($data) =>
//				{
//					g.data.activityPool.removeAll();
//					var obj = {};
//					obj.resultPageList = $data;
//					g.data.activityPool.update(obj);
//					this.activityList = g.data.activityPool.list;
//					g.ui.hideLoading();
//					this.initData();
//				}, (err) =>
//				{
//					g.func.dealErr(err);
//				});
            },
            onClick_dropItem($type, $item){
                this.currentType = $item;
                this.dataObj.inOutType = $type;
                this.isShow_dropList = false;
            },
            onClick_dropListBtn(){
                if (this.isShow_dropList)
                {
                    this.isShow_dropList = false;
                }
                else
                {
                    this.isShow_dropList = true;
                }

            },
            onClick_changeType($typeId){
                $typeId = Number($typeId);
                this.dataObj.page = 1;
                var recordTypes = this.dataObj.recordTypes;
                if ($typeId == -1)
                {
                    this.dataObj.recordTypes = [-1]
                }
                else
                {
                    if (recordTypes.indexOf(-1) > -1)
                    {
                        this.dataObj.recordTypes = []

                    }
                    var index = recordTypes.indexOf($typeId);
                    if (index > -1)
                    {
                        this.dataObj.recordTypes.splice(index, 1)
                    }
                    else
                    {
                        this.dataObj.recordTypes.push($typeId)
                    }
                }

                this.onUpdate_bagList()
            },
            onClick_searchBtn(){
                this.onUpdate_bagList()
            },
            onClick_sortBtn($field){
                if (this.dataObj.sortOrder == "desc")
                {
                    this.dataObj.sortOrder = "asc"
                }
                else
                {
                    this.dataObj.sortOrder = "desc"
                }
                this.dataObj.page = 1;
                this.dataObj.sortField = $field;
                this.onUpdate_bagList();
            },
            onClick_dropList(){
                if (this.isShow_dropList)
                {
                    this.isShow_dropList = false;
                }
                else
                {
                    this.isShow_dropList = true;
                }
            },
            isCurrentType($type){
                if (this.dataObj.recordTypes.indexOf(Number($type)) > -1)
                {
                    return true
                }
                return false
            },
            onClick_exportBtn(){

            },
            onClick_addBtn(){
                g.url = ("/addplatform")
            },
            onClick_platformItem($id){
                this.currnetPlatform = g.data.platformPool.getDataById($id);
                this.isShow_detailPop = true;
            },
            onClick_closeBtn(){
                this.isShow_detailPop = false;
            }
        }
    }

</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss">
    @import "../css/common";
    @import "../css/myActivity";

</style>