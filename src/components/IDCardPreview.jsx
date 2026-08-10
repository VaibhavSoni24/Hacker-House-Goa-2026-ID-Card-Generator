import React, { forwardRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const IDCardPreview = forwardRef(({ name, role, title, photoUrl, id, gate, seat }, ref) => {
  const verifiedUrl = `https://hhgoa.com/verify/${id}`; // In production this would be the actual deployed URL
  
  return (
    <div 
      ref={ref}
      className="relative w-[800px] h-[380px] bg-[#0B2A1A] flex items-center justify-center p-5 font-body"
      style={{ transformOrigin: 'top left' }}
    >
      <div className="w-full h-full bg-cream rounded-3xl overflow-hidden flex shadow-2xl relative">
        
        {/* Left Main Section */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="h-24 bg-forest flex items-center justify-between px-8 text-gold">
            <div>
              <h2 className="font-display font-black text-3xl tracking-tight">HACKER HOUSE GOA</h2>
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
              <div className="pt-2">
                <p className="font-mono font-bold text-xs text-forest/60 uppercase tracking-widest">Passenger / Builder</p>
                <h1 className="font-display font-bold text-4xl text-ink leading-none mt-2 truncate w-[380px]">
                  {(name || 'Your Name').toUpperCase()}
                </h1>
                
                <div className="mt-6">
                  <p className="font-mono font-bold text-xs text-forest/60 uppercase tracking-widest">Class</p>
                  <p className="font-body font-bold text-xl text-forest mt-1">{role || 'Full-Stack'}</p>
                </div>
              </div>
            </div>
            
            {/* Tagline / Title */}
            <div className="mt-6 bg-coral text-cream rounded-xl px-6 py-3 flex items-center">
              <p className="font-mono font-bold text-sm truncate">{title || 'CHIEF VIBE SHIPPER'}</p>
            </div>
          </div>
        </div>
        
        {/* Perforation Line */}
        <div className="w-0 border-l-[3px] border-dashed border-forest/20 my-4"></div>
        
        {/* Right Stub Section */}
        <div className="w-48 bg-cream flex flex-col">
           <div className="h-24 bg-forest flex items-center justify-center p-4">
              <div className="w-12 h-12 bg-gold text-forest font-display font-black text-xl flex items-center justify-center rounded-xl -rotate-6">
                HH
              </div>
           </div>
           
           <div className="flex-1 p-6 flex flex-col items-center justify-center gap-4 relative">
             <div className="w-full flex justify-between px-2">
                <div>
                  <p className="font-mono font-bold text-[10px] text-forest/60">GATE</p>
                  <p className="font-mono font-bold text-lg text-ink">{gate || 'A1'}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold text-[10px] text-forest/60">SEAT</p>
                  <p className="font-mono font-bold text-lg text-ink">{seat || '12B'}</p>
                </div>
             </div>
             
             {/* QR Code */}
             <div className="bg-white p-2 rounded-xl shadow-sm border border-black/5">
                <QRCodeSVG value={verifiedUrl} size={90} level="H" includeMargin={false} />
             </div>
             <p className="font-mono font-bold text-[8px] text-forest/60 tracking-wider">VERIFY TICKET</p>
           </div>
        </div>

      </div>
    </div>
  );
});

IDCardPreview.displayName = 'IDCardPreview';
export default IDCardPreview;
