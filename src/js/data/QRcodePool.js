/**
 * Created by Hjai on 17/1/11.
 */
var _list = [];
var _hash = Object.create(null);
var _unexportCount = 0;
var _exportedCount = 0;
var _freezeCount = 0;
var _total = 0;
var _totalPage = 0;

export default class QRcodePool {
	constructor()
	{
	}

	update($dObj)
	{
		$dObj.hasOwnProperty('unexportQrcode') && (_unexportCount = $dObj.unexportQrcode);
		$dObj.hasOwnProperty('exportedQrcode') && (_exportedCount = $dObj.exportedQrcode);
		$dObj.hasOwnProperty('freezeQrcode') && (_freezeCount = $dObj.freezeQrcode);
		$dObj.resultPagerList && $dObj.resultPagerList.hasOwnProperty('total') && (_total = $dObj.resultPagerList.total);
		$dObj.resultPagerList && $dObj.resultPagerList.hasOwnProperty('totalPage') && (_totalPage = $dObj.resultPagerList.totalPage);
		if ($dObj.resultPagerList)
		{
			for (var item of $dObj.resultPagerList.data)
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

	get unexportCount()
	{
		return _unexportCount;
	}

	get exportedCount()
	{
		return _exportedCount;
	}

	get freezeCount()
	{
		return _freezeCount;
	}

	get totalPage()
	{
		return _totalPage;
	}

	getDataById($id)
	{
		return _hash[$id];
	}

	removeList()
	{
		_list = [];
		_hash = Object.create(null);
	}

	removeAll()
	{
		_list = [];
		_hash = Object.create(null);
		_unexportCount = 0;
		_exportedCount = 0;
		_freezeCount = 0;
		_total = 0;
		_totalPage = 0;
	}
}

function createData($dObj)
{
	var d = {};
	d.id = 0;
	d.batchNo = '';
	d.shopId = 0;
	d.batchUse = "";
	d.specCount = "";
	d.QRcodeTotalCount = "";
	d.exportTime = 0;
	d.resourceUrl = "";
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;
}

function updateData($dObj)
{
	$dObj.hasOwnProperty('batchId') && (this.id = $dObj.batchId);
	$dObj.hasOwnProperty('batchUse') && (this.batchUse = $dObj.batchUse);
	$dObj.hasOwnProperty('batchNo') && (this.batchNo = $dObj.batchNo);
	$dObj.hasOwnProperty('shopId') && (this.shopId = $dObj.shopId);
	$dObj.hasOwnProperty('totalQrcodeCount') && (this.QRcodeTotalCount = $dObj.totalQrcodeCount);
	$dObj.hasOwnProperty('exportTime') && (this.exportTime = $dObj.exportTime);
	$dObj.hasOwnProperty('resourceUrl') && (this.resourceUrl = $dObj.resourceUrl);
}
