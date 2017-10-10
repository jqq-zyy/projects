/**
 * Created by billy on 2017/3/13.
 */
import g from "../global";
export default function (to, next)
{
	var obj = {};
	var startTime = g.timeTool.getNowStamp() - g.timeTool.getPastSecond();
	obj.page = 1;
	obj.pageSize = 10;
	obj.startTime = g.timeTool.getDate(startTime, true);
	obj.endTime = obj.startTime;
	getUserList(obj).then(function ()
	{
		next();
	})
}
export function getUserList($param)
{
	g.ui.showLoading();
	var promise = new Promise(function (resolved, rejected)
	{
		g.net.call("user/queryShopList", $param).then(($data) =>
		{
			g.ui.hideLoading();
			g.data.userPool.removeAll();
			g.data.userPool.update($data);
			resolved();
		}, (err) =>
		{
			g.func.dealErr(err);
			rejected();
		});
	})
	return promise;
}

export function convertList($list)
{
	var list = $list.concat();
	for (var item  of list)
	{
		item.btn = [];
		if (item.authStatus == 1)
		{
			item.btn.push({
				id: "audit",
				name: "审核"
			})
		}
		else
		{
			item.btn.push({})
		}
		delete item.update;
		delete item.authStatus;
		delete item.freezeStatus;
	}
	return list
}

export function getFooterList()
{
	var resultList = [];
	var userPool = g.data.userPool;
	var target = {
		shopAllAmount: userPool.shopAllAmount,
		platformAllAmount: userPool.platformAllAmount,
		rpSendAllNum: userPool.rpSendAllNum,
		qrcodeScanAllNum: userPool.qrcodeScanAllNum,
		qrcodeBindAllNum: userPool.qrcodeBindAllNum,
		qrcodeExportAllNum: userPool.qrcodeExportAllNum,
		qrcodeUnExportAllNum: userPool.qrcodeUnExportAllNum,
		qrcodeBuyAllNum: userPool.qrcodeBuyAllNum,
		qrcodeRefundAllNum: userPool.qrcodeRefundAllNum,
		rpAllCurrentAccount: userPool.rpAllCurrentAccount,
	};

	var tmpList = getTmpList();
	for (var tmpItem of tmpList)
	{
		for (var key in target)
		{
			if (tmpItem.id == key)
			{
				tmpItem.name = target[key]
			}
			if (tmpItem.id == "total")
			{
				tmpItem.name = "汇总";
				tmpItem.colspan = 7;
			}
		}
	}
	for (var i = 0; i < 6; i++)
	{
		tmpList.splice(1, 0, {})
	}
	tmpList.push({});
	return tmpList;
	function getTmpList()
	{
		var results = [];
		var idList = [
			"total",
			"shopAllAmount",
			"platformAllAmount",
			"rpSendAllNum",
			"qrcodeScanAllNum",
			"qrcodeBindAllNum",
			"qrcodeExportAllNum",
			"qrcodeUnExportAllNum",
			"qrcodeBuyAllNum",
			"qrcodeRefundAllNum",
			"rpAllCurrentAccount"]
		for (var id of idList)
		{
			var tmpObj = {};
			tmpObj.id = id;
			results.push(tmpObj)
		}
		return results;
	}
}
