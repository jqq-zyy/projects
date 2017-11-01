<template>
    <main-layout :isLoad="isLoad">
        <div slot="content" class="content-box">
            <div class="admin-main-wrap">
                <common-nav :nav="'platform'"></common-nav>
                <div class="right-content-wrap">
                    <common-top-nav></common-top-nav>
                    <div class="admin-data-items">
                        <div class="right-body personal-box">
                            <div class="g-title"><span>平台财务流水</span>/新建平台流水</div>
                            <div class="admin-calendar-table add-platform">
                                <div class="base-info">基本信息</div>
                                <div class="base-master">
                                    <p>发起人: </p>
                                    <span>{{paramObj.applyUserLogon}}</span></div>
                                <div>
                                    <p>流水类型：</p>
                                    <label for="recharge">
                                        <input type="radio" name="status" v-model="paramObj.orderType" value="21"
                                               id="recharge">平台红包充值
                                    </label>
                                    <label for="cash">
                                        <input type="radio" name="status" v-model="paramObj.orderType" value="40"
                                               id="cash">提现支出
                                    </label>
                                </div>
                                <div>
                                    <p>流水金额：</p>
                                    <input type="text" v-model="paramObj.amount">
                                </div>
                                <div>
                                    <p>备注：</p>
									<textarea id="" cols="30" rows="10" v-model="paramObj.remark"
                                              placeholder="不超过50字"></textarea></div>
                                <div class="base-way">
                                    <p>支付方式：</p>
                                    <span>支付宝</span>
                                </div>
                                <div class="base-origin float-left" v-if="paramObj.orderType==40">
                                    <p>目标账户：</p>

                                    <!--<p v-if="paramObj.orderType==21">来源账户：</p>-->
                                    <input type="text" placeholder="支付宝账号" v-model="paramObj.targetAccount">
                                </div>
                                <div class="base-operate">
                                    <div class="button border-btn hb-fill-middle2-bg" @click="onClick_resetBtn">取消</div>
                                    <div class="button bg-btn hb-fill-middle2-rev" @click="onClick_saveBtn">保存</div>
                                </div>

                            </div>

                        </div>
                        <common-footer></common-footer>
                    </div>
                </div>
            </div>
            <!--账户充值成功-->
            <transition name="bounce">
                <div class="affix-box default-pos-type" v-show="isShow_successBox">
                    <div class="pop-edit-password pop-edit">
                        <div class="show-close-btn">
                            <img :src="g.config.path.images+'/close.png'"
                                 @click="onClick_backBtn"/>
                        </div>
                        <div class="pop-tit pop-tit-center">确认充值</div>
                        <div class="pop-body add-staff-body">
                            <div class="pay-success ">
                                <p class="text-center color">请确认充值金额</p>
                                <p class="text-center recharge">充值金额：<span>{{paramObj.amount}}</span>元</p>
                            </div>
                            <div class="m-title msg-box button-box">
                                <div class="button pointer border-btn hb-fill-middle2-bg" @click="onClick_backBtn">
                                    返回
                                </div>
                                <div class="button pointer bg-btn hb-fill-middle2-rev "
                                     @click="onClick_goRechargeBtn">
                                    前去充值
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </transition>
            <!--账户充值确认刷新-->
            <transition name="bounce">
                <div class="affix-box default-pos-type" v-show="isShow_confirmBox">
                    <div class="pop-edit-password pop-edit">
                        <div class="show-close-btn">
                            <img :src="g.config.path.images+'/close.png'"
                                 @click="onClick_closeBtn"/>
                        </div>
                        <div class="pop-tit pop-tit-center"></div>
                        <div class="pop-body add-staff-body">
                            <div class="pay-success">
                                充值成功后请刷新页面
                            </div>
                            <div class="m-title msg-box button-box">
                                <div class="refresh-btn pointer bg-btn hb-fill-middle2-rev "
                                     @click="onClick_refresh">
                                    刷新页面
                                </div>
                            </div>
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
    import CommonFooter from './common/CommonFooter.vue';
    export default {
        created(){
            this.init();
            this.isLoad = true;
        },
        data(){
            return {
                isLoad: false,
                isShow_successBox: false,
                isShow_confirmBox: false,
                g: g,
                paramObj: {
                    orderType: 21,
                    applyUserLogon: "",
                    targetAccount: "",
                    remark: "",
                    amount: "",
                    payWay: 1
                }
            }
        },
        watch: {
            amount($val, $oldVal){
                if ($val.toString().indexOf(".") > 0 && $val.toString().split(".")[1].length > 2) {
                    this.paramObj.amount = $oldVal;
                    return
                }
                else if (isNaN($val) || $val < 0.1) {
                    this.paramObj.amount = 0.1;
                    return
                }
                else if ($val > 2000 && this.paramObj.orderType == 21) {
                    this.paramObj.amount = 2000;
                    return
                } else if ($val > 20000 && this.paramObj.orderType == 40) {
                    this.paramObj.amount = 20000;
                    return
                }
            },
            remark($val, $oldVal){
                if ($val.length > 50) {
                    this.paramObj.remark = $oldVal;
                }
            },
            orderType($val){
                if ($val == 21 && this.paramObj.amount > 2000) {
                    this.paramObj.amount = 2000;
                }
            }
        },
        computed: {
            amount(){
                return this.paramObj.amount
            },
            remark(){
                return this.paramObj.remark
            },
            orderType(){
                return this.paramObj.orderType
            }
        },
        components: {
            MainLayout,
            CommonNav,
            CommonTopNav,
            CommonFooter
        },
        methods: {
            init(){
                this.paramObj.applyUserLogon = g.data.get("userInfo").logon
            },
            onClick_resetBtn(){
                g.url = ("/platform")
            },
            onClick_saveBtn(){
                if (!this.paramObj.amount) {
                    g.ui.toast("请填写流水金额")
                    return
                }
                else if (this.paramObj.remark == "") {
                    g.ui.toast("请填写备注")
                    return
                }
                else if (this.paramObj.targetAccount == "" && this.paramObj.orderType == 40) {

                    g.ui.toast("请填写目标账号")
                    return
                }
                var obj = {};
                g.net.call("order/addPlatformAccountOrder", this.paramObj).then(($data) => {
                    if (this.paramObj.orderType == 21) {
                        g.data.save('pay', $data.payForm);
                        this.orderId = $data.orderId;
                        this.isShow_successBox = true;
                    } else {
                        g.ui.toast("新建提现流水成功")
                        g.url = ("/platform");
                    }

                }, (err) => {
                    g.func.dealErr(err);
                });
            },
            onClick_backBtn(){
                g.net.call("order/closeAdminOrder", {
                    'orderId': this.orderId
                }).then(($obj) => {
                    this.isShow_successBox = false;
                }, (err) => {
                    g.func.dealErr(err);
                });
            },
            onClick_goRechargeBtn(){
                this.isShow_successBox = false;
                this.isShow_confirmBox = true;
                window.open(g.path.domain + '/pay.html');
            },
            onClick_refresh(){
                g.url = ("/platform");
            },
            onClick_closeBtn(){
                this.isShow_successBox = false;
                this.isShow_confirmBox = false;
            }
        }
    }
</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss">
    @import "../css/personlInfo.scss";
</style>







