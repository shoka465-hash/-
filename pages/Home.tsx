
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Monitor, Megaphone, Video, PenTool, Tv, LayoutList, PlayCircle, PauseCircle } from 'lucide-react';
import { getSiteSettings } from '../data';
import { SiteSettings } from '../types';
import { getYoutubeId, getYoutubeThumbnail } from '../utils';

// Declare YT as a global type if not already declared in a d.ts file (now removed as YT API is no longer used)
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const Home: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isPlaying, setIsPlaying] = useState(true); // 비디오 자동 재생 시작
  
  const localVideoRef = useRef<HTMLVideoElement>(null); // 로컬 비디오를 위한 ref
  const playerRef = useRef<any | null>(null); // YouTube Player ref

  useEffect(() => {
    setSettings(getSiteSettings());
  }, []);

  const homeVideoYoutubeId = settings?.homeVideoLink ? getYoutubeId(settings.homeVideoLink) : null;
  const youtubeEmbedUrl = homeVideoYoutubeId 
    ? `https://www.youtube.com/embed/${homeVideoYoutubeId}?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=${homeVideoYoutubeId}&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&rel=0&showinfo=0&playerapiid=homeVideoPlayer&origin=${window.location.origin}`
    : '';

  useEffect(() => {
    // 로컬 비디오가 없으면 YouTube Player API 로직 활성화
    if (!settings?.homeVideoFileBase64 && homeVideoYoutubeId) {
      const loadYoutubePlayer = () => {
        if (window.YT && window.YT.Player) {
          playerRef.current = new window.YT.Player('youtube-player', { // Use a specific ID for the iframe
            videoId: homeVideoYoutubeId,
            playerVars: {
              autoplay: 1,
              mute: 1,
              loop: 1,
              playlist: homeVideoYoutubeId,
              controls: 0,
              disablekb: 1,
              fs: 0,
              iv_load_policy: 3,
              modestbranding: 1,
              rel: 0,
              showinfo: 0,
              origin: window.location.origin,
            },
            events: {
              onReady: (event: any) => {
                event.target.mute(); // 항상 음소거
                event.target.playVideo(); // 재생
                setIsPlaying(true);
              },
              onStateChange: (event: any) => {
                if (event.data === window.YT.PlayerState.PLAYING && !isPlaying) {
                  setIsPlaying(true);
                } else if (event.data === window.YT.PlayerState.PAUSED && isPlaying) {
                  setIsPlaying(false);
                }
                if (event.data === window.YT.PlayerState.ENDED) {
                  event.target.playVideo();
                }
              },
            },
          });
        }
      };

      // Load YouTube Iframe API script if not already loaded
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
        window.onYouTubeIframeAPIReady = loadYoutubePlayer;
      } else {
        loadYoutubePlayer();
      }
    } else if (localVideoRef.current && settings?.homeVideoFileBase64) {
      // 로컬 비디오가 있다면 YouTube Player 제거
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      // 로컬 비디오 자동 재생 및 루프 설정
      localVideoRef.current.muted = true;
      localVideoRef.current.loop = true;
      localVideoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false)); // 자동 재생 시도
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [homeVideoYoutubeId, settings?.homeVideoFileBase64]); // homeVideoYoutubeId 및 homeVideoFileBase64 의존성 추가

  const togglePlay = () => {
    if (settings?.homeVideoFileBase64 && localVideoRef.current) {
      if (isPlaying) {
        localVideoRef.current.pause();
      } else {
        localVideoRef.current.play();
      }
      setIsPlaying(prev => !prev);
    } else if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
      setIsPlaying(prev => !prev);
    }
  };


  // Category data for rendering - Changed order
  const categories = [
    { 
      name: 'Web Design', 
      filter: 'Web', 
      imageKey: 'webCategoryImage', 
      icon: <Monitor size={24} strokeWidth={1} /> // 이미지 대신 Monitor 아이콘 사용
    },
    { name: 'Marketing', filter: 'Marketing', imageKey: 'marketingCategoryImage', icon: <Megaphone size={24} strokeWidth={1} /> },
    { name: 'Branding', filter: 'Branding', imageKey: 'brandingCategoryImage', icon: <PenTool size={24} strokeWidth={1} /> },
    { name: 'Video Production', filter: 'Video', imageKey: 'videoCategoryImage', icon: <Tv size={24} strokeWidth={1} /> },
  ];

  const renderBackgroundVideo = () => {
    // 1. 로컬 비디오 우선
    if (settings?.homeVideoFileBase64 && !/Mobi|Android/i.test(navigator.userAgent)) {
      return (
        <>
          <video
            ref={localVideoRef}
            className="w-full h-full object-cover opacity-70 grayscale"
            src={settings.homeVideoFileBase64}
            autoPlay
            loop
            muted
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/80"></div>
        </>
      );
    } 
    // 2. YouTube 비디오 (로컬 비디오가 없는 경우)
    else if (homeVideoYoutubeId && !/Mobi|Android/i.test(navigator.userAgent)) {
      return (
        <>
          <iframe
            id="youtube-player" // Add ID for YouTube Player API
            className="w-full h-full object-cover opacity-70 grayscale"
            src={youtubeEmbedUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Homepage Background Video"
          ></iframe>
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/80"></div>
        </>
      );
    } 
    // 3. 배너 이미지 (모바일이거나 두 비디오 모두 없는 경우)
    else {
      return (
        <>
          <img 
            src={settings?.homeBanner || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069'} 
            alt="Main Banner" 
            className="w-full h-full object-cover opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/80"></div>
        </>
      );
    }
  };

  const showPlayPauseButton = settings?.homeVideoFileBase64 || homeVideoYoutubeId;

  return (
    <div className="min-h-screen">
      {/* Hero Section with Banner Image or Video */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video / Image */}
        <div className="absolute inset-0 z-0">
          {renderBackgroundVideo()}
        </div>

        <div className="z-10 text-center px-6">
          <p className="text-sm tracking-[0.4em] uppercase mb-8 text-gray-500 animate-in fade-in duration-1000">
            {settings?.homeTagline || 'Experience Designer'}
          </p>
          
          <h1 className="text-6xl md:text-9xl font-light serif mb-12 leading-tight tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            KIM GIL SEOP
          </h1>

          <p className="text-lg md:text-xl text-gray-500 mb-12 max-w-2xl mx-auto font-light tracking-wide animate-in fade-in duration-1000 delay-500">
            {settings?.homeMotto || '"노력과 열정 그리고 디자인은 하나다."'}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 animate-in fade-in duration-1000 delay-700">
            <Link to="/portfolio" className="group flex items-center bg-black text-white px-10 py-4 rounded-full hover:bg-gray-800 transition-soft shadow-lg shadow-black/5">
              View Works <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Link>
          </div>
        </div>
        
        {/* 데스크톱 비디오 배경일 때만 재생/일시정지 버튼 표시 */}
        {showPlayPauseButton && !/Mobi|Android/i.test(navigator.userAgent) && (
          <button 
            onClick={togglePlay} 
            className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-soft"
            title={isPlaying ? "Pause Video" : "Play Video"}
          >
            {isPlaying ? <PauseCircle size={24} /> : <PlayCircle size={24} />}
          </button>
        )}

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30 z-10">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* Category Showcase Section */}
      <section className="py-32 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-[10px] uppercase tracking-[0.5em] text-gray-400 mb-4">{settings?.homeCategoryTagline}</p>
            <h2 className="text-4xl md:text-5xl font-light serif">{settings?.homeCategoryTitle || 'Design a memory of one\'s thoughts'}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/portfolio?filter=${category.filter}`}
                className="group block p-6 bg-gray-50 rounded-sm hover:shadow-xl hover:-translate-y-2 transition-soft"
              >
                {/* 기존 원형 이미지 div를 제거하고 아이콘 중심의 디자인으로 변경 */}
                <div className="mb-6 mx-auto w-32 h-32 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors">
                  {React.cloneElement(category.icon, { size: 48, strokeWidth: 1, className: "text-gray-400 group-hover:text-black transition-colors" })}
                </div>
                <h4 className="font-semibold mb-3 text-sm uppercase tracking-widest text-center text-gray-800 group-hover:text-black transition-colors">
                  {category.name}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
