import { useState } from "react";

import { View, StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";

import { MaterialIcons } from '@expo/vector-icons'

export type ButtonIconTypeStyleProps = 'PRIMARY' | 'SECONDARY';

type Props = {
    type: ButtonIconTypeStyleProps;
}

type PropsButtonIcon = TouchableOpacityProps & {
    icon: keyof typeof MaterialIcons.glyphMap;
    type?: ButtonIconTypeStyleProps
}

export function ButtonIcon({ icon, type = 'PRIMARY', ...rest }: PropsButtonIcon) {

    const backgroundColor = type === 'PRIMARY' ? '#16a34a' : '#dc2626';

    return (
        <View style={styles.container}>
            <TouchableOpacity {...rest}>
                <MaterialIcons name={icon} type={type} color={backgroundColor} size={24} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 56,
        width: 56,
        justifyContent: 'center',


    },
});