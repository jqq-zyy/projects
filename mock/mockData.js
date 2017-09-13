/**
 * Created by billy on 2016/10/28.
 */
// var testObj="3|asdfas"
// Mock.mock(/staticData.+/, testObj);
Mock.mock("/getType", {
	"code": 2000,
	"msg": null,
	"data": [{

		"id": 1,
		"name": "账户余额"
	}, {

		"id": 2,
		"name": "支付宝"
	}, {

		"id": 3,
		"name": "银联转账"
	}
	]
});
Mock.mock("/mms-web/activity/publishActivity", {
	"code": 2000,
	"msg": null,
	"data": {
		"assetCurrentAmount": 2000
	}
});
Mock.mock("/mms-web/activity/buy", {
	"code": 2000,
	"msg": null,
	"data": {}
});
Mock.mock("/getAmount", {
	"code": 2000,
	"msg": null,
	"data": {
		"assetCurrentAmount": 2000
	}
});
Mock.mock("/user/userLogin", {
	"code": 2000,
	"msg": null,
	"data": {}
});
Mock.mock("/user/updateUserPassword", {
	"code": 2000,
	"msg": null,
	"data": {}
});
Mock.mock("/user/uploadCompanyAptitude", {
	"code": 2000,
	"msg": null,
	"data": {}
});
Mock.mock("/user/registerSendMsgCode", {
	"code": 2000,
	"msg": null,
	"data": {}
});
Mock.mock("/user/userRegister", {
	"code": 2000,
	"msg": null,
	"data": {
		"shopName": "abc",
		"companyTel": "12154545"
	}
});
Mock.mock("/user/resetUserPassword", {
	"code": 2000,
	"msg": null,
	"data": {}
});
Mock.mock("/mms-web/activity/saveActivityBaseInfo", {
	"code": 2000,
	"msg": null,
	"data": {
		"activityNo": 20170608182533009001,
		"qrCodeUrl": "www.baidu.com"
	}
});
Mock.mock("/user/updateTelphoneSendMsgCode", {
	"code": 2000,
	"msg": null,
	"data": {}
})
;
Mock.mock("/contact", {
	"code": 2000,
	"msg": null,
	"data": {}
});

