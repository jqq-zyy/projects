/**
 * Created by billy on 2017/3/13.
 */
import g from '../global';
export default function (to, next)
{
	var activityId = to.query.id;
	var type = to.query.type;
	if (type == 'detail' || !type)
	{
		var page = to.query.page;
		var pageSize = to.query.pageSize;
		var obj = {};
		obj.activityId = activityId;
		obj.page = page ? page : 1;
		obj.pageSize = pageSize ? pageSize : g.param.pageSizeList[0];
		getDetail(obj, next);
	}
	else if ((type == "rule" || type == "bagpage") && g.data.activityRolePool.activityId != activityId)
	{
		g.net.call("activity/getActivityRuleDetail", {
			'activityId': activityId
		}).then(($data) =>
		{
			g.data.activityRolePool.update($data);
			g.event.dispatchEvent("UPDATE_DATA");
			next();
		}, (err) =>
		{
			g.func.dealErr(err);
		});
	}
	else
	{
		g.event.dispatchEvent("UPDATE_DATA");
		next();
	}
}

export function getDetail($dataObj, $callback)
{
	g.ui.showLoading()
	g.net.call("activity/getRelQrcodePageList", $dataObj).then(($data) =>
	{
		g.data.activityDetailPool.removeAll();
		g.data.activityDetailPool.update($data);
		g.event.dispatchEvent("UPDATE_DATA");
		g.ui.hideLoading();
		$callback();
	}, (err) =>
	{
		g.func.dealErr(err);
	});
}













