import React from "react";
import { StyleSheet, TouchableOpacity, Text, TouchableOpacityProps } from "react-native";

type FilterStyleProps = {
    isActive?: boolean;
};
type Props = TouchableOpacityProps & FilterStyleProps & {
    title: string;
};

export function Filter({ title, isActive = false, ...rest }: Props) {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                isActive ? styles.activeContainer : styles.inactiveContainer,
            ]}
            {...rest}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 4,
        marginRight: 12,
        height: 38,
        width: 70,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        marginBottom: 14
    },
    activeContainer: {
        borderWidth: 1,
        borderColor: '#16a34a',
    },
    inactiveContainer: {
        borderWidth: 0,
    },
    text: {
        fontWeight: '400',
        fontSize: 14,
        color: 'white',
        textTransform: 'uppercase'
    },

});
