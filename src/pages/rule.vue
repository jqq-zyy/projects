<template>
    <main-layout :isLoad="isLoad">
        <div slot="content" class="content-box">
            <div class="admin-main-wrap">
                <common-nav :nav="'rule'"></common-nav>
                <div class="right-content-wrap">
                    <common-top-nav></common-top-nav>
                    <div class="admin-data-items">
                        <div class="right-body">
                            <div class="g-title">规则设置</div>
                            <div class="plat-rule">
                                <div class="g-title">平台规则</div>
                                <div class="plat-setting">
                                    账户余额报警门槛：¥{{warningAmount}}
									<span class="hb-fill-middle2-bg" @click="onClick_setBtn('plat-money')">设置
									</span>
                                    <p>当账户余额低于报警门槛时，我们会以短信的形式通知您。</p>
                                </div>
                                <div class="plat-setting">
                                    平台红包金额范围：{{min}}倍 ~ {{max}} 倍
                                    <span class="hb-fill-middle2-bg" @click="onClick_setBtn('plat-red')">设置</span>
                                    <p>
                                        商户送出的每个红包基础上都会额外赠送平台红包，具体金额为商户购买二维码所花单价的倍数区间中的随机金额。
                                    </p>
                                </div>
                                <div class="plat-setting">
                                    扫码限制数：{{maxQrcodeScanNum}}
                                    <span class="hb-fill-middle2-bg" @click="onClick_setBtn('plat-count')">设置</span>
                                    <p>一个消费者支付宝账户在24小时内允许领取的平台红包上限。</p>
                                </div>
                            </div>

                            <div class="seller-rule">
                                <div class="g-title">
                                    商家规则
                                </div>
                                <div class="seller-setting">
                                    <div>
                                        <span class="seller-price">二维码单价：</span>
                                        <div class="seller-range">
                                            <p v-for="item in dataList">
												<span v-if="item.max!=-1">
													{{item.min}} < 数量 <= {{item.max}}时，单价¥{{item.unitPrice}}/个
												</span>
												<span v-if="item.max == -1">
													{{item.min}} <=数量时，单价¥{{item.unitPrice}}/个
												</span>
                                            </p>
                                        </div>
										<span class="button hb-fill-middle2-bg"
                                              @click="onClick_setBtn('ewm-price')">设置</span>
                                    </div>
                                </div>

                                <div class="seller-red">
                                    <p class="seller-support">是否支持使用平台红包：<span v-text="currentSupport"></span></p>
                                    <span class="button hb-fill-middle2-bg" @click="onClick_setBtn('redpack')">设置</span>

                                </div>
                            </div>
                        </div>
                        <common-footer></common-footer>
                    </div>
                </div>
            </div>

            <!--账户余额报警门槛-->
            <transition name="bounce">
                <div class="affix-box default-pos-type" v-show="isShow_refusePop === 'plat-money'">
                    <set-warning-pop @close="onClick_closeBtn" @init="init"></set-warning-pop>

                </div>
            </transition>

            <!--平台红包金额范围-->
            <transition name="bounce">
                <div class="affix-box default-pos-type" v-show="isShow_refusePop === 'plat-red'">
                    <set-platform-pop  @close="onClick_closeBtn" @init="init"></set-platform-pop>
                </div>
            </transition>

            <!--扫码限制数-->
            <transition name="bounce">
                <div class="affix-box default-pos-type" v-show="isShow_refusePop === 'plat-count'">
                    <set-plat-count-pop @close="onClick_closeBtn" @init="init"></set-plat-count-pop>
                </div>
            </transition>


            <!--设置二维码单价-->
            <transition name="bounce">
                <div class="affix-box default-pos-type" v-show="isShow_refusePop === 'ewm-price'">
                    <set-unit-price-pop @init="init" @close="onClick_closeBtn" ></set-unit-price-pop>
                </div>
            </transition>

            <!--设置是否支持使用平台红包-->
            <transition name="bounce">
                <div class="affix-box default-pos-type" v-show="isShow_refusePop === 'redpack'">
                    <set-support-pop @close="onClick_closeBtn" @init="init"></set-support-pop>
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
    import SetWarningPop from '../components/rulePop/setWarningPop.vue';
    import SetPlatformPop from '../components/rulePop/setPlatformPop.vue';
    import SetSupportPop from '../components/rulePop/setSupportPop.vue';
    import SetPlatCountPop from '../components/rulePop/setPlatCountPop.vue';
    import SetUnitPricePop from '../components/rulePop/setUnitPricePop.vue';
    export default {
        created(){
            this.isLoad = true;
            this.init();
        },
        data(){
            return {
                isLoad: false,
                g: g,
                isShow_refusePop: '',
                isShow_moneyTips: false,
                dataList: [],
                warningAmount: 0,
                maxQrcodeScanNum: 0,
                max: 0,
                min: 0,
                platformRpSupport: false

            }
        },
        computed: {
            currentSupport(){
                if (this.platformRpSupport) {
                    return "是"
                } else {
                    return '否'
                }
            }
        },
        components: {
            MainLayout,
            CommonNav,
            CommonTopNav,
            CommonFooter,
            SetWarningPop,
            SetPlatformPop,
            SetSupportPop,
            SetPlatCountPop,
            SetUnitPricePop
        },
        methods: {
            init(){
                var currentRule = g.data.rulePool;
                this.dataList = currentRule.dataList;
                this.warningAmount = currentRule.warningAmount;
                this.maxQrcodeScanNum = currentRule.maxQrcodeScanNum;
                this.max = currentRule.max;
                this.min = currentRule.min;
                this.platformRpSupport = currentRule.platformRpSupport;
            },

            onClick_closeBtn(){
                this.isShow_refusePop = "";
            },
            onClick_setBtn($type){
                this.isShow_refusePop = $type;
            }
        }
    }
</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss">
    @import "../css/common.scss";
</style>
<style lang="sass" type="text/scss" rel="stylesheet/scss" scoped>
    @import "../css/personlInfo.scss";
    @import "../css/rule.scss";
    @import "../css/pop.scss";
</style>