Mock.mock("/user/updateShopInfo", {
	"code": 2000,
	"msg": null,
	"data": {}
});
Mock.mock("/mms-web/activity/getActivityStateList", {
	"code": 2000,
	"msg": "获取活动状态列表成功",
	"data": [
		{
			"stateCode": 1,
			"stateDesc": "未发布",
			"stateCountDesc": "unpublishedCount"
		},
		{
			"stateCode": 2,
			"stateDesc": "未开始",
			"stateCountDesc": "unstartedCount"
		},
		{
			"stateCode": 3,
			"stateDesc": "进行中",
			"stateCountDesc": "ongoingCount"
		},
		{
			"stateCode": 4,
			"stateDesc": "暂停中",
			"stateCountDesc": "pauseCount"
		},
		{
			"stateCode": 5,
			"stateDesc": "已结束",
			"stateCountDesc": "completeCount"
		}
	]
});
Mock.mock("/user/getShopInfo", {
	"code": 2000,
	"msg": null,
	"data": {
		"shopId": "1",
		"shopName": "abc",
		"companyMail": "abc@163.com",
		"companyTel": "13689546585",
		"companyContacts": "abc",
		"companyFullName": "百度",
		"shopLogo": "https://www.baidu.com/img/bd_logo1.png",
		"businessLicense": "https://www.baidu.com/img/bd_logo1.png",
		"idcardImagA": "https://www.baidu.com/img/bd_logo1.png",
		"idcardImagB": "https://www.baidu.com/img/bd_logo1.png",
		"auditStatus": "1"
	}
});
Mock.mock("/getPrompt", {
	"code": 2000,
	"msg": null,
	"data": [{

		"id": 1,
		"num": 1000,
		"money": 0.05
	}, {

		"id": 2,
		"num": 3000,
		"money": 0.04
	}, {

		"id": 3,
		"num": 8000,
		"money": 0.02
	}, {

		"id": 4,
		"num": 10000,
		"money": 0.01
	}
	]
});
Mock.mock("/mms-web/activity/getActivityNameList", {
	"code": 2000,
	"msg": "活动列表",
	"data": [
		{
			"activityId": 1,
			"activityName": "活动名称1"
		},
		{
			"activityId": 2,
			"activityName": "活动名称2"
		},
		{
			"activityId": 3,
			"activityName": "活动名称3"
		}
	]
});
Mock.mock("/mms-web/qrcodeRelate/relateBatchList", {
	"code": 2000,
	"msg": "可关联的批次列表",
	"data": {
		"unrelateActivityQrcode": 1500,
		"relatedActivityQrcode": 550,
		"receivedQrcode": 189,
		"batchList": [
			{
				"batchId": 1,
				"batchNo": "2017061501",
				"specTemplate": "12箱=20*100个",
				"qrcodeCount": 2000
			},
			{
				"batchId": 2,
				"batchNo": "2017061402",
				"specTemplate": "5箱=20*50个",
				"qrcodeCount": 1000
			}
		]
	}
});
Mock.mock("/mms-web/qrcodeRelate/relateType", {
	"code": 2000,
	"msg": "关联类型列表",
	"data": [
		{
			"typeId": 1,
			"typeDesc": "按导出批次选择"
		}
//		{
//			"typeId": 2,
//			"typeDesc": "导入文本文件"
//		},
//		{
//			"typeId": 3,
//			"typeDesc": "扫码/手动输入"
//		}
	]
});
Mock.mock("/mms-web/config/getProvinceList", {
	"code": 2000,
	"msg": "获取一级省列表成功",
	"data": [
		{
			"id": 1,
			"name": "北京市",
			"level": 1,
			"upid": 0,
			"useStatus": 1
		}, {
			"id": 2,
			"name": "内蒙古",
			"level": 1,
			"upid": 1,
			"useStatus": 1
		}, {
			"id": 3,
			"name": "浙江",
			"level": 1,
			"upid": 2,
			"useStatus": 1
		}

	]
});
Mock.mock("/mms-web/config/getCityList", {
	"code": 2000,
	"msg": "获取二级市列表成功",
	"data": [
		{
			"id": 2458,
			"name": "北京市",
			"level": 2,
			"upid": 1,
			"useStatus": 1
		}, {
			"id": 2454,
			"name": "呼伦贝尔",
			"level": 2,
			"upid": 2,
			"useStatus": 1
		}, {
			"id": 2455,
			"name": "呼和浩特",
			"level": 2,
			"upid": 2,
			"useStatus": 1
		}, {
			"id": 2455,
			"name": "贵阳市",
			"level": 2,
			"upid": 3,
			"useStatus": 1
		}
	]
});
Mock.mock("/mms-web/member/levelList", {
	"code": 2000,
	"msg": "会员列表",
	"data": [
		{
			"levelId": 1,
			"shopId": 200,
			"levelName": "普通",
			"levelSill": 0
		},
		{
			"levelId": 2,
			"shopId": 200,
			"levelName": "铜牌",
			"levelSill": 10
		},
		{
			"levelId": 3,
			"shopId": 200,
			"levelName": "银牌",
			"levelSill": 30
		},
		{
			"levelId": 4,
			"shopId": 200,
			"levelName": "金牌",
			"levelSill": 50
		}
	]
});
Mock.mock("/userList", {
	"code": 2000,
	"msg": "商户列表",
	"data": {
		"total": 2,
		"totalPage": 1,
		"pageSize": 10,
		"data": [
			{
				"shopId": 22,
				"createTime": "2017-08-03 11:49:35",
				"companyFullName": "幻豆",
				"freezeStatus": 1,
				"logon": "allen11",
				"telphone": "13958020773",
				"authStatus": 0,
				"shopAmount": 0,
				"platformAmount": 0,
				"rpSendNum": 0,
				"qrcodeScanNum": 0,
				"qrcodeBindNum": 0,
				"qrcodeExportNum": 0,
				"qrcodeUnExportNum": 0,
				"qrcodeBuyNum": 0,
				"qrcodeRefundNum": 0,
				"rpCurrentAccount": 0
			},
			{
				"shopId": 1002,
				"createTime": "2017-05-27 13:58:53",
				"companyFullName": "幻舞",
				"freezeStatus": 1,
				"logon": "allen1",
				"telphone": "13958020779",
				"authStatus": 1,
				"shopAmount": 3805,
				"platformAmount": 0,
				"rpSendNum": 37,
				"qrcodeScanNum": 191,
				"qrcodeBindNum": 5572,
				"qrcodeExportNum": 1221,
				"qrcodeUnExportNum": 86739,
				"qrcodeBuyNum": 104563,
				"qrcodeRefundNum": 11000,
				"rpCurrentAccount": 723132
			}
		],
		"model": {
			"shopAllAmount": 3805,
			"platformAllAmount": 0,
			"rpSendAllNum": 37,
			"qrcodeScanAllNum": 191,
			"qrcodeBindAllNum": 5582,
			"qrcodeExportAllNum": 1221,
			"qrcodeUnExportAllNum": 86739,
			"qrcodeBuyAllNum": 104573,
			"qrcodeRefundAllNum": 11000,
			"rpAllCurrentAccount": 1823082
		}
	}
})
Mock.mock("/getActivityDetail", {

	"code": 2000,
	"data": {
		"shopId": 1002,
		"logon": "allen1",
		"telphone": "13958020779",
		"companyContacts": "123456",
		"companyMail": "allen@163.com",
		"freezeStatus": 1,
		"freezeStatusDesc": "正常",
		"createTime": "2017-05-27 13:58:53",
		"businessLicense": "http://test.yundingdang.com/rp/platform-ugc/mmsShopImage/3814798630c442859917ca434746b5d0.jpg",
		"taxRegister": "http://test.yundingdang.com/rp/platform-ugc/mmsShopImage/36541b86deb74ab5960145bf3347f6e1.jpg",
		"organizeCertificate": "http://test.yundingdang.com/rp/platform-ugc/mmsShopImage/def639f3fd8f482a9b5fb88151aba735.jpg",
		"idcardImagA": "http://test.yundingdang.com/rp/platform-ugc/mmsShopImage/db739cd89be446d8b322af1d006805c8.jpg",
		"idcardImagB": "http://test.yundingdang.com/rp/platform-ugc/mmsShopImage/5d04b3f8db1c42f089b1bde1a341ef29.jpg",
		"companyFullName": "幻舞",
		"shopLogo": "http://test.yundingdang.com/rp/platform-ugc/mmsShopImage/4581f2c0c55d48e5b7da09fb4f7c99d1.jpg",
		"brandList": [
			{
				"brandName": "幻舞",
				"brandAuthorize": "http://test.yundingdang.com/rp/platform-ugc/mmsShopImage/7733f4152af74ec7aea68e2258834291.jpg"
			}
		],
		"authStatus": 3,
		"authStatusDesc": "申请认证",
		"activityTotalNum": 95,
		"activityIngNum": 1,
		"activityFreezeNum": 0,
		"qrcodeBuyTime": 87,
		"qrcodeBuyAmount": 367835,
		"qrcodeRefundTime": 20,
		"qrcodeRefundAmount": 162500,
		"rpAccountRechargeTime": 51,
		"rpAccountRechargeAmount": 449952,
		"rpAccountRefundTime": 1,
		"rpAccountRefundAmount": 10000
	}
})
Mock.mock("/activity/queryActivityStatisticOverview", {
	"code": 2000,
	"msg": "获取活动首页数据成功",
	"data": {
		"activityStatus": [
			{
				"stateCode": 1,
				"stateDesc": "未发布",
				"stateCountDesc": "unpublishedCount"
			},
			{
				"stateCode": 2,
				"stateDesc": "未开始",
				"stateCountDesc": "unstartedCount"
			},
			{
				"stateCode": 3,
				"stateDesc": "进行中",
				"stateCountDesc": "ongoingCount"
			},
			{
				"stateCode": 4,
				"stateDesc": "暂停中",
				"stateCountDesc": "pauseCount"
			},
			{
				"stateCode": 5,
				"stateDesc": "已结束",
				"stateCountDesc": "completeCount"
			}
		],
		"resultPageList": {
			"total": 132,
			"totalPage": 14,
			"pageSize": 10,
			"data": [
				{
					"activityId": 1504073951636,
					"activityName": "dff",
					"shopId": 1002,
					"companyFullName": "幻舞",
					"activityStatus": 1,
					"activityStatusDesc": "未发布",
					"createTime": "2017-08-30 14:15:20",
					"createTimeDesc": "2017-08-30 14:15:20",
					"qrCodeNum": 0,
					"totalScanCount": 0,
					"useRpAmount": 0,
					"useRpAmountDesc": "¥0.0"
				},
			],
			"model": {
				"totalQrCodeNum": 37,
				"totalScanCount": 282,
				"totalUseRpAmount": 1137,
				"totalUseRpAmountDesc": "¥1137.0"
			}
		}
	}
})
Mock.mock("/activity/queryActivityStatisticByPage", {
	"code": 2000,
	"msg": "获取活动首页数据成功",
	"data": {
		"resultPageList": {
			"total": 132,
			"totalPage": 14,
			"pageSize": 10,
			"data": [
				{
					"activityId": 1504073951636,
					"activityName": "dff",
					"shopId": 1002,
					"companyFullName": "幻舞",
					"activityStatus": 1,
					"activityStatusDesc": "未发布",
					"createTime": "2017-08-30 14:15:20",
					"createTimeDesc": "2017-08-30 14:15:20",
					"qrCodeNum": 0,
					"totalScanCount": 0,
					"useRpAmount": 0,
					"useRpAmountDesc": "¥0.0"
				}
			],
			"model": {
				"totalQrCodeNum": 37,
				"totalScanCount": 282,
				"totalUseRpAmount": 1137,
				"totalUseRpAmountDesc": "¥1137.0"
			}
		}
	}
})
Mock.mock("/mms-web/activity/getMessagePageList", {
	"code": 2000,
	"msg": "活动列表",
	"data": {
		"total": 5,
		"totalPage": 1,
		"pageSize": 10,
		"data": [
			{
				"activityId": 14000,
				"activityNo": "20170609152314011001",
				"shopId": 5,
				"activityName": "测试活动001",
				"activityStartTime": "2017-06-09 00:00:00",
				"activityEndTime": "2017-06-10 23:59:59",
				"activityStatus": 1,
				"receivedCount": 0,
				"relateQrCodeCount": 0,
				"receivedAmount": 0,
				"createTime": "2017-06-09 15:22:40",
				"activityStatusStr": "未发布",
				"activityStartTimeStr": "2017-06-09",
				"activityEndTimeStr": "2017-06-10"
			},
			{
				"activityId": 13000,
				"activityNo": "20170609101556010001",
				"shopId": 5,
				"activityName": "测试活动001",
				"activityStartTime": "2017-06-09 16:00:00",
				"activityEndTime": "2017-06-09 18:30:00",
				"activityStatus": 4,
				"receivedCount": 0,
				"relateQrCodeCount": 0,
				"receivedAmount": 0,
				"createTime": "2017-06-09 10:15:22",
				"activityStatusStr": "暂停中",
				"activityStartTimeStr": "2017-06-09",
				"activityEndTimeStr": "2017-06-09"
			}, {
				"activityId": 12000,
				"activityNo": "20170609101556010001",
				"shopId": 5,
				"activityName": "测试活动001",
				"activityStartTime": "2017-06-09 16:00:00",
				"activityEndTime": "2017-06-09 18:30:00",
				"activityStatus": 3,
				"receivedCount": 0,
				"relateQrCodeCount": 0,
				"receivedAmount": 0,
				"createTime": "2017-06-09 10:15:22",
				"activityStatusStr": "进行中",
				"activityStartTimeStr": "2017-06-09",
				"activityEndTimeStr": "2017-06-09"
			}, {
				"activityId": 11000,
				"activityNo": "20170609101556010001",
				"shopId": 5,
				"activityName": "测试活动001",
				"activityStartTime": "2017-06-09 16:00:00",
				"activityEndTime": "2017-06-09 18:30:00",
				"activityStatus": 2,
				"receivedCount": 0,
				"relateQrCodeCount": 0,
				"receivedAmount": 0,
				"createTime": "2017-06-09 10:15:22",
				"activityStatusStr": "未开始",
				"activityStartTimeStr": "2017-06-09",
				"activityEndTimeStr": "2017-06-09"
			}, {
				"activityId": 10000,
				"activityNo": "20170609101556010001",
				"shopId": 5,
				"activityName": "测试活动001",
				"activityStartTime": "2017-06-09 16:00:00",
				"activityEndTime": "2017-06-09 18:30:00",
				"activityStatus": 5,
				"receivedCount": 0,
				"relateQrCodeCount": 0,
				"receivedAmount": 0,
				"createTime": "2017-06-09 10:15:22",
				"activityStatusStr": "已结束",
				"activityStartTimeStr": "2017-06-09",
				"activityEndTimeStr": "2017-06-09"

			}
		],
		"unpublishedCount": 1,
		"unstartedCount": 1,
		"ongoingCount": 0,
		"pauseCount": 0,
		"completeCount": 0
	}
});

