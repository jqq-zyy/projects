/**
 * Created by billy on 2017/3/8.
 */
import g from "../../global";
var _socket = "";
var _stompClient = "";
var _shopId = "";

function init()
{
	_shopId = g.data.get("userInfo").shopId;
	_socket = new SockJS(g.core.webParam.url.socket);
	_stompClient = Stomp.over(_socket);
	g.event.addEventListener('CONNECT_SOCKET', connectSocket)
}

function connectSocket()
{
	_stompClient.connect({}, function ($frame)
	{
		_stompClient.subscribe('/shop/' + _shopId + '/unreadmsg', onNewMsg_socket)
	}, errorCallBack);
}
function errorCallBack(error)
{
	//alert(error)
}

function onNewMsg_socket($data)
{
	g.event.dispatchEvent('HAS_MESSAGE',$data);
	if(g.url=="/"){
		g.event.dispatchEvent('UPDATE_MSG_LIST');
	}

}

export default{
	init: init,
	connectSocket:connectSocket
}


