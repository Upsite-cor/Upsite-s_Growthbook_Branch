import auth from '@react-native-firebase/auth'
export default class Auth {
    static async Login(email, password) {
        try{
            return await auth()
            .signInWithEmailAndPassword(email, password);
        }catch(error){
            console.log(error, "firsg");
            throw error;
        }
    }
    static async Create(email, password, fullName){
        const credential = await auth().createUserWithEmailAndPassword(email,password);
        await credential.user.updateProfile({ displayName: fullName });
    }
    static async Reset(email){
        return await auth().sendPasswordResetEmail(email);
    }
}