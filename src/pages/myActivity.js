/**
 * Created by billy on 2017/3/13.
 */
import g from '../global';
export default function (to, next)
{
	g.ui.showLoading();
	g.net.calls([{
		url: "activity/getActivityOverview",
		params: {
			'ruleType': "",
			'activityStatus': 0,
			'activityName':"",
			'page': 1,
			'pageSize': g.param.pageSizeList[0],
			'sortField': "",
			'sortOrder':""
		}
	}, "activity/getActivityStateList"]).then(($list) =>
	{
		g.ui.hideLoading();
		g.data.activityPool.removeAll();
		g.data.activityPool.update($list[0]);
		g.data.activityStatusPool.update($list[1].data);
		next();
	}, (err) =>
	{
		g.func.dealErr(err);
	});
}





