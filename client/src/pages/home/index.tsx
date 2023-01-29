import { View } from "@tarojs/components"
import { useEffect } from "react"
import Taro from '@tarojs/taro'

const Home: React.FC<{}> = () => {
    const getUserInfo = () => {
        Taro.cloud.callFunction({
            name: 'login',
            data: {}
        }).then(res => {
            console.log('login', res)
        })
    }
    const getMusicInfo = () => {
        Taro.cloud.callFunction({
            name: 'tcbRouter',
            data: {
                $url: 'music'
            }
        }).then(res => {
            console.log('music', res)
        })
    }
    useEffect(() => {
        getUserInfo()
        getMusicInfo()
    }, [])
    return (
        <View>这是首1页</View>
    )
}

export default Home