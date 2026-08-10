import React, { forwardRef } from 'react';

const IDCardPreview = forwardRef(({ name, role, title, photoUrl, gate, seat, uniqueId }, ref) => {
  return (
    <div className="relative w-[800px] h-[380px] flex items-center justify-center p-5 font-body">
      <div 
        ref={ref}
        className="w-[760px] h-[340px] bg-cream rounded-3xl overflow-hidden flex relative"
        style={{ transformOrigin: 'top left' }}
      >
        
        {/* Left Main Section */}
        <div className="flex-1 flex flex-col h-full bg-cream">
          {/* Header */}
          <div className="h-24 bg-forest flex items-center justify-between px-8 text-gold shrink-0">
            <div>
              <h2 className="font-display font-black text-3xl tracking-tight leading-none pb-1">HACKER HOUSE GOA</h2>
              <p className="font-mono font-bold text-sm text-cream/80 mt-1">BUILDER BOARDING PASS • #FrameInGoa</p>
            </div>
            <div className="text-right">
              <p className="font-mono font-bold text-sm text-gold-soft">28—31 OCT 2026</p>
              <p className="font-mono font-bold text-sm text-cream/80 mt-1">GOA, INDIA</p>
            </div>
          </div>
          
          {/* Body */}
          <div className="flex-1 p-8 flex flex-col justify-between relative">
            <div className="flex items-start gap-8">
              {/* Photo */}
              <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-forest/20 shrink-0 bg-[#e7ddc0]">
                {photoUrl ? (
                  <img src={photoUrl} alt="Builder" className="w-full h-full object-cover" crossOrigin="anonymous" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-forest/40 font-bold text-sm">Photo</div>
                )}
              </div>
              
              {/* Details */}
              <div className="pt-2 flex-1 min-w-0">
                <p className="font-mono font-bold text-xs text-forest/60 uppercase tracking-widest leading-none">Passenger / Builder</p>
                {/* Added pb-2 to prevent font clipping on html-to-image rendering */}
                <h1 className="font-display font-bold text-4xl text-ink leading-normal mt-1 truncate pb-2">
                  {(name || 'Your Name').toUpperCase()}
                </h1>
                
                <div className="mt-4">
                  <p className="font-mono font-bold text-xs text-forest/60 uppercase tracking-widest leading-none">Class</p>
                  <p className="font-body font-bold text-xl text-forest mt-1 leading-none">{role || 'Full-Stack'}</p>
                </div>
              </div>
            </div>
            
            {/* Tagline / Title */}
            <div className="mt-6 bg-coral text-cream rounded-xl px-6 py-3 flex items-center">
              <p className="font-mono font-bold text-sm truncate leading-none pb-1">{title || 'CHIEF VIBE SHIPPER'}</p>
            </div>
          </div>
        </div>
        
        {/* Perforation Line */}
        <div className="w-0 border-l-[3px] border-dashed border-forest/20 my-4 bg-cream"></div>
        
        {/* Right Stub Section */}
        <div className="w-48 bg-cream flex flex-col h-full shrink-0">
           <div className="h-24 bg-forest flex items-center justify-center p-4">
              <div className="w-12 h-12 bg-gold text-forest font-display font-black text-xl flex items-center justify-center rounded-xl -rotate-6">
                HH
              </div>
           </div>
           
           <div className="flex-1 p-6 flex flex-col items-center justify-center gap-4 relative">
             <div className="w-full flex justify-between px-2">
                <div>
                  <p className="font-mono font-bold text-[10px] text-forest/60 leading-none">GATE</p>
                  <p className="font-mono font-bold text-lg text-ink mt-1 leading-none">{gate || 'A1'}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold text-[10px] text-forest/60 leading-none">SEAT</p>
                  <p className="font-mono font-bold text-lg text-ink mt-1 leading-none">{seat || '12B'}</p>
                </div>
             </div>
             
             {/* Unique ID Badge */}
             <div className="bg-forest-deep text-gold-soft py-4 px-2 w-full rounded-xl shadow-sm text-center border-2 border-gold/20 flex flex-col items-center justify-center gap-1">
                <span className="font-mono font-bold text-[9px] tracking-widest uppercase text-cream/70">Verified ID</span>
                <span className="font-mono font-bold text-sm tracking-widest">{uniqueId || 'HHG-XYZ99'}</span>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
});

IDCardPreview.displayName = 'IDCardPreview';
export default IDCardPreview;
