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
    static async getAllCourses() {
        var courses = [];
        const collection = await firestore().collection(Tables.COURSES)
            .get();
        collection.forEach(documentSnapshot => {
            courses.push({ ...documentSnapshot.data(), id: documentSnapshot.id });
        });
        return courses;
    }
    static async getCourseById(courseId) {
        var courseSnapshot = await firestore().collection(Tables.COURSES).doc(courseId).get();
        return { ...courseSnapshot.data(), id: courseSnapshot.id };
    }
    static async getProgress(courseId, userId) {
        var progress = await firestore().collection(Tables.PROGRESS).where('courseId', '==', courseId)
            .where('userId', '==', userId)
            .limit(1)
            .get();
        if (progress?.docs?.length > 0) {
            return { ...progress.docs[0].data(), id: progress.docs[0].id }
        }
        return null;
    }

    static async getSyllabus(courseId) {
        var syllabusSnapshot = await firestore()
            .collection(Tables.SYLLABUS)
            .where('courseId', '==', courseId)
            .limit(1)
            .get();
        if (syllabusSnapshot.docs.length > 0) {
            return { ...syllabusSnapshot.docs[0]?.data(), id: syllabusSnapshot.docs[0]?.id };
        }
        return {};
    }

    static async updateEnrollment(courseId, userId) {
        await firestore()
            .collection(Tables.COURSES)
            .doc(courseId)
            .update({
                enrollments: firestore.FieldValue.arrayUnion(userId),
            });
    }

    static async addProgress(courseId, userId, newSyllabus) {
        await firestore()
            .collection(Tables.PROGRESS)
            .add({ courseId: courseId, userId: userId, syllabus: newSyllabus ? newSyllabus : [], status: "in-progress" });
    }

    static async updateProgress(progress) {
        await firestore()
            .collection(Tables.PROGRESS)
            .doc(progress.id)
            .update(progress);
    }

    static async getLectureFile(contentId) {
        var lecture = await firestore().collection(Tables.LECTURES).doc(contentId).get();
        return lecture.exists ? { ...lecture.data(), id: lecture.id } : null;
    }
    
    static async getAllProgress(userId){
        const progress = await firestore()
        .collection(Tables.PROGRESS).where("userId", "==", userId).get();
      return progress.docs.map((item) => {
        return {
          ...item.data(),
          id: item.id
        }
      });
    }
    static async getAllEnrolledCourses(userId){
        const courses = await firestore()
        .collection(Tables.COURSES).where("enrollments", "array-contains", userId).get();
        return courses.docs.map((item) => {
            return {
            ...item.data(),
            id: item.id
            }
        });
    }
}