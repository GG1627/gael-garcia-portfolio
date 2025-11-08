'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import StaggeredMenu from './components/StaggeredMenu';
import type { StaggeredMenuItem, StaggeredMenuSocialItem } from './components/StaggeredMenu';
import LogoLoop from './components/LogoLoop';
import ScrollStack, { ScrollStackItem } from './components/ScrollStack';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiPython, SiTensorflow, SiPytorch, SiJavascript, SiNodedotjs, SiMongodb, SiPostgresql } from 'react-icons/si';
import { projects } from './data/projects';

interface SpotifyTrack {
  name: string;
  artist: string;
  album: string;
  albumArt?: string;
  externalUrl: string;
}

export default function Home() {
  const [currentFont, setCurrentFont] = useState(0);
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [spotifyTrack, setSpotifyTrack] = useState<{ isPlaying: boolean; track: SpotifyTrack | null } | null>(null);
  const [contributions, setContributions] = useState(0);
  const [musicMinutes, setMusicMinutes] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  const fonts = [
    { name: 'Bebas Neue', cssVar: 'var(--font-bebas)' },
    { name: 'Anton', cssVar: 'var(--font-anton)' },
    { name: 'Righteous', cssVar: 'var(--font-righteous)' },
    { name: 'Black Ops One', cssVar: 'var(--font-blackops)' },
    { name: 'Orbitron', cssVar: 'var(--font-orbitron)' },
    { name: 'Audiowide', cssVar: 'var(--font-audiowide)' },
    { name: 'Racing Sans One', cssVar: 'var(--font-racing)' },
    { name: 'Iceberg', cssVar: 'var(--font-iceberg)' },
  ];

  const menuItems: StaggeredMenuItem[] = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '#home' },
    { label: 'About', ariaLabel: 'Learn about me', link: '#about' },
    { label: 'Experience', ariaLabel: 'Learn about my experience', link: '#experience' },
    { label: 'Projects', ariaLabel: 'View my projects', link: '#projects' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '#contact' }
  ];

  const socialItems: StaggeredMenuSocialItem[] = [
    { label: 'GitHub', link: 'https://github.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' },
    { label: 'Twitter', link: 'https://twitter.com' }
  ];

  const techLogos = [
    { node: <SiPython style={{ color: isLightTheme ? '#2F3061' : '#ffffff' }} />, title: "Python", href: "https://www.python.org" },
    { node: <SiReact style={{ color: isLightTheme ? '#2F3061' : '#ffffff' }} />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs style={{ color: isLightTheme ? '#2F3061' : '#ffffff' }} />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript style={{ color: isLightTheme ? '#2F3061' : '#ffffff' }} />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiJavascript style={{ color: isLightTheme ? '#2F3061' : '#ffffff' }} />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { node: <SiTailwindcss style={{ color: isLightTheme ? '#2F3061' : '#ffffff' }} />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <SiTensorflow style={{ color: isLightTheme ? '#2F3061' : '#ffffff' }} />, title: "TensorFlow", href: "https://www.tensorflow.org" },
    { node: <SiPytorch style={{ color: isLightTheme ? '#2F3061' : '#ffffff' }} />, title: "PyTorch", href: "https://pytorch.org" },
    { node: <SiNodedotjs style={{ color: isLightTheme ? '#2F3061' : '#ffffff' }} />, title: "Node.js", href: "https://nodejs.org" },
    { node: <SiMongodb style={{ color: isLightTheme ? '#2F3061' : '#ffffff' }} />, title: "MongoDB", href: "https://www.mongodb.com" },
    { node: <SiPostgresql style={{ color: isLightTheme ? '#2F3061' : '#ffffff' }} />, title: "PostgreSQL", href: "https://www.postgresql.org" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFont((prev) => (prev + 1) % fonts.length);
    }, 400);

    return () => clearInterval(interval);
  }, [fonts.length]);

  // Set mounted state to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch Spotify data
  useEffect(() => {
    if (!mounted) return;
    
    const fetchSpotifyData = async () => {
      try {
        const response = await fetch('/api/spotify');
        if (response.ok) {
          const data = await response.json();
          setSpotifyTrack(data);
        }
      } catch (error) {
        console.error('Failed to fetch Spotify data:', error);
      }
    };

    fetchSpotifyData();
    // Refresh every 30 seconds
    const interval = setInterval(fetchSpotifyData, 30000);
    return () => clearInterval(interval);
  }, [mounted]);

  // Animate contributions and music minutes counters (synchronized)
  useEffect(() => {
    const targetContributions = 700;
    const targetMusicMinutes = 100000;
    const duration = 2000; // Same duration for both animations
    const steps = 60;
    
    const contributionsIncrement = targetContributions / steps;
    const musicMinutesIncrement = targetMusicMinutes / steps;
    const stepDuration = duration / steps;

    let contributionsCurrent = 0;
    let musicMinutesCurrent = 0;
    
    const timer = setInterval(() => {
      contributionsCurrent += contributionsIncrement;
      musicMinutesCurrent += musicMinutesIncrement;
      
      if (contributionsCurrent >= targetContributions && musicMinutesCurrent >= targetMusicMinutes) {
        setContributions(targetContributions);
        setMusicMinutes(targetMusicMinutes);
        clearInterval(timer);
      } else {
        setContributions(Math.floor(contributionsCurrent));
        setMusicMinutes(Math.floor(musicMinutesCurrent));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  // Scroll listener to change theme based on section
  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about');
      const experienceSection = document.getElementById('experience');
      const projectsSection = document.getElementById('projects');
      
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Check which section we're in
      if (experienceSection && aboutSection && projectsSection) {
        const aboutTop = aboutSection.offsetTop;
        const experienceTop = experienceSection.offsetTop;
        const projectsTop = projectsSection.offsetTop;
        
        // Switch to light theme when entering Experience section
        // Trigger halfway through About section
        const triggerPoint = aboutTop + (experienceTop - aboutTop) * 0.5;
        
        if (scrollY >= triggerPoint && scrollY < projectsTop) {
          setIsLightTheme(true);
        } else {
          setIsLightTheme(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="overflow-x-hidden relative transition-colors duration-500"
      style={{ backgroundColor: isLightTheme ? '#BCCCE0' : '#D64550' }}
      
    >
      <div style={{ height: '100vh', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 40 }}>
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#fff"
          openMenuButtonColor="#fff"
          changeMenuColorOnOpen={true}
          colors={['#1a1a1a', '#2a2a2a']}
          accentColor="#5227FF"
          isFixed={true}
        />
      </div>
      
      <div id="home" className="relative w-full h-screen overflow-hidden">
        <video
          src="/videos/Mclaren.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        
        {/* Dark gradient at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-[#D64550] via-transparent to-transparent pointer-events-none" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <h1
            className="text-[14rem] font-bold tracking-tight"
            style={{
              color: 'white',
              mixBlendMode: 'difference',
              fontFamily: fonts[currentFont].cssVar,
              transition: 'none'
            }}
          >
            Gael Garcia
          </h1>
          <p
            className="text-5xl mt-40 font-bold"
            style={{
              color: 'white',
              // mixBlendMode: 'difference',
              fontFamily: 'var(--font-audiowide)',
              transition: 'none'
            }}
          >
            Aspiring AI/ML Engineer
          </p>
        </div>
      </div>
      
      {/* About Me Section */}
      <section id="about" className="relative min-h-screen py-0 px-16">
        <div className="max-w-7xl mx-auto">
          <h2 
            className={`text-8xl font-bold mb-0 transition-colors duration-500 ${isLightTheme ? 'text-[#2F3061]' : 'text-[#ffffff]'}`}
            style={{
              fontFamily: 'var(--font-bebas)',
              transition: 'color 0.5s ease',
              height: '9rem',
              display: 'flex',
              alignItems: 'center',
              minHeight: '9rem'
            }}
          >
            About Me
          </h2>
          <div className={`h-1 w-full mb-12 transition-all duration-500 ${isLightTheme ? 'bg-gradient-to-r from-transparent via-black to-transparent' : 'bg-gradient-to-r from-transparent via-[#ffffff] to-transparent'}`} />
          
          {/* Profile Card Layout */}
          <div className={`rounded-2xl border transition-all duration-500 p-8 ${isLightTheme ? 'bg-white/80 border-gray-300/50 shadow-3xl' : 'bg-[#321618]/50 border-[#321618] shadow-3xl'}`}>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Left Side - Profile Info */}
              <div className="w-full lg:w-60 flex-shrink-0 flex flex-col items-center lg:items-start">
                {/* Circular Profile Image */}
                <div className="relative w-60 h-60 mb-6">
                  <div className={`absolute inset-0 rounded-full overflow-hidden border-4 transition-all duration-500 ${isLightTheme ? 'border-gray-800 shadow-xl' : 'border-gray-300 shadow-xl'}`}>
                    <Image
                      src="/images/AboutMe.jpeg"
                      alt="Gael Garcia"
                      width={256}
                      height={256}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Stats Section */}
                <div className="space-y-5 w-full">
                  {/* Contributions Counter */}
                  <div className={`text-center lg:text-left transition-colors duration-500 ${isLightTheme ? 'text-gray-700' : 'text-gray-300'}`}>
                    <div className="text-sm font-semibold mb-1">Total Contributions</div>
                    <div className={`text-4xl font-bold transition-colors duration-500 ${isLightTheme ? 'text-black' : 'text-white'}`}>
                      {contributions}+
                    </div>
                  </div>

                  {/* Music Minutes Counter */}
                  <div className={`text-center lg:text-left transition-colors duration-500 ${isLightTheme ? 'text-gray-700' : 'text-gray-300'}`}>
                    <div className="text-sm font-semibold mb-1">Music Listened This Year</div>
                    <div className={`text-4xl font-bold transition-colors duration-500 ${isLightTheme ? 'text-black' : 'text-white'}`}>
                      {musicMinutes.toLocaleString()}+
                    </div>
                    <div className="text-xs mt-1 opacity-75">minutes</div>
                  </div>

                  {/* Cats Counter */}
                  <div className={`text-center lg:text-left transition-colors duration-500 ${isLightTheme ? 'text-gray-700' : 'text-gray-300'}`}>
                    <div className="text-sm font-semibold mb-1">Cats Owned</div>
                    <div className={`text-4xl font-bold transition-colors duration-500 ${isLightTheme ? 'text-black' : 'text-white'}`}>
                      6+
                    </div>
                    <div className="text-xs mt-1 opacity-75">and counting 🐱</div>
                  </div>
                  
                  {/* Currently Listening - Fixed Width Container */}
                  <div className={`w-full transition-colors duration-500 ${isLightTheme ? 'text-gray-700' : 'text-gray-300'}`}>
                    <div className="text-sm font-semibold mb-2">Currently listening to</div>
                    <div className="w-full" style={{ minHeight: '104px' }}>
                      {mounted && spotifyTrack?.track ? (
                        <a
                          href={spotifyTrack.track.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:scale-105 w-full ${
                            isLightTheme 
                              ? 'bg-gray-200 hover:bg-gray-200' 
                              : 'bg-gray-800/50 hover:bg-gray-800'
                          }`}
                          style={{ minHeight: '104px' }}
                        >
                          {spotifyTrack.track.albumArt && (
                            <Image
                              src={spotifyTrack.track.albumArt}
                              alt={spotifyTrack.track.album}
                              width={80}
                              height={80}
                              className="rounded shrink-0"
                              style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                            />
                          )}
                          <div className="flex-1 min-w-0 overflow-hidden" style={{ maxWidth: 'calc(100% - 100px)' }}>
                            <div className={`font-semibold text-sm truncate transition-colors duration-500 ${isLightTheme ? 'text-black' : 'text-white'}`} title={spotifyTrack.track.name}>
                              {spotifyTrack.track.name}
                            </div>
                            <div className="text-xs truncate mt-0.5" title={spotifyTrack.track.artist}>
                              {spotifyTrack.track.artist}
                            </div>
                          </div>
                          {spotifyTrack.isPlaying && (
                            <div className="flex gap-1 shrink-0">
                              <span className="w-1 h-4 bg-green-500 rounded animate-pulse" style={{ animationDelay: '0ms' }} />
                              <span className="w-1 h-4 bg-green-500 rounded animate-pulse" style={{ animationDelay: '150ms' }} />
                              <span className="w-1 h-4 bg-green-500 rounded animate-pulse" style={{ animationDelay: '300ms' }} />
                            </div>
                          )}
                        </a>
                      ) : (
                        <div className={`p-3 rounded-lg transition-colors duration-500 w-full ${isLightTheme ? 'bg-gray-100' : 'bg-gray-800/50'}`} style={{ minHeight: '104px', display: 'flex', alignItems: 'center' }}>
                          <div className={`text-sm transition-colors duration-500 ${isLightTheme ? 'text-gray-500' : 'text-gray-400'}`}>
                            Not playing
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Side - About Text & Model */}
              <div className="flex-1 min-w-0 space-y-6">
                {/* About Text */}
                <div>
                  <h3 className={`text-3xl font-bold mb-4 transition-colors duration-500 ${isLightTheme ? 'text-black' : 'text-white'}`}>
                    Just a chill guy who likes to have fun!
                  </h3>
                  <div className={`text-lg leading-relaxed transition-colors duration-500 space-y-4 ${isLightTheme ? 'text-gray-700' : 'text-gray-300'}`}>
                    <p>
                      Hey, I'm <span className={`font-semibold transition-colors duration-500 ${isLightTheme ? 'text-gray-900' : 'text-white'}`}>Gael</span>. I'm a <span className={`font-medium transition-colors duration-500 ${isLightTheme ? 'text-gray-900' : 'text-white'}`}>3rd-year Computer Engineering</span> student minoring in <span className={`font-medium transition-colors duration-500 ${isLightTheme ? 'text-gray-900' : 'text-white'}`}>Mathematics</span> and starting my combined <span className={`font-medium relative transition-colors duration-500 ${isLightTheme ? 'text-gray-900' : 'text-white'}`}>
                        <span className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${isLightTheme ? 'from-blue-400/40 to-blue-600/40' : 'from-blue-400/30 to-blue-600/30'}`}></span>
                        BS/MS in AI Systems
                      </span> in <span className={`font-medium transition-colors duration-500 ${isLightTheme ? 'text-gray-900' : 'text-white'}`}>Spring 2026</span> (officially Fall 2026 though, UF's still "processing paperwork" or whatever they do <span className="text-xl">😭</span>).
                    </p>
                    <p>
                      I'm currently serving as the <span className={`font-medium relative transition-colors duration-500 ${isLightTheme ? 'text-gray-900' : 'text-white'}`}>
                        <span className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${isLightTheme ? 'from-purple-400/40 to-purple-600/40' : 'from-purple-400/30 to-purple-600/30'}`}></span>
                        Webmaster @ UF EMBS
                      </span>, aka <span className={`italic transition-colors duration-500 ${isLightTheme ? 'text-gray-500' : 'text-gray-400'}`}>the best club on campus</span>.
                    </p>
                    <p>
                      When I'm not coding, I'm at the <span className={`font-medium transition-colors duration-500 ${isLightTheme ? 'text-gray-900' : 'text-white'}`}>gym</span> <span className={`text-sm font-normal transition-colors duration-500 ${isLightTheme ? 'text-gray-500' : 'text-gray-400'}`}>(225 bench btw)</span>, <span className={`font-medium transition-colors duration-500 ${isLightTheme ? 'text-gray-900' : 'text-white'}`}>driving way too fast</span>, playing <span className={`font-medium transition-colors duration-500 ${isLightTheme ? 'text-gray-900' : 'text-white'}`}>pickleball</span>, or just <span className={`italic transition-colors duration-500 ${isLightTheme ? 'text-gray-500' : 'text-gray-400'}`}>vibing</span> to <span className={`font-medium transition-colors duration-500 ${isLightTheme ? 'text-gray-900' : 'text-white'}`}>music</span> or <span className={`font-medium transition-colors duration-500 ${isLightTheme ? 'text-gray-900' : 'text-white'}`}>YouTube</span>.
                    </p>
                  </div>
                </div>
                
                {/* Deep Learning Model Section */}
                <div className={`p-6 rounded-xl border transition-all duration-500 ${isLightTheme ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' : 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700'}`}>
                  <h4 className={`text-2xl font-bold mb-3 transition-colors duration-500 ${isLightTheme ? 'text-gray-900' : 'text-white'}`}>
                    Check out this deep learning model I made
                  </h4>
                  <div className="space-y-3 mb-4">
                    <div className={`text-base transition-colors duration-500 ${isLightTheme ? 'text-gray-700' : 'text-gray-300'}`}>
                      <span className="font-semibold">Model Type:</span> Convolutional Neural Network (CNN)
                    </div>
                    <div className={`text-base transition-colors duration-500 ${isLightTheme ? 'text-gray-700' : 'text-gray-300'}`}>
                      <span className="font-semibold">Task:</span> Image Classification
                    </div>
                    <div className={`text-base transition-colors duration-500 ${isLightTheme ? 'text-gray-700' : 'text-gray-300'}`}>
                      <span className="font-semibold">Dataset:</span> CIFAR-10 (10,000 test images)
                    </div>
                    <div className={`text-base transition-colors duration-500 ${isLightTheme ? 'text-gray-700' : 'text-gray-300'}`}>
                      <span className="font-semibold">Accuracy:</span> <span className="text-green-600 font-bold">87.3%</span>
                    </div>
                    <div className={`text-sm mt-3 p-3 rounded-lg ${isLightTheme ? 'bg-white/60' : 'bg-gray-700/50'}`}>
                      <p className={`transition-colors duration-500 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                        This model classifies images into 10 categories: airplane, automobile, bird, cat, deer, dog, frog, horse, ship, and truck. Built with PyTorch and trained on GPU.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <a
                      href="#"
                      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                        isLightTheme 
                          ? 'bg-green-600 text-white hover:bg-green-700' 
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      View Model
                    </a>
                    <a
                      href="#"
                      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                        isLightTheme 
                          ? 'bg-white text-green-700 border-2 border-green-600 hover:bg-green-50' 
                          : 'bg-gray-800 text-green-400 border-2 border-green-600 hover:bg-gray-700'
                      }`}
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Experience Section */}
      <section id="experience" className="relative min-h-screen mt-10 px-16">
        <div className="max-w-7xl mx-auto">
          <h2 
            className={`text-8xl font-bold mb-0 transition-colors duration-500 ${isLightTheme ? 'text-[#2F3061]' : 'text-white'}`}
            style={{
              fontFamily:  'var(--font-bebas)',
              transition: 'color 0.5s ease',
              height: '9rem',
              display: 'flex',
              alignItems: 'center',
              minHeight: '9rem'
            }}
          >
            Experience
          </h2>
          <div className={`h-1 w-full mb-12 transition-all duration-500 ${isLightTheme ? 'bg-gradient-to-r from-transparent via-[#2F3061] to-transparent' : 'bg-gradient-to-r from-transparent via-[#ffffff] to-transparent'}`} />
          
          <div className="space-y-16">
            <div>
              <h3 className={`text-4xl font-semibold mb-8 transition-colors duration-500 ${isLightTheme ? 'text-black' : 'text-white'}`}>Technologies I Work With</h3>
              <div style={{ height: '120px', position: 'relative', overflow: 'hidden' }}>
                <LogoLoop
                  logos={techLogos}
                  speed={120}
                  direction="left"
                  logoHeight={80}
                  gap={64}
                  pauseOnHover
                  scaleOnHover
                  fadeOut
                  fadeOutColor={isLightTheme ? "#BCCCE0" : "#D64550"}
                  ariaLabel="Technology stack"
                />
              </div>
            </div>
            
            <div>
              <h3 className={`text-4xl font-semibold mb-8 transition-colors duration-500 ${isLightTheme ? 'text-black' : 'text-white'}`}>Experience Timeline</h3>
              {/* <ScrollStack useWindowScroll={true}>
                <ScrollStackItem itemClassName={`bg-gradient-to-br border shadow-xl transition-all duration-500 ${isLightTheme ? 'from-white to-gray-100 border-gray-300' : 'from-gray-900 to-gray-800 border-gray-700'}`}>
                  <h2 className={`text-3xl font-bold mb-4 transition-colors duration-500 ${isLightTheme ? 'text-black' : 'text-white'}`}>Card 1</h2>
                  <p className={`text-xl transition-colors duration-500 ${isLightTheme ? 'text-gray-700' : 'text-gray-300'}`}>This is the first card in the stack</p>
                </ScrollStackItem>
                <ScrollStackItem itemClassName={`bg-gradient-to-br border shadow-xl transition-all duration-500 ${isLightTheme ? 'from-white to-gray-100 border-gray-300' : 'from-gray-900 to-gray-800 border-gray-700'}`}>
                  <h2 className={`text-3xl font-bold mb-4 transition-colors duration-500 ${isLightTheme ? 'text-black' : 'text-white'}`}>Card 2</h2>
                  <p className={`text-xl transition-colors duration-500 ${isLightTheme ? 'text-gray-700' : 'text-gray-300'}`}>This is the second card in the stack</p>
                </ScrollStackItem>
                <ScrollStackItem itemClassName={`bg-gradient-to-br border shadow-xl transition-all duration-500 ${isLightTheme ? 'from-white to-gray-100 border-gray-300' : 'from-gray-900 to-gray-800 border-gray-700'}`}>
                  <h2 className={`text-3xl font-bold mb-4 transition-colors duration-500 ${isLightTheme ? 'text-black' : 'text-white'}`}>Card 3</h2>
                  <p className={`text-xl transition-colors duration-500 ${isLightTheme ? 'text-gray-700' : 'text-gray-300'}`}>This is the third card in the stack</p>
                </ScrollStackItem>
              </ScrollStack> */}
            </div>
          </div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="min-h-screen mt-10 px-16">
        <div className="max-w-7xl mx-auto">
          <h2 
            className={`text-8xl font-bold mb-0 transition-colors duration-500 ${isLightTheme ? 'text-black' : 'text-white'}`}
            style={{
              fontFamily:  'var(--font-bebas)',
              transition: 'color 0.5s ease',
              height: '9rem',
              display: 'flex',
              alignItems: 'center',
              minHeight: '9rem'
            }}
          >
            Projects
          </h2>
          <div className={`h-1 w-full mb-12 transition-all duration-500 ${isLightTheme ? 'bg-gradient-to-r from-transparent via-black to-transparent' : 'bg-gradient-to-r from-transparent via-white to-transparent'}`} />
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {projects.map((project) => (
              <a
                key={project.id}
                href={project.githubUrl || project.liveUrl || project.linkedinUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${
                  isLightTheme 
                    ? 'bg-white border-gray-200 hover:border-gray-300' 
                    : 'bg-gray-900/50 border-gray-800 hover:border-gray-700'
                }`}
              >
                {/* Project Image Placeholder */}
                <div className={`relative w-full h-72 overflow-hidden ${
                  isLightTheme 
                    ? 'bg-gradient-to-br from-gray-100 to-gray-200' 
                    : 'bg-gradient-to-br from-gray-800 to-gray-900'
                }`}>
                  <div className={`absolute inset-0 flex items-center justify-center ${
                    isLightTheme ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <svg className="w-24 h-24 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                
                {/* Project Content */}
                <div className="p-6">
                  <h3 className={`text-2xl font-bold mb-2 transition-colors duration-500 ${
                    isLightTheme ? 'text-gray-900' : 'text-white'
                  }`}>
                    {project.name}
                  </h3>
                  
                  <p className={`text-base mb-4 leading-relaxed transition-colors duration-500 ${
                    isLightTheme ? 'text-gray-600' : 'text-gray-300'
                  }`}>
                    {project.description}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, index) => (
                      <span
                        key={index}
                        className={`text-xs px-3 py-1 rounded-full font-medium transition-all duration-300 ${
                          isLightTheme
                            ? 'bg-gray-100 text-gray-700 group-hover:bg-gray-200'
                            : 'bg-gray-800 text-gray-300 group-hover:bg-gray-700'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Hover Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  isLightTheme
                    ? 'from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10'
                    : 'from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/20 group-hover:to-purple-500/20'
                } transition-all duration-300 pointer-events-none`} />
              </a>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="min-h-screen mt-10 px-16">
        <div className="max-w-7xl mx-auto">
          <h2 
            className={`text-8xl font-bold mb-0 transition-colors duration-500 ${isLightTheme ? 'text-black' : 'text-white'}`}
            style={{
              fontFamily:  'var(--font-bebas)',
              transition: 'color 0.5s ease',
              height: '9rem',
              display: 'flex',
              alignItems: 'center',
              minHeight: '9rem'
            }}
          >
            Contact
          </h2>
          <div className={`h-1 w-full mb-12 transition-all duration-500 ${isLightTheme ? 'bg-gradient-to-r from-transparent via-black to-transparent' : 'bg-gradient-to-r from-transparent via-white to-transparent'}`} />
          
          {/* Placeholder content */}
          <div className={`text-2xl transition-colors duration-500 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
            {/* Add your content here */}
          </div>
        </div>
      </section>
    </div>
  );
}
