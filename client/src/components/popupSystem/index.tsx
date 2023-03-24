import { Image, ScrollView, View } from '@tarojs/components'
import classNames from 'classnames'
import React, { Component } from 'react'
import './index.scss'
// 系统弹窗
class PopupSystem extends Component {
    static defaultProps = {
        popupSystemParams: {},
        onClose: () => {}, // 关闭
        onConfirm: () => {}, // 确认
        onClickLeftBtn: () => {},
        onClickRightBtn: () => {}
    }

    state = {
        triggered: false
    }

    render() {
        const { popupSystemParams, onClose, onConfirm, onClickLeftBtn = () => {}, onClickRightBtn = () => {} } = this.props
        const {
            show = false, // 是否展示
            title = '', // 标题
            close = false, // 关闭icon入口
            content = '', // 内容
            confirmText = '', // 确认按钮
            disabledConfirm = false, // 确认按钮禁用
            cancelText = '',
            className = '',
            isCustomLeftBtn = false,
            isCustomRightBtn = false
        } = popupSystemParams
        return (
            <View className={classNames('tim-popup', `${className}`, { 'tim-popup--on': show })} catchMove>
                <View className='tim-mask'></View>
                <View className={`tim-popup_content tim-popup-system-box ${className}`}>
                    <View className={classNames('tim-popup-header')}>
                        {close ? <Image onClick={onClose} className='popup-close-icon' src={`${__STATIC_URL_TIM__}/close-icon.png`} /> : ''}
                        {title ? <View className='popup-tile'>{title}</View> : ''}
                        {content ? (
                            <ScrollView scrollY='true' className='popup-content' trapScroll>
                                {content}
                            </ScrollView>
                        ) : (
                            ''
                        )}
                        {this.props.children}
                    </View>
                    <View className='tim-popup-footer'>
                        {cancelText ? (
                            <View
                                className={classNames('footer-btn concel-btn', {
                                    disabled: disabledConfirm
                                })}
                                onClick={isCustomLeftBtn ? onClickLeftBtn : onClose}
                            >
                                {cancelText}
                            </View>
                        ) : (
                            ''
                        )}
                        <View
                            className={classNames('footer-btn', {
                                disabled: disabledConfirm
                            })}
                            onClick={isCustomRightBtn ? onClickRightBtn : onConfirm}
                        >
                            {confirmText}
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default PopupSystem
