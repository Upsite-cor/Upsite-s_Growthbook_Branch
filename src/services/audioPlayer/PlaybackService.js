// import TrackPlayer, {Event, State} from 'react-native-track-player';
// import {store} from '../../app/store';
// let wasPausedByDuck = false;
// import firestore from '@react-native-firebase/firestore';

export async function PlaybackService() {}
//   // TrackPlayer.addEventListener(Event.RemotePause, () => {
//   //   console.log('Event.RemotePause');
//   //   TrackPlayer.pause();
//   // });

//   // TrackPlayer.addEventListener(Event.RemotePlay, () => {
//   //   console.log('Event.RemotePlay');
//   //   TrackPlayer.play();
//   // });

//   // TrackPlayer.addEventListener(Event.RemoteNext, () => {
//   //   console.log('Event.RemoteNext');
//   //   TrackPlayer.skipToNext();
//   // });

//   // TrackPlayer.addEventListener(Event.RemotePrevious, () => {
//   //   console.log('Event.RemotePrevious');
//   //   TrackPlayer.skipToPrevious();
//   // });

//   // TrackPlayer.addEventListener(Event.RemoteJumpForward, async (event) => {
//   //   console.log('Event.RemoteJumpForward', event);
//   //   const position = (await TrackPlayer.getPosition()) + event.interval;
//   //   TrackPlayer.seekTo(position);
//   // });

//   // TrackPlayer.addEventListener(Event.RemoteJumpBackward, async (event) => {
//   //   console.log('Event.RemoteJumpBackward', event);
//   //   const position = (await TrackPlayer.getPosition()) - event.interval;
//   //   TrackPlayer.seekTo(position);
//   // });

//   // TrackPlayer.addEventListener(Event.RemoteSeek, (event) => {
//   //   console.log('Event.RemoteSeek', event);
//   //   TrackPlayer.seekTo(event.position);
//   // });

//   // TrackPlayer.addEventListener(
//   //   Event.RemoteDuck,
//   //   async ({ permanent, paused }) => {
//   //     console.log('Event.RemoteDuck');
//   //     if (permanent) {
//   //       TrackPlayer.pause();
//   //       return;
//   //     }
//   //     if (paused) {
//   //       const playerState = await TrackPlayer.getState();
//   //       wasPausedByDuck = playerState !== State.Paused;
//   //       TrackPlayer.pause();
//   //     } else {
//   //       if (wasPausedByDuck) {
//   //         TrackPlayer.play();
//   //         wasPausedByDuck = false;
//   //       }
//   //     }
//   //   }
//   // );

//   // TrackPlayer.addEventListener(Event.PlaybackQueueEnded, (event) => {
//   //   console.log('Event.PlaybackQueueEnded', event);
//   // });

//   // TrackPlayer.addEventListener(Event.PlaybackTrackChanged, (event) => {
//   //   console.log('Event.PlaybackTrackChanged', event);
//   // });
//   let running = false;
//   const emptyQueue = () => {
//     isRunning = true;
//     fetchProgress(
//       store.getState().course.courseId,
//       store.getState().auth.userId,
//     )
//       .then(res => {
//         let progress = res.docs[0].data();
//         console.log(progress);
//       })
//       .catch()
//       .finally(() => {});
//   };

//   const fetchProgress = async (courseId, userId) => {
//     return await firestore()
//       .collection('progress')
//       .where('courseId', '==', courseId)
//       .where('userId', '==', userId)
//       .limit(1)
//       .get();
//   };

//   var progressQueue = [];
//   TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, event => {
//     TrackPlayer.getCurrentTrack().then(index => {
//       TrackPlayer.getTrack(index).then(track => {
//         if (!track?.isCompleted) {
//           var remaining_seconds = event.duration - event.position;
//           if (!progressQueue.includes(track?.id) && remaining_seconds < 10) {
//             progressQueue.push(track?.id);
//           }
//         }
//       });
//     });
//   });
// }
