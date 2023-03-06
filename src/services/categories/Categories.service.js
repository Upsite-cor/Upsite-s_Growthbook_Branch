import firestore from '@react-native-firebase/firestore';
import Tables from '../../constants/tables';
export default class CategoriesService {
    static async getAll() {
        var categories = [];
        const collection = await firestore()
            .collection(Tables.CATEGORIES)
            .limit(5)
            .get();
        collection.forEach(documentSnapshot => {
            categories.push({ ...documentSnapshot.data(), id: documentSnapshot.id });
        });
        return categories;
    }
}