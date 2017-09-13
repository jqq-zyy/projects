/**
 * Created by Hjai on 17/1/11.
 */
var _list = [];
var _hash = Object.create(null);
var _total = 0;
var _totalPage = 0;
var _model = Object.create(null);


export default class UserPool {
	constructor()
	{
	}

	update($obj)
	{
		var model = $obj.model;
		$obj.hasOwnProperty('total') && (_total= $obj.total);
		$obj.hasOwnProperty('totalPage') && (_totalPage = $obj.totalPage);
		$obj.hasOwnProperty('shopAllAmount') && (_model.shopAllAmount = $obj.shopAllAmount);
		model.hasOwnProperty('platformAllAmount') && (_model.platformAllAmount = model.platformAllAmount);
		model.hasOwnProperty('rpSendAllNum') && (_model.rpSendAllNum = model.rpSendAllNum);
		model.hasOwnProperty('qrcodeScanAllNum') && (_model.qrcodeScanAllNum = model.qrcodeScanAllNum);
		model.hasOwnProperty('qrcodeBindAllNum') && (_model.qrcodeBindAllNum = model.qrcodeBindAllNum);
		model.hasOwnProperty('qrcodeExportAllNum') && (_model.qrcodeExportAllNum = model.qrcodeExportAllNum);
		model.hasOwnProperty('qrcodeUnExportAllNum') && (_model.qrcodeUnExportAllNum = model.qrcodeUnExportAllNum);
		model.hasOwnProperty('qrcodeBuyAllNum') && (_model.qrcodeBuyAllNum = model.qrcodeBuyAllNum);
		model.hasOwnProperty('qrcodeRefundAllNum') && (_model.qrcodeRefundAllNum = model.qrcodeRefundAllNum);
		model.hasOwnProperty('rpAllCurrentAccount') && (_model.rpAllCurrentAccount = model.rpAllCurrentAccount);
		for (var item of $obj.data)
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
	get model()
	{
		return _model;
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
	d.createTime = '';
	d.name = '';
	d.freezeStatus = 0;
	d.logon = "";
	d.telphone = "";
	d.authStatus = 0;
	d.shopAmount = 0;
	d.platformAmount = 0;
	d.rpSendNum = 0;
	d.qrcodeScanNum = 0;
	d.qrcodeBindNum = 0;
	d.qrcodeExportNum = 0;
	d.qrcodeUnExportNum = 0;
	d.qrcodeBuyNum = 0;
	d.qrcodeRefundNum = 0;
	d.rpCurrentAccount = 0;
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;
}

function updateData($dObj)
{
	$dObj.hasOwnProperty('shopId') && (this.id = $dObj.shopId);
	$dObj.hasOwnProperty('createTime') && (this.createTime = $dObj.createTime);
	$dObj.hasOwnProperty('companyFullName') && (this.name = $dObj.companyFullName);
	$dObj.hasOwnProperty('freezeStatus') && (this.freezeStatus = $dObj.freezeStatus);
	$dObj.hasOwnProperty('logon') && (this.logon = $dObj.logon);
	$dObj.hasOwnProperty('telphone') && (this.telphone = $dObj.telphone);
	$dObj.hasOwnProperty('authStatus') && (this.authStatus = $dObj.authStatus);
	$dObj.hasOwnProperty('shopAmount') && (this.shopAmount = $dObj.shopAmount);
	$dObj.hasOwnProperty('platformAmount') && (this.platformAmount = $dObj.platformAmount);
	$dObj.hasOwnProperty('rpSendNum') && (this.rpSendNum = $dObj.rpSendNum);
	$dObj.hasOwnProperty('qrcodeScanNum') && (this.qrcodeScanNum = $dObj.qrcodeScanNum);
	$dObj.hasOwnProperty('qrcodeBindNum') && (this.qrcodeBindNum = $dObj.qrcodeBindNum);
	$dObj.hasOwnProperty('qrcodeExportNum') && (this.qrcodeExportNum = $dObj.qrcodeExportNum);
	$dObj.hasOwnProperty('qrcodeUnExportNum') && (this.qrcodeUnExportNum = $dObj.qrcodeUnExportNum);
	$dObj.hasOwnProperty('qrcodeBuyNum') && (this.qrcodeBuyNum = $dObj.qrcodeBuyNum);
	$dObj.hasOwnProperty('qrcodeRefundNum') && (this.qrcodeRefundNum = $dObj.qrcodeRefundNum);
	$dObj.hasOwnProperty('rpCurrentAccount') && (this.rpCurrentAccount = $dObj.rpCurrentAccount);

}
