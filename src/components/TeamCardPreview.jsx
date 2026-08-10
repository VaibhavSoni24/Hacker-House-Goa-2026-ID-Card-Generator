import React, { forwardRef } from 'react';

const TeamCardPreview = forwardRef(({ teamName, teamPhotos = [] }, ref) => {
  // Ensure we render the correct number of slots based on provided photos, or fallback to 1 empty slot if empty
  const photos = teamPhotos.length > 0 ? teamPhotos : [null];

  return (
    <div className="relative w-[800px] h-[450px] flex items-center justify-center p-5 font-body">
      <div 
        ref={ref}
        className="w-[760px] h-[410px] bg-cream rounded-3xl overflow-hidden flex flex-col relative shadow-2xl border-4 border-forest/10"
        style={{ transformOrigin: 'top left' }}
      >
        {/* Header Background */}
        <div className="h-32 bg-forest flex items-start justify-center pt-8 relative shrink-0">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 10px 10px, #E3B23C 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
          <h2 className="font-display font-black text-5xl tracking-tight text-gold relative z-10 text-center uppercase drop-shadow-md pb-2 truncate max-w-[90%]">
            {teamName || 'YOUR TEAM SQUAD'}
          </h2>
        </div>
        
        {/* Arch shape separator */}
        <div className="h-8 bg-forest rounded-b-[100%] w-[120%] -ml-[10%] shrink-0 -mt-2 z-10 shadow-sm"></div>
        
        {/* Body - Photos */}
        <div className="flex-1 bg-cream flex items-center justify-center gap-8 px-10 relative z-0">
          {photos.map((photo, index) => {
            // Apply slight rotation for a playful polaroid effect
            const rotations = ['-rotate-3', 'rotate-2', '-rotate-1'];
            const rotateClass = rotations[index % 3];

            return (
              <div 
                key={index}
                className={`w-48 h-56 bg-white p-3 pb-8 rounded-xl shadow-xl flex flex-col border border-forest/10 transition-transform ${rotateClass}`}
              >
                <div className="flex-1 rounded-lg overflow-hidden bg-[#e7ddc0] relative border border-forest/5">
                  {photo ? (
                    <img src={photo} alt={`Team Member ${index + 1}`} className="w-full h-full object-cover" crossOrigin="anonymous" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-forest/30 font-bold text-sm text-center px-4 leading-tight">
                      Photo {index + 1}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="h-16 flex items-center justify-between px-8 bg-cream-dim/50 border-t border-forest/5 shrink-0">
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-gold text-forest font-display font-black text-sm flex items-center justify-center rounded-lg -rotate-6">
                HH
             </div>
             <span className="font-mono font-bold text-[10px] text-forest/70 uppercase tracking-widest mt-1">Hacker House Goa 2026</span>
           </div>
           
           <div className="font-mono font-bold text-xs text-forest/60 bg-forest/5 px-4 py-1.5 rounded-full uppercase tracking-widest border border-forest/10">
             #FrameInGoa
           </div>
        </div>
      </div>
    </div>
  );
});

TeamCardPreview.displayName = 'TeamCardPreview';
export default TeamCardPreview;
