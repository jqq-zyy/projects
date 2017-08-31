/**
 * Created by Hjai on 17/1/11.
 */
var _list = [];
var _hash = Object.create(null);

export default class MemberPool {
	constructor()
	{
	}

	update($list)
	{
		for (var item of $list)
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

	get list()
	{
		var list = _list.sort(function (a, b)
		{
			return a.levelSill - b.levelSill
		})
		return list;
	}

	
	getDataById($id)
	{
		return _hash[$id];
	}

	get  memberCount()
	{
		return _list.length;
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
	d.shopId = '';
	d.levelName = '';
	d.levelSill = '';
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;
}

function updateData($dObj)
{
	$dObj.hasOwnProperty('levelId') && (this.id = $dObj.levelId);
	$dObj.hasOwnProperty('shopId') && (this.shopId = $dObj.shopId);
	$dObj.hasOwnProperty('levelName') && (this.levelName = $dObj.levelName);
	$dObj.hasOwnProperty('levelSill') && (this.levelSill = $dObj.levelSill);
}
