import { View, StyleSheet, Text } from "react-native";

type Props = {
    title: string
    subTitle: string
}

export function Highlights({ title, subTitle }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
            <Text style={styles.subTitle}>{subTitle}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 32,
        backgroundColor: "#202024",

    },
    text: {
        textAlign: 'center',
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 24,
        color: '#fff'
    },
    subTitle: {
        fontSize: 16,
        fontWeight: '300',
        marginBottom: 12,
        textAlign: 'center',
        color: '#9ca3af'
    },
});