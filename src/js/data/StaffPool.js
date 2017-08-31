/**
 * Created by Hjai on 17/1/11.
 */
var _list = [];
var _hash = Object.create(null);
var _totalPage = 0;
var _total = 0;

export default class StaffPool {
	constructor()
	{
	}

	update($dObj)
	{
		$dObj.hasOwnProperty('totalPage') && (_totalPage = $dObj.totalPage);
		$dObj.hasOwnProperty('total') && (_total = $dObj.total);
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
	}
}

function createData($dObj)
{
	var d = {};
	d.id = 0;
	d.userName = "";
	d.roleName = "";
	d.telphone = "";
	d.userStatus = "";
	d.userStatusDesc = "";
	d.createTime = "";
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;
}

function updateData($dObj)
{
	$dObj.hasOwnProperty('userId') && (this.id = $dObj.userId);
	$dObj.hasOwnProperty('logon') && (this.userName = $dObj.logon);
	$dObj.hasOwnProperty('roleName') && (this.roleName = $dObj.roleName);
	$dObj.hasOwnProperty('telphone') && (this.telphone = $dObj.telphone);
	$dObj.hasOwnProperty('userStatus') && (this.userStatus = $dObj.userStatus);
	$dObj.hasOwnProperty('userStatusDesc') && (this.userStatusDesc = $dObj.userStatusDesc);
	$dObj.hasOwnProperty('createTime') && (this.createTime = $dObj.createTime);
}