import firestore from '@react-native-firebase/firestore';
import Tables from '../../constants/tables';
export default class CourseService {
    static async getLatestCourses() {
        var courses = [];
        const collection = await firestore().collection(Tables.COURSES)
        .limit(5)
        .get();
        collection.forEach(documentSnapshot => {
            courses.push({ ...documentSnapshot.data(), id: documentSnapshot.id });
        });
        return courses;
    }
}