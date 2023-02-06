import TrackPlayer, {RepeatMode} from 'react-native-track-player';
import firestore from '@react-native-firebase/firestore';

export const QueueInitialTracksService = async syllabus => {
  const getAudioFiles = file => {
    let audioLessons = [];
    file?.syllabus.forEach(syllabus => {
      syllabus.child.forEach(child => {
        if (child.type === 'audio') {
          audioLessons.push({
            ...child,
            album: syllabus.title,
          });
        }
      });
    });
    return audioLessons;
  };

  const fetchAudioBooks = async documentIds => {
    try {
      return firestore()
        .collection('audiobooks')
        .where(firestore.FieldPath.documentId(), 'in', documentIds)
        .get();
    } catch (e) {
      console.error(e);
    }
  };

  const mapCourseIds = audioLessons => {
    return audioLessons.map(item => item.contentId);
  };

  const mapAudioBooks = rawData => {
    return rawData.docs.map(item => {
      return {...item.data(), id: item.id};
    });
  };

  let audioLessons = getAudioFiles(syllabus);
  if (audioLessons.length > 0) {
    const rawAudioBooks = await fetchAudioBooks(mapCourseIds(audioLessons));
    const audioBooks = mapAudioBooks(rawAudioBooks);
    TrackPlayer.reset();
    audioBooks.forEach(async item => {
      let lesson = audioLessons.find(x => x.contentId === item.id);
      if (lesson) {
        await TrackPlayer.add({
          ...item,
          id: lesson.id,
          url: item.file,
          title: lesson.title,
          artist: item.artist ?? '',
          album: lesson.album,
          isCompleted: lesson.isCompleted,
          contentId: lesson.contentId,
          artwork: item.coverArt,
        });
      }
    });

    await TrackPlayer.setRepeatMode(RepeatMode.Queue);
  }else{
    TrackPlayer.reset();
  }
};
