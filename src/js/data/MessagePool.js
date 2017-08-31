/**
 * Created by Hjai on 17/1/11.
 */
var _list = [];
var _unReadlist = [];
var _hash = Object.create(null);
var _totalPage = 0;
var _unreadCount = 0;
var _readCount = 0;

//var _count = 0;

export default class MessagePool {
	constructor()
	{
	}

	update($dObj)
	{
		$dObj.resultPageList.hasOwnProperty('totalPage') && (_totalPage = $dObj.resultPageList.totalPage);
		$dObj.hasOwnProperty('unreadCount') && (_unreadCount = $dObj.unreadCount);
		$dObj.hasOwnProperty('alreadyReadCount') && (_readCount = $dObj.alreadyReadCount);
		for (var item of $dObj.resultPageList.data)
		{
			this.add(item,$dObj.count);
		}
	}

	add($dObj)
	{
		var itemData = createData($dObj);
		if (!_hash[itemData.id])
		{
//			if(itemData.status == 0){
//				_unReadlist.push(itemData)
//			}
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

//	get unReadList()
//	{
//		return _unReadlist;
//	}

	get totalPage()
	{
		return _totalPage;
	}
	get unreadCount()
	{
		return _unreadCount;
	}
	get readCount()
	{
		return _readCount;
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







