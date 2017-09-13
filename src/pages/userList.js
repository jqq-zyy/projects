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
	obj.sortOrder = 'desc';
	obj.startTimeStr = g.timeTool.getDate(startTime, true);
	obj.endTimeStr = obj.startTimeStr;
	obj.status = 0;
	getUserList(obj,next)
}
export function getUserList($param,$callback)
{
	g.ui.showLoading();
	g.net.call("/userList", $param).then(($data) =>
	{
		g.ui.hideLoading();
		g.data.userPool.update($data);
		$callback();
	}, (err) =>
	{
		g.func.dealErr(err);
	});
}





