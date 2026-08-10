import React, { useState, useRef, useEffect } from 'react';
import { Camera, Download, Share2, Sparkles, RefreshCcw } from 'lucide-react';
import html2canvas from 'html2canvas';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { generateTagline } from '../lib/inception';
import IDCardPreview from '../components/IDCardPreview';
import FramePreview from '../components/FramePreview';

const GATES = ["A","B","C","D","E","F"];
const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default function Home() {
  const [format, setFormat] = useState('pass'); // 'frame' | 'pass'
  const [photoUrl, setPhotoUrl] = useState(null);
  
  // Pass fields
  const [name, setName] = useState('');
  const [role, setRole] = useState('Full-Stack');
  const [interests, setInterests] = useState('');
  const [title, setTitle] = useState('');
  const [gate, setGate] = useState('A12');
  const [seat, setSeat] = useState('4B');
  
  // App state
  const [loadingTitle, setLoadingTitle] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatedImg, setGeneratedImg] = useState(null);
  const [verifiedUrl, setVerifiedUrl] = useState(null);
  
  const previewRef = useRef(null);

  // Initialize random flight details
  useEffect(() => {
    rerollFlight();
  }, []);

  const rerollFlight = () => {
    const row = String(1 + Math.floor(Math.random()*42));
    setSeat(row + randomFrom(["A","B","C","D","E","F"]));
    setGate(randomFrom(GATES) + (1 + Math.floor(Math.random()*24)));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoUrl(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleGenerateTitle = async () => {
    if (!interests) {
      alert("Please enter some interests to generate a title!");
      return;
    }
    setLoadingTitle(true);
    const newTitle = await generateTagline(name, role, interests);
    if (newTitle) setTitle(newTitle.toUpperCase());
    setLoadingTitle(false);
  };

  const handleGenerateAndSave = async () => {
    if (!previewRef.current) return;
    setGenerating(true);
    
    try {
      // 1. Capture DOM as Canvas
      const canvas = await html2canvas(previewRef.current, {
        useCORS: true,
        scale: 2, // Higher quality
        backgroundColor: null,
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 0.9);
      setGeneratedImg(imgData);

      // If Firebase is configured, save metadata to Firestore
      if (db) {
        // Create doc first to get ID for QR and verification
        const docRef = await addDoc(collection(db, 'hhgoa_cards'), {
          name,
          role,
          title,
          format,
          timestamp: serverTimestamp(),
        });
        
        const cardId = docRef.id;
        const vUrl = `${window.location.origin}/verify/${cardId}`;
        setVerifiedUrl(vUrl);
      } else {
        console.warn("Firebase not configured. Image only generated locally.");
        setVerifiedUrl(`${window.location.origin}/#`);
      }
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Failed to generate image. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImg) return;
    const link = document.createElement('a');
    link.download = `HHGoa26_${format}_${name.replace(/\s+/g, '_') || 'Builder'}.jpg`;
    link.href = generatedImg;
    link.click();
  };

  const handleShareX = () => {
    const text = `Got my Boarding Pass for Hacker House Goa 2026! 🌴\n\nSee you on the beach. #FrameInGoa\n\n${verifiedUrl ? verifiedUrl : 'https://hhgoa.com'}`;
    const xUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(xUrl, '_blank');
    alert("Don't forget to attach the ID Card image you just downloaded to your tweet!");
  };

  return (
    <div className="min-h-screen bg-forest-deep text-cream py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-line pb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gold text-forest-deep font-display font-black text-xl flex items-center justify-center rounded-xl -rotate-3">
              HH
            </div>
            <div>
              <h1 className="font-display font-bold text-3xl">Frame & Boarding Pass Generator</h1>
              <p className="font-mono text-cream/70 text-sm mt-1">Hacker House Goa 2026</p>
            </div>
          </div>
          <div className="font-mono text-xs bg-gold-soft text-forest-deep px-4 py-2 rounded-full font-bold">
            #FrameInGoa
          </div>
        </header>

        <main className="grid lg:grid-cols-[400px_1fr] gap-10 items-start">
          
          {/* Controls Panel */}
          <div className="bg-cream text-ink rounded-3xl overflow-hidden shadow-2xl relative">
            <div className="ticket-perf w-full"></div>
            <div className="p-6 space-y-6">
              
              {/* Tabs */}
              <div className="flex bg-cream-dim rounded-xl p-1 gap-1">
                <button 
                  onClick={() => setFormat('frame')}
                  className={`flex-1 py-3 text-sm font-bold rounded-lg transition-colors ${format === 'frame' ? 'bg-forest text-cream shadow-md' : 'text-forest/60 hover:text-forest'}`}
                >
                  PFP Frame
                </button>
                <button 
                  onClick={() => setFormat('pass')}
                  className={`flex-1 py-3 text-sm font-bold rounded-lg transition-colors ${format === 'pass' ? 'bg-forest text-cream shadow-md' : 'text-forest/60 hover:text-forest'}`}
                >
                  Boarding Pass
                </button>
              </div>

              {/* Photo Upload */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-forest uppercase tracking-widest">Your Photo</label>
                <label className="border-2 border-dashed border-forest/30 hover:border-forest/60 hover:bg-gold-soft/30 transition-colors rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer text-center group">
                  <Camera className="w-8 h-8 text-forest mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-semibold text-forest">Tap to upload a photo</span>
                  <span className="text-xs text-forest/60 mt-1">JPG, PNG, HEIC</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                </label>
              </div>

              {/* Boarding Pass Fields */}
              {format === 'pass' && (
                <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-forest uppercase tracking-widest">Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Vaibhav Soni"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-cream-dim focus:border-forest outline-none bg-white font-semibold text-ink"
                      maxLength={26}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-forest uppercase tracking-widest">Stack / Role</label>
                    <select 
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-cream-dim focus:border-forest outline-none bg-white font-semibold text-ink cursor-pointer"
                    >
                      <option>Full-Stack</option>
                      <option>Frontend</option>
                      <option>Backend</option>
                      <option>AI / ML</option>
                      <option>Web3 / Blockchain</option>
                      <option>Design</option>
                      <option>Product</option>
                      <option>Mobile</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-forest uppercase tracking-widest flex items-center justify-between">
                      Interests (For AI Tagline)
                    </label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="e.g. Anime, Gaming, Web3"
                        value={interests}
                        onChange={(e) => setInterests(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-xl border-2 border-cream-dim focus:border-forest outline-none bg-white font-semibold text-ink"
                      />
                      <button 
                        onClick={handleGenerateTitle}
                        disabled={loadingTitle}
                        className="bg-forest text-gold px-4 rounded-xl hover:bg-forest-deep transition-colors disabled:opacity-50 flex items-center justify-center shrink-0"
                        title="Generate AI Tagline"
                      >
                        {loadingTitle ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-forest uppercase tracking-widest">Builder Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g. CHIEF VIBE SHIPPER"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-cream-dim focus:border-forest outline-none bg-white font-semibold text-ink"
                      maxLength={30}
                    />
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="pt-4 space-y-3">
                <button 
                  onClick={handleGenerateAndSave}
                  disabled={!photoUrl || generating}
                  className="w-full py-4 rounded-xl font-bold text-forest-deep bg-gold hover:bg-gold-soft transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg shadow-lg"
                >
                  {generating ? (
                    <><RefreshCcw className="w-5 h-5 animate-spin" /> Generating...</>
                  ) : (
                    'Generate & Save'
                  )}
                </button>
                
                {generatedImg && (
                  <div className="flex gap-3 animate-in fade-in zoom-in duration-300">
                    <button 
                      onClick={handleDownload}
                      className="flex-1 py-3 rounded-xl font-bold text-cream bg-forest hover:bg-forest-deep transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" /> Download
                    </button>
                    <button 
                      onClick={handleShareX}
                      className="flex-1 py-3 rounded-xl font-bold text-cream bg-ink hover:bg-black transition-colors flex items-center justify-center gap-2"
                    >
                      <Share2 className="w-4 h-4" /> Share to X
                    </button>
                  </div>
                )}
              </div>
              
              <p className="text-xs text-forest/60 text-center mt-4">
                Images are saved to the HH Goa registry. By generating, you agree to our terms.
              </p>
            </div>
          </div>

          {/* Stage Area */}
          <div className="stage-bg rounded-3xl p-8 lg:p-12 flex items-center justify-center min-h-[500px] overflow-hidden shadow-2xl relative">
            <div className="scale-75 md:scale-90 xl:scale-100 transition-transform origin-center">
              {format === 'frame' ? (
                <FramePreview ref={previewRef} photoUrl={photoUrl} />
              ) : (
                <IDCardPreview 
                  ref={previewRef} 
                  photoUrl={photoUrl} 
                  name={name} 
                  role={role} 
                  title={title}
                  id="preview"
                  gate={gate}
                  seat={seat}
                />
              )}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
