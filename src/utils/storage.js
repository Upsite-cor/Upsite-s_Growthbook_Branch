import AsyncStorage from '@react-native-async-storage/async-storage';
export class Storage{
    static async get(key){
        return await AsyncStorage.getItem(key);
    }
    static async set(key, jsonValue){
        await AsyncStorage.setItem(key, jsonValue);
    }
    static async getParsed(key){
        const jsonValue = await this.get(key);
        if(jsonValue!=null){
            return JSON.parse(jsonValue);
        }
        return null;
    }
    static async parseSet(key, value){
        const jsonValue = JSON.stringify(value);
        await this.set(key, jsonValue);
    }
}