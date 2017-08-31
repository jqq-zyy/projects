/**
 * Created by Hjai on 17/1/11.
 */
var _list = [];
var _hash = Object.create(null);
var _relateCount = 0;
var _receiveCount = 0;
var _totalAmount = 0;
var _totalPage = 0;

export default class ActivityDetailPool {
	constructor()
	{
	}

	update($dObj)
	{
		$dObj.hasOwnProperty('relateQrcodeCount') && (_relateCount = $dObj.relateQrcodeCount);
		$dObj.hasOwnProperty('qrcodeReceiveCount') && (_receiveCount = $dObj.qrcodeReceiveCount);
		$dObj.hasOwnProperty('activityTotalReceiveAmount') && (_totalAmount = $dObj.activityTotalReceiveAmount);
		if($dObj.pageResult){
			$dObj.pageResult.hasOwnProperty('totalPage') && (_totalPage = $dObj.pageResult.totalPage);
			for (var item of $dObj.pageResult.data)
			{
				this.add(item);
			}
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

	get relateCount()
	{
		return _relateCount;
	}

	get receiveCount()
	{
		return _receiveCount;
	}

	get totalAmount()
	{
		return _totalAmount;
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
	d.id = 0;
	d.batchNo = '';
	d.batchUse ="";
	d.qrcodeNo = '';
	d.status = "";
	d.statusDesc = "";
	d.relTime = "";
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;
}

function updateData($dObj)
{
	$dObj.hasOwnProperty('id') && (this.id = $dObj.id);
	$dObj.hasOwnProperty('batchNo') && (this.batchNo = $dObj.batchNo);
	$dObj.hasOwnProperty('batchUse') && (this.batchUse = $dObj.batchUse);
	$dObj.hasOwnProperty('qrcodeNo') && (this.qrcodeNo = $dObj.qrcodeNo);
	$dObj.hasOwnProperty('qrcodeStatus') && (this.status = $dObj.qrcodeStatus);
	$dObj.hasOwnProperty('qrcodeStatusDesc') && (this.statusDesc = $dObj.qrcodeStatusDesc);
	$dObj.hasOwnProperty('relActivityTime') && (this.relTime = $dObj.relActivityTime);
}
