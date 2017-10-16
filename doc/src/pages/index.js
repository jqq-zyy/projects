/**
 * Created by billy on 2017/3/13.
 */
import g from "../global";
export default function (to, next)
{
	var obj = {
		'messageContent': "",
		'page': 1,
		'pageSize': g.param.pageSizeList[0],
		'sortField': 'send_time',
		'sortOrder': 'desc'
	};
	getMessage(obj, next);
}

export function getMessage($dataObj, $callback)
{

	g.ui.showLoading();
	g.ui.hideLoading();
	$callback();
// 	g.net.call("message/getMessageOverview",$dataObj).then(($data) =>
// 	{
// 		g.data.messagePool.removeAll();
// 		g.data.messagePool.update($data);
// 		g.ui.hideLoading();
// 		$callback();
// 	}, (err) =>
// 	{
// 		g.func.dealErr(err);
// 	});
}








