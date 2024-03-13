import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import LogoImg from '@assets/logo.png'
import { useNavigation } from "@react-navigation/native";

type Props = {
    showBackButton?: boolean;
}

export function Header({ showBackButton = false }: Props) {

    const navigation = useNavigation()

    const handleGoBack = () => {
        navigation.navigate('groups')
    }
    return (
        <View style={styles.container}>
            {
                showBackButton &&
                <TouchableOpacity style={styles.icon} onPress={handleGoBack}>
                    <Ionicons name="chevron-back-outline" size={32} color="white" />
                </TouchableOpacity>
            }

            <Image source={LogoImg} style={styles.img} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 28,
    },
    img: {
        width: 46,
        height: 55
    },
    icon: {
        flex: 1
    }
});