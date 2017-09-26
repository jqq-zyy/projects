/**
 * Created by billy on 2017/3/13.
 */
import g from '../global';
export default function (to, next)
{
	var obj = {};
	var startTime = g.timeTool.getNowStamp() - g.timeTool.getPastSecond();
	obj.page = 1;
	obj.pageSize=10;
	obj.startTime = g.timeTool.getDate(startTime, true);
	obj.endTime = obj.startTime ;
	getUserList(obj,next)
}
export function getUserList($param,$callback)
{
	g.ui.showLoading();
	g.net.call("user/queryShopList", $param).then(($data) =>
	{
		g.ui.hideLoading();
		g.data.userPool.removeAll();
		g.data.userPool.update($data);

		$callback();
	}, (err) =>
	{
		g.func.dealErr(err);
	});
}
