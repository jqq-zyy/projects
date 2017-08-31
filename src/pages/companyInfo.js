/**
 * Created by billy on 2017/3/13.
 */
export default function (to, next)
{
	if(g.data.userInfo.id == ""){
		g.net.call("user/getShopUserInfo").then(($data) =>
		{
			g.data.userInfo.update($data);
			next();
		}, (err) =>
		{
			g.func.dealErr(err);
		});
	}else{
		next();
	}
	
}