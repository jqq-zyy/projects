/**
 * Created by billy on 2017/3/13.
 */
export default function (to, next)
{
	g.net.calls("permission/getRoleListByAdmin","permission/getPermissionList").then(($list) =>
	{
		g.data.rolePool.update($list[0]);
		g.data.powerPool.update($list[1]);
		next();
	}, (err) =>
	{
		g.func.dealErr(err);
	});
}
export function getRoleList($callback){
	g.net.call("permission/getRoleListByShop").then(($obj) =>
	{
		g.data.rolePool.update($obj);
		$callback();
	}, (err) =>
	{
		g.func.dealErr(err);
	});
}