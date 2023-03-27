import Tables from "../../constants/tables";
import firestore from '@react-native-firebase/firestore';
import { compareArrays, compareValues, generateId } from "../../utils";

export class QuizService {
  static async getQuiz(quizId) {
    try {
      const quizSnapshot = await firestore()
        .collection(Tables.QUIZZES)
        .doc(quizId)
        .get();
      return { ...quizSnapshot.data(), id: quizSnapshot.id };
    } catch (error) {
      return null;
    }
  }
  static async fetchAttempts(courseId, userId) {
    var attempts = [];
    const attemptsSnapshot = await firestore()
      .collection(Tables.QUIZ_ATTEMPT)
      .where('courseId', '==', courseId)
      .where('userId', '==', userId)
      .get();
    attemptsSnapshot.docs.forEach(qualifyingAttempts => {
      attempts.push({ ...qualifyingAttempts.data(), id: qualifyingAttempts.id });
    });
    return attempts;
  }

  static async addQuizAttempt(attempt){
    return await firestore()
    .collection(Tables.QUIZ_ATTEMPT)
    .add(attempt);
  }

  static async updateAttempt(attempt){
    await firestore()
    .collection(Tables.QUIZ_ATTEMPT)
    .doc(attempt?.id)
    .update({
      ...attempt,
    });
  }

  static async evaluateAttempt(attempt, quiz){
    attempt.status = 'completed';
    if (attempt && attempt.answers && attempt.answers.length !== 0) {
      attempt.answers = quiz?.questions?.map(question => {
        var answer = attempt?.answers?.find(x => x.questionId == question?.id);
        if (!answer) {
          return {
            id: generateId(),
            questionId: question.id,
            obtainedMark: 0,
            answer: {
              givenAnswer: '',
              givenAnswers: [],
            },
          };
        }

        if (question?.type == 'single') {
          return {
            ...answer,
            obtainedMark: compareValues(
              answer?.answer?.givenAnswer,
              question?.answer?.value,
              question?.answer?.operation,
            )
              ? question?.marks
              : 0,
          };
        } else {
          return {
            ...answer,
            obtainedMark: compareArrays(
              answer?.answer?.givenAnswers,
              question?.answer?.correctOptions,
            )
              ? question?.marks
              : 0,
          };
        }
      });
      attempt.obtainedMarks = attempt?.answers?.reduce(
        (acc, current) => acc + current?.obtainedMark,
        0,
      );
    } else {
      attempt.answers = quiz.questions.map(question => ({
        id: generateId(),
        questionId: question.id,
        obtainedMark: 0,
        answer: {
          givenAnswer: '',
          givenAnswers: [],
        },
      }));
      attempt.obtainedMarks = 0;
    }
    await this.updateAttempt(attempt);
    return attempt;
  };
}