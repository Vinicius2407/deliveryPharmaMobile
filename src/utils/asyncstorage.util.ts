import AsyncStorage from "@react-native-async-storage/async-storage";

async function getStorageObject(item: string): Promise<any> {
    try {
      const data = await AsyncStorage.getItem(item)
      return data != null ? JSON.parse(data) : null
    } catch (error: any) {
      console.log(error.message);
      return null
    }
}

async function getStorageString(item: string): Promise<string | null> {
    try {
      const data = await AsyncStorage.getItem(item)
      return data != null ? data : null
    } catch (error: any) {
      console.log(error.message);
      return null
    }
}

async function setStorageObject(item: string, data: object): Promise<any> {
    try {
        const jsonEncode = JSON.stringify(data)
        await AsyncStorage.setItem(item, jsonEncode)
    } catch (error: any) {
      console.log(error.message);
      return null
    }
}

async function setStorageString(item: string, data: string): Promise<any> {
  try {
      await AsyncStorage.setItem(item, data)
  } catch (error: any) {
    console.log(error.message);
    return null
  }
}

async function removeStorageItem(item: string): Promise<void> {
  try {
      await AsyncStorage.removeItem(item)
  } catch (error: any) {
    console.log(error.message);
  }
}

export { getStorageObject, getStorageString, setStorageObject, setStorageString, removeStorageItem }