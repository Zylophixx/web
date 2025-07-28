import React, { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';

interface TestimonialBadge {
  word: string;
  rating: number;
  attribution: string;
  position: { top: string; left: string };
  delay: number;
}

const testimonialBadges: TestimonialBadge[] = [
  { word: "VISIONARY", rating: 5, attribution: "— Forbes", position: { top: "10%", left: "25%" }, delay: 1.2 },
  { word: "MASTERFUL", rating: 5, attribution: "— Design Week", position: { top: "15%", left: "70%" }, delay: 1.8 },
  { word: "BRILLIANT", rating: 5, attribution: "— Creative Review", position: { top: "25%", left: "20%" }, delay: 2.4 },
  { word: "INNOVATIVE", rating: 5, attribution: "— Fast Company", position: { top: "30%", left: "87%" }, delay: 3.0 },
  { word: "ICONIC", rating: 5, attribution: "— Dezeen", position: { top: "50%", left: "20%" }, delay: 2.1 },
  { word: "PROFOUND", rating: 5, attribution: "— AIGA", position: { top: "47%", left: "84%" }, delay: 3.3 },
  { word: "STUNNING", rating: 5, attribution: "— Vogue", position: { top: "12%", left: "10%" }, delay: 2.7 },
  { word: "REVOLUTIONARY", rating: 5, attribution: "— Wired", position: { top: "40%", left: "2%" }, delay: 2.0 },
  { word: "CAPTIVATING", rating: 5, attribution: "— Elle", position: { top: "55%", left: "68%" }, delay: 3.9 },
    { word: "CREATIVE", rating: 5, attribution: "— Inkwellmedia", position: { top: "35%", left: "73%" }, delay: 3.9 }
];

function TestimonialBadge({ badge }: { badge: TestimonialBadge }) {
  return (
    <div 
      className="absolute opacity-0 animate-fade-in-delayed group cursor-default"
      style={{ 
        top: badge.position.top, 
        left: badge.position.left,
        animationDelay: `${badge.delay}s`,
        animationFillMode: 'forwards'
      }}
    >
      <div className="text-left">
        {/* Stars */}
        <div className="flex mb-1">
          {[...Array(badge.rating)].map((_, i) => (
            <Star 
              key={i} 
              size={10} 
              className="fill-white/20 text-white/70 mr-0.5" 
            /> 
          ))}
        </div>

       <div className="relative inline-block text-[1.6rem] sm:text-2xl font-bosenAlt uppercase tracking-wide leading-none">
          {/* Actual Word with Shine Animation */}
          <span className="relative z-10 text-white/10 animate-shine">{badge.word}</span>
        </div>

        {/* Attribution */}
        <div className="mt-1 text-sm text-white/20 font-light tracking-wide">
          {badge.attribution}
        </div>
      </div>
    </div>
  );
}

function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const backgroundTextRef = useRef<HTMLDivElement>(null);
  const newSectionRef = useRef<HTMLDivElement>(null);
  const mainTextRef = useRef<HTMLDivElement>(null);
  const triangleRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const delayedScrollY = scrollY * 0.7; // 0.3s delay effect
      
      // Background text (Aamir Naqvi) moves up with new section
      if (backgroundTextRef.current) {
        backgroundTextRef.current.style.transform = `translateY(-${scrollY * 0.5}px)`;
      }
      
      // Portrait moves down with delay
      if (portraitRef.current) {
        portraitRef.current.style.transform = `translateY(${delayedScrollY * 0.4}px)`;
      }
      
      // Main text moves down with delay
      if (mainTextRef.current) {
        mainTextRef.current.style.transform = `translateY(${delayedScrollY * 0.4}px)`;
      }
      
      // Triangle moves down with delay
      if (triangleRef.current) {
        triangleRef.current.style.transform = `translate(-50%, ${delayedScrollY * 0.4}px)`;
      }
      
      // New section comes up from bottom
      if (newSectionRef.current) {
        const translateY = Math.max(0, 100 - (scrollY * 0.1));
        newSectionRef.current.style.transform = `translateY(${translateY}vh)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="relative">
      {/* Main Hero Section */}
      <div 
        className="relative min-h-screen w-full bg-white transition-transform duration-100 ease-out z-30"
        className="relative min-h-screen w-full overflow-hidden bg-transparent"
      >
        {/* External Background Image */} 
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-100"
          style={{
            backgroundImage: `url('/public/bg.png')`,
            backgroundAttachment: 'fixed'
          }}
        />
       
        {/* Portrait */}
        <div 
          ref={portraitRef}
          className="absolute inset-0 flex items-center justify-center z-10 transition-transform duration-100 ease-out transform-gpu" 
          style={{ top: '-10%' }}
        >
          <div className="relative"> 
            <div 
              className="w-96 h-96 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] overflow-hidden opacity-0 animate-fade-in-delayed transform-gpu"
              style={{ 
                width: '800px',
                height: '800px', 
                animationDelay: '0.3s', 
                animationFillMode: 'forwards',
                transform: 'translateZ(50px) rotateY(-5deg)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.4)'
              }}
            > 
              <img 
                src="/public/me.png"
                alt="Portrait"
                className="w-full h-full object-cover grayscale contrast-110 brightness-90 transform-gpu"
                style={{ transform: 'scale(1.05)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-transparent to-transparent" />
            </div> 
          </div>
        </div> 

        {/* Background Text - Aamir Naqvi at Bottom */}
        <div 
          ref={backgroundTextRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-100 ease-out transform-gpu"
          style={{ zIndex: 1, top: '65%' }}
        >
          <div 
            className="text-[4rem] md:text-[10rem] lg:text-[15rem] font-bosenAlt text-black/30 select-none leading-none opacity-0 animate-fade-in-delayed transform-gpu"
            style={{
              animationDelay: '0.1s',  
              animationFillMode: 'forwards',
              transform: 'translateZ(10px)',
              textShadow: '0 10px 20px rgba(0,0,0,0.2)'
            }}
          >
            AAMIR NAQVI
          </div>
        </div>
        
        {/* Main Typography */}
        <div 
          ref={mainTextRef}
          className="absolute inset-0 flex items-center justify-center transform-gpu"
          style={{ top: '60%' }}
        >
          <div className="text-center z-10 px-6">
            <div 
              className="text-2xl md:text-4xl lg:text-5xl font-bosenAlt tracking-tight text-white/80 leading-tight opacity-0 animate-fade-in-delayed transform-gpu"
              style={{ 
                animationDelay: '0.8s', 
                animationFillMode: 'forwards',
                transform: 'translateZ(40px)',
                textShadow: '0 15px 30px rgba(0,0,0,0.5)'
              }}
            >
              I EDIT
            </div>
            <div 
              className="text-2xl md:text-3xl lg:text-4xl font-bosenAlt tracking-tight text-white/80 leading-tight mt-2 opacity-0 animate-fade-in-delayed transform-gpu"
              style={{ 
                animationDelay: '1.1s', 
                animationFillMode: 'forwards',
                transform: 'translateZ(35px)',
                textShadow: '0 15px 30px rgba(0,0,0,0.5)'
              }}
            >
              VISUALS THAT
            </div>
            <div 
              className="text-2xl md:text-4xl lg:text-5xl font-bosenAlt tracking-tight text-white leading-tight mt-2 opacity-0 animate-fade-in-delayed transform-gpu"
              style={{ 
                animationDelay: '1.4s', 
                animationFillMode: 'forwards',
                transform: 'translateZ(40px)',
                textShadow: '0 15px 30px rgba(0,0,0,0.5)'
              }}
            >
              BUILD BRANDS
            </div>
          </div>
        </div>

        {/* Floating Testimonial Badges */}
        <div className="fixed inset-0 z-20 pointer-events-none">
          {testimonialBadges.map((badge, index) => (
            <TestimonialBadge key={index} badge={badge} />
          ))}
        </div>

        {/* Bottom Triangle Shape */}
        <div 
          ref={triangleRef}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 animate-fade-in-delayed z-30 transform-gpu"
          style={{ 
            animationDelay: '3.5s', 
            animationFillMode: 'forwards',
            transform: 'translateX(-50%) translateZ(60px)',
            filter: 'drop-shadow(0 10px 20px rgba(34, 211, 238, 0.3))'
          }}
        >
          <div className="flex flex-col items-center">
            <div 
              className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-cyan-400 animate-bounce-triangle transform-gpu"
              style={{ transform: 'translateZ(10px)' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;