Mock.mock("/activity/queryActivityDetail", {
	"code": 2000,
	"msg": "获取活动详细数据成功",
	"data": {
		"totalQrCodeNum": 1,
		"remainQrCodeNum": -36,
		"totalMakedAmount": 282.03,
		"totalMakedRpCount": 37,
		"activityInfo": {
			"activityId": 12000,
			"activityNo": "20170626162839027001",
			"shopId": 1002,
			"activityName": "测试活动201706260001",
			"activityStartTime": "2017-06-26 00:00:00",
			"activityEndTime": "2017-12-31 23:59:59",
			"activityStatus": 3,
			"createTime": "2017-06-26 16:27:27",
			"activityStatusStr": "进行中",
			"activityStartTimeStr": "2017-06-26",
			"activityEndTimeStr": "2017-12-31",
			"relateStatus": 1,
			"isPlatformReward": 0,
			"createTimeStr": "2017-06-26"
		},
		"activityRpInfo": {
			"rpId": 28000,
			"activityId": 12000,
			"shopId": 1002,
			"rpType": 1,
			"rpTitle": "小意思的红包",
			"rpLogoUrl": "http://test.yundingdang.com/rp/platform-ugc/mmsShopLogo/20170706171456.jpg",
			"rpBrand": "幻舞科技",
			"rpWish": "恭喜发财"
		},
		"activityRules": [
			{
				"ruleId": 27000,
				"shopId": 5,
				"activityId": 12000,
				"ruleType": 1,
				"rule1Id": 1,
				"reward": 2.1,
				"ruleStatus": 1,
				"memberName": "普通"
			},
			{
				"ruleId": 27001,
				"shopId": 5,
				"activityId": 12000,
				"ruleType": 1,
				"rule1Id": 2,
				"reward": 2.2,
				"ruleStatus": 1,
				"memberName": "铜牌"
			},
			{
				"ruleId": 27002,
				"shopId": 5,
				"activityId": 12000,
				"ruleType": 1,
				"rule1Id": 3,
				"reward": 2.3,
				"ruleStatus": 1,
				"memberName": "银牌"
			},
			{
				"ruleId": 27003,
				"shopId": 5,
				"activityId": 12000,
				"ruleType": 2,
				"rule1Id": 925,
				"rule2Id": 925,
				"reward": 3.1,
				"ruleStatus": 1,
				"provinceName": "杭州市"
			},
			{
				"ruleId": 27004,
				"shopId": 5,
				"activityId": 12000,
				"ruleType": 2,
				"rule1Id": 930,
				"rule2Id": 930,
				"reward": 3.2,
				"ruleStatus": 1,
				"provinceName": "绍兴市"
			}
		]
	}
});
Mock.mock("/qrcode",{
	"code": 2000,
	"data": {
		"total": 53,
		"totalPage": 3,
		"pageSize": 20,
		"data": [
			{
				"orderId": 4001,
				"shopId": 1002,
				"orderType": 3,
				"orderTypeDesc": "退款",
				"qrcodeRefundNum": 10000,
				"refundUnitPrice": 1,
				"orderAmount": 10000,
				"payWay": 2,
				"payWayDesc": "支付宝",
				"orderStatus": 1,
				"orderStatusDesc": "申请退款",
				"createTime": "2017-08-17 15:54:37",
				"companyFullName": "幻舞"
			},
			{
				"orderId": 3003,
				"shopId": 1002,
				"orderType": 3,
				"orderTypeDesc": "退款",
				"qrcodeRefundNum": 1000,
				"refundUnitPrice": 1,
				"orderAmount": 1000,
				"payWay": 2,
				"payWayDesc": "支付宝",
				"orderStatus": 1,
				"orderStatusDesc": "申请退款",
				"createTime": "2017-08-17 15:34:32",
				"companyFullName": "幻舞"
			}
		],
		"model": {
			"qrcodeNum": 92631,
			"qrcodeAmount": -160029.65
		}
	}
});
Mock.mock("/bag",{
	"code": 2000,
	"data": {
		"total": 13,
		"totalPage": 1,
		"pageSize": 20,
		"data": [
			{
				"orderId": 4002,
				"shopId": 1002,
				"orderType": 3,
				"orderTypeDesc": "退款",
				"orderAmount": 10000,
				"payWay": 2,
				"payWayDesc": "支付宝",
				"orderStatus": 1,
				"orderStatusDesc": "申请退款",
				"createTime": "2017-08-17 15:54:37",
				"companyFullName": "幻舞"
			},
			{
				"orderId": 1499691070304,
				"shopId": 1002,
				"orderType": 2,
				"orderTypeDesc": "账户充值",
				"orderAmount": 100,
				"payWay": 2,
				"payWayDesc": "支付宝",
				"orderStatus": 3,
				"orderStatusDesc": "付款成功",
				"createTime": "2017-07-10 20:49:15",
				"companyFullName": "幻舞"
			}
		],
		"model": {
			"rpAmount": -9088
		}
	}
});
Mock.mock("/bagdetail",{
	"code": 2000,
	"data": {
		"total": 37,
		"totalPage": 2,
		"pageSize": 20,
		"data": [
			{
				"receiveId": 1503710621297,
				"shopAmount": 0,
				"platformRewardAmount": 0,
				"receiveStatus": 1,
				"receiveStatusDesc": "领取中",
				"receiverAlipayAccount": "2088202408528450",
				"mobileType": "",
				"cityName": "杭州市",
				"createTime": "2017-08-26 09:20:43",
				"activityName": "测试活动201706260001",
				"companyFullName": "幻舞",
				"rpBrand": "幻舞科技"
			}
		],
		"model": {
			"shopRpAmount": 3805,
			"platformRpAmount": 0
		}
	}
})
Mock.mock("/account/queryPlatformAccountOverview",{
	"code": 2000,
	"msg": "获取平台财务流水首页数据成功",
	"data": {
		"totalIncome": "¥1000.00",
		"totalDisburse": "¥888.00",
		"balance": "¥112.00",
		"typeData": [
			{
				"typeCode": "-1",
				"typeDesc": "全部"
			},
			{
				"typeCode": "1",
				"typeDesc": "销售收入"
			},
			{
				"typeCode": "2",
				"typeDesc": "退款支出"
			},
			{
				"typeCode": "3",
				"typeDesc": "平台账户充值"
			},
			{
				"typeCode": "4",
				"typeDesc": "提现支出"
			}
		],
		"resultPageList": {
			"total": 2,
			"totalPage": 1,
			"pageSize": 10,
			"data": [
				{
					"recordId": 1504776924173,
					"recordType": 2,
					"author": "felix",
					"beginTime": "2017-09-07 17:35:19",
					"amount": 88800,
					"remarks": "这是测试流水",
					"recordTypeDesc": "退款支出",
					"amountDesc": "¥88800.00"
				},
				{
					"recordId": 1504775043714,
					"recordType": 1,
					"author": "allen11",
					"beginTime": "2017-09-07 17:04:02",
					"amount": 100000,
					"remarks": "商户购买二维码",
					"recordTypeDesc": "销售收入",
					"amountDesc": "¥100000.00"
				}
			]
		}
	}
});
Mock.mock("/account/queryPlatformAccountDetail",{
	"code": 2000,
	"msg": "获取平台财务流水明细成功",
	"data": {
		"recordId": 1504776924173,
		"recordType": 2,
		"author": "felix",
		"beginTime": "2017-09-07 17:35:19",
		"amount": 888,
		"remarks": "这是测试流水",
		"account": "xxx@163.com",
		"payType": 1,
		"operateType": 2,
		"recordTypeDesc": "退款支出",
		"amountDesc": "¥888.00",
		"payTypeDesc": "支付宝",
		"receiptUrl": "www.baidu.com",
		"receiptName": "这是一张发票.pdf"
	}
})




