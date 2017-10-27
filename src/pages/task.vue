<template>
    <main-layout :isLoad="isLoad">
        <div slot="content" class="content-box">
            <div class="admin-main-wrap">
                <common-nav></common-nav>
                <div class="right-content-wrap">
                    <common-top-nav></common-top-nav>
                    <div class="admin-data-items">

                        <div class="right-body ">
                            <p class="g-title">待办任务</p>
                            <div class="admin-calendar-table">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>任务类型</th>
                                        <th><span>|</span>申请用户</th>
                                        <th><span>|</span>申请时间</th>
                                        <th><span>|</span>企业全称</th>
                                        <th><span>|</span>操作</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="item in messageList">
                                        <td>{{item.pendTypeDesc}}</td>
                                        <td>{{item.applyUserLogon}}</td>
                                        <td>{{item.createTime}}</td>
                                        <td>{{item.companyFullName}}</td>
                                        <td><span class="button pointer border-btn"
                                                  @click="onClick_handleBtn(item.pendType,item.shopId,item.relationId)">处理</span>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <common-page :index="dataObj.page" :total="totalPage"
                                         @change="onChange_currentPage" v-show="messageList.length>=1"></common-page>
                            <common-prompt v-show="messageList.length==0"></common-prompt>
                        </div>
                        <common-footer></common-footer>

                    </div>
                </div>
            </div>
        </div>
    </main-layout>
</template>

<script type="text/ecmascript-6">
    import g from '../global';
    import MainLayout from './common/mainLayout.vue';
    import CommonNav from './common/CommonNav.vue';
    import CommonTopNav from './common/CommonTopNav.vue';
    import CommonFooter from './common/CommonFooter.vue';
    import CommonPrompt from './common/CommonPrompt.vue';
    import CommonPage from './common/CommonPage.vue';
    import {getMessage} from './task';
    import sha256 from 'sha256';

    export default {
        created(){
            this.init();
            this.isLoad = true;
        },
        data(){
            return {
                isLoad: false,
                g: g,
                totalPage: 1,
                messageList: [],
                dataObj: {}
            }
        },
        components: {
            MainLayout,
            CommonNav,
            CommonTopNav,
            CommonFooter,
            CommonPrompt,
            CommonPage
        },
        methods: {
            init(){
                this.initList();
                this.initData();
            },
            initData(){
                this.dataObj = {
                    'page': 1,
                    'pageSize': g.param.pageSizeList[0],
                }
            },
            initList(){
                this.messageList = g.data.messagePool.list;
                this.totalPage = g.data.messagePool.totalPage;
            },
            onChange_currentPage($page, $pageSize){
                this.dataObj.page = $page;
                if ($pageSize != this.dataObj.pageSize) {
                    this.dataObj.pageSize = $pageSize;
                    this.dataObj.page = 1
                }
                this.onUpdate_messageList()
            },
            onUpdate_messageList(){
                getMessage(this.dataObj, this.initList);
            },
            onClick_handleBtn($type, $shopId, $orderId){
                if ($type == 1) {
                    g.url = ("/userdetail?id=" + $shopId)
                } else if ($type == 2) {
                    g.data.messagePool.update({'orderId':$orderId})
                    g.url = ("/bag");

                } else if ($type == 3) {
                    g.data.messagePool.update({'orderId':$orderId})
                    g.url = ("/qrcode");

                }
            }
        }
    }
</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss">
    @import "../css/common.scss";
    .gray td{
        color:#999 !important;

    }
</style>