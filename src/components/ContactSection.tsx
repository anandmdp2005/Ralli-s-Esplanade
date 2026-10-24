import React, { useState } from 'react';
import { Phone, MapPin, Clock, Calendar, Check, Copy, Send, Users, Mail, AlertCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  
  // Table inquiry form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guests: '2',
    date: new Date().toISOString().split('T')[0],
    time: '19:00',
    notes: '',
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setStatusMessage('Please enter your name and contact phone number.');
      setFormStatus('error');
      return;
    }

    setFormStatus('submitting');
    try {
      const res = await fetch('/api/table-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFormStatus('success');
        setStatusMessage(
          `Thank you, ${formData.name}! Your table inquiry (${data.inquiry?.id}) has been submitted. Our team will call you at ${formData.phone} to confirm.`
        );
        // Reset form
        setFormData({
          name: '',
          phone: '',
          email: '',
          guests: '2',
          date: new Date().toISOString().split('T')[0],
          time: '19:00',
          notes: '',
        });
      } else {
        setFormStatus('error');
        setStatusMessage(data.message || 'Unable to submit reservation inquiry. Please call the restaurant directly.');
      }
    } catch (err: any) {
      setFormStatus('error');
      setStatusMessage('Network error. Please call Ralli\'s Esplanade directly at ' + RESTAURANT_INFO.phone);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#0F261C] text-[#F7F3EA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-widest text-[#D8B26E] font-semibold">
            We Are Here To Serve You
          </p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F7F3EA]">
            Contact & Table Inquiries
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-4" />
          <p className="mt-4 text-base text-[#EFE8DA]/80 leading-relaxed">
            Planning a family lunch, dinner gathering, or quick meal during your Chowringhee shopping excursion? Reach out to us directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Direct Phone CTA, Address, and Verified Hours */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Clickable Call Now Card (Required Item 8) */}
            <div className="p-6 sm:p-8 rounded-xl bg-[#081710] border border-[#C5A059]/40 shadow-xl">
              <span className="text-xs uppercase font-bold text-[#D8B26E] tracking-wider block">
                Direct Telephone Line
              </span>
              <p className="font-serif text-3xl sm:text-4xl font-bold text-[#F7F3EA] mt-2">
                {RESTAURANT_INFO.phone}
              </p>
              <p className="text-xs text-[#EFE8DA]/70 mt-1">
                Direct mobile line for reservations, takeaways & inquiries
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-md bg-[#C5A059] text-[#081710] hover:bg-[#D8B26E] font-bold text-sm transition-all shadow-md active:scale-[0.98]"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </a>

                <button
                  onClick={handleCopyPhone}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-md bg-[#17382B] text-[#EFE8DA] hover:text-[#D8B26E] border border-white/10 hover:border-[#C5A059] text-xs font-semibold transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#D8B26E]" />
                      <span>Copy Number</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Complete Verified Address */}
            <div className="p-6 rounded-xl bg-[#081710]/70 border border-white/10 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D8B26E] shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-bold text-[#F7F3EA] uppercase tracking-wide">
                    Restaurant Address
                  </h4>
                  <p className="mt-1 text-sm text-[#EFE8DA]/90 leading-relaxed font-medium">
                    {RESTAURANT_INFO.address}
                  </p>
                  <p className="text-xs text-[#EFE8DA]/60 mt-0.5">
                    Landmark: Chowringhee Place, opposite Esplanade Metro Station
                  </p>
                </div>
              </div>

              {/* Verified Opening Hours */}
              <div className="flex items-start gap-3 pt-3 border-t border-white/10">
                <Clock className="w-5 h-5 text-[#D8B26E] shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-bold text-[#F7F3EA] uppercase tracking-wide">
                    Verified Opening Hours
                  </h4>
                  <p className="mt-1 text-sm text-[#F7F3EA] font-semibold">
                    {RESTAURANT_INFO.hours.regular}
                  </p>
                  <p className="text-xs text-[#EFE8DA]/70 mt-0.5">
                    {RESTAURANT_INFO.hours.note}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Table Inquiry & Reservation Request Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-xl bg-[#081710] border border-[#C5A059]/40 shadow-xl">
              <h3 className="font-serif text-2xl font-bold text-[#F7F3EA]">
                Reserve a Table or Inquire
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#EFE8DA]/75">
                Send us your preferred dining date and group details. We will confirm your seating promptly.
              </p>

              {formStatus === 'success' && (
                <div className="mt-6 p-4 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs sm:text-sm flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-emerald-300">Inquiry Received</p>
                    <p className="mt-1">{statusMessage}</p>
                    <button
                      onClick={() => setFormStatus('idle')}
                      className="mt-3 text-xs underline text-emerald-400 font-medium"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                </div>
              )}

              {formStatus === 'error' && (
                <div className="mt-6 p-4 rounded-lg bg-red-950/80 border border-red-500/50 text-red-200 text-xs sm:text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-300">Submission Notice</p>
                    <p className="mt-1">{statusMessage}</p>
                  </div>
                </div>
              )}

              {formStatus !== 'success' && (
                <form onSubmit={handleFormSubmit} className="mt-6 space-y-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#EFE8DA]/80 font-medium mb-1.5">
                        Your Full Name <span className="text-[#D8B26E]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rahul Sen"
                        className="w-full px-3.5 py-2.5 rounded-md bg-[#0F261C] border border-white/15 text-[#F7F3EA] placeholder:text-white/30 focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#EFE8DA]/80 font-medium mb-1.5">
                        Phone Number <span className="text-[#D8B26E]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 09831222607"
                        className="w-full px-3.5 py-2.5 rounded-md bg-[#0F261C] border border-white/15 text-[#F7F3EA] placeholder:text-white/30 focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[#EFE8DA]/80 font-medium mb-1.5">
                        Party Size
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-md bg-[#0F261C] border border-white/15 text-[#F7F3EA] focus:outline-none focus:border-[#C5A059]"
                      >
                        <option value="1">1 Person</option>
                        <option value="2">2 Persons</option>
                        <option value="4">4 Persons</option>
                        <option value="6">6 Persons</option>
                        <option value="8">8+ Group</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#EFE8DA]/80 font-medium mb-1.5">
                        Date
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-md bg-[#0F261C] border border-white/15 text-[#F7F3EA] focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#EFE8DA]/80 font-medium mb-1.5">
                        Time
                      </label>
                      <input
                        type="time"
                        required
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-md bg-[#0F261C] border border-white/15 text-[#F7F3EA] focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#EFE8DA]/80 font-medium mb-1.5">
                      Special Requests or Dietary Notes (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g. Vegetarian preference, anniversary celebration, window table..."
                      className="w-full px-3.5 py-2.5 rounded-md bg-[#0F261C] border border-white/15 text-[#F7F3EA] placeholder:text-white/30 focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-[#C5A059] text-[#081710] hover:bg-[#D8B26E] font-bold text-sm transition-all shadow-md disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{formStatus === 'submitting' ? 'Submitting...' : 'Send Table Inquiry'}</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
