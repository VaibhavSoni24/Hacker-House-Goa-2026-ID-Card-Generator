import React, { forwardRef } from 'react';

const TeamCardPreview = forwardRef(({ teamName, teamPhotos = [] }, ref) => {
  // Ensure we render the correct number of slots based on provided photos, or fallback to 1 empty slot if empty
  const photos = teamPhotos.length > 0 ? teamPhotos : [null];

  return (
    <div className="relative w-[800px] h-[450px] flex items-center justify-center p-5 font-body">
      <div 
        ref={ref}
        className="w-[760px] h-[410px] bg-cream rounded-3xl overflow-hidden flex flex-col relative shadow-2xl border-4 border-forest/20"
        style={{ transformOrigin: 'top left' }}
      >
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #071F14 1px, transparent 1px), linear-gradient(to bottom, #071F14 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        {/* Tech Accents - Corners */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-4 border-l-4 border-forest opacity-30"></div>
        <div className="absolute top-4 right-4 w-6 h-6 border-t-4 border-r-4 border-forest opacity-30"></div>
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-4 border-l-4 border-forest opacity-30"></div>
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-4 border-r-4 border-forest opacity-30"></div>

        {/* Header Background */}
        <div className="h-32 bg-forest flex flex-col items-center justify-center relative shrink-0 z-10 overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 10px 10px, #E3B23C 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
          
          {/* Subtle Tech Lines in Header */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
          
          <p className="font-mono font-bold text-xs text-cream/60 uppercase tracking-[0.3em] mb-1 relative z-10">
            OFFICIAL TEAM SQUAD
          </p>
          <h2 className="font-display font-black text-5xl tracking-tight text-gold relative z-10 text-center uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] truncate max-w-[90%] pb-2">
            {teamName || 'YOUR TEAM'}
          </h2>
        </div>
        
        {/* Arch shape separator - making it sharper for a tech vibe */}
        <div className="h-1 bg-gold w-full shrink-0 z-20 shadow-[0_2px_10px_rgba(227,178,60,0.5)]"></div>
        <div className="h-4 bg-forest-deep w-full shrink-0 z-20"></div>
        
        {/* Body - Photos */}
        <div className="flex-1 bg-cream flex items-center justify-center gap-8 px-10 relative z-0">
          
          {/* Center Crosshair Decoration */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[1px] bg-forest/5"></div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[120%] w-[1px] bg-forest/5"></div>

          {photos.map((photo, index) => {
            // Apply slight rotation for a playful polaroid effect, balanced with the tech aesthetic
            const rotations = ['-rotate-2', 'rotate-3', '-rotate-1'];
            const rotateClass = rotations[index % 3];
            
            // Randomize a small "ID" string for each polaroid
            const photoId = `M${index + 1}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

            return (
              <div 
                key={index}
                className={`w-48 h-56 bg-white p-3 pb-10 rounded-xl shadow-[0_10px_20px_rgba(7,31,20,0.1)] flex flex-col border border-forest/10 transition-transform ${rotateClass} relative z-10`}
              >
                {/* Polaroid Content */}
                <div className="flex-1 rounded-lg overflow-hidden bg-cream-dim relative border border-forest/10">
                  {photo ? (
                    <img src={photo} alt={`Team Member ${index + 1}`} className="w-full h-full object-cover" crossOrigin="anonymous" />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-forest/30 font-bold">
                       <span className="text-2xl mb-1">+</span>
                       <span className="text-xs uppercase tracking-widest">Photo</span>
                    </div>
                  )}
                  {/* Photo Overlay Tech Line */}
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gold/50"></div>
                </div>
                
                {/* Polaroid Label */}
                <div className="absolute bottom-3 left-0 w-full px-4 flex justify-between items-center">
                   <div className="w-4 h-[2px] bg-forest/20"></div>
                   <span className="font-mono font-bold text-[9px] text-forest/60 tracking-widest">{photoId}</span>
                   <div className="w-4 h-[2px] bg-forest/20"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="h-[72px] flex items-center justify-between px-8 bg-forest text-cream shrink-0 relative overflow-hidden">
           {/* Footer Background Effect */}
           <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, #E3B23C 5px, #E3B23C 10px)' }}></div>
           
           <div className="flex items-center gap-4 relative z-10">
             <div className="w-10 h-10 bg-gold text-forest font-display font-black text-lg flex items-center justify-center rounded-lg shadow-inner">
                HH
             </div>
             <div>
               <p className="font-mono font-bold text-[10px] text-gold-soft uppercase tracking-widest leading-none mb-1">Status: Verified</p>
               <p className="font-mono font-bold text-xs text-cream/90 uppercase tracking-widest leading-none">Hacker House Goa 2026</p>
             </div>
           </div>
           
           {/* Fake Barcode Element */}
           <div className="flex flex-col items-end relative z-10">
             <div className="flex gap-[2px] h-6 items-end opacity-80 mix-blend-screen">
                <div className="w-1 h-full bg-gold"></div>
                <div className="w-[2px] h-full bg-gold"></div>
                <div className="w-1 h-5 bg-gold"></div>
                <div className="w-[3px] h-full bg-gold"></div>
                <div className="w-[2px] h-4 bg-gold"></div>
                <div className="w-1 h-full bg-gold"></div>
                <div className="w-[2px] h-full bg-gold"></div>
                <div className="w-[4px] h-5 bg-gold"></div>
                <div className="w-[2px] h-full bg-gold"></div>
                <div className="w-1 h-full bg-gold"></div>
             </div>
             <div className="font-mono font-bold text-[8px] text-gold-soft mt-1 tracking-widest">
               #FRAMEINGOA
             </div>
           </div>
        </div>
      </div>
    </div>
  );
});

TeamCardPreview.displayName = 'TeamCardPreview';
export default TeamCardPreview;
