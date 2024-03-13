import { View, StyleSheet, Text, TouchableOpacityProps, TouchableOpacity } from "react-native";

import Ionicons from '@expo/vector-icons/Ionicons';

type Props = TouchableOpacityProps & {
    title: string
}
export function GroupCard({ title, ...rest }: Props) {
    return (


        <TouchableOpacity
            style={styles.container}
            {...rest}>

            <Ionicons
                name="people-outline"
                style={styles.icon}
                size={32} color='#15803d' />
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>


    )
}

const styles = StyleSheet.create({
    container: {

        backgroundColor: "#29292E",
        padding: 24,
        width: '100%',
        height: 90,
        borderRadius: 6,
        flexDirection: 'row',
        marginTop: 14,

    },
    text: {
        color: '#fff',
        marginTop: 6,
        fontWeight: '300',
        fontSize: 16
    },
    icon: {
        marginRight: 22
    },
});