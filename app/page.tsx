'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import StaggeredMenu from './components/StaggeredMenu';
import type { StaggeredMenuItem, StaggeredMenuSocialItem } from './components/StaggeredMenu';
import LogoLoop from './components/LogoLoop';
import ScrollStack, { ScrollStackItem } from './components/ScrollStack';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiPython, SiTensorflow, SiPytorch, SiJavascript, SiNodedotjs, SiMongodb, SiPostgresql } from 'react-icons/si';

export default function Home() {
  const [currentFont, setCurrentFont] = useState(0);
  const [isLightTheme, setIsLightTheme] = useState(false);
  
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
    { node: <SiPython style={{ color: '#14b8a6' }} />, title: "Python", href: "https://www.python.org" },
    { node: <SiReact style={{ color: '#14b8a6' }} />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs style={{ color: '#14b8a6' }} />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript style={{ color: '#14b8a6' }} />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiJavascript style={{ color: '#14b8a6' }} />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { node: <SiTailwindcss style={{ color: '#14b8a6' }} />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <SiTensorflow style={{ color: '#14b8a6' }} />, title: "TensorFlow", href: "https://www.tensorflow.org" },
    { node: <SiPytorch style={{ color: '#14b8a6' }} />, title: "PyTorch", href: "https://pytorch.org" },
    { node: <SiNodedotjs style={{ color: '#14b8a6' }} />, title: "Node.js", href: "https://nodejs.org" },
    { node: <SiMongodb style={{ color: '#14b8a6' }} />, title: "MongoDB", href: "https://www.mongodb.com" },
    { node: <SiPostgresql style={{ color: '#14b8a6' }} />, title: "PostgreSQL", href: "https://www.postgresql.org" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFont((prev) => (prev + 1) % fonts.length);
    }, 400);

    return () => clearInterval(interval);
  }, [fonts.length]);

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
      style={{ backgroundColor: isLightTheme ? '#fffcf5' : '#050505' }}
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
        <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />
        
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
              mixBlendMode: 'difference',
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
            className={`text-8xl font-bold mb-0 transition-colors duration-500 ${isLightTheme ? 'text-black' : 'text-white'}`}
            style={{
              fontFamily: fonts[currentFont].cssVar,
              transition: 'color 0.5s ease',
              height: '8rem',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            About Me
          </h2>
          
          <div className="space-y-00">
            {/* Images stacked in middle */}
            <div className="flex justify-center relative h-[500px]">
              {/* Main centered image */}
              <div className={`absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-1/2 z-20 w-80 h-96 overflow-hidden rounded-3xl ${isLightTheme ? 'shadow-2xl shadow-gray-200' : 'shadow-2xl shadow-black/50'}`}>
                <Image
                  src="/images/AboutMe.jpeg"
                  alt="Gael Garcia"
                  width={400}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Left image - tilted left */}
              <div className={`absolute top-[52%] left-1/2 -translate-x-[125%] -translate-y-1/2 -rotate-12 z-10 w-72 h-88 overflow-hidden rounded-3xl ${isLightTheme ? 'shadow-xl shadow-gray-200' : 'shadow-xl shadow-black/50'}`}>
                <Image
                  src="/images/AboutMe2.jpeg"
                  alt="Gael Garcia"
                  width={400}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Right image - tilted right */}
              <div className={`absolute top-[52%] right-1/2 translate-x-[125%] -translate-y-1/2 rotate-12 z-10 w-72 h-88 overflow-hidden rounded-3xl ${isLightTheme ? 'shadow-xl shadow-gray-200' : 'shadow-xl shadow-black/50'}`}>
                <Image
                  src="/images/AboutMe3.jpeg"
                  alt="Gael Garcia"
                  width={400}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Text content below */}
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="space-y-8">
                <p className={`text-3xl text-center transition-colors duration-500 ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                  Just a chill guy who likes to have fun!
                </p>
              </div>
              
              {/* ML Projects Space - Coming soon placeholder */}
              <div className={`p-8 rounded-2xl border transition-all duration-500 ${isLightTheme ? 'bg-white/50 border-gray-200/50' : 'bg-gray-800/30 border-gray-700/50'}`}>
                <p className={`text-lg text-center transition-colors duration-500 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                  Check out this model I made to predict...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Experience Section */}
      <section id="experience" className="relative min-h-screen py-0 px-16">
        <div className="max-w-7xl mx-auto">
          <h2 
            className={`text-8xl font-bold mb-16 transition-colors duration-500 ${isLightTheme ? 'text-black' : 'text-white'}`}
            style={{
              fontFamily: fonts[currentFont].cssVar,
              transition: 'color 0.5s ease',
              height: '8rem',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            Experience
          </h2>
          
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
                  fadeOutColor={isLightTheme ? "#ffffff" : "#000000"}
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
      <section id="projects" className="min-h-screen py-32 px-16">
        <div className="max-w-7xl mx-auto">
          <h2 
            className={`text-8xl font-bold mb-16 transition-colors duration-500 ${isLightTheme ? 'text-black' : 'text-white'}`}
            style={{
              fontFamily: fonts[currentFont].cssVar,
              transition: 'color 0.5s ease',
              height: '8rem',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            Projects
          </h2>
          
          {/* Placeholder content */}
          <div className={`text-2xl transition-colors duration-500 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
            {/* Add your content here */}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-32 px-16">
        <div className="max-w-7xl mx-auto">
          <h2 
            className={`text-8xl font-bold mb-16 transition-colors duration-500 ${isLightTheme ? 'text-black' : 'text-white'}`}
            style={{
              fontFamily: fonts[currentFont].cssVar,
              transition: 'color 0.5s ease',
              height: '8rem',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            Contact
          </h2>
          
          {/* Placeholder content */}
          <div className={`text-2xl transition-colors duration-500 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
            {/* Add your content here */}
          </div>
        </div>
      </section>
    </div>
  );
}
