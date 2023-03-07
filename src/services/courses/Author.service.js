import firestore from '@react-native-firebase/firestore';
import Tables from '../../constants/tables';
export default class AuthorService{
    static async getAuthor(authorId){
        const authorSnapshot = await firestore().collection(Tables.AUTHOR).doc(authorId).get();
        return {...authorSnapshot.data(), id: authorSnapshot.id};
    }
}