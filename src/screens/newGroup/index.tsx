import { useState } from "react";

import { AppError } from "@utils/appError";
import { groupCreate } from "@storage/group/groupCreate";


import { View, StyleSheet, Alert } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

import { Header } from "@components/header";
import { Highlights } from "@components/highlight";
import { Button } from "@components/button";
import { Input } from "@components/input";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export function NewGroups() {
    const [group, setGroup] = useState('')

    const navigation = useNavigation()

    const handleNew = async () => {
        try {
            if (group.trim().length === 0) {
                return Alert.alert('Atenção', 'Preencha o campo com o nome do grupo para prosseguir.')
            } else {

                await groupCreate(group)
                navigation.navigate('players', { group })
            }

        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert('Novo grupo', error.message)
            } else {
                Alert.alert('Novo grupo', 'Não foi possível criar um novo grupo.')
            }
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <Header showBackButton={true} />
            <View style={styles.content}>
                <Ionicons
                    name="people-outline"
                    size={56}
                    color='#4d7c0f'
                />
                <Highlights
                    title="Nova turma"
                    subTitle="crie uma nova turma"
                />
                <Input
                    placeholder="Cadastre uma nova turma:"
                    style={{
                        color: 'white',
                        backgroundColor: "#030712",
                        padding: 16,
                        borderRadius: 6,
                        minHeight: 56,
                        maxHeight: 56,
                        width: "100%",
                    }}
                    onChangeText={text => setGroup(text)}
                />
                <Button
                    onPress={handleNew}
                    title="Criar"
                />
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#202024",
        padding: 24,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});