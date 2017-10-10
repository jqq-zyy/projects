/**
 * Created by billy on 2016/12/19.
 */
var _warningAmount = 0;
var _max = 0;
var _min = 0;
var _maxQrcodeScanNum = 0;
var _platformRpSupport = false;
var _dataList = [];


export default class RulePool {
    constructor() {
    }

    update($dObj) {
        $dObj.hasOwnProperty('assertWarningAmount') && (_warningAmount = int($dObj.assertWarningAmount));
        $dObj.hasOwnProperty('minPlatformRpMulti') && (_min = int($dObj.minPlatformRpMulti));
        $dObj.hasOwnProperty('maxPlatformRpMulti') && (_max = int($dObj.maxPlatformRpMulti));
        $dObj.hasOwnProperty('maxQrcodeScanNum') && (_maxQrcodeScanNum = int($dObj.maxQrcodeScanNum));
        $dObj.hasOwnProperty('platformRpSupport') && (_platformRpSupport = $dObj.platformRpSupport);
        $dObj.hasOwnProperty('qrcodeUnitParamResultList') && (_dataList = $dObj.qrcodeUnitParamResultList);
        
    }

    get warningAmount() {
        return _warningAmount;
    }

    get min() {
        return _min;
    }

    get max() {
        return _max;
    }

    get maxQrcodeScanNum() {
        return _maxQrcodeScanNum;
    }

    get platformRpSupport() {
        return _platformRpSupport;
    }

    get dataList() {
        return _dataList;
    }
	removeAll(){
        _warningAmount = 0;
        _max = 0;
        _min = 0;
        _maxQrcodeScanNum = 0;
        _platformRpSupport = false;
        _dataList = [];
    }
}








