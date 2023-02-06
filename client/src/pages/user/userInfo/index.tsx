import { Image, View } from "@tarojs/components"
import DefaultAvatar from '@/assets/user/tab4.png'
import Taro from "@tarojs/taro"
import './index.scss'

const UserInfo: React.FC<{}> = () => {
    return (
        <View className="userInfo">
            <View>
                <Image className="avatar" src={Taro.getStorageSync('userInfo')?.avatar || DefaultAvatar}></Image>
            </View>
        </View>
    )
}

export default UserInfo