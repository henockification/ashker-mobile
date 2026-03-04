import { View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

import { extractYoutubeVideoId } from '@/src/utils/url-parsers';

type VideoPlayerProps = {
  title?: string;
  url: string;
  aspectRatio?: number;
};

export function VideoPlayer({ url, aspectRatio = 16 / 9 }: VideoPlayerProps) {
  if (!url) return null;

  const videoId = extractYoutubeVideoId(url);

  return (
    <View className="w-full bg-black rounded-xl overflow-hidden">
      <View style={{ aspectRatio }}>
        <YoutubePlayer
          height="100%"
          videoId={videoId}
          play={false}
          webViewProps={{
            allowsFullscreenVideo: true,
          }}
        />
      </View>
    </View>
  );
}
