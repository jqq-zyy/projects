/**
 * Created by Hjai on 17/1/11.
 */
var _list = [];
var _hash = Object.create(null);

export default class PowerPool {
	constructor()
	{
	}

	update($obj)
	{
		//排序
		var list = $obj.data.sort(function (a, b)
		{
			return a.catalogLevel - b.catalogLevel
		});
		for (var item of list)
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
//			if(itemData.menuLevel>2){
//				return
//			}
			if(itemData.menuLevel ==1){
				_list.push(itemData);
			}else{
				_hash[itemData.supMenuID].childNode.push(itemData);
			}

//
		}
	}

	get list()
	{
		return _list;
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
	d.menuName = "";
	d.supMenuID = "";
	d.menuLevel = 0;
	d.childNode = [];
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;
}

function updateData($dObj)
{
	$dObj.hasOwnProperty('permissionId') && (this.id = $dObj.permissionId);
	$dObj.hasOwnProperty('permissionName') && (this.menuName = $dObj.permissionName);
	$dObj.hasOwnProperty('parentId') && (this.supMenuID = $dObj.parentId);
	$dObj.hasOwnProperty('catalogLevel') && (this.menuLevel = $dObj.catalogLevel);
}




