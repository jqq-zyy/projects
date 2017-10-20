/**
 * Created by Hjai on 17/1/11.
 */
var _list = [];
var _hash = Object.create(null);
var _totalPage = 0;
var _orderId = "";

export default class MessagePool {
	constructor()
	{
	}

	update($dObj)
	{
		
		$dObj.hasOwnProperty('orderId') && (_orderId = $dObj.orderId);
		$dObj.hasOwnProperty('totalPage') && (_totalPage = $dObj.totalPage);
		if($dObj.data){
			for (var item of $dObj.data)
			{
				this.add(item,$dObj.count);
			}
		}
		
	}

	add($dObj)
	{
		var itemData = createData($dObj);
		if (!_hash[itemData.id])
		{
			_list.push(itemData);
			_hash[itemData.id] = itemData;
		}
	}

	remove($id)
	{
		var index = _list.indexOf(_hash[$id]);
		if (index != -1)
		{
			_unReadlist.splice(index, 1);
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

	get orderId()
	{
		return _orderId;
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
	}
}

function createData($dObj)
{
	var d = {};
	d.id = 0;
	d.createTime = "";
	d.applyUserLogon = "";
	d.pendTypeDesc = "";
	d.companyFullName = "";
	d.pendType = 0;
	d.relationId = "";
	d.shopId = "";
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;
}

function updateData($dObj)
{
	$dObj.hasOwnProperty('pendId') && (this.id = $dObj.pendId);
	$dObj.hasOwnProperty('createTime') && (this.createTime = $dObj.createTime);
	$dObj.hasOwnProperty('applyUserLogon') && (this.applyUserLogon = $dObj.applyUserLogon);
	$dObj.hasOwnProperty('pendTypeDesc') && (this.pendTypeDesc = $dObj.pendTypeDesc);
	$dObj.hasOwnProperty('companyFullName') && (this.companyFullName = $dObj.companyFullName);
	$dObj.hasOwnProperty('pendType') && (this.pendType = $dObj.pendType);
	$dObj.hasOwnProperty('shopId') && (this.shopId = $dObj.shopId);
	$dObj.hasOwnProperty('relationId') && (this.relationId = $dObj.relationId);
}







