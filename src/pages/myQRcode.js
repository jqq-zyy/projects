/**
 * Created by billy on 2017/3/13.
 */
import g from '../global';
export default function (to, next)
{
	getQrcode(next)
}
export function getQrcode($callback){
	g.ui.showLoading();
	g.net.call("qrcode/home",{
		'page':1,
		'pageSize':g.param.pageSizeList[0],
		'sortOrder':'desc'
	}).then(($data) =>
	{
		g.ui.hideLoading();
		g.data.qrcodePool.update($data);
		$callback();
	}, (err) =>
	{
		g.func.dealErr(err);
	});
}





