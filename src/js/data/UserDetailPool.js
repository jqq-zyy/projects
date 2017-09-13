/**
 * Created by Hjai on 17/1/11.
 */
var _hash = Object.create(null);
export default class UserDetailPool {
	constructor()
	{
	}

	update($obj)
	{

		$obj.hasOwnProperty('shopId') && (_hash.shopId = $obj.shopId);
		$obj.hasOwnProperty('logon') && (_hash.logon = $obj.logon);
		$obj.hasOwnProperty('telphone') && (_hash.telphone = $obj.telphone);
		$obj.hasOwnProperty('companyContacts') && (_hash.contacts =$obj.companyContacts);
		$obj.hasOwnProperty('companyMail') && (_hash.mail = $obj.companyMail);
		$obj.hasOwnProperty('freezeStatus') && (_hash.freezeStatus = $obj.freezeStatus);
		$obj.hasOwnProperty('freezeStatusDesc') && (_hash.freezeStatusDesc = $obj.freezeStatusDesc);
		$obj.hasOwnProperty('createTime') && (_hash.createTime = $obj.createTime);
		$obj.hasOwnProperty('businessLicense') && (_hash.businessLicense = $obj.businessLicense);
		$obj.hasOwnProperty('taxRegister') && (_hash.taxRegister = $obj.taxRegister);
		$obj.hasOwnProperty('organizeCertificate') && (_hash.organizeCertificate = $obj.organizeCertificate);
		$obj.hasOwnProperty('idcardImagA') && (_hash.idcardImagA = $obj.idcardImagA);
		$obj.hasOwnProperty('idcardImagB') && (_hash.idcardImagB = $obj.idcardImagB);
		$obj.hasOwnProperty('companyFullName') && (_hash.companyFullName = $obj.companyFullName);
		$obj.hasOwnProperty('shopLogo') && (_hash.shopLogo = $obj.shopLogo);
		$obj.hasOwnProperty('brandList') && (_hash.brandList = $obj.brandList);
		$obj.hasOwnProperty('authStatus') && (_hash.authStatus = $obj.authStatus);
		$obj.hasOwnProperty('authStatusDesc') && (_hash.authStatusDesc = $obj.authStatusDesc);
		$obj.hasOwnProperty('activityTotalNum') && (_hash.activityTotalNum = $obj.activityTotalNum);
		$obj.hasOwnProperty('activityIngNum') && (_hash.activityIngNum = $obj.activityIngNum);
		$obj.hasOwnProperty('activityFreezeNum') && (_hash.activityFreezeNum = $obj.activityFreezeNum);
		$obj.hasOwnProperty('qrcodeBuyTime') && (_hash.qrcodeBuyTime = $obj.qrcodeBuyTime);
		$obj.hasOwnProperty('qrcodeBuyAmount') && (_hash.qrcodeBuyAmount = $obj.qrcodeBuyAmount);
		$obj.hasOwnProperty('qrcodeRefundTime') && (_hash.qrcodeRefundTime = $obj.qrcodeRefundTime);
		$obj.hasOwnProperty('qrcodeRefundAmount') && (_hash.qrcodeRefundAmount = $obj.qrcodeRefundAmount);
		$obj.hasOwnProperty('rpAccountRechargeTime') && (_hash.rpRechargeTime = $obj.rpAccountRechargeTime);
		$obj.hasOwnProperty('rpAccountRechargeAmount') && (_hash.rpRechargeAmount = $obj.rpAccountRechargeAmount);
		$obj.hasOwnProperty('rpAccountRefundTime') && (_hash.rpRefundTime = $obj.rpAccountRefundTime);
		$obj.hasOwnProperty('rpAccountRefundAmount') && (_hash.rpRefundAmount = $obj.rpAccountRefundAmount);
	}
	get hash()
	{
		return _hash;
	}

}

