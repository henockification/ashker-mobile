export const extractYoutubeVideoId = (url: string): string => {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes('youtu.be')) {
      return parsed.pathname.replace('/', '');
    }

    const v = parsed.searchParams.get('v');
    if (v) {
      return v;
    }

    const embedMatch = /\/embed\/([^/?]+)/.exec(parsed.pathname);
    if (embedMatch?.[1]) {
      return embedMatch[1];
    }
  } catch {
    // fall through
  }

  return url;
};

export const getYoutubeEmbedUrl = (url: string): string => {
  const videoId = extractYoutubeVideoId(url);
  return `https://www.youtube.com/embed/${videoId}`;
};
