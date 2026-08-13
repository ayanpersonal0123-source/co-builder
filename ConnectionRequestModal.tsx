import React, { useState } from 'react';
import { BuilderProfile, ConnectionRequest } from '../types';
import { X, Phone, MessageSquare, CheckCircle2, ShieldCheck, Sparkles, Building2 } from 'lucide-react';

interface ConnectionRequestModalProps {
  builder: BuilderProfile;
  onClose: () => void;
  onSubmitConnection: (request: ConnectionRequest) => void;
}

export const ConnectionRequestModal: React.FC<ConnectionRequestModalProps> = ({
  builder,
  onClose,
  onSubmitConnection,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState(builder.city);
  const [message, setMessage] = useState(`Hi ${builder.fullName}, I have a house plan ready and would like to discuss construction timeline and estimate.`);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const req: ConnectionRequest = {
      id: `conn-${Date.now()}`,
      projectId: 'direct-connect',
      homeownerName: name || 'Homeowner',
      homeownerPhone: phone || '+91 98765 43210',
      homeownerCity: city || builder.city,
      builderId: builder.id,
      builderName: builder.fullName,
      message,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'pending'
    };

    setIsSubmitted(true);
    setTimeout(() => {
      onSubmitConnection(req);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 border border-slate-200 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex justify-between items-start pb-3 border-b border-slate-100">
          <div>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full inline-block mb-1">
              FREE Homeowner Connection
            </span>
            <h3 className="text-lg font-bold font-serif text-slate-900">
              Connect with {builder.fullName}
            </h3>
            <p className="text-xs text-slate-500">{builder.businessName} • {builder.city}</p>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold font-serif text-slate-900">Connection Request Sent!</h4>
            <p className="text-xs text-slate-600">
              {builder.fullName} has been notified via Co-Builder and will call or message you on WhatsApp shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium text-slate-900 focus:outline-none focus:border-amber-500"
                placeholder="e.g. Ramesh Kumar"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Mobile / WhatsApp Number *</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium text-slate-900 focus:outline-none focus:border-amber-500"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">House Location / City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium text-slate-900 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Message to Builder</label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium text-slate-900 focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-slate-950" />
              <span>Request Direct Connection (Free)</span>
            </button>

            <div className="text-center text-[10px] text-slate-400">
              Co-Builder does not charge homeowners.
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
