export default {
	pages: [
		"pages/home/index",
		"pages/service/index",
		"pages/test/index",
		"pages/user/userCenter/index",
		"pages/user/userInfo/index",
		"pages/register/index",
		"pages/service/pages/grade/index",
		"pages/service/pages/sellCard/index",
	],
	window: {
		backgroundTextStyle: "light",
		navigationBarBackgroundColor: "#fff",
		navigationBarTitleText: "",
		navigationBarTextStyle: "black",
	},
	tabBar: {
		// custom: true,
		color: "#999",
		selectedColor: "#C8102E",
		list: [
			{
				pagePath: "pages/home/index",
				text: "首页",
				iconPath: "./assets/user/tab1.png",
				selectedIconPath: "./assets/user/tab1_a.png",
			},
			{
				pagePath: "pages/service/index",
				text: "服务",
				iconPath: "./assets/user/tab2.png",
				selectedIconPath: "./assets/user/tab2_a.png",
			},
			{
				pagePath: "pages/test/index",
				text: "测试",
				iconPath: "./assets/user/tab3.png",
				selectedIconPath: "./assets/user/tab3_a.png",
			},
			{
				pagePath: "pages/user/userCenter/index",
				text: "我的",
				iconPath: "./assets/user/tab4.png",
				selectedIconPath: "./assets/user/tab4_a.png",
			},
		],
	},
	cloud: true,
};
