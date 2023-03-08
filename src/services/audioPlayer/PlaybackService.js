import TrackPlayer, {Event, State} from 'react-native-track-player';
import {store} from '../../redux/stores/store';
let wasPausedByDuck = false;
import firestore from '@react-native-firebase/firestore';
import { isContentCompleted, markContentCompleted } from '../courses/progressService';

export async function PlaybackService() {
//     TrackPlayer.addEventListener(Event.RemotePause, () => {
//       console.log('Event.RemotePause');
//       TrackPlayer.pause();
//     });

//     TrackPlayer.addEventListener(Event.RemotePlay, () => {
//       console.log('Event.RemotePlay');
//       TrackPlayer.play();
//     });

//     TrackPlayer.addEventListener(Event.RemoteNext, () => {
//       console.log('Event.RemoteNext');
//       TrackPlayer.skipToNext();
//     });

//     TrackPlayer.addEventListener(Event.RemotePrevious, () => {
//       console.log('Event.RemotePrevious');
//       TrackPlayer.skipToPrevious();
//     });

//     TrackPlayer.addEventListener(Event.RemoteJumpForward, async (event) => {
//       console.log('Event.RemoteJumpForward', event);
//       const position = (await TrackPlayer.getPosition()) + event.interval;
//       TrackPlayer.seekTo(position);
//     });

//     TrackPlayer.addEventListener(Event.RemoteJumpBackward, async (event) => {
//       console.log('Event.RemoteJumpBackward', event);
//       const position = (await TrackPlayer.getPosition()) - event.interval;
//       TrackPlayer.seekTo(position);
//     });

//     TrackPlayer.addEventListener(Event.RemoteSeek, (event) => {
//       console.log('Event.RemoteSeek', event);
//       TrackPlayer.seekTo(event.position);
//     });

//     TrackPlayer.addEventListener(
//       Event.RemoteDuck,
//       async ({ permanent, paused }) => {
//         console.log('Event.RemoteDuck');
//         if (permanent) {
//           TrackPlayer.pause();
//           return;
//         }
//         if (paused) {
//           const playerState = await TrackPlayer.getState();
//           wasPausedByDuck = playerState !== State.Paused;
//           TrackPlayer.pause();
//         } else {
//           if (wasPausedByDuck) {
//             TrackPlayer.play();
//             wasPausedByDuck = false;
//           }
//         }
//       }
//     );

//     TrackPlayer.addEventListener(Event.PlaybackQueueEnded, (event) => {
//       console.log('Event.PlaybackQueueEnded', event);
//     });

//   TrackPlayer.addEventListener(Event.PlaybackTrackChanged, (event) => {
//     console.log('Event.PlaybackTrackChanged', event);
//   });

//   let mutex = Promise.resolve();
//   var queue = [];

// function withLock(fn) {
//   mutex = mutex.then(fn);
// }
// const fetchProgress = async (courseId, userId) => {
//     const progress= await firestore().collection('progress').where('courseId','==',courseId)
//     .where('userId','==', userId)
//     .limit(1)
//     .get();
//     const id = progress.docs[0].id;
//     return {...progress.docs[0].data(), id: id};
//   };
//   const updateProgress = async (progress) =>{
//     await firestore()
//   .collection('progress')
//   .doc(progress.id)
//   .update(progress);
//   }
// const markasCompleted = async (index,track, courseId, contentId, userId) =>{
//     var progress = await fetchProgress(courseId, userId);
//     if(!isContentCompleted(contentId, progress)){
//         const updatedProgress=  markContentCompleted(contentId, progress);
//         await updateProgress(updatedProgress);
//         let updatedTrack = {
//             ...track,
//             isCompleted: true
//         }
//         console.log(index);
//         TrackPlayer.updateMetadataForTrack(index, updatedTrack);
//       }   
//     queue= [...queue.filter(x=> !(x.courseId==courseId && x.contentId == contentId))];
// }


//     // TrackPlayer.addEventListener(Event.PlaybackTrackChanged, event =>{
//     //     withLock(async ()=>{
//     //         TrackPlayer.getCurrentTrack().then(res=>{
//     //             if(res!=null){
//     //                 TrackPlayer.getTrack(res).then(track=>{
//     //                     if(!track.isCompleted){
//     //                         console.log("fired");
//     //                     }
//     //                 })
//     //             }
//     //         })
//     //     })
//     // });
//   TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, event => {
//     var remaining_seconds = event.duration - event.position;
//     if (remaining_seconds < 10) {
//       TrackPlayer.getCurrentTrack().then(index => {
//         TrackPlayer.getTrack(index).then(track => {
//           if (!track?.isCompleted) {
//             if(queue.findIndex(x=> x.courseId ==store.getState().course.courseId && x.contentId== track?.contentId)){
//                 queue.push({courseId: store.getState().course.courseId, contentId: track?.contentId});
//                 withLock(async ()=>{
//                     await markasCompleted(index,track, store.getState().course.courseId, track?.contentId,store.getState().auth.userId)
//                 })
//             }
//           }
//         });
//       });
//     }
//   });
}
