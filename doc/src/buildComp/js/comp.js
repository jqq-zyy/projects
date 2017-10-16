import Icon from "../components/icon";
import Button from "../components/button";
import RadioBox from "../components/radioBox";
import CheckBox from "../components/checkbox";
import Input from "../components/input";
import Group from "../components/group";
import List from "../components/list";
import ScrollGroup from "../components/scrollGroup";
import Page from "../components/page";
import Table from "../components/table";
import PopUp from "../components/popup";
import DateBox from "../components/dateBox";

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
	Vue.component(ScrollGroup.name, ScrollGroup);
	Vue.component(Page.name, Page);
	Vue.component(PopUp.name, PopUp);
	Vue.component(DateBox.name, DateBox);
	Vue.component(Table.name, Table);

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
	ScrollGroup,
	Page,
	PopUp,
	DateBox,
	Table
};