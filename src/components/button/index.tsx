import { Text, StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";

export type ButtonStyleProps = 'PRIMARY' | 'SECONDARY';

type Props = {
    type: ButtonStyleProps;
}

type PropsButton = TouchableOpacityProps & {
    title: string;
    type?: ButtonStyleProps
}

export function Button({ type = 'PRIMARY', title, ...restProps }: PropsButton) {

    const backgroundColor = type === 'PRIMARY' ? '#16a34a' : '#dc2626';

    return (
        <TouchableOpacity style={[styles.container, { backgroundColor }]} {...restProps}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        minHeight: 56,
        maxHeight: 56,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
});