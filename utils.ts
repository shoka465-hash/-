export const getYoutubeId = (url: string | undefined): string | null => {
  if (!url) return null;
  
  // 공백 제거
  const cleanUrl = url.trim();
  
  // 유튜브 다양한 URL 패턴 (일반, shorts, live, embed, youtu.be 등)을 처리하는 정규표현식
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/|youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/;
  const match = cleanUrl.match(regex);
  
  if (match && match[1]) {
    return match[1];
  }

  // 만약 사용자가 이미 11자리 ID만 입력했을 경우를 위한 처리
  if (cleanUrl.length === 11 && /^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) {
    return cleanUrl;
  }

  return null;
};

export const getYoutubeThumbnail = (url: string): string | null => {
  const id = getYoutubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : null;
};
