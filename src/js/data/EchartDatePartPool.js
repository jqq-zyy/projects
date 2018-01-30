/**
 * Created by Hjai on 17/1/11.
 */
var _list = [];

export default class EchartDatePartPool {
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

		_list.push(itemData);

	}


	get list()
	{
		return _list;
	}


	removeAll()
	{
		_list = [];
	}
}

function createData($dObj)
{
	var d = {};
	d.min = 0;
	d.max = 0;
	d.part = 1;
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;
}

function updateData($dObj)
{
	$dObj.hasOwnProperty('min') && (this.min = $dObj.min);
	$dObj.hasOwnProperty('max') && (this.max = $dObj.max);
	$dObj.hasOwnProperty('part') && (this.part = $dObj.part);
}
