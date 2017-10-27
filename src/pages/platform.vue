<template>
    <main-layout :isLoad="isLoad">
        <div slot="content" class="content-box">
            <div class="admin-main-wrap my-activity">
                <common-nav :nav="'platform'"></common-nav>
                <div class="right-content-wrap">
                    <common-top-nav>
                        <input type="text">
                    </common-top-nav>
                    <div class="admin-data-items">
                        <div class="right-body">
                            <p class="g-title">
                                平台财务流水
                            </p>
                            <div class="bar-box">
                                <div class="bar-top">
                                    <ul>
                                        <li>总收入：{{totalIncome}}元</li>
                                        <li>总支出：{{totalPay}}元</li>
                                        <li>二维码账户余额：{{qrcodeBalance}}元</li>
                                        <li>红包账户余额：{{rpBalance}}元</li>
                                    </ul>
                                    <ul>
                                        <li>流水类型:</li>
                                        <li class="type-item pointer" v-for="item in flowTypeList"
                                            @click="onClick_changeType(item.code,'type')"
                                            :class="{'acticity-process':isCurrentType(item.code)}">
                                            {{item.name}}
                                        </li>

                                    </ul>
                                    <ul>
                                        <li>状态:</li>
                                        <li class="type-item pointer" v-for="item in statusList"
                                            @click="onClick_changeType(item.code,'status')"
                                            :class="{'acticity-process':isCurrentStatus(item.code)}">
                                            {{item.name}}
                                        </li>
                                    </ul>
                                </div>
                                <div class="bar-bottom">
                                   <div class="date-margin">
                                       <div class="date-box">
                                           <span class="creat-time">创建时间：从</span>
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
                                   </div>
                                    <div class="drop-box pointer" @click.stop="onClick_dropListBtn">
                                        <div @click.stop="onClick_dropListBtn">
                                            {{currentSearchType}}
                                            <span :class="['pointer','drop-icon',isShow_dropList?'rotate':'']"></span>
                                        </div>
                                        <ul class="droplist" v-show="isShow_dropList">
                                            <li v-for="item in typeList" class="pointer"
                                                @click.stop="onClick_dropItem(item.id)">{{item.name}}
                                            </li>
                                        </ul>
                                    </div>

                                    <input type="text" v-model=" inputContent" class="search-input">
                                    <span class="btn pointer search-btn border-btn hb-fill-middle2-bg"
                                          @click="onClick_searchBtn">查找</span>
                                </div>
                            </div>
                            <div class="all-out">
                                <div
                                     class=" pointer all-out-btn bg-btn hb-fill-middle2-rev float-right" @click="onClick_exportAllBtn">导出全部
                                </div>
                                <div @click="onClick_addBtn"
                                     class=" pointer all-out-btn border-btn hb-fill-middle2-bg float-right"
                                     style="margin-right: 30px">新建流水
                                </div>
                            </div>
                            <div class="admin-calendar-table">

                                <table>
                                    <thead>
                                    <tr>
                                        <th>流水ID</th>
                                        <th><span>|</span>流水类型</th>
                                        <th><span>|</span>发起人</th>
                                        <th><span>|</span>发起时间</th>
                                        <th><span>|</span>状态</th>
                                        <th><span>|</span>金额</th>
                                        <th><span>|</span>备注</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="item in platformList">
                                        <td @click="onClick_platformItem(item.id)">{{item.id}}</td>
                                        <td>{{item.recordType}}</td>
                                        <td>{{item.author}}</td>
                                        <td>{{item.beginTime}}</td>
                                        <td>{{item.orderStatusDesc}}</td>
                                        <td>{{item.amount}}</td>
                                        <td>{{item.remarks}}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <common-page :index="dataObj.page" :total="totalPage"
                                         @change="onChange_currentPage" v-show="platformList.length>=1"></common-page>
                            <common-prompt v-show="platformList.length==0"></common-prompt>
                        </div>
                        <common-footer></common-footer>
                    </div>
                </div>
            </div>
            <transition name="bounce">
                <div class="affix-box default-pos-type" v-show="isShow_detailPop">
                    <div class="pop-edit-password pop-edit platform-pop">
                        <div class="show-close-btn">
                            <img :src="g.config.path.images+'/close.png'"
                                 @click="onClick_closeBtn"/>
                        </div>
                        <div class="pop-tit pop-tit-center">
                            平台流水详情
                        </div>
                        <div class="pop-body tree-box">
                            <div class="base-info">基本信息</div>
                            <div>流水ID:{{currnetPlatform.id}}</div>
                            <div>发起人：{{currnetPlatform.author}}</div>
                            <div>流水类型：{{currnetPlatform.recordType}}</div>
                            <div>发起时间：{{currnetPlatform.beginTime}}</div>
                            <div>流水金额：{{currnetPlatform.amount}}</div>
                            <div>备注：{{currnetPlatform.remarks}}</div>
                            <div>支付方式：{{currnetPlatform.payWayDesc}}</div>
                            <div>目标账户：{{currnetPlatform.targetAccount}}</div>
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
                isShowStartTime: false,
                isShowEndTime: false,
                g: g,
                totalPage: 1,
                flowTypeList: [{
                    code: 0,
                    name: '全部'
                },{
                    code:10,
                    name:'销售收入'
                },{
                    code:'30,31',
                    name: '退款支出'
                },{
                    code:21,
                    name: '平台账户充值 '
                },{
                    code:40,
                    name:'提现支出'
                }],
                statusList: [{
                    code: 0,
                    name: '全部'
                }, {
                    code: 1,
                    name: '未处理'
                }, {
                    code: 2,
                    name: '处理中'
                }, {
                    code: 3,
                    name: '处理成功'
                }, {
                    code: -1,
                    name: '处理失败'
                }],
                typeList: [{
                    id: 'orderId',
                    name: '流水ID'
                }, {
                    id: "applyUserLogon",
                    name: "发起人"
                }],

                currentType: 'orderId',
                inputContent: "",
                platformList: [],
                currnetPlatform: {},
                orderTypes: [0],
                orderStatus: [0],
                date: {
                    startTime: 0,
                    startTimeStr: "",
                    endTimeStr: "",
                    endTime: 0
                },
                dataObj: {},
                totalIncome: 0,
                totalPay: 0,
                qrcodeBalance: 0,
                rpBalance: 0
            }
        },
        computed: {
            currentSearchType(){
                for (var i = 0; i < this.typeList.length; i++) {
                    if (this.typeList[i].id == this.currentType) {
                        return this.typeList[i].name
                    }
                }
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
                this.initData()
                this.initSearchData();
                //this.initDate();
            },
            initData(){
                var info = g.data.platformPool;
                this.totalPage = info.totalPage;
                this.platformList = info.list;
                this.totalIncome = info.totalIncome;
                this.totalPay = info.totalPay;
                this.qrcodeBalance = info.qrcodeBalance;
                this.rpBalance = info.rpBalance;

            },
            initSearchData(){
                this.dataObj = {
                    'orderTypes': "0",
                    'orderStatus': "0",
                    'beginTimeStart': '',
                    'beginTimeEnd': '',
                    'page': 1,
                    'pageSize': g.param.pageSizeList[0],
                    'sortField': "create_time",
                    'sortOrder': "desc"
                }
            },
            initDate(){
                this.date.startTime = g.timeTool.getNowStamp() - g.timeTool.getPastSecond();
                this.date.endTime = this.date.startTime;
                this.date.startTimeStr = g.timeTool.getDate(this.date.startTime, true);
                this.date.endTimeStr = g.timeTool.getDate(this.date.endTime, true);
            },
            onChange_currentPage($page, $pageSize){
                this.dataObj.page = $page;
                if($pageSize!=this.dataObj.pageSize){
                    this.dataObj.pageSize = $pageSize;
                    this.dataObj.page = 1
                }
                this.onUpdate_bagList()
            },
            onUpdate_bagList(){
                g.ui.showLoading();
                this.dataObj.beginTimeStart = this.date.startTimeStr;
                this.dataObj.beginTimeEnd = this.date.endTimeStr;
                if (this.currentType) {
                    this.dataObj[this.currentType] = this.inputContent;
                }
                this.dataObj.orderTypes = this.orderTypes.join(",");
                this.dataObj.orderStatus = this.orderStatus.join(",");
                this.getBagList();

            },
            getBagList(){
                g.net.call("order/queryPlatformAccountList", this.dataObj).then(($data) => {
                    if (this.currentType) {
                        this.dataObj[this.currentType] = "";
                    }
                    var obj = {
                        resultPageList:$data
                    };
                    g.data.platformPool.removeAll();
                    g.data.platformPool.update(obj);
                    this.totalPage = g.data.platformPool.totalPage;
                    this.platformList =  g.data.platformPool.list;
                    g.ui.hideLoading();
                }, (err) => {
                    g.func.dealErr(err);
                });
            },
            onClick_dropItem($type){
                this.currentType = $type;
                this.isShow_dropList = false;
            },
            onClick_dropListBtn(){
                if (this.isShow_dropList) {
                    this.isShow_dropList = false;
                }
                else {
                    this.isShow_dropList = true;
                }
            },
            onClick_changeType($typeId, $type){

                this.dataObj.page = 1;
                if ($type == 'status') {
                    this.orderStatus = this.pushIn(this.orderStatus, $typeId)
                } else {
                    this.orderTypes = this.pushIn(this.orderTypes, $typeId)
                }
                this.onUpdate_bagList()

            },
            pushIn($list, $typeId) {
                if ($typeId == 0) {
                    $list = [0]
                }
                else {
                    if ($list.indexOf(0) > -1) {
                        $list = []
                    }
                    var index = $list.indexOf($typeId);
                    if (index > -1) {
                        $list.splice(index, 1)
                    }
                    else {
                        $list.push($typeId)
                    }
                }
                return $list
            },
            isCurrentType($type){
                if (this.orderTypes.indexOf($type) > -1) {
                    return true
                }
                return false
            },
            isCurrentStatus($status){
                if (this.orderStatus.indexOf(Number($status)) > -1) {
                    return true
                }
                return false
            },
            onClick_searchBtn(){
                this.dataObj.page = 1;
                this.onUpdate_bagList();
            },
            onClick_sortBtn($field){
                if (this.dataObj.sortOrder == "desc") {
                    this.dataObj.sortOrder = "asc"
                }
                else {
                    this.dataObj.sortOrder = "desc"
                }
                this.dataObj.page = 1;
                this.dataObj.sortField = $field;
                this.onUpdate_bagList();
            },
            onClick_dropList(){
                if (this.isShow_dropList) {
                    this.isShow_dropList = false;
                }
                else {
                    this.isShow_dropList = true;
                }
            },

            onClick_exportAllBtn(){
                window.open(g.webParam.url.server
                        +"/export/exportPlatformAccountList?page=0&pageSize=0&beginTimeStart="
                        + this.date.startTimeStr
                        + "&beginTimeEnd="+this.date.endTimeStr
                        +"&sortField="+this.dataObj.sortField
                        +"&sortOrder="+this.dataObj.sortOrder
                        +"&orderStatus="+this.dataObj.orderStatus
                        +"&orderTypes="+this.dataObj.orderTypes
                        +"&"+this.currentType+"="+this.inputContent
                )
                trace(g.webParam.url.server
                        +"/export/exportPlatformAccountList?page=0&pageSize=0&beginTimeStart="
                        + this.date.startTimeStr
                        + "&beginTimeEnd="+this.date.endTimeStr
                        +"&sortField="+this.dataObj.sortField
                        +"&sortOrder="+this.dataObj.sortOrder
                        +"&orderStatus="+this.dataObj.orderStatus
                        +"&orderTypes="+this.dataObj.orderTypes
                        +"&"+this.currentType+"="+this.inputContent)
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
                if (this.date.startTime > this.date.endTime) {
                    this.onClick_chooseDateEnd($timeStamp);
                }
                this.isShowStartTime = false;
            },

            onClick_chooseDateEnd($timeStamp){
                this.date.endTime = $timeStamp;
                this.date.endTimeStr = g.timeTool.getDate($timeStamp, true);
                if (this.date.endTime < this.date.startTime) {
                    this.onClick_chooseDateStart($timeStamp);
                }
                this.isShowEndTime = false;
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
    @import "../css/myActivity";

    .my-activity .me-checkbox-core {
        margin-left: 10px;
        margin-right: 10px;

    }
</style>