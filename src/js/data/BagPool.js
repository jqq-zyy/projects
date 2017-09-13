/**
 * Created by Hjai on 17/1/11.
 */
var _list = [];
var _hash = Object.create(null);
var _rpAmount = 0;
var _total = 0;
var _totalPage = 0;

export default class BagPool {
	constructor()
	{
	}

	update($dObj)
	{
		$dObj.model.hasOwnProperty('rpAmount') && (_rpAmount = $dObj.model.rpAmount);
		$dObj.hasOwnProperty('total') && (_total = $dObj.total);
		$dObj.hasOwnProperty('totalPage') && (_totalPage = $dObj.totalPage);
		for (var item of $dObj.data)
		{
			this.add(item);
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

	remove($id)
	{
		var index = _list.indexOf(_hash[$id]);
		if (index != -1)
		{
			_list.splice(index, 1);
		}
	}

	get list()
	{
		return _list;
	}

	get rpAmount()
	{
		return _rpAmount;
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
		_total = 0;
		_totalPage = 0;
		_rpAmount = 0;
	}
}

function createData($dObj)
{
	var d = {};
	d.id = 0;
	d.shopId = 0;
	d.orderType = 0;
	d.orderTypeDesc = "";
	d.orderAmount = 0;
	d.payWay = 0;
	d.payWayDesc = "";
	d.orderStatus = 0;
	d.orderStatusDesc = "";
	d.createTime = "";
	d.companyFullName = "";
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;
}

function updateData($dObj)
{
	$dObj.hasOwnProperty('orderId') && (this.id = $dObj.orderId);
	$dObj.hasOwnProperty('shopId') && (this.shopId = $dObj.shopId);
	$dObj.hasOwnProperty('orderType') && (this.orderType = $dObj.orderType);
	$dObj.hasOwnProperty('orderTypeDesc') && (this.orderTypeDesc = $dObj.orderTypeDesc);
	$dObj.hasOwnProperty('orderAmount') && (this.orderAmount = $dObj.orderAmount);
	$dObj.hasOwnProperty('payWay') && (this.payWay = $dObj.payWay);
	$dObj.hasOwnProperty('payWayDesc') && (this.payWayDesc = $dObj.payWayDesc);
	$dObj.hasOwnProperty('orderStatus') && (this.orderStatus = $dObj.orderStatus);
	$dObj.hasOwnProperty('orderStatusDesc') && (this.orderStatusDesc = $dObj.orderStatusDesc);
	$dObj.hasOwnProperty('createTime') && (this.createTime = $dObj.createTime);
	$dObj.hasOwnProperty('companyFullName') && (this.companyFullName = $dObj.companyFullName);
}
