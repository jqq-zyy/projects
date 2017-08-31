/**
 * Created by billy on 2016/12/19.
 */
var _id = "";
var _name = "";
var _email = "";
var _tel = "";
var _contacts = "";
var _fullName = "";
var _logo = "";
var _license = "";
var _imagA = "";
var _imagB = "";
var _auditStatus = 0;
var _taxImg = "";
var _organizeImg = "";
var _brandName = "";
var _warrantImg = "";
var _roleName = "";
var _roleId = "";

export default class UserInfo {
	constructor()
	{
	}

	/**
	 * 更新用户信息
	 * @param $dObj 用户信息数据结构
	 */
	update($dObj)
	{
		$dObj.hasOwnProperty('shopId') && (_id = int($dObj.shopId));
		$dObj.hasOwnProperty('logon') && (_name = $dObj.logon );
		$dObj.hasOwnProperty('companyMail') && (_email = $dObj.companyMail);
		$dObj.hasOwnProperty('telphone') && (_tel = $dObj.telphone);
		$dObj.hasOwnProperty('companyContacts') && (_contacts = $dObj.companyContacts );
		$dObj.hasOwnProperty('companyFullName') && (_fullName = $dObj.companyFullName );
		$dObj.hasOwnProperty('shopLogo') && (_logo = $dObj.shopLogo );
		$dObj.hasOwnProperty('businessLicense') && (_license = $dObj.businessLicense);
		$dObj.hasOwnProperty('idcardImagA') && (_imagA = $dObj.idcardImagA );
		$dObj.hasOwnProperty('idcardImagB') && (_imagB = $dObj.idcardImagB );
		$dObj.hasOwnProperty('auditStatus') && (_auditStatus = $dObj.auditStatus );
		$dObj.hasOwnProperty('taxRegister') && (_taxImg = $dObj.taxRegister );
		$dObj.hasOwnProperty('organizeCertificate') && (_organizeImg = $dObj.organizeCertificate );
		$dObj.hasOwnProperty('brandName') && (_brandName = $dObj.brandName );
		$dObj.hasOwnProperty('brandAuthorize') && (_warrantImg = $dObj.brandAuthorize );
		$dObj.hasOwnProperty('roleName') && (_roleName = $dObj.roleName );
		$dObj.hasOwnProperty('roleId') && (_roleId = $dObj.roleId );

	}

	get id()
	{
		return _id;
	}

	get name()
	{
		return _name;
	}

	get email()
	{
		return _email;
	}

	get tel()
	{
		return _tel;
	}

	get contacts()
	{
		return _contacts;
	}

	get fullName()
	{
		return _fullName;
	}

	get logo()
	{
		return _logo;
	}

	get license()
	{
		return _license;
	}

	get imagA()
	{
		return _imagA;
	}

	get imagB()
	{
		return _imagB;
	}

	get auditStatus()
	{
		return _auditStatus;
	}

	get taxImg()
	{
		return _taxImg;
	}

	get organizeImg()
	{
		return _organizeImg;
	}

	get brandName()
	{
		return _brandName;
	}

	get warrantImg()
	{
		return _warrantImg;
	}

	get roleName()
	{
		return _roleName;
	}

	get roleId()
	{
		return _roleId;
	}
}








