import React, { useState, useRef, useEffect } from 'react';
import { Camera, Download, Share2, Sparkles, RefreshCcw } from 'lucide-react';
import { toPng } from 'html-to-image';
import { generateTagline } from '../lib/inception';
import IDCardPreview from '../components/IDCardPreview';
import FramePreview from '../components/FramePreview';

const GATES = ["A", "B", "C", "D", "E", "F"];
const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const generateId = () => 'HHG-' + Math.random().toString(36).substring(2, 7).toUpperCase();

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
  const [uniqueId, setUniqueId] = useState('');

  // App state
  const [loadingTitle, setLoadingTitle] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [scale, setScale] = useState(1);

  const previewRef = useRef(null);
  const stageRef = useRef(null);

  // Initialize random flight details
  useEffect(() => {
    rerollFlight();
  }, []);

  // Responsive scaling for the preview stage
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // The card is 800px wide. 
        const availableWidth = entry.contentRect.width;
        setScale(Math.min(1, availableWidth / 820)); // 820 to give a tiny bit of breathing room
      }
    });
    if (stageRef.current) {
      observer.observe(stageRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const rerollFlight = () => {
    const row = String(1 + Math.floor(Math.random() * 42));
    setSeat(row + randomFrom(["A", "B", "C", "D", "E", "F"]));
    setGate(randomFrom(GATES) + (1 + Math.floor(Math.random() * 24)));
    setUniqueId(generateId());
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

  const captureImage = async () => {
    if (!previewRef.current) return null;

    // For Boarding pass, we want transparent background outside the card.
    // For Frame, it's a solid square.
    return await toPng(previewRef.current, {
      pixelRatio: 2,
      cacheBust: true,
      backgroundColor: format === 'pass' ? 'transparent' : null,
      style: {
        transform: 'scale(1)', // Ensure it captures at unscaled size
        transformOrigin: 'top left',
      }
    });
  };

  const handleDownload = async () => {
    if (!photoUrl) return;
    setGenerating(true);
    try {
      const dataUrl = await captureImage();
      if (!dataUrl) throw new Error("Failed to capture");

      const link = document.createElement('a');
      link.download = `HHGoa26_${format}_${name.replace(/\s+/g, '_') || 'Builder'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
      alert("Failed to download image. Try using a different photo format.");
    } finally {
      setGenerating(false);
    }
  };

  const handleShareX = async () => {
    if (!photoUrl) return;

    // Optionally trigger download first so they have it ready to attach
    await handleDownload();

    const text = `Got my Boarding Pass for Hacker House Goa 2026! 🌴\n\nSee you on the beach. #FrameInGoa\n\nhttps://hhgoa.com`;
    const xUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;

    // Small delay to allow the download prompt to appear first
    setTimeout(() => {
      window.open(xUrl, '_blank');
      alert("Don't forget to attach the ID Card image you just downloaded to your tweet!");
    }, 500);
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
                      maxLength={8}
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
                    <label className="text-xs font-bold text-forest uppercase tracking-widest flex items-center justify-between">
                      Builder Title
                      <button onClick={rerollFlight} title="Reroll ID & Flight" className="text-forest hover:text-forest-deep">
                        <RefreshCcw className="w-3 h-3" />
                      </button>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. CHIEF VIBE SHIPPER"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-cream-dim focus:border-forest outline-none bg-white font-semibold text-ink"
                      maxLength={40}
                    />
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="pt-4 space-y-3">
                <button
                  onClick={handleDownload}
                  disabled={!photoUrl || generating}
                  className="w-full py-4 rounded-xl font-bold text-forest-deep bg-gold hover:bg-gold-soft transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg shadow-lg"
                >
                  {generating ? (
                    <><RefreshCcw className="w-5 h-5 animate-spin" /> Preparing Image...</>
                  ) : (
                    <><Download className="w-5 h-5" /> Download Image</>
                  )}
                </button>

                <button
                  onClick={handleShareX}
                  disabled={!photoUrl || generating}
                  className="w-full py-4 rounded-xl font-bold text-cream bg-ink hover:bg-black transition-colors flex items-center justify-center gap-2 text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Share2 className="w-5 h-5" /> Share to X
                </button>
              </div>

              <p className="text-xs text-forest/60 text-center mt-4">
                Images are generated completely locally in your browser.
              </p>
            </div>
          </div>

          {/* Stage Area */}
          <div ref={stageRef} className="stage-bg rounded-3xl p-8 lg:p-12 flex items-center justify-center min-h-[500px] overflow-hidden shadow-2xl relative">
            <div
              style={{ transform: `scale(${scale})` }}
              className="transition-transform origin-center"
            >
              {format === 'frame' ? (
                <FramePreview ref={previewRef} photoUrl={photoUrl} />
              ) : (
                <IDCardPreview
                  ref={previewRef}
                  photoUrl={photoUrl}
                  name={name}
                  role={role}
                  title={title}
                  gate={gate}
                  seat={seat}
                  uniqueId={uniqueId}
                />
              )}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
