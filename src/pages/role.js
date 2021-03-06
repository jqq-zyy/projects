/**
 * Created by billy on 2017/3/13.
 */
export default function (to, next)
{
	g.ui.showLoading();
	g.net.calls("permission/getRoleListByAdmin","permission/getPermissionList").then(($list) =>
	{
		g.data.rolePool.update($list[0]);
		g.data.powerPool.update($list[1]);
		g.ui.hideLoading();
		next();
	}, (err) =>
	{
		g.func.dealErr(err);
	});
}
export function getRoleList($callback){
	g.net.call("permission/getRoleListByAdmin").then(($obj) =>
	{
		g.data.rolePool.update($obj);
		$callback();
	}, (err) =>
	{
		g.func.dealErr(err);
	});
	
}