import storage from '@react-native-firebase/storage';
export class ProfileService{
    static async uploadProfilePic(uri, userId){
        try{
            const storageRef = storage().ref(`/users/${userId}/profile_picture.jpg`);
        await storageRef.putFile(uri);
        const downloadURL = await storageRef.getDownloadURL();
        return downloadURL;
        }
        catch(e){
            throw new Error("An error Occured");
        }
    }
}