/**
 * Created by billy on 2017/3/13.
 */
export default function (to, next)
{
	var id = to.query.id;
	queryShopDetail(id,next)
}

export function queryShopDetail($id,$callBack){
	g.net.call("user/queryShopDetail",{
		"shopId":$id
	}).then(($data) =>
	{
		g.data.userDetailPool.update($data);
		$callBack();
	}, (err) =>
	{
		g.func.dealErr(err);
	});
}