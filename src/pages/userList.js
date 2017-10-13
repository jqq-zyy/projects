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
	"userList": [
		{
			id: "audit",
			condition: "authStatus",
			support: "审核",
			against: ""
		},
		{
			id: "freeze",
			condition: "freezeStatus",
			support: "冻结",
			against: "解冻"
		}
	],
	"account": [
		{
			id: "audit",
			condition: "orderStatus",
			support: "审核",
			against: ""
		},
	]

}

export function convertList($list, $headerList, $type)
{

	var list = $list.slice(0);
	var idList = [];
	for (var item of $headerList)
	{
		idList.push(item.id)
	}

	for (var item  of list)
	{
		item.btn = [];
		if ($type)
		{
			for (var typeItem of hash[$type])
			{
				var obj = {};
				obj.id = typeItem.id;
				obj.name = item[typeItem.condition] == 1 ? typeItem.support : typeItem.against
				item.btn.push(obj);
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
