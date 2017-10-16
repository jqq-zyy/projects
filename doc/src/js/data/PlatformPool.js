/**
 * Created by Hjai on 17/1/11.
 */
var _list = [];
var _hash = Object.create(null);
var _totalPage = 0;
var _total = 0;
var _totalIncome = 0;
var _totalDisburse = 0;
var _balance = 0;
var _typeData = {};

export default class PlatformPool {
	constructor()
	{
	}

	update($dObj)
	{
		if($dObj.hasOwnProperty('statisticData')){
			$dObj.statisticData.hasOwnProperty('totalIncome') && (_totalIncome = $dObj.statisticData.totalIncome);
			$dObj.statisticData.hasOwnProperty('totalDisburse') && (_totalDisburse = $dObj.statisticData.totalDisburse);
			$dObj.statisticData.hasOwnProperty('balance') && (_balance = $dObj.statisticData.balance);
		}

		if($dObj.hasOwnProperty('resultPageList')){
			$dObj.resultPageList.hasOwnProperty('totalPage') && (_totalPage = $dObj.resultPageList.totalPage);
			for (var item of $dObj.resultPageList.data)
			{
				this.add(item);
			}
		}
	}

	add($dObj)
	{
		var itemData = createData($dObj);
		if (!_hash[itemData.id])
		{
			_hash[itemData.id] = itemData;
			_list.push(itemData);
		}
	}
	

	get list()
	{
		return _list;
	}

	get totalIncome()
	{
		return _totalIncome;
	}

	get totalDisburse()
	{
		return _totalDisburse;
	}

	get balance()
	{
		return _balance;
	}

	get typeData()
	{
		return _typeData;
	}
	

	get totalPage()
	{
		return _totalPage;
	}

	get total()
	{
		return _total;
	}

	getDataById($id)
	{
		return _hash[$id];
	}

	removeAll()
	{
		_list = [];
		_hash = Object.create(null);
		_totalPage = 0;
		_total = 0;
		_totalIncome = 0;
		_totalDisburse = 0;
		_balance = 0;
		_typeData = {};
	}
}

function createData($dObj)
{
	var d = {};
	d.id = 0;
	d.recordType = 0;
	d.author = "";
	d.beginTime = "";
	d.amount = 0;
	d.remarks = "";
	d.orderStatusDesc = "";
	d.payWayDesc = "";
	d.targetAccount = "";
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;
}

function updateData($dObj)
{
	$dObj.hasOwnProperty('orderId') && (this.id = $dObj.orderId);
	$dObj.hasOwnProperty('orderTypeDesc') && (this.recordType = $dObj.orderTypeDesc);
	$dObj.hasOwnProperty('applyUserLogon') && (this.author = $dObj.applyUserLogon);
	$dObj.hasOwnProperty('createTime') && (this.beginTime = $dObj.createTime);
	$dObj.hasOwnProperty('orderAmount') && (this.amount = $dObj.orderAmount);
	$dObj.hasOwnProperty('remark') && (this.remarks = $dObj.remark);
	$dObj.hasOwnProperty('orderStatusDesc') && (this.orderStatusDesc = $dObj.orderStatusDesc);
	$dObj.hasOwnProperty('payWayDesc') && (this.payWayDesc = $dObj.payWayDesc);
	$dObj.hasOwnProperty('targetAccount') && (this.targetAccount = $dObj.targetAccount);
}
