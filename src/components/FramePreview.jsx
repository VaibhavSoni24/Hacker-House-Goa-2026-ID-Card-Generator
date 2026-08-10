import React, { forwardRef } from 'react';

const FramePreview = forwardRef(({ photoUrl }, ref) => {
  return (
    <div 
      ref={ref}
      className="relative w-[500px] h-[500px] bg-[#071f14] overflow-hidden font-body flex items-center justify-center"
      style={{
        background: 'radial-gradient(circle at 50% 42%, #164027 10%, #071f14 75%)'
      }}
    >
      {/* Photo Area */}
      <div className="absolute top-[44.5%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full overflow-hidden bg-[#0c2c1c] z-10 flex items-center justify-center">
        {photoUrl ? (
          <img src={photoUrl} alt="PFP" className="w-full h-full object-cover" crossOrigin="anonymous" />
        ) : (
          <span className="text-cream/35 font-semibold text-lg">Upload a photo</span>
        )}
      </div>

      {/* SVG Overlay for Rings and Arc Text */}
      <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none" viewBox="0 0 500 500">
        <defs>
          <path id="textPath" d="M 125,222.5 A 125,125 0 0,1 375,222.5" />
        </defs>

        {/* Thick Gold Ring */}
        <circle cx="250" cy="222.5" r="158" fill="none" stroke="#E3B23C" strokeWidth="5" />
        
        {/* Dotted Cream Ring */}
        <circle cx="250" cy="222.5" r="169" fill="none" stroke="#F6EFDC" strokeWidth="3" strokeDasharray="2 8" strokeLinecap="round" />

        {/* Outer Thin Gold Ring */}
        <circle cx="250" cy="222.5" r="179" fill="none" stroke="rgba(227,178,60,0.5)" strokeWidth="1" />

        {/* Arc Text */}
        <text className="font-body font-bold text-[15px] fill-gold-soft tracking-[4px]">
          <textPath href="#textPath" startOffset="50%" textAnchor="middle">
            HACKER HOUSE · GOA
          </textPath>
        </text>
      </svg>

      {/* Bottom Ribbon */}
      <div className="absolute top-[355px] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
        <div className="relative flex items-center justify-center w-[200px] h-[44px] bg-coral rounded-lg shadow-lg">
           <h2 className="font-display font-black text-[#FBF3E4] text-xl mt-1">HH GOA '26</h2>
           {/* Ribbon Tails */}
           <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-0 h-0 border-y-[18px] border-y-transparent border-r-[14px] border-r-coral -z-10"></div>
           <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-0 h-0 border-y-[18px] border-y-transparent border-l-[14px] border-l-coral -z-10"></div>
        </div>
        
        {/* Date Microcopy */}
        <p className="font-mono font-bold text-[11px] text-cream/55 mt-4 tracking-widest">
          28—31 OCT 2026
        </p>
      </div>
    </div>
  );
});

FramePreview.displayName = 'FramePreview';
export default FramePreview;
