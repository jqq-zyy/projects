/**
 * Created by Hjai on 17/1/11.
 */
var _list = [];
var _hash = Object.create(null);
var _totalQrCodeNum = 0;
var _remainQrCodeNum = 0;
var _totalMakedAmount = 0;
var _totalMakedRpCount = 0;
var _activityInfo = {};
var _activityRpInfo = {};
var _activityRules = [];

export default class ActivityDetailPool {
	constructor()
	{
	}

	update($dObj)
	{
		$dObj.hasOwnProperty('totalQrCodeNum') && (_totalQrCodeNum = $dObj.totalQrCodeNum);
		$dObj.hasOwnProperty('remainQrCodeNum') && (_remainQrCodeNum = $dObj.remainQrCodeNum);
		$dObj.hasOwnProperty('totalMakedAmount') && (_totalMakedAmount = $dObj.totalMakedAmount);
		$dObj.hasOwnProperty('totalMakedRpCount') && (_totalMakedRpCount = $dObj.totalMakedRpCount);
		$dObj.hasOwnProperty('activityInfo') && (_activityInfo = $dObj.activityInfo);
		$dObj.hasOwnProperty('activityRpInfo') && (_activityRpInfo = $dObj.activityRpInfo);
		$dObj.hasOwnProperty('activityRules') && (_activityRules = $dObj.activityRules);
	}

	get totalQrCodeNum()
	{
		return _totalQrCodeNum;
	}

	get remainQrCodeNum()
	{
		return _remainQrCodeNum;
	}

	get totalMakedAmount()
	{
		return _totalMakedAmount
	}

	get totalMakedRpCount()
	{
		return _totalMakedRpCount
	}

	get activityInfo()
	{
		return _activityInfo
	}

	get activityRpInfo()
	{
		return _activityRpInfo
	}

	get activityRules()
	{
		return _activityRules
	}

	removeAll()
	{
		_list = [];
		_hash = Object.create(null);
		_totalQrCodeNum = 0;
		_remainQrCodeNum = 0;
		_totalMakedAmount = 0;
		_totalMakedRpCount = 0;
		_activityInfo = {};
		_activityRpInfo = {};
		_activityRules = [];
	}
}
