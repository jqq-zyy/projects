import Icon from "../components/icon";
import Button from "../components/button";
import RadioBox from "../components/radioBox";
import CheckBox from "../components/checkbox";
import Input from "../components/input";
import Group from "../components/group";
import List from "../components/list";
import Upload from "../components/upload";
import Switch from "../components/switch";
import Affix from "../components/affix";
import ScrollGroup from "../components/scrollGroup";
import Page from "../components/page";
import NavBar from "../components/navBar";
import Steps from "../components/steps";
import Qrcode from "../components/qrCode";
import Badge from "../components/badge";
import Code from "../components/code";
import ComboBox from "../components/comboBox";
import TabBar from "../components/tabBar";
import Table from "../components/table";


import Tips from "../components/tips";
import Loading from "../components/loading";
import PopUp from "../components/popup";
import Carousel from "../components/carousel";
import DateBox from "../components/dateBox";
import Progress from "../components/progress";
import Player from "../components/player";
import Toast from "../components/toast";
import Alert from "../components/alert";
import MessageBox from "../components/messageBox";

const install = function(Vue, config = {}) {
	trace('Button.name===', Button);
	Vue.component(Icon.name, Icon);
	Vue.component(Button.name, Button);
	Vue.component(RadioBox.name, RadioBox);
	Vue.component(RadioBox.Group.name, RadioBox.Group);
	Vue.component(CheckBox.name, CheckBox);
	Vue.component(CheckBox.Group.name, CheckBox.Group);
	Vue.component(Input.name, Input);
	Vue.component(Group.name, Group);
	Vue.component(List.name, List);
	Vue.component(Switch.name, Switch);
	Vue.component(ScrollGroup.name, ScrollGroup);
	Vue.component(Page.name, Page);
	Vue.component(NavBar.name, NavBar);
	Vue.component(Steps.name, Steps);
	Vue.component(Qrcode.name, Qrcode);
	Vue.component(Badge.name, Badge);
	Vue.component(Code.name, Code);
	Vue.component(ComboBox.name, ComboBox);
	Vue.component(TabBar.name, TabBar);
	Vue.component(PopUp.name, PopUp);
	Vue.component(Upload.name, Upload);
	Vue.component(Player.name, Player);
	Vue.component(Affix.name, Affix);
	Vue.component(Carousel.name, Carousel);
	Vue.component(DateBox.name, DateBox);
	Vue.component(Progress.name, Progress);
	Vue.component(Table.name, Table);

	Vue.$tips = Vue.prototype.$tips = Tips;
	Vue.$toast = Vue.prototype.$toast = Toast;
	Vue.$loading = Vue.prototype.$loading = Loading;
	Vue.$alert = Vue.prototype.$alert = Alert;
	Vue.$messageBox = Vue.prototype.$messageBox = MessageBox;
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue);
}

module.exports = {
	install,
	Icon,
	Button,
	RadioBox,
	CheckBox,
	Input,
	Group,
	List,
	Switch,
	ScrollGroup,
	Page,
	NavBar,
	Steps,
	Qrcode,
	Badge,
	Code,
	ComboBox,
	TabBar,
	PopUp,
	Upload,
	Player,
	Affix,
	Carousel,
	DateBox,
	Progress,
	Table
};