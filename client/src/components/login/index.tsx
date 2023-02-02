import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Button, Image } from '@tarojs/components'
import './index.scss'

const Login: React.FC<{}> = () => {
  const getLogin = () => {
    Taro.cloud
      .callFunction({
        name: "login",
        data: {}
      })
      .then(res => {
        console.log(res.result)
      })
  }
  const getUserInfo = (e) => {
    console.log('e', e)
  }
  const getUserProfile = () => {
    Taro.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
       debugger
      }
    })
  }
  return (
    <View className='userInfo'>
      <Button onClick={getLogin}>获4取登32录55云函2数1</Button>
      <Image src=''></Image>
      <Button className='btn-max-w' openType='getUserInfo' onClick={getUserProfile}  onGetUserInfo={getUserInfo} type='primary'>点击登录</Button>
      {/* <Text>context：{JSON.stringify(this.state.context)}</Text> */}
    </View>
  )
}

export default Login
