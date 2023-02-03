import { Image, Swiper, SwiperItem, View } from '@tarojs/components'
import { useEffect, useState } from 'react'
import logo from '@/assets/logo/logo.jpg'
import './index.scss'
import { BannerProps } from './constant'

const Banner: React.FC<BannerProps> = ({
    bannerList = []
}) => {
    const [bannerArr, setBannerArr] = useState<any>(bannerList)
    const [useLocalBanner, setUseLoalBanner] = useState<boolean>(false)
    const initBanner = () => {
        if (bannerArr.length === 0) {
            setUseLoalBanner(true)
        }
    }
    useEffect(() => {
        initBanner()
    }, [])
    return (
        <View className='bannerList'>
            {useLocalBanner ? <Image mode="scaleToFill" className='logo_pic' src={logo}></Image> : <Swiper>
                {bannerArr.map((item, index) => {
                    return (
                        <SwiperItem key={index}>
                            <Image src={item.picUrl}></Image>
                        </SwiperItem>
                    )
                })}
            </Swiper>}
        </View>
    )
}

export default Banner