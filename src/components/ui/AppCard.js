import React, { cloneElement } from 'react'
import { StyleSheet, View } from 'react-native'
import { THEME } from '../../theme'

export const AppCard = props => {
    return (
        <View style={ {...styles.default, ...props.style} }>{props.children}</View>
    )
}

const styles = StyleSheet.create({
    default: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        shadowColor: '#000',
        shadowRadius: 2,
        shadowOpacity: 0.3,
        shadowOffset: { width: 2, height: 2 },
        elevation: 8,
        backgroundColor: '#FFF',
        borderRadius: 10
    }
})