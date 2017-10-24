<template>
    <div class="affix-box default-pos-type activity-pop-box">
        <div class="pop-edit-password pop-edit choose-activity-pop">
            <div class="show-close-btn">
                <img :src="g.config.path.images+'/close.png'"
                     @click="onClick_closeBtn"/>
            </div>
            <div class="pop-tit">
                选择活动
            </div>
            <div class="pop-body">
                <div class="drop-box pointer" @click.stop="onClick_dropListBtn">
                    <div @click.stop="onClick_dropListBtn">
                        {{currentSearchType}}
                        <span :class="['pointer','drop-icon',isShow_dropList?'rotate':'']"></span>
                    </div>
                    <ul class="droplist" v-show="isShow_dropList">
                        <li v-for="item in shopList" class="pointer"
                            @click.stop="onClick_dropItem(item.id,item.name)">{{item.name}}
                        </li>
                    </ul>
                </div>

                <label class="all-label" v-show="activityList.length>0">
								<span class="me-radio">
									<input class=" me-radio-input" type="checkbox"
                                           v-model="checked">
									<span class="me-radio-core"></span>
								</span>
                    选择全部活动
                </label>
                <div class="m-title avtivity-list-box">
                    <div v-for="item in activityList">
                        <label>
                            <input class=" me-radio-input" type="checkbox" name="batch"
                                   v-model="contactList"
                                   :id="'batch'+item.id"
                                   :value="item.id">
                            <span class="me-radio-core code-id checkbox"></span>
                            {{item.activityName}}
                        </label>
                    </div>


                </div>
                <div class="m-title m-title-top">
					<span class="button  pointer bg-btn hb-fill-middle2-rev save-button"
                          @click="onClick_confirmBtn">确认</span>
                </div>
            </div>
        </div>
    </div>

</template>
<script type="text/ecmascript-6">
    import g from './../../../global';
    export default{
        created(){
            this.init()
        },
        data(){
            return {
                g: g,
                contactList: [],
                checked: false,
                isShow_dropList: false,
                shopList: [],
                currentSearchType: "",
                activityList: []
            }
        },
        components: {},
        props: {
            id: {
                default: 0
            }
        },
        watch: {
            contactList($val){

                if (this.contactList.length == this.activityList.length) {
                    this.checked = true;
                }
                else {
                    this.checked = false;
                }
            },
            checked($val){
                this.contactList = [];
                if ($val) {
                    for (var i = 0; i < this.activityList.length; i++) {
                        this.contactList.push(this.activityList[i].id)
                    }

                }
            }
        },
        methods: {
            init(){
                this.shopList = g.data.userPool.list;
            },
            onClick_closeBtn(){
                this.$emit('close');
            },
            onClick_confirmBtn(){

                this.$emit('confirm', this.contactList);
            },
            onClick_dropItem($shopId, $name){
                this.currentSearchType = $name;
                this.isShow_dropList = false;
                this.contactList = [];
                this.onUpdate_activityList($shopId);

            },
            onUpdate_activityList($shopId){
                g.net.call("activity/shopActivityNameList", {
                    'shopId': $shopId
                }).then(($data) => {
                    g.data.activityPool.removeAll();
                    g.data.activityPool.update($data);
                    this.activityList = g.data.activityPool.list;

                }, (err) => {
                    g.func.dealErr(err);
                });
            },
            onClick_dropListBtn(){
                if (this.isShow_dropList) {
                    this.isShow_dropList = false;
                }
                else {
                    this.isShow_dropList = true;
                }
            },
        }
    }
</script>
<style lang="sass" type="text/scss" rel="stylesheet/scss">
    @import "../../../css/pop.scss";

    .activity-pop-box {
        z-index: 1 !important;
        .choose-activity-pop {
            .pop-body {
                min-width: 600px;
                .avtivity-list-box {
                    height:auto;
                    max-height: 320px;
                    overflow-y:auto;
        }

    }

    }

    }
</style>







