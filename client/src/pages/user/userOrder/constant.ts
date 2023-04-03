const orderTypes = {
    1: "评级",
    2: "代卖",
};

const orderStatus = {
    1: "待客服确认",
	2: "客服已确认",
	3: "正在评级中",
	4: "评分已完成 回寄中",
	5: "订单已完成"
}

const sellType = {
	1: "拍卖",
	2: "议价",
	3: "一口价"
}

 const cardStatus = {
	1: "待评级",
	2: "评级中",
	3: "评级已出分正在回寄",
	4: "评级已完成待寄出",
	5: "评级已完成已寄出",
	6: "卡片退回",
	7: "转eBay代卖"
 }

export { orderTypes, orderStatus, sellType, cardStatus };
