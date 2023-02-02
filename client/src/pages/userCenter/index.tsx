import { Button, Image, View } from "@tarojs/components"
import Login from '@/components/login'
import './index.scss'
import Taro from "@tarojs/taro"
import { useDidShow } from "@tarojs/taro"
import { useState } from "react"

const UserCenter: React.FC<{}> = () => {
    const [userInfo, setUserInfo] = useState<any>({})
    useDidShow(() => {
        const userInfoCache = Taro.getStorageSync("userInfo") || {}
        setUserInfo(userInfoCache)
    })
    const goRegisterOrLogin = () => {
        if(!userInfo) {
            Taro.navigateTo({ url: '/pages/register/index'} )
        }
    }
    return (
        <View>
            <View>
                {
                !userInfo._id ? <View className="userCenter"><Image className="avatar" src="../../assets/user/tab4.png"></Image>
                <Button className="login_btn" size="mini" onClick={goRegisterOrLogin}>点击登录/注册</Button></View> :
                    <View className="userCenter">
                        <Image className="avatar" src="../../assets/user/tab4.png"></Image>
                        <View>{ Taro.getStorageSync('userInfo')?.nickName }</View>
                    </View>
                }
            </View>
            {/* <Login></Login> */}
        </View>
    )
}

export default UserCenter