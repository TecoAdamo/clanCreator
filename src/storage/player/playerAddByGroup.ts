import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/appError";

import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { playersGetByGroup } from "./playersGetByGroups";
import { PlayerStorageDTO } from "./PlayerStorageDTO";

export async function playerAddByGroup(
  newPlayer: PlayerStorageDTO,
  group: string
) {
  try {
    const storedPlayers = await playersGetByGroup(group);

    const playerAlReadyExist = storedPlayers.filter(
      (player) => player.name === newPlayer.name
    );

    if (playerAlReadyExist.length > 0) {
      throw new AppError("Essa pessoa já está em um time.");
    }

    const storage = JSON.stringify([...storedPlayers, newPlayer]);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
  } catch (error) {
    throw error;
  }
}
