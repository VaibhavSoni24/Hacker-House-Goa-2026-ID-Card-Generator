import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { CheckCircle, XCircle, ArrowLeft, Loader2 } from 'lucide-react';

export default function Verify() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function verifyCard() {
      if (!db) {
        setError("Firebase is not configured. Cannot verify card.");
        setLoading(false);
        return;
      }
      
      try {
        const docRef = doc(db, "hhgoa_cards", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setData({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError("This ID Card does not exist in the HH Goa Registry.");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setError("Error verifying the card. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    verifyCard();
  }, [id]);

  return (
    <div className="min-h-screen bg-forest-deep text-cream py-10 px-4 font-body flex items-center justify-center relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/10 via-forest-deep to-forest-deep"></div>
      </div>

      <div className="max-w-xl w-full z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-gold-soft hover:text-gold mb-8 font-mono text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Generator
        </Link>

        <div className="bg-cream text-ink rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          
          {loading && (
            <div className="flex flex-col items-center justify-center py-10">
              <Loader2 className="w-10 h-10 text-forest animate-spin mb-4" />
              <p className="font-bold text-forest">Verifying Identity...</p>
            </div>
          )}

          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <XCircle className="w-16 h-16 text-coral mb-6" />
              <h2 className="font-display font-bold text-3xl mb-2 text-forest-deep">Verification Failed</h2>
              <p className="text-forest/70 mb-8">{error}</p>
              <div className="font-mono text-xs text-forest/40 bg-cream-dim px-4 py-2 rounded-lg">ID: {id}</div>
            </div>
          )}

          {!loading && data && (
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-forest rounded-full flex items-center justify-center mb-6 relative shadow-lg">
                <CheckCircle className="w-10 h-10 text-gold" />
                <div className="absolute inset-0 bg-gold rounded-full animate-ping opacity-20"></div>
              </div>
              
              <h2 className="font-display font-black text-4xl mb-2 text-forest-deep tracking-tight">VERIFIED</h2>
              <p className="font-bold text-forest/70 mb-8">This is an official Hacker House Goa 2026 Ticket.</p>
              
              <div className="w-full bg-cream-dim rounded-2xl p-6 text-left space-y-4">
                <div>
                  <p className="font-mono text-[10px] font-bold text-forest/50 tracking-widest uppercase">Passenger Name</p>
                  <p className="font-display font-bold text-xl text-ink mt-1">{data.name || 'Anonymous Builder'}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-mono text-[10px] font-bold text-forest/50 tracking-widest uppercase">Class</p>
                    <p className="font-bold text-forest mt-1">{data.role}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] font-bold text-forest/50 tracking-widest uppercase">Format</p>
                    <p className="font-bold text-forest mt-1 capitalize">{data.format === 'pass' ? 'Boarding Pass' : 'PFP Frame'}</p>
                  </div>
                </div>

                {data.title && (
                  <div>
                    <p className="font-mono text-[10px] font-bold text-forest/50 tracking-widest uppercase">Title</p>
                    <p className="font-mono font-bold text-sm text-coral mt-1">{data.title}</p>
                  </div>
                )}
                
                <div className="pt-4 mt-4 border-t border-forest/10">
                  <p className="font-mono text-[10px] font-bold text-forest/50 tracking-widest uppercase mb-1">Blockchain Hash / ID</p>
                  <p className="font-mono text-xs text-ink/60 truncate">{data.id}</p>
                </div>
              </div>

              <p className="mt-8 text-xs font-bold text-forest/40">
                Generated at {data.timestamp ? new Date(data.timestamp.toDate()).toLocaleString() : 'Unknown Date'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
