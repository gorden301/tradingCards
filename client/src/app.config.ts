export default {
	pages: [
		"pages/home/index",
		"pages/service/index",
		"pages/test/index",
		"pages/user/userCenter/index",
		"pages/user/userInfo/index",
		"pages/user/userOrder/index",
		"pages/user/userAddress/index",
        "pages/user/contactUs/index",
        "pages/user/userOrder/orderDetail/index",
		"pages/register/index",
		"pages/service/pages/grade/index",
		"pages/service/pages/sellCard/index",
		"pages/webView/index"
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
		selectedColor: "#309fca",
		list: [
			{
				pagePath: "pages/home/index",
				text: "首页",
				iconPath: "./assets/user/home.png",
				selectedIconPath: "./assets/user/selectHome.png",
			},
			{
				pagePath: "pages/service/index",
				text: "卡友圈",
				iconPath: "./assets/user/round.png",
				selectedIconPath: "./assets/user/selectRound.png",
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
				selectedIconPath: "./assets/user/my.png",
			},
		],
	},
	cloud: true,
};
