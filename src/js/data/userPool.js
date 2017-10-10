/**
 * Created by Hjai on 17/1/11.
 */
var _list = [];
var _hash = Object.create(null);
var _total = 0;
var _totalPage = 0;
var _shopAllAmount = 0;
var _platformAllAmount = 0;
var _rpSendAllNum = 0;
var _qrcodeScanAllNum = 0;
var _qrcodeBindAllNum = 0;
var _qrcodeExportAllNum = 0;
var _qrcodeUnExportAllNum = 0;
var _qrcodeBuyAllNum = 0;
var _qrcodeRefundAllNum = 0;
var _rpAllCurrentAccount = 0;

export default class UserPool {
    constructor() {
    }


    update($obj) {
        var model = $obj.model;
        $obj.hasOwnProperty('total') && (_total = $obj.total);
        $obj.hasOwnProperty('totalPage') && (_totalPage = $obj.totalPage);
        if (model) {
            model.hasOwnProperty('shopAllAmount') && (_shopAllAmount = $obj.shopAllAmount);
            model.hasOwnProperty('platformAllAmount') && (_platformAllAmount = model.platformAllAmount);
            model.hasOwnProperty('rpSendAllNum') && (_rpSendAllNum = model.rpSendAllNum);
            model.hasOwnProperty('qrcodeScanAllNum') && (_qrcodeScanAllNum = model.qrcodeScanAllNum);
            model.hasOwnProperty('qrcodeBindAllNum') && (_qrcodeBindAllNum = model.qrcodeBindAllNum);
            model.hasOwnProperty('qrcodeExportAllNum') && (_qrcodeExportAllNum = model.qrcodeExportAllNum);
            model.hasOwnProperty('qrcodeUnExportAllNum') && (_qrcodeUnExportAllNum = model.qrcodeUnExportAllNum);
            model.hasOwnProperty('qrcodeBuyAllNum') && (_qrcodeBuyAllNum = model.qrcodeBuyAllNum);
            model.hasOwnProperty('qrcodeRefundAllNum') && (_qrcodeRefundAllNum = model.qrcodeRefundAllNum);
            model.hasOwnProperty('rpAllCurrentAccount') && (_rpAllCurrentAccount = model.rpAllCurrentAccount);
        }

        for (var item of $obj.data) {
            this.add(item);
        }
    }

    add($dObj) {
        var itemData = createData($dObj);
        if (!_hash[itemData.id]) {
            _hash[itemData.id] = itemData;
            _list.push(itemData);
        }
    }

    remove($id) {
        var index = _list.indexOf(_hash[$id]);
        if (index != -1) {
            _list.splice(index, 1);
        }
    }

    get list() {
        return _list;
    }

    get shopAllAmount() {
        return _shopAllAmount;
    }

    get platformAllAmount() {
        return _platformAllAmount;
    }

    get rpSendAllNum() {
        return _rpSendAllNum;
    }

    get qrcodeScanAllNum() {
        return _qrcodeScanAllNum;
    }

    get qrcodeBindAllNum() {
        return _qrcodeBindAllNum;
    }

    get qrcodeExportAllNum() {
        return _qrcodeExportAllNum;
    }

    get qrcodeUnExportAllNum() {
        return _qrcodeUnExportAllNum;
    }

    get qrcodeBuyAllNum() {
        return _qrcodeBuyAllNum;
    }

    get qrcodeRefundAllNum() {
        return _qrcodeRefundAllNum;
    }

    get rpAllCurrentAccount() {
        return _rpAllCurrentAccount;
    }

    get totalPage() {
        return _totalPage;
    }

    get total() {
        return _total;
    }

    getDataById($id) {
        return _hash[$id];
    }

    removeAll() {
        _list = [];
        _hash = Object.create(null);
        _total = 0;
        _totalPage = 0;
        _shopAllAmount = 0;
        _platformAllAmount = 0;
        _rpSendAllNum = 0;
        _qrcodeScanAllNum = 0;
        _qrcodeBindAllNum = 0;
        _qrcodeExportAllNum = 0;
        _qrcodeUnExportAllNum = 0;
        _qrcodeBuyAllNum = 0;
        _qrcodeRefundAllNum = 0;
        _rpAllCurrentAccount = 0;
    }
}

function createData($dObj) {
    var d = {};
    d.id = 0;
    d.createTime = '';
    d.name = '';
    d.freezeStatusDesc = "";
    d.logon = "";
    d.telphone = "";
    d.authStatusDesc = "";
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
    d.freezeStatus = 0;
    d.btn = [];
    d.authStatus = 0;
    d.update = updateData.bind(d);
    d.update($dObj);
    return d;
}

function updateData($dObj) {
    $dObj.hasOwnProperty('shopId') && (this.id = $dObj.shopId);
    $dObj.hasOwnProperty('createTime') && (this.createTime = $dObj.createTime);
    $dObj.hasOwnProperty('companyFullName') && (this.name = $dObj.companyFullName);
    $dObj.hasOwnProperty('freezeStatusDesc') && (this.freezeStatusDesc = $dObj.freezeStatusDesc);
    $dObj.hasOwnProperty('logon') && (this.logon = $dObj.logon);
    $dObj.hasOwnProperty('telphone') && (this.telphone = $dObj.telphone);
    $dObj.hasOwnProperty('authStatusDesc') && (this.authStatusDesc = $dObj.authStatusDesc);
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
    $dObj.hasOwnProperty('authStatus') && (this.authStatus = $dObj.authStatus);
    $dObj.hasOwnProperty('freezeStatus') && (this.freezeStatus = $dObj.freezeStatus);
    // var obj = {
    //     id: 0,
    //     name: ""
    // };
    // if ($dObj.hasOwnProperty('freezeStatus') == 1) {
    //     obj.id = 0;
    //     obj.name = "冻结"
    //     this.btn.push(obj);
    // } else {
    //     obj.id = 1;
    //     obj.name = "解冻"
    //     this.btn.push(obj);
    // }
    //
    // if($dObj.hasOwnProperty('authStatus') == 1){
    //     obj.id = 'auth';
    //     obj.name = "审核"
    //     this.btn.push(obj);
    // }

}
