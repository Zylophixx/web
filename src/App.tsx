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
        animationFillMode: 'forwards',
        transform: 'translateZ(80px) rotateX(5deg)',
        transformStyle: 'preserve-3d'
      }}
    >
      <div className="text-left transform-gpu" style={{ transformStyle: 'preserve-3d' }}>
        {/* Stars */}
        <div className="flex mb-1" style={{ transform: 'translateZ(10px)' }}>
          {[...Array(badge.rating)].map((_, i) => (
            <Star 
              key={i} 
              size={10} 
              className="fill-white/20 text-white/70 mr-0.5 transform-gpu" 
              style={{ transform: 'translateZ(5px)' }}
            /> 
          ))}
        </div>

        <div className="relative inline-block text-[1.6rem] sm:text-2xl font-bosenAlt uppercase tracking-wide leading-none">
          {/* Actual Word with Shine Animation */}
          <span 
            className="relative z-10 text-white/10 animate-shine transform-gpu"
            style={{ transform: 'translateZ(15px)' }}
          >
            {badge.word}
          </span>
        </div>

        {/* Attribution */}
        <div 
          className="mt-1 text-sm text-white/20 font-light tracking-wide transform-gpu"
          style={{ transform: 'translateZ(8px)' }}
        >
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
      const windowHeight = window.innerHeight;
      const scrollProgress = Math.min(scrollY / windowHeight, 1);
      
      // Background text (Aamir Naqvi) moves up with new section
      if (backgroundTextRef.current) {
        backgroundTextRef.current.style.transform = `translateY(-${scrollY * 0.8}px) translateZ(20px) rotateX(${scrollProgress * 10}deg)`;
      }
      
      // Portrait moves down slowly (opposite to new section)
      if (portraitRef.current) {
        portraitRef.current.style.transform = `translateY(${scrollY * 0.3}px) translateZ(100px) rotateY(-${5 + scrollProgress * 10}deg) rotateX(${scrollProgress * 5}deg)`;
      }
      
      // Main text moves with slight 3D rotation
      if (mainTextRef.current) {
        mainTextRef.current.style.transform = `translateY(-${scrollY * 0.2}px) translateZ(60px) rotateX(${scrollProgress * 8}deg)`;
      }
      
      // Triangle moves with enhanced 3D effect
      if (triangleRef.current) {
        triangleRef.current.style.transform = `translateX(-50%) translateY(-${scrollY * 0.1}px) translateZ(80px) rotateZ(${scrollProgress * 15}deg)`;
      }
      
      // New section slides up from bottom
      if (newSectionRef.current) {
        const translateY = Math.max(-20, 100 - (scrollY * 0.15));
        newSectionRef.current.style.transform = `translateY(${translateY}vh) translateZ(50px) rotateX(${Math.max(0, 15 - scrollProgress * 15)}deg)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative" style={{ transformStyle: 'preserve-3d', perspective: '1200px' }}>
      {/* Main Hero Section */}
      <div 
        ref={heroRef}
        className="relative min-h-screen w-full overflow-hidden bg-transparent transform-gpu"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* External Background Image - Fixed */}
        <div 
          className="fixed inset-0 bg-cover bg-center opacity-100 transform-gpu"
          style={{
            backgroundImage: `url('/bg.png')`,
            backgroundAttachment: 'fixed',
            transform: 'translateZ(0px)',
            zIndex: 0
          }}
        />
       
        {/* Portrait */}
        <div 
          ref={portraitRef}
          className="absolute inset-0 flex items-center justify-center z-10 transition-transform duration-100 ease-out transform-gpu" 
          style={{ 
            top: '-10%',
            transformStyle: 'preserve-3d',
            transform: 'translateZ(100px) rotateY(-5deg)'
          }}
        >
          <div className="relative transform-gpu" style={{ transformStyle: 'preserve-3d' }}> 
            <div 
              className="w-96 h-96 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] overflow-hidden opacity-0 animate-fade-in-delayed transform-gpu"
              style={{ 
                width: '800px',
                height: '800px', 
                animationDelay: '0.3s', 
                animationFillMode: 'forwards',
                transform: 'translateZ(50px) rotateY(-5deg) rotateX(2deg)',
                boxShadow: '0 50px 100px rgba(0,0,0,0.6)',
                transformStyle: 'preserve-3d'
              }}
            > 
              <img 
                src="/me.png"
                alt="Portrait"
                className="w-full h-full object-cover grayscale contrast-110 brightness-90 transform-gpu"
                style={{ 
                  transform: 'scale(1.05) translateZ(10px)',
                  transformStyle: 'preserve-3d'
                }}
              />
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/0 via-transparent to-transparent transform-gpu"
                style={{ transform: 'translateZ(20px)' }}
              />
            </div> 
          </div>
        </div> 

        {/* Background Text - Aamir Naqvi */}
        <div 
          ref={backgroundTextRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-100 ease-out transform-gpu"
          style={{ 
            zIndex: 1, 
            top: '65%',
            transformStyle: 'preserve-3d',
            transform: 'translateZ(20px)'
          }}
        >
          <div 
            className="text-[4rem] md:text-[10rem] lg:text-[15rem] font-bosenAlt text-black/30 select-none leading-none opacity-0 animate-fade-in-delayed transform-gpu"
            style={{
              animationDelay: '0.1s',  
              animationFillMode: 'forwards',
              transform: 'translateZ(30px) rotateX(5deg)',
              textShadow: '0 20px 40px rgba(0,0,0,0.4)',
              transformStyle: 'preserve-3d'
            }}
          >
            AAMIR NAQVI
          </div>
        </div>
        
        {/* Main Typography */}
        <div 
          ref={mainTextRef}
          className="absolute inset-0 flex items-center justify-center transform-gpu"
          style={{ 
            top: '60%',
            transformStyle: 'preserve-3d',
            transform: 'translateZ(60px)'
          }}
        >
          <div className="text-center z-10 px-6 transform-gpu" style={{ transformStyle: 'preserve-3d' }}>
            <div 
              className="text-2xl md:text-4xl lg:text-5xl font-bosenAlt tracking-tight text-white/80 leading-tight opacity-0 animate-fade-in-delayed transform-gpu"
              style={{ 
                animationDelay: '0.8s', 
                animationFillMode: 'forwards',
                transform: 'translateZ(40px) rotateX(3deg)',
                textShadow: '0 25px 50px rgba(0,0,0,0.7)'
              }}
            >
              I EDIT
            </div>
            <div 
              className="text-2xl md:text-3xl lg:text-4xl font-bosenAlt tracking-tight text-white/80 leading-tight mt-2 opacity-0 animate-fade-in-delayed transform-gpu"
              style={{ 
                animationDelay: '1.1s', 
                animationFillMode: 'forwards',
                transform: 'translateZ(35px) rotateX(2deg)',
                textShadow: '0 25px 50px rgba(0,0,0,0.7)'
              }}
            >
              VISUALS THAT
            </div>
            <div 
              className="text-2xl md:text-4xl lg:text-5xl font-bosenAlt tracking-tight text-white leading-tight mt-2 opacity-0 animate-fade-in-delayed transform-gpu"
              style={{ 
                animationDelay: '1.4s', 
                animationFillMode: 'forwards',
                transform: 'translateZ(40px) rotateX(3deg)',
                textShadow: '0 25px 50px rgba(0,0,0,0.7)'
              }}
            >
              BUILD BRANDS
            </div>
          </div>
        </div>

        {/* Floating Testimonial Badges */}
        <div className="fixed inset-0 z-20 pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
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
            transform: 'translateX(-50%) translateZ(80px)',
            filter: 'drop-shadow(0 15px 30px rgba(34, 211, 238, 0.5))',
            transformStyle: 'preserve-3d'
          }}
        >
          <div className="flex flex-col items-center transform-gpu" style={{ transformStyle: 'preserve-3d' }}>
            <div 
              className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-cyan-400 animate-bounce-triangle transform-gpu"
              style={{ 
                transform: 'translateZ(20px) rotateX(10deg)',
                transformStyle: 'preserve-3d'
              }}
            />
          </div>
        </div>
      </div>

      {/* New Section Coming from Bottom */}
      <div 
        ref={newSectionRef}
        className="relative min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-800 transform-gpu"
        style={{ 
          transform: 'translateY(100vh) translateZ(50px) rotateX(15deg)',
          transformStyle: 'preserve-3d',
          zIndex: 40,
          boxShadow: '0 -50px 100px rgba(0,0,0,0.8)'
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center transform-gpu" style={{ transformStyle: 'preserve-3d' }}>
          <div className="text-center px-6 transform-gpu" style={{ transformStyle: 'preserve-3d' }}>
            <h2 
              className="text-4xl md:text-6xl lg:text-7xl font-bosenAlt text-white mb-8 transform-gpu"
              style={{ 
                transform: 'translateZ(60px) rotateX(-5deg)',
                textShadow: '0 20px 40px rgba(0,0,0,0.8)'
              }}
            >
              MY WORK
            </h2>
            <p 
              className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed transform-gpu"
              style={{ 
                transform: 'translateZ(40px) rotateX(-3deg)',
                textShadow: '0 10px 20px rgba(0,0,0,0.6)'
              }}
            >
              Crafting visual narratives that resonate with audiences and elevate brand experiences through innovative editing techniques.
            </p>
            <div 
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto transform-gpu"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {[1, 2, 3].map((item) => (
                <div 
                  key={item}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transform-gpu hover:scale-105 transition-transform duration-300"
                  style={{ 
                    transform: `translateZ(${30 + item * 10}px) rotateY(${item * 2}deg)`,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                  }}
                >
                  <h3 className="text-xl font-bosenAlt text-white mb-4">PROJECT {item}</h3>
                  <p className="text-white/60">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;