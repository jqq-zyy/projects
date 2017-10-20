<template>
	<div class="model-header">
		<div class="show-right-content">
			<div class="user-choose-type pointer" @click="onClick_promptBtn">
				<span>待办任务</span>
				<span class="msg" v-show="num>0"></span>
				<img :src="g.config.path.images+'/message.png'" alt="">
				<!--<div class="new-message-box">-->
				<!--<div class="horn"></div>-->
				<!--<span class="message-title">系统公告({{num}})</span>-->
				<!--<ul class="message-title-box">-->
				<!--<li v-for="item in unReadList" @click="onClick_itemMsg(item.id)">-->
				<!--<span class="float-left">{{item.title}}</span>-->
				<!--<span class="float-right">{{item.time}}</span>-->
				<!--</li>-->

				<!--</ul>-->
				<!--<div class="check-btn">查看全部信息</div>-->
				<!--</div>-->
			</div>
			<div class="user-choose-type" @click="onClick_adminBtn">
				<!--<img class="pointer  head-img" :src="g.config.path.images+'/head.png'" alt="">-->
				<span class="top-list pointer">个人</span>
				<!--<span class="right drop-icon"></span>-->
				<!--<img class="m-right" :class="[isShow_signOut?'rotate1':'']" :src="g.config.path.images+'/icon-drop.png'" alt="">-->
				<!--<div class="admin pointer" v-show="isShow_signOut">-->
					<!--<div @click="onClick_modPwdBtn" >{{g.lang("修改密码")}}</div>-->
					<!--<div @click="onClick_modInfoBtn" >{{g.lang("账户信息")}}</div>-->
				<!--</div>-->
			</div>

			<div class="user-choose-type pointer" @click="onClick_loginOutBtn">
				<span >{{g.lang("安全退出")}}</span>
				<img class="pointer m-right" :src="g.config.path.images+'/back.png'" alt="">
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import g from './../../global';
	import * as LoginManager from './../../js/manager/LoginManager';
	import {getMessage} from './../index';

	export default {
		created(){
			this.init();
			g.event.addEventListener('HAS_MESSAGE', this.onUpdate_messageNum)

		},
		data(){
			return {
				g: g,
				userInfo: {},
				isShow_signOut: false,
				shopName: "",
				num: 0
				//unReadList: []
			}
		},
		methods: {
			init(){
				this.initData();
			},
			initData()
			{
				this.shopName = g.data.get("userInfo").userName;
				this.num = g.data.unReadMsgPool.count;
				//this.unReadList = g.data.unReadMsgPool.list;
			},

			onClick_loginOutBtn: function ()
			{
				g.net.call("user/adminLoginOut").then((d)=>
				{
					LoginManager.logout(true, true);
				}, (err)=>
				{
					g.func.dealErr(err);
				});


			},
			onClick_modPwdBtn(){
				g.url = ("/modpwd")
			},
			onClick_modInfoBtn(){
				g.url = ("/personal");
			},
			onClick_adminBtn(){
//				if (this.isShow_signOut)
//				{
//					this.isShow_signOut = false;
//				}
//				else
//				{
//					this.isShow_signOut = true;
//				}
				g.url = ("/personal" )

			},

			onClick_promptBtn(){
				g.url = ("/")
			},
			onUpdate_messageNum($data){

				//g.func.getUnreadMsg(this.initData)
			}
//			onClick_itemMsg($id){
//				if(g.url!="/")
//				{
//					g.url = ({
//						"path": "/"
//					})
//				}else{
//					this.$emit('click',$id,'unRead')
//				}

//				g.func.getUnreadMsg(this.initData)
//			}
		}
	}
</script>
<style lang="sass" type="text/scss" rel="stylesheet/scss">
	@import "../../css/topNav.scss";

	.admin div:hover {
		background: #cccccc;
	}
	.new-message-box {
		min-width: 250px;
		font-size: 12px;
		background: #ffffff;
		position: absolute;
		top: 55px;
		left: -75px;
		//display: none;
		height: 225px;
		padding: 15px;
		padding-top: 5px;
		display: none;
		z-index: 99999;
		.horn {
			border-bottom: 4px solid #ffffff;
			width: 0;
			height: 0;
			border-left: 4px solid transparent;
			border-right: 4px solid transparent;
			vertical-align: middle;
			position: absolute;
			left: 100px;
			top: -4px;
		}
		.message-title {
			display: block;
			height: 30px;
			line-height: 30px;
			width: 100%;
			text-align: center;
			color: #ec5463;
			text-decoration: underline;
		}
		.message-title-box {
			height: 150px;
			li {
				overflow: hidden;
				line-height: 30px;

			}
			li:hover {
				color: #ec5463;
			}

		}
	}

	.user-choose-type:hover .new-message-box {
		height: 225px;
		transition: height 300ms ease-in-out;
		-webkit-transition: height 300ms ease-in-out;
		-moz-transition: height 300ms ease-in-out;
		-ms-transition: height 300ms ease-in-out;
		-o-transition: height 300ms ease-in-out;
		padding: 15px;
		padding-top: 5px;
		display: inline-block;
		border: 1px solid #dadada;
		box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
		-webkit-box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
		-moz-box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
		box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
	}

	.check-btn {
		width: 90px;
		height: 22px;
		line-height: 22px;
		display: block;
		margin: 0 auto;
		background-color: #ec5463;
		color: #ffffff;
		text-decoration: none;
		text-align: center;
	}
</style>










