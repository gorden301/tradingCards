import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Button, Image } from '@tarojs/components'
import './index.scss'
export default class Index extends Component {
  state = {
    context: {}
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  getLogin = () => {
    Taro.cloud
      .callFunction({
        name: "login",
        data: {}
      })
      .then(res => {
        this.setState({
          context: res.result
        })
      })
  }

  render() {
    return (
      <View className='userInfo'>
        <Button onClick={this.getLogin}>获4取登32录55云函2数1</Button>
        <Image src=''></Image>
        <View>点击登录</View>
        <Text>context：{JSON.stringify(this.state.context)}</Text>
      </View>
    )
  }
}
