import React, { Component } from "react";
import Taro, { Config } from "@tarojs/taro";

import "./app.scss";

class App extends Component {
	componentDidMount() {
		if (process.env.TARO_ENV === "weapp") {
			console.log(1)
			Taro.cloud.init({
				env: "env-1gy0ivir5e756d6a",
				traceUser: true
			});
		}
	}

	componentDidShow() {}

	componentDidHide() {}

	componentDidCatchError() {}

	// this.props.children 是将要会渲染的页面
	render() {
		return this.props.children;
	}
}

export default App;
