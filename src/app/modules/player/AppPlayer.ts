import TrackPlayer, {Capability, Track} from 'react-native-track-player';

class AppPlayer {
  static selectedTrack: Track | null;

  static initializePlayer(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await TrackPlayer.updateOptions({
          stopWithApp: true,
          capabilities: [
            Capability.SkipToPrevious,
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SeekTo,
          ],
          compactCapabilities: [
            Capability.SkipToPrevious,
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SeekTo,
          ],
        });
        await TrackPlayer.setupPlayer();
        resolve();
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  }

  static secondsToHHMMSS = (seconds: number | string) => {
    // credits - https://stackoverflow.com/a/37096512
    seconds = Number(seconds);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor((seconds % 3600) % 60);

    const hrs = h > 0 ? (h < 10 ? `0${h}:` : `${h}:`) : '';
    const mins = m > 0 ? (m < 10 ? `0${m}:` : `${m}:`) : '00:';
    const scnds = s > 0 ? (s < 10 ? `0${s}` : s) : '00';
    return `${hrs}${mins}${scnds}`;
  };
}

export default AppPlayer;
