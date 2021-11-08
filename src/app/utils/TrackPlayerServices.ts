import {ToastAndroid} from 'react-native';
import TrackPlayer, {Event} from 'react-native-track-player';

module.exports = async () => {
  TrackPlayer.addEventListener(Event.RemotePrevious, () =>
    TrackPlayer.skipToPrevious().catch(() =>
      ToastAndroid.show('There is no left songs', ToastAndroid.SHORT),
    ),
  );
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
  TrackPlayer.addEventListener(Event.RemoteNext, () =>
    TrackPlayer.skipToNext().catch(() =>
      ToastAndroid.show('There is no left songs', ToastAndroid.SHORT),
    ),
  );
  TrackPlayer.addEventListener(
    Event.RemoteSeek,
    (evt: {[key: string]: number}) => TrackPlayer.seekTo(evt.position),
  );
};
