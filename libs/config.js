/**
 * Created by billy on 2016/11/30.
 */
var WEB_CONFIG = {
	mode: ["debug", "testData"], //工作模式

	path: {
		domain: "{$host}",
		assets: "{$domain}/assets",
		data: "{$assets}/data",
		images: "{$assets}/images",
		template: "{$assets}/template",
		libs: "{$domain}/libs"
	},

	url: {
		domain: "",
		// server: "http://test.service.xq.mms.yundingdang.com/rp-mms-web-admin",
		// socket: "http://test.service.xq.mms.yundingdang.com/rp-mms-web-admin/message",
		server: "http://192.168.12.4:8085/rp-mms-web-admin",
		socket: "http://192.168.12.4:8085/rp-mms-web-admin",
		//server: "http://192.168.12.4:8084/mms-web",
		//server: "",
		adminPage: ""





	},

	http: {
		method: "post",
		credentials: true,
		repeatReqTime: 2000,
		req: {
			result: {
				name: "code",
				type: "number",
				success: 2000
			},
			data: {
				name: "data"
			},
			error: {
				name: "code",
				type: "number"
			},
			errorMsg: {
				name: "msg",
				type: "string"
			},
			mime: "json"
		}
	},

	file: {
		staticData: "{$data}/staticData_2076672467377827.data",

	},

	net: {
		timeout: 50000
	},

	param: {
		defaultLang: "cn",
		loginExpires: 30 * 60,
		auditRoleId: 5,
		pageSize: 8,
		reg: {
			'telphone': /^1[34578]\d{9}$/,
			'emailReg': /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
			'pwdReg': /[a-zA-Z0-9]{8,20}/
		},
		fileUploadType: "text/plain",
		upLoadUrl: "",
		pageSizeList: [10, 25],
		resetTime: 60,
		moduleUrl: "https://www.baidu.com/",
		staffStatusList: ["全部", "正常", "冻结"],
		unLogin: ["/sign"],
		rpPageCount: 3
	}

}

var production = Object.create(null);

function calFactor(n)
{
	var results = [];
	factor(n);
	function factor(n)
	{
		if (isPrime(n))
		{
			results.push(n);
			return;
		}
		for (var i = 2; i <= Math.ceil(n / 2); i++)
		{
			if (n % i == 0)
			{
				results.push(i);
				n = n / i;
				factor(n);
				break;
			}
		}
	}

	function isPrime(n)
	{
		for (var i = 2; i <= Math.ceil(Math.sqrt(n)); i++)
		{
			if (n % i == 0)
			{
				return false;
			}
		}
		return true;
	}
	return results;
}






