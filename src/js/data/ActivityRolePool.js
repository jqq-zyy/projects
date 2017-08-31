/**
 * Created by Hjai on 17/1/11.
 */
var _list = [];
var _hash = {};
var _activityName = "";
var _activityId = "";
var _startTime = "";
var _endTime = "";
var _redPacType = 1;
var _startAmount = 0;
var _fixAmount = 0;
var _endAmount = 0;
var _memberRules = [];
var _regionRules = [];
var _rpTitle = "";
var _rpLogoUrl = "";
var _rpBrand = "";
var _rpWish = "";
var _status = "";
var _randomAvg = "";
var _isPlatformReward = 0;

export default class ActivityRolePool {
	constructor()
	{
	}

	update($list)
	{
		var $dObj;
		if ($list instanceof Array)
		{
			$dObj = $list[0];
		}
		else
		{
			$dObj = $list;
		}
		$dObj.activityInfo.hasOwnProperty('activityName') && (_activityName = $dObj.activityInfo.activityName);
		$dObj.activityInfo.hasOwnProperty('activityId') && (_activityId = $dObj.activityInfo.activityId);
		$dObj.activityInfo.hasOwnProperty('activityStartTime') && (_startTime = $dObj.activityInfo.activityStartTime);
		$dObj.activityInfo.hasOwnProperty('activityEndTime') && (_endTime = $dObj.activityInfo.activityEndTime);
		$dObj.activityInfo.hasOwnProperty('activityStatus') && (_status = $dObj.activityInfo.activityStatus);
		$dObj.activityInfo.hasOwnProperty('isPlatformReward') && (_isPlatformReward = $dObj.activityInfo.isPlatformReward);
		$dObj.activityRpInfo.hasOwnProperty('rpType') && (_redPacType = $dObj.activityRpInfo.rpType);
		$dObj.activityRpInfo.hasOwnProperty('randomMax') && (_endAmount = Number($dObj.activityRpInfo.randomMax) / 100);
		$dObj.activityRpInfo.hasOwnProperty('randomMin') && (_startAmount = Number($dObj.activityRpInfo.randomMin) / 100);
		$dObj.activityRpInfo.hasOwnProperty('randomAvg') && (_randomAvg = Number($dObj.activityRpInfo.randomAvg) / 100);
		$dObj.activityRpInfo.hasOwnProperty('fixedAmount') && (_fixAmount = Number($dObj.activityRpInfo.fixedAmount) / 100);
		$dObj.hasOwnProperty('memberRuleInfo') && (_memberRules = $dObj.memberRuleInfo);
		$dObj.hasOwnProperty('regionRuleInfo') && (_regionRules = $dObj.regionRuleInfo);
		$dObj.activityRpInfo.hasOwnProperty('rpTitle') && (_rpTitle = $dObj.activityRpInfo.rpTitle);
		$dObj.activityRpInfo.hasOwnProperty('rpBrand') && (_rpBrand = $dObj.activityRpInfo.rpBrand);
		$dObj.activityRpInfo.hasOwnProperty('rpLogoUrl') && (_rpLogoUrl = $dObj.activityRpInfo.rpLogoUrl);
		$dObj.activityRpInfo.hasOwnProperty('rpWish') && (_rpWish = $dObj.activityRpInfo.rpWish);
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

	get activityName()
	{
		return _activityName;
	}

	get activityId()
	{
		return _activityId;
	}

	get redPacType()
	{
		return _redPacType;
	}

	get startAmount()
	{
		return _startAmount;
	}

	get endAmount()
	{
		return _endAmount;
	}

	get fixAmount()
	{
		return _fixAmount;
	}

	get startTime()
	{
		return _startTime;
	}

	get endTime()
	{
		return _endTime;
	}

	get endAmount()
	{
		return _endAmount;
	}

	get memberRules()
	{
		return _memberRules;
	}

	get regionRules()
	{
		return _regionRules;
	}

	get rpTitle()
	{
		return _rpTitle;
	}

	get rpLogoUrl()
	{
		return _rpLogoUrl;
	}

	get rpBrand()
	{
		return _rpBrand;
	}

	get rpWish()
	{
		return _rpWish;
	}

	get status()
	{
		return _status;
	}
	get randomAvg()
	{
		return _randomAvg;
	}
	get isPlatformReward()
	{
		return _isPlatformReward;
	}

	getDataById($id)
	{
		return _hash[$id];
	}

	removeAll()
	{
		_list = [];
		_hash = Object.create(null);
		_activityName = "";
		_activityId = "";
		_startTime = "";
		_endTime = "";
		_redPacType = 1;
		_startAmount = 0;
		_fixAmount = 0;
		_endAmount = 0;
		_memberRules = [];
		_regionRules = [];
		_rpTitle = "";
		_rpLogoUrl = "";
		_rpBrand = "";
		_rpWish = "";
		_status = "";
		_randomAvg = "";
		_isPlatformReward = 0;
	}
}

function createData($dObj)
{
	var d = {};

	d.statusStr = "";
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;
}

function updateData($dObj)
{
	$dObj.hasOwnProperty('relateQrCodeCount') && (this.relateCount = $dObj.relateQrCodeCount);
}
