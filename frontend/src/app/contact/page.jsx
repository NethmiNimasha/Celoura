"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  MapPin, 
  Phone, 
  Clock, 
  Mail, 
  Calendar, 
  MessageCircle, 
  Sparkles, 
  Crown, 
  CheckCircle2, 
  Scissors, 
  ChevronDown,
  ArrowRight
} from "lucide-react";
import { BUSINESS_INFO } from "../../lib/celouraData";

export default function ContactPage() {
  const [appointmentBooked, setAppointmentBooked] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    visitDate: "",
    timeSlot: "10:00 AM",
    serviceInterest: "Bridal Lehenga Consultation",
    notes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setAppointmentBooked(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-300 uppercase tracking-widest mb-3">
          <MapPin className="h-3.5 w-3.5 text-amber-400" />
          <span>Atelier Boutique & Studio</span>
        </div>
        <h1 className="font-cinzel text-4xl sm:text-5xl font-black text-white">
          Visit Celoura Fashion
        </h1>
        <p className="mt-3 text-sm sm:text-base text-zinc-300">
          Walk into our Akuressa boutique to feel our luxury silks and velvets, review hand-embroidered swatches, and have master tailors take your measurements in person.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Business Details & Location Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="card-luxury p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 shrink-0 rounded-full border border-amber-400/50 bg-black/90 p-0.5 shadow-gold-sm overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="Celoura Fashion Logo"
                  width={56}
                  height={56}
                  className="h-full w-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="font-cinzel text-xs uppercase tracking-widest text-amber-400 font-bold">
                  Registered Atelier
                </span>
                <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white mt-0.5">
                  {BUSINESS_INFO.name}
                </h2>
                <p className="text-xs text-amber-300/90 italic font-serif">
                  "{BUSINESS_INFO.tagline}"
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-zinc-300 border-t border-zinc-800 pt-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm">Boutique Address:</strong>
                  <p className="text-zinc-400 mt-0.5 leading-relaxed">
                    {BUSINESS_INFO.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm">Direct Phone / Hotline:</strong>
                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="text-amber-300 hover:underline font-medium text-sm mt-0.5 block"
                  >
                    {BUSINESS_INFO.displayPhone} / {BUSINESS_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm">Opening Hours:</strong>
                  <p className="text-zinc-400 mt-0.5">
                    {BUSINESS_INFO.openingHours} (Open Daily Monday – Sunday)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm">Email Inquiries:</strong>
                  <p className="text-zinc-400 mt-0.5">{BUSINESS_INFO.email}</p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-800 flex flex-col gap-3">
              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold rounded-full py-3 text-center text-xs font-bold uppercase tracking-wider text-black flex items-center justify-center gap-2 shadow-gold-sm"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Chat on WhatsApp (Instant Reply)</span>
              </a>

              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="btn-gold-outline rounded-full py-3 text-center text-xs font-semibold text-amber-300 flex items-center justify-center gap-2"
              >
                <Phone className="h-4 w-4" />
                <span>Call Head Couturier</span>
              </a>
            </div>
          </div>

          {/* Location Map Visual Card */}
          <div className="rounded-3xl border border-amber-500/20 bg-zinc-950 p-6">
            <h3 className="font-cinzel text-sm font-bold text-white mb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-amber-400" />
              <span>Location in Akuressa</span>
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Located conveniently at No. 129, Yakabedda, Matara road, Akuressa with dedicated client parking and private fitting suites for brides, frocks, blouses, and custom dresses.
            </p>
            <div className="mt-4 rounded-2xl border border-zinc-800 bg-[#09090e] p-4 text-xs text-zinc-300 space-y-1">
              <p><strong className="text-amber-300">Address:</strong> No. 129, Yakabedda, Matara road, Akuressa</p>
              <p><strong className="text-amber-300">Fitting Suites:</strong> 2 Private Bespoke Chambers</p>
            </div>
          </div>
        </div>

        {/* Right Column: Appointment Booking & Consultation Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-amber-500/30 bg-[#0d0d14] p-8 shadow-2xl">
            {appointmentBooked ? (
              <div className="py-12 text-center space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/50">
                  <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                </div>
                <h3 className="font-cinzel text-2xl font-bold text-white">
                  Fitting Appointment Requested!
                </h3>
                <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{formData.name}</strong>. We have booked your private consultation for <strong className="text-amber-300">{formData.visitDate}</strong> at <strong className="text-amber-300">{formData.timeSlot}</strong>.
                </p>
                <p className="text-xs text-zinc-400">
                  Our team will call or WhatsApp you at <strong className="text-white">{formData.phone}</strong> to confirm fitting chamber availability.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setAppointmentBooked(false)}
                    className="btn-gold rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black"
                  >
                    Book Another Slot
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="font-cinzel text-xs uppercase tracking-widest text-amber-400 font-bold">
                    Private Bridal Suite
                  </span>
                  <h3 className="font-cinzel text-2xl font-bold text-white mt-1">
                    Book A Measurement & Fabric Session
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Reserve a 45-minute 1-on-1 consultation with our master couturier to examine fabrics and discuss your custom silhouette.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-zinc-300 font-medium block mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ayesha Jayawardena"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-zinc-300 font-medium block mb-1">Phone Number (WhatsApp) *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 0771699754"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-zinc-300 font-medium block mb-1">Email Address</label>
                      <input
                        type="email"
                        placeholder="e.g. ayesha@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-zinc-300 font-medium block mb-1">Service of Interest</label>
                      <select
                        value={formData.serviceInterest}
                        onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                      >
                        <option value="Bridal Lehenga Consultation">Bridal Lehenga Consultation</option>
                        <option value="Royal Velvet Gown">Royal Velvet Gown</option>
                        <option value="Silk & Zari Ensemble">Silk & Zari Ensemble</option>
                        <option value="Reception / Sangeet Outfit">Reception / Sangeet Outfit</option>
                        <option value="Personalized Dress Tailoring">Personalized Dress Tailoring</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-zinc-300 font-medium block mb-1">Preferred Visit Date *</label>
                      <input
                        type="date"
                        required
                        value={formData.visitDate}
                        onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-zinc-300 font-medium block mb-1">Preferred Time Slot</label>
                      <select
                        value={formData.timeSlot}
                        onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                      >
                        <option value="09:00 AM">09:00 AM – Morning Consultation</option>
                        <option value="11:30 AM">11:30 AM – Mid-day Session</option>
                        <option value="02:00 PM">02:00 PM – Afternoon Fitting</option>
                        <option value="04:30 PM">04:30 PM – Evening Session</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-zinc-300 font-medium block mb-1">
                      Notes or Specific Design Preferences
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Share your wedding theme colors, silhouette thoughts, or inspiration ideas..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="btn-gold w-full rounded-full py-3.5 text-xs font-bold uppercase tracking-wider text-black flex items-center justify-center gap-2 shadow-gold-md"
                    >
                      <Calendar className="h-4 w-4" />
                      <span>Confirm Appointment Booking</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
