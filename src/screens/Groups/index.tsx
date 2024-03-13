import { useState, useEffect, useCallback } from "react";

import { View, StyleSheet, FlatList } from "react-native";

import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { Header } from "@components/header";
import { GroupCard } from "@components/groupCard";
import { Highlights } from "@components/highlight";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/button";
import { groupGetAll } from "@storage/group/groupsGetAll";

export function Groups() {
    const [groups, setGroups] = useState<string[]>([])

    const navigation = useNavigation()

    const handleNewGroup = () => {
        navigation.navigate('new')
    }

    const fetchGroup = async () => {
        try {
            const data = await groupGetAll()
            setGroups(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleOpenGroup = (group: string) => {
        navigation.navigate('players', { group })
    }

    useFocusEffect(useCallback(() => {
        fetchGroup()
    }, []))

    return (
        <View style={styles.container}>
            <Header />
            <Highlights title={"Turmas"} subTitle={"Jogue com a sua turma"} />
            <FlatList
                data={groups}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <GroupCard
                        title={item}
                        onPress={() => handleOpenGroup(item)}
                    />
                )}
                contentContainerStyle={groups.length === 0 && { flex: 1 }}
                ListEmptyComponent={() => <ListEmpty message="Que tal cadastrarmos a primeira turma?" />}
            />
            <Button
                title="Cadastrar nova turma"
                onPress={handleNewGroup}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#202024",
        padding: 24,
    },
    text: {
        color: 'white',
        marginTop: 48,
        fontWeight: '800',
        fontSize: 24
    },
});