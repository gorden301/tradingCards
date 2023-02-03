import { View, Image } from "@tarojs/components"
import { useEffect } from "react"
import Taro from '@tarojs/taro'
import Banner from "@/components/banner"
import Sell from '@/assets/logo/sell.png'
import Level from '@/assets/logo/level.png'
import './index.scss'

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
        <View className="home">
            <Banner></Banner>
            <View className="guide_module">
                <View className="item">
                    <Image src={Level}></Image>
                    <View>我要评级</View>
                </View>
                <View className="item">
                    <Image src={Sell}></Image>
                    <View>我要代卖</View>
                </View>
            </View>
        </View>
    )
}

export default Home