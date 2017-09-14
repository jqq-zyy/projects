import Icon from "../components/icon";
import Button from "../components/button";
import CheckBox from "../components/checkBox";
import List from "../components/list";
import Page from "../components/page";
import Table from "../components/table";
import DateBox from "../components/dateBox";
import Group from "../components/group";

const install = function (Vue, config = {})
{
	Vue.component(Icon.name, Icon);
	Vue.component(Button.name, Button);
	Vue.component(CheckBox.name, CheckBox);
	Vue.component(CheckBox.Group.name, CheckBox.Group);
	Vue.component(List.name, List);
	Vue.component(Page.name, Page);
	Vue.component(DateBox.name, DateBox);
	Vue.component(Table.name, Table);
	Vue.component(Group.name, Group);
};

// auto install
if (typeof window !== 'undefined' && window.Vue)
{
	install(window.Vue);
}

module.exports = {
	install,
	Icon,
	Button,
	CheckBox,
	List,
	Page,
	Table,
	DateBox,
	Group
};