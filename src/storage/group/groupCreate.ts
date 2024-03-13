import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION } from "../storageConfig";
import { groupGetAll } from "./groupsGetAll";
import { AppError } from "@utils/appError";

export async function groupCreate(newGroup: string) {
  try {
    const storedGroups = await groupGetAll();

    const groupAlReadyExist = storedGroups.includes(newGroup);

    if (groupAlReadyExist) {
      throw new AppError("Já existe um grupo cadastrado com esse nome.");
    }

    const storage = JSON.stringify([...storedGroups, newGroup]);
    await AsyncStorage.setItem(GROUP_COLLECTION, storage);
  } catch (error) {
    throw error;
  }
}
