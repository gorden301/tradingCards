import { Button, Image, Text, View } from "@tarojs/components"
import Login from '@/components/login'
import './index.scss'
import Taro from "@tarojs/taro"
import { useDidShow } from "@tarojs/taro"
import { useState } from "react"
import DefaultAvatar from '@/assets/user/tab4.png'
import OrderIcon from '@/assets/logo/orderIcon.png'
import ContactUs from '@/assets/logo/contact.png'
import Address from '@/assets/logo/address.png'

const serviceConfig = [
    {
        name: '我的订单',
        img: OrderIcon,
        cb: () => {
            Taro.navigateTo({ url: '/pages/user/userOrder/index' })
        },
        linkUrl: '/pages/user/userOrder/index'
    },
    {
        name: '地址管理',
        img: Address,
        cb: () => {
            Taro.navigateTo({ url: '/pages/user/userAddress/index' })
        },
    },
    {
        name: '联系我们',
        img: ContactUs,
        cb: () => {
            Taro.navigateTo({ url: '/pages/user/contactUs/index' })
        }
    }
]
const UserCenter: React.FC<{}> = () => {
    const [userInfo, setUserInfo] = useState<any>({})
    useDidShow(() => {
        const userInfoCache = Taro.getStorageSync("userInfo") || {}
        setUserInfo(userInfoCache)
    })
    const goEditUser = () => {
        Taro.navigateTo({
            url: '/pages/user/userInfo/index'
        })
    }
    const goRegisterOrLogin = async () => {
        if (!userInfo?.openid) {
            const loginResult = await Taro.cloud.callFunction({
                name: "login",
                data: {
                    searchUser: true
                }
            })
            const { code, data, msg } = (loginResult as any)?.result
            if (code == 1) {
                Taro.setStorageSync("userInfo", data[0])
                setUserInfo(data[0])
            } else {
                Taro.navigateTo({ url: '/pages/register/index' })
            }
        }
    }
    return (
        <View className="wrap">
            <View>
                {
                    !(userInfo._id || userInfo.nickName) ? <View className="userCenter"><Image className="avatar" src={DefaultAvatar}></Image>
                        <Button className="login_btn" size="mini" onClick={goRegisterOrLogin}>点击登录/注册</Button></View> :
                        <View className="userCenter" onClick={goEditUser}>
                            <Image className="avatar" src={userInfo?.avatar || DefaultAvatar}></Image>
                            <View style="color: #ffffff;">{Taro.getStorageSync('userInfo')?.nickName}</View>
                        </View>
                }
            </View>
            <View className="userCenter_wrap">
                <View className="service_module">
                    {serviceConfig.map((item: any, index: number) => {
                        return <View key={index} className="item" onClick={() => item.cb()}>
                            <Image className="img" src={item.img}></Image>
                            <Text className="text">{item.name}</Text>
                        </View>
                    })}
                </View>
            </View>
        </View>
    )
}

export default UserCenter
