import { useState } from "react";

import { View, StyleSheet, Text } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'
import { ButtonIcon } from "@components/buttonIcon";

type Props = {
    name: string;
    onRemove: () => void
}

export function CardPlayers({ name, onRemove }: Props) {
    return (
        <View style={styles.container}>
            <MaterialIcons name="person" size={24} color='#e5e7eb' />
            <Text style={styles.name}>{name}</Text>
            <ButtonIcon
                icon="close"
                type="SECONDARY"
                style={{ marginLeft: 24 }}
                onPress={onRemove}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#24282C",
        width: '100%',
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        marginTop: 2,
        borderRadius: 6,
        padding: 12
    },
    name: {
        flex: 1,
        fontSize: 14,
        color: '#e5e7eb',
        marginLeft: 16,
        marginRight: 4
    },



});