import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Tables from '../../constants/tables';
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
    static async deleteAccount(user){
        const quizAttemptRef = firestore().collection(Tables.QUIZ_ATTEMPT).where("userId", "==", user.uid);
        const progressRef = firestore().collection(Tables.PROGRESS).where("userId", "==",  user.uid);
        const coursesRef = firestore().collection(Tables.COURSES);
        const courseQuery = coursesRef.where('enrollments', 'array-contains',  user.uid);
        
        const batch = firestore().batch();
    
        const quizAttemptSnapshot = await quizAttemptRef.get();
        const progressSnapshot = await progressRef.get();
        const coursesSnapshot = await courseQuery.get();
    
        quizAttemptSnapshot.forEach(documentSnapshot => {
        batch.delete(documentSnapshot.ref);
        });
    
        progressSnapshot.forEach(documentSnapshot => {
        batch.delete(documentSnapshot.ref);
        });
    
        coursesSnapshot.forEach((courseDoc) => {
        const courseRef = coursesRef.doc(courseDoc.id);
        batch.update(courseRef, {
            enrollments: firestore.FieldValue.arrayRemove(user.uid),
        });
        });
        await batch.commit();
        await user.delete();
    }
}