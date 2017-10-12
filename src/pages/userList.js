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
		updateData("userHeader");
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

export function updateData($data)
{
	var staticData = g.data.staticData;
	var staticTableHeaderPool = g.data.staticTableHeaderPool;
	staticTableHeaderPool.removeAll();
	staticTableHeaderPool.update(staticData[$data + ".json"]);
}

var hash = {
	"audit": {
		condition: "authStatus",
		support: "审核",
		against: ""
	},
	"qrcode": {
		condition: "orderStatus",
		support: "审核",
		against: ""
	}

}

export function convertList($list, $headerList, $type)
{
	var list = $list.concat();
	var idList = [];
	for (var item of $headerList)
	{
		idList.push(item.id)
	}

	for (var item  of list)
	{
		if ($type)
		{
			if (item[hash[$type].condition] == 1)
			{
				item.btn = {
					id: $type,
					name: hash[$type].support
				}
			}
			else
			{
				item.btn = {
					id: "un" + $type,
					name: hash[$type].against
				}
			}
		}

		for (var key in item)
		{
			if (idList.indexOf(key) < 0)
			{
				delete item[key];
			}
		}
	}

	return list;
}

export function getFooterList($leftFixedCol, $headerList, $targetPool)
{

	var resultList = [];
	var targetPool = $targetPool;
	for (var i = 1; i < $headerList.length; i++)
	{
		var obj = {};
		if ($headerList[i].calTotal !== "")
		{
			obj.id = $headerList[i].calTotal;
			obj.name = targetPool[obj.id];
		}
		resultList.push(obj);
	}
	resultList.unshift({id: "id", name: "汇总", colspan: $leftFixedCol});
	if ($headerList[0].showIdCol === "no")
	{
		resultList.splice(1, 1, {id: "total", name: "汇总", colspan: $leftFixedCol})
	}
	return resultList;
	// 	var target = {
// 		shopAllAmount: userPool.shopAllAmount,
// 		platformAllAmount: userPool.platformAllAmount,
// 		rpSendAllNum: userPool.rpSendAllNum,
// 		qrcodeScanAllNum: userPool.qrcodeScanAllNum,
// 		qrcodeBindAllNum: userPool.qrcodeBindAllNum,
// 		qrcodeExportAllNum: userPool.qrcodeExportAllNum,
// 		qrcodeUnExportAllNum: userPool.qrcodeUnExportAllNum,
// 		qrcodeBuyAllNum: userPool.qrcodeBuyAllNum,
// 		qrcodeRefundAllNum: userPool.qrcodeRefundAllNum,
// 		rpAllCurrentAccount: userPool.rpAllCurrentAccount,
// 	};
//
// 	var tmpList = getTmpList();
// 	for (var tmpItem of tmpList)
// 	{
// 		for (var key in target)
// 		{
// 			if (tmpItem.id == key)
// 			{
// 				tmpItem.name = target[key]
// 			}
// 			if (tmpItem.id == "total")
// 			{
// 				tmpItem.name = "汇总";
// 				tmpItem.colspan = 4;
// 			}
// 		}
// 	}
// 	for (var i = 0; i < 3; i++)
// 	{
// 		tmpList.splice(1, 0, {})
// 	}
// 	tmpList.push({});
// 	return tmpList;
// 	function getTmpList()
// 	{
// 		var results = [];
// 		var idList = [
// 			"total",
// 			"shopAllAmount",
// 			"platformAllAmount",
// 			"rpSendAllNum",
// 			"qrcodeScanAllNum",
// 			"qrcodeBindAllNum",
// 			"qrcodeExportAllNum",
// 			"qrcodeUnExportAllNum",
// 			"qrcodeBuyAllNum",
// 			"qrcodeRefundAllNum",
// 			"rpAllCurrentAccount"]
// 		for (var id of idList)
// 		{
// 			var tmpObj = {};
// 			tmpObj.id = id;
// 			results.push(tmpObj)
// 		}
// 		return results;
// 	}
}
