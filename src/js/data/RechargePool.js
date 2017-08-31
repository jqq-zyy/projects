/**
 * Created by Hjai on 17/1/11.
 */
var _list = [];
var _hash = Object.create(null);
var _totalPage = 0;

export default class RechargePool {
	constructor()
	{
	}

	update($obj)
	{
		$obj.hasOwnProperty('totalPage') && (_totalPage = $obj.totalPage);
		for (var item of $obj.data)
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
	get totalPage()
	{
		return _totalPage;
	}

	getDataById($id)
	{
		return _hash[$id];
	}

	removeAll()
	{
		_list = [];
		_hash = Object.create(null);
	}
}

function createData($dObj)
{
	var d = {};
	d.id = "";
	d.orderType = "";
	d.inOutType = '';
	d.orderAmount = '';
	d.payWay = '';
	d.createTime = '';
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;
}

function updateData($dObj)
{
	$dObj.hasOwnProperty('orderId') && (this.id = $dObj.orderId);
	$dObj.hasOwnProperty('orderTypeDesc') && (this.orderType = $dObj.orderTypeDesc);
	$dObj.hasOwnProperty('inOutTypeDesc') && (this.inOutType = $dObj.inOutTypeDesc);
	$dObj.hasOwnProperty('orderAmount') && (this.orderAmount = $dObj.orderAmount/100);
	$dObj.hasOwnProperty('payWayDesc') && (this.payWay = $dObj.payWayDesc);
	$dObj.hasOwnProperty('createTime') && (this.createTime = $dObj.createTime);
}