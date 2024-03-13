import { useState, useEffect, useRef } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";

import { View, StyleSheet, FlatList, Text, SafeAreaView, Alert, TextInput, Keyboard } from "react-native";

import { Input } from "@components/input";
import { Header } from "@components/header";
import { Highlights } from "@components/highlight";
import { ButtonIcon } from "@components/buttonIcon";
import { CardPlayers } from "@components/cardPlayers";
import { Filter } from "@components/filter";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/button";
import { AppError } from "@utils/appError";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";

import { playersGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";

type RouteParams = {
    group: string
}

export function Players() {
    const [newPlayerName, setNewPlayerName] = useState('')
    const [team, setTeam] = useState('')
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

    const navigation = useNavigation()
    const route = useRoute()
    const { group } = route.params as RouteParams

    const newPlayerNameInputRef = useRef<TextInput>(null)

    const handleAddPlayer = async () => {
        if (newPlayerName.trim().length === 0) {
            return Alert.alert('Novo jogador', 'Informe o nome do jogador para adicionar.')
        }

        const newPlayer = {
            name: newPlayerName,
            team,
        }

        try {
            await playerAddByGroup(newPlayer, group)
            newPlayerNameInputRef.current?.blur()

            setNewPlayerName('')
            fetchPlayersByTeam()
        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert('Nova pessoa', error.message)
            } else {
                Alert.alert('Nova pessoa', 'Não foi possível adicionar')
            }
        }
    }

    const fetchPlayersByTeam = async () => {
        try {
            const playersByTeam = await playersGetByGroupAndTeam(group, team)
            setPlayers(playersByTeam)


        } catch (error) {
            console.log(error)
            Alert.alert('Pessoas', 'Não foi possível carregar as pessoas do time selecionado')
        }
    }

    const handlePlayerRemove = async (playerName: string) => {
        try {
            await playerRemoveByGroup(playerName, group)
            fetchPlayersByTeam()
        } catch (error) {
            Alert.alert('Remover pessoa', 'Não foi possível remover essa pessoa.')
        }
    }

    const groupRemove = async () => {
        try {
            await groupRemoveByName(group)
            navigation.navigate('groups')
        } catch (error) {
            Alert.alert('Remover grupo', 'Não foi possível remover o grupo')
        }
    }

    const handleGroupRemove = async () => {
        Alert.alert('Remover',
            'Deseja remover o grupo?',
            [
                {
                    text: 'Não', style: 'cancel'
                },
                {
                    text: 'Sim', onPress: () => groupRemove()
                }
            ]
        )
    }

    useEffect(() => {
        fetchPlayersByTeam()
    }, [team])

    return (
        <SafeAreaView style={styles.container}>
            <Header showBackButton={true} />
            <Highlights
                title={group}
                subTitle="Adicione a galera e separe por times" />

            <View style={styles.form}>

                <Input
                    inputRef={newPlayerNameInputRef}
                    value={newPlayerName}
                    onChangeText={setNewPlayerName}
                    placeholder="Nome do participante:"
                    autoCorrect={false}
                    style={{
                        color: 'white',
                        backgroundColor: "#030712",
                        padding: 16,
                        borderRadius: 6,
                        minHeight: 56,
                        maxHeight: 56,
                        width: "88%",
                    }}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType="done"
                />
                <ButtonIcon
                    icon="add"
                    onPress={handleAddPlayer}
                />
            </View>

            <View style={styles.numberFilter}>

                <FlatList
                    data={['Time A', 'Time B']}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <Filter title={item}
                            isActive={item === team}
                            onPress={() => setTeam(item)}
                        />
                    )}
                    horizontal
                />
                <Text style={styles.numberPlayer}>{players.length}</Text>
            </View>
            <FlatList
                data={players}
                keyExtractor={item => item.name}
                renderItem={({ item }) => (

                    <CardPlayers
                        name={item.name}
                        onRemove={() => handlePlayerRemove(item.name)}
                    />
                )}
                contentContainerStyle={[
                    { paddingBottom: 100 },
                    players.length === 0 && { flex: 1 }
                ]}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => <ListEmpty message="Não há pessoas nesse time" />}
            />
            <Button title="Remover turma" type="SECONDARY" onPress={handleGroupRemove} />

        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#202024",
    },
    form: {
        flexDirection: 'row',
        borderRadius: 6,
        backgroundColor: "#030712",
    },
    numberFilter: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',

    },
    numberPlayer: {
        color: '#6b7280',
        fontSize: 14
    }

});