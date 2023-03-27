import { View, Image } from "@tarojs/components"
import Yewu from '@/assets/logo/yewu.jpg'
import './index.scss'

const ContactUs: React.FC<{}> = () => {
    return (
        <View>
            <Image src={Yewu}></Image>
        </View>
    )
}

export default ContactUs
