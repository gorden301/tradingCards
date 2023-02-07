import { Image, View, Button } from "@tarojs/components"
import DefaultAvatar from '@/assets/user/tab4.png'
import Taro from "@tarojs/taro"
import { uploadCloudImage } from "@/utils/uploadFile"
import './index.scss'
import { useState } from "react"

interface UserInfo {
    nickName?: string,
    avatar?: string,
    phoneNumer?: string | number,
    openid?: string
}

const UserInfo: React.FC<{}> = () => {
    const [userInfo, setUserInfo] = useState<UserInfo>(Taro.getStorageSync('userInfo'))
    const chooseAvatar = async (e) => {
        console.log('avatar', e)
        const avatarUrl = e?.detail?.avatarUrl
        const [uploadRes, err]: any = await uploadCloudImage({
            cloudPath: `userAvatar/${userInfo?.openid}`,
            filePath: avatarUrl
        })
        if(!err) {
            const { fileID } = uploadRes
            const updateUserRes: any = await Taro.cloud.callFunction({
                name: 'user',
                data: {
                    $url: 'updateUserAvatar',
                    avatar: fileID
                }
            })
            if(updateUserRes?.result?.code == 0) {
                Taro.setStorageSync('userInfo', {
                    ...userInfo,
                    avatar: fileID
                })
                setUserInfo({
                    ...userInfo,
                    avatar: fileID
                })
            }
        }
    }
    return (
        <View className="userInfo">
            <View className="avatar-wrapper">
                <Image className="avatar" src={userInfo?.avatar || DefaultAvatar}></Image>
                <Button
                    className="avatar-button"
                    openType='chooseAvatar'
                    onChooseAvatar={ chooseAvatar }
              >
              </Button>
            </View>
        </View>
    )
}

export default UserInfo