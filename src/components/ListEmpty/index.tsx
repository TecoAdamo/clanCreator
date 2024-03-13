import { View, StyleSheet, Text } from "react-native";

type Props = {
    message: string
}
export function ListEmpty({ message }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    text: {
        color: '#9ca3af',
        marginTop: 48,
        fontWeight: '400',
        fontSize: 16,
        textAlign: 'center',

    },
});