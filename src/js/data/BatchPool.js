/**
 * Created by Hjai on 17/1/11.
 */
var _list = [];
var _hash = Object.create(null);
//var _unrelateNum = 0;
//var _relateNum = 0;
//var _receiveNum = 0;

export default class BatchPool {
	constructor()
	{
	}

	update($list)
	{
//		debugger
//		$dObj.hasOwnProperty('unrelateActivityQrcode') && (_unrelateNum= $dObj.unrelateActivityQrcode);
//		$dObj.hasOwnProperty('relatedActivityQrcode') && (_relateNum = $dObj.relatedActivityQrcode);
//		$dObj.hasOwnProperty('receivedQrcode') && (_receiveNum = $dObj.receivedQrcode);
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
//	get unrelateNum()
//	{
//		return _unrelateNum;
//	}
//	get relateNum()
//	{
//		return _relateNum;
//	}
//	get receiveNum()
//	{
//		return _receiveNum;
//	}

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
	d.specTemplate = '';
	d.qrcodeCount = 0;
	d.usableCount = 0;
	d.unabledCount = 0;
	d.relatedCount = 0;
	d.batchUse = 0;
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;
}

function updateData($dObj)
{
	$dObj.hasOwnProperty('batchId') && (this.id = $dObj.batchId);
	$dObj.hasOwnProperty('batchNo') && (this.batchNo = $dObj.batchNo);
	$dObj.hasOwnProperty('specTemplate') && (this.specTemplate = $dObj.specTemplate);
	$dObj.hasOwnProperty('totalQrcodeCount') && (this.qrcodeCount = $dObj.totalQrcodeCount);
	$dObj.hasOwnProperty('useableQrcodeCount') && (this.usableCount = $dObj.useableQrcodeCount);
	$dObj.hasOwnProperty('unusableQrcodeCount') && (this.unabledCount = $dObj.unusableQrcodeCount);
	$dObj.hasOwnProperty('relatedQrcodeCount') && (this.relatedCount = $dObj.relatedQrcodeCount);
	$dObj.hasOwnProperty('batchUse') && (this.batchUse = $dObj.batchUse);

}
