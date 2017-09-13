/**
 * Created by Hjai on 17/1/11.
 */
var _list = [];
var _hash = Object.create(null);

export default class NavPool {
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
	d.name = '';
	d.nav = '';
	d.icon = '';
	d.path = '';
	d.highLightList = [];
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;
}

function updateData($dObj)
{
	$dObj.hasOwnProperty('id') && (this.id = $dObj.id);
	$dObj.hasOwnProperty('name') && (this.name = $dObj.name);
	$dObj.hasOwnProperty('icon') && (this.icon = $dObj.icon);
	$dObj.hasOwnProperty('nav') && (this.nav = $dObj.nav);
	$dObj.hasOwnProperty('path') && (this.path = $dObj.path);
	$dObj.hasOwnProperty('highLightList') && (this.highLightList = $dObj.highLightList);
}
