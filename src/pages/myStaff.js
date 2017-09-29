/**
 * Created by billy on 2017/3/13.
 */
import g from "../global";
export default function (to, next)
{
	var obj = {
		'page': 1,
		'pageSize': g.param.pageSizeList[0],
		'sortField': 'create_time',
		'sortOrder': 'desc'
	};
	getEmployeeList(obj, next)
	
}
export function getEmployeeList($obj, $callBack)
{
	g.ui.showLoading();
	g.net.call("user/queryAdminList", $obj).then(($data) =>
	{
		g.data.staffPool.removeAll();
		g.data.staffPool.update($data);
		g.ui.hideLoading();
		$callBack();
	}, (err) =>
	{
		g.func.dealErr(err);
		$callBack();
	});
}

