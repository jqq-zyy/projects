/**
 * Created by Hjai on 17/1/11.
 */
var _list = [];
var _hash = Object.create(null);

export default class StaffPool {
	constructor()
	{
	}

	update($dObj)
	{
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
	}
}

function createData($dObj)
{
	var d = {};
	d.id = 0;
	d.shopId = "";
	d.roleName = "";
	d.roleStr = "";
	d.permissionDesc = "";
	d.createTime = "";
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;
}

function updateData($dObj)
{
	$dObj.hasOwnProperty('roleId') && (this.id = $dObj.roleId);
	$dObj.hasOwnProperty('shopId') && (this.shopId = $dObj.shopId);
	$dObj.hasOwnProperty('roleName') && (this.roleName = $dObj.roleName);
	$dObj.hasOwnProperty('permissionIds') && (this.roleStr = $dObj.permissionIds);
	$dObj.hasOwnProperty('permissionDesc') && (this.permissionDesc = $dObj.permissionDesc);
	$dObj.hasOwnProperty('createTime') && (this.createTime = $dObj.createTime);
}




