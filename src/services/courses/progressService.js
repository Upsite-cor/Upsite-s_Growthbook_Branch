export function markContentCompleted(contentId, course) {
    course.syllabus.forEach((chapter) => {
      chapter.child.forEach((section) => {
        if (section.contentId === contentId) {
          section.isCompleted = true;
        }
      });
      if (chapter.child.every((section) => section.isCompleted)) {
        chapter.isCompleted = true;
      }
    });
    if (course.syllabus.every((chapter) => chapter.isCompleted)) {
      course.status = "completed";
    }
    return course;
  }

export function isContentCompleted(contentId, course) {
  let contentCompleted = false;
  course.syllabus.forEach((chapter) => {
    chapter.child.forEach((section) => {
      if (section.contentId === contentId) {
        contentCompleted = section.isCompleted;
      }
    });
  });
  return contentCompleted;
}