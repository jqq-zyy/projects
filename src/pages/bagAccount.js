/**
 * Created by billy on 2017/3/13.
 */
import g from "../global";
import {updateData} from "./userList";
export default function (to, next)
{
	g.ui.showLoading();
	var obj={};
	obj.page = 1;
	obj.pageSize = g.param.pageSizeList[0];
	obj.sortField = "";
	obj.sortOrder= "";
	obj.queryStatus= 0;
	if( g.data.messagePool.orderId){
		obj.orderId = g.data.messagePool.orderId;
		obj.startTime= "";
		obj.endTime = "";
	}else{
		var startTime = g.timeTool.getNowStamp() - g.timeTool.getPastSecond();
		obj.startTime = g.timeTool.getDate(startTime, true);
		obj.endTime = obj.startTime;
	}
	g.net.call("order/queryRpAccountList", obj).then(($data) =>
	{
		g.ui.hideLoading();
		updateData("bagHeader");
		g.data.bagPool.removeAll();
		g.data.bagPool.update($data);

		next();
	}, (err) =>
	{
		g.func.dealErr(err);
	});
}
























