/**
 * Created by Hjai on 17/1/11.
 */
var _list = [];
var _hash = Object.create(null);
var _count = 0;

export default class UnReadMsgPool {
	constructor()
	{
	}

	update($dObj)
	{
		$dObj.hasOwnProperty('count') && (_count = $dObj.count);
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
		return _list.slice(0, 5);
	}

	get count()
	{
		return _count;
	}

	getDataById($id)
	{
		return _hash[$id];
	}

	removeAll()
	{
		_list = [];
		_hash = Object.create(null);
		_count = 0;
	}
}

function createData($dObj)
{
	var d = {};
	d.id = 0;
	d.title = "";
	d.content = "";
	d.type = "";
	d.time = "";
	d.status = 0;
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;
}

function updateData($dObj)
{
	$dObj.hasOwnProperty('msgId') && (this.id = $dObj.msgId);
	$dObj.hasOwnProperty('msgTitle') && (this.title = $dObj.msgTitle);
	$dObj.hasOwnProperty('msgContent') && (this.content = $dObj.msgContent);
	$dObj.hasOwnProperty('msgType') && (this.type = $dObj.msgType);
	$dObj.hasOwnProperty('sendTime') && (this.time = $dObj.sendTime);
	$dObj.hasOwnProperty('status') && (this.status = $dObj.status);
}




