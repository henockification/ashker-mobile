import { View } from 'react-native';

import { getYoutubeEmbedUrl } from '@/src/utils/url-parsers';

type VideoPlayerProps = {
  title: string;
  url: string;
  aspectRatio?: number;
};

export function VideoPlayer({ title, url, aspectRatio = 16 / 9 }: VideoPlayerProps) {
  if (!url) return null;

  const src = getYoutubeEmbedUrl(url);

  return (
    <View
      style={{
        width: '100%',
        aspectRatio,
        overflow: 'hidden',
      }}
    >
      <iframe
        src={src}
        title={title}
        width="100%"
        sandbox="allow-scripts allow-same-origin allow-presentation"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        loading="lazy"
        style={{
          aspectRatio,
          width: '100%',
          borderRadius: 12,
        }}
      />
    </View>
  );
}
