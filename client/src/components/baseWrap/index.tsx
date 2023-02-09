import React, { ReactElement, useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import { ScrollView, StandardProps, View } from '@tarojs/components'
import './index.scss'

export interface IBaseWrap extends StandardProps {
    /** 是否滚动 **/
    disableScroll?: boolean
    scrollTop?: number
    enhanced?: boolean
    scrollIntoView?: string
    customClassName?: string
    bounces?: boolean
    customBodyClassName?: string
    children?
    onScroll?: () => void
    showMask?: boolean
    onPullRefresh?: () => void
    scrolltolower?: () => void
    renderFooter?: ReactElement
    renderHeader?: ReactElement
    renderOutside?: ReactElement
    refreshEnabled?: boolean
    lowerThreshold?: number
    // container容器使用，有副作用的组件 Confirm等
    effectItems?: React.FC[]
    showTabBar?: boolean
    selectedBar?: number
    triggered?: boolean
    contentBackground?: string
}

const BaseWrap: React.FC<IBaseWrap> = ({
    disableScroll = false,
    contentBackground = '#f8f8f8',
    scrollTop = 0,
    enhanced = true,
    bounces = false,
    showMask = false,
    scrollIntoView = '',
    onScroll,
    children,
    customBodyClassName,
    customClassName,
    onPullRefresh,
    scrolltolower,
    renderFooter,
    renderHeader,
    lowerThreshold = 20,
    renderOutside,
    triggered,
    effectItems,
    refreshEnabled = false,
    showTabBar = false,
    selectedBar = 0,
    style
}) => {
    const pageContentStyle = contentBackground ? { background: contentBackground } : {}
    return (
        <View className={customBodyClassName ? customBodyClassName : 'page_body'} style={style}>
            {renderHeader && <View>{renderHeader}</View>}

            {disableScroll ? (
                <View className='page_content' style={pageContentStyle}>
                    {children}
                </View>
            ) : (
                <ScrollView
                    className={customClassName ? customClassName : 'page_content'}
                    style={pageContentStyle}
                    scrollY
                    scrollIntoView={scrollIntoView}
                    refresherEnabled={refreshEnabled}
                    enhanced={enhanced}
                    refresherThreshold={100}
                    bounces={bounces}
                    refresherTriggered={triggered}
                    onRefresherRefresh={onPullRefresh}
                    scrollWithAnimation
                    // scrollTop={scrollTop}
                    lowerThreshold={lowerThreshold}
                    onScroll={onScroll}
                    // onScrolltolower={scrolltolower}
                >
                    {children}
                </ScrollView>
            )}
            {renderFooter && <View className='page_footer'>{renderFooter}</View>}
            {renderOutside}
            {effectItems?.map((Element) => React.createElement(Element as any))}
            {showMask && <View className='wrap-mask'></View>}
            {/*<Loading />*/}
        </View>
    )
}

export default BaseWrap
