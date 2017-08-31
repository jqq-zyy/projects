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
	"data":  {
		"assetCurrentAmount": 2000
	}
});
Mock.mock("/mms-web/activity/buy", {
	"code": 2000,
	"msg": null,
	"data":  {
		
	}
});
Mock.mock("/getAmount", {
	"code": 2000,
	"msg": null,
	"data":  {
		"assetCurrentAmount": 2000
	}
});
Mock.mock("/user/userLogin", {
	"code": 2000,
	"msg": null,
	"data":  {
	}
});
Mock.mock("/user/updateUserPassword", {
	"code": 2000,
	"msg": null,
	"data":  {
	}
});
Mock.mock("/user/uploadCompanyAptitude", {
	"code": 2000,
	"msg": null,
	"data":  {
	}
});
Mock.mock("/user/registerSendMsgCode", {
	"code": 2000,
	"msg": null,
	"data":  {
	}
});
Mock.mock("/user/userRegister", {
	"code": 2000,
	"msg": null,
	"data":  {
		"shopName": "abc",
		"companyTel": "12154545"
	}
});
Mock.mock("/user/resetUserPassword", {
	"code": 2000,
	"msg": null,
	"data":  {
	}
});
Mock.mock("/mms-web/activity/saveActivityBaseInfo", {
	"code": 2000,
	"msg": null,
	"data":  {
		"activityNo": 20170608182533009001,
		"qrCodeUrl": "www.baidu.com"
	}
});
Mock.mock("/user/updateTelphoneSendMsgCode", {
	"code": 2000,
	"msg": null,
	"data":  {
	}
})
;Mock.mock("/contact", {
	"code": 2000,
	"msg": null,
	"data":  {
	}
});


Mock.mock("/user/updateShopInfo", {
	"code": 2000,
	"msg": null,
	"data":  {
	}
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
	"msg":null,
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
Mock.mock("/mms-web/config/getCityList",{
	"code": 2000,
	"msg": "获取二级市列表成功",
	"data": [
		{
			"id": 2458,
			"name": "北京市",
			"level": 2,
			"upid": 1,
			"useStatus": 1
		},{
			"id": 2454,
			"name": "呼伦贝尔",
			"level": 2,
			"upid": 2,
			"useStatus": 1
		},{
			"id": 2455,
			"name": "呼和浩特",
			"level": 2,
			"upid": 2,
			"useStatus": 1
		},{
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


