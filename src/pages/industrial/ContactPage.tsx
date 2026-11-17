import React, { useState } from 'react';
import { SectionHeader } from '../../components/common/SectionHeader';
import { MapPin, Mail, Phone, ShieldCheck, CheckCircle2, Send, Package, Loader2, AlertCircle } from 'lucide-react';
import { apiClient, ApiError } from '../../api/client';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    testRequirement: 'Full Characterization Suite (All Disciplines)',
    sampleType: 'Dense Shaped Refractory Bricks',
    timeline: 'Standard (5-7 business days)',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [inquiryReference, setInquiryReference] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.organization.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill out all mandatory fields marked with an asterisk (*).');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const res = await apiClient.submitInquiry({
        name: formData.name.trim(),
        organization: formData.organization.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        sampleType: formData.sampleType,
        timeline: formData.timeline,
        message: formData.message.trim(),
        testRequirements: [formData.testRequirement],
      });
      setInquiryReference(res.id);
      setSubmitted(true);
    } catch (err) {
      if (err instanceof ApiError) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Unable to register inquiry with laboratory server. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="bg-charcoal text-white pt-28 pb-16 lg:pt-36 lg:pb-20 border-b-4 border-industrial-orange relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-industrial-orange uppercase tracking-widest">
              <span className="w-5 h-[2px] bg-industrial-orange block"></span>
              <span>Engineering Consultation & Intake</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Contact the Refractory Testing Laboratory.
            </h1>
            <p className="text-base sm:text-lg text-charcoal-300 leading-relaxed font-light">
              Submit testing inquiries, schedule lot sampling, or arrange emergency outage testing with our refractory engineering team.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form & Contact Information Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left 5 Cols: Contact Information & Sample Shipping */}
            <div className="lg:col-span-5 space-y-8">
              <SectionHeader
                eyebrow="Direct Contacts"
                title="Laboratory Facility & Sample Logistics"
                description="Our refractory engineers provide technical guidance for project design teams, plant operators, and procurement specialists."
              />

              <div className="space-y-4 text-xs font-mono">
                <div className="p-5 border border-industrial-border bg-industrial-lightGray/40 space-y-2">
                  <div className="flex items-center space-x-2 text-charcoal-900 font-bold text-sm">
                    <MapPin className="w-4 h-4 text-industrial-orange" />
                    <span>Operating Entity & Office</span>
                  </div>
                  <div className="text-charcoal-700 pl-6 space-y-0.5">
                    <p className="font-sans font-semibold">Danieli Corus India Private Limited</p>
                    <p>Plot No. 93–94, 4th Floor, Riana Aurelia Towers</p>
                    <p>Sector 136, Noida, Gautam Buddha Nagar</p>
                    <p>Uttar Pradesh – 201304, India</p>
                  </div>
                </div>

                <div className="p-5 border border-industrial-border bg-industrial-lightGray/40 space-y-2">
                  <div className="flex items-center space-x-2 text-charcoal-900 font-bold text-sm">
                    <Mail className="w-4 h-4 text-industrial-orange" />
                    <span>Direct Laboratory Email</span>
                  </div>
                  <div className="text-charcoal-700 pl-6">
                    <p className="font-mono text-sm text-charcoal-900 font-semibold">
                      info@danieli-corus.com
                    </p>
                    <p className="text-charcoal-500 text-[11px] mt-1">
                      Monitoring hours: Monday – Friday, 09:00 – 18:00 IST
                    </p>
                  </div>
                </div>

                <div className="p-5 border border-industrial-border bg-industrial-lightGray/40 space-y-2">
                  <div className="flex items-center space-x-2 text-charcoal-900 font-bold text-sm">
                    <Phone className="w-4 h-4 text-industrial-orange" />
                    <span>Telephone Desk</span>
                  </div>
                  <div className="text-charcoal-700 pl-6">
                    <p className="font-mono text-sm text-charcoal-900 font-semibold">
                      +91 120 697 0100
                    </p>
                    <p className="text-charcoal-500 text-[11px] mt-1">
                      Desk: Refractory Materials & Testing Coordination
                    </p>
                  </div>
                </div>

                {/* Sample Logistics Card */}
                <div className="p-5 border-l-4 border-industrial-teal bg-white border border-industrial-border space-y-2">
                  <div className="flex items-center space-x-2 text-charcoal font-bold text-xs uppercase tracking-wider">
                    <Package className="w-4 h-4 text-industrial-teal" />
                    <span>Sample Delivery Specifications</span>
                  </div>
                  <p className="text-xs text-charcoal-600 font-sans leading-relaxed">
                    Prior to dispatching test bricks or monolithics, verify that each sample box or pallet carries the manufacturer heat number, production date, and client project reference per Procedure R-01 §3.2.
                  </p>
                </div>
              </div>
            </div>

            {/* Right 7 Cols: Polished Enquiry Form */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-industrial-border p-8 sm:p-10 shadow-sm relative">
                {submitted ? (
                  <div className="py-12 text-center space-y-4 animate-fadeIn">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-charcoal">
                      Inquiry Registered Successfully
                    </h3>
                    <p className="text-sm text-charcoal-600 max-w-md mx-auto leading-relaxed">
                      Thank you, <strong>{formData.name}</strong> from <strong>{formData.organization}</strong>. Your refractory testing inquiry has been received by our laboratory coordination desk.
                    </p>
                    {inquiryReference && (
                      <div className="pt-2">
                        <span className="inline-block px-3 py-1 bg-industrial-lightGray text-[11px] font-mono text-charcoal-600 border border-charcoal-200">
                          Reference ID: {inquiryReference}
                        </span>
                      </div>
                    )}
                    <p className="text-xs text-charcoal-400 font-mono">
                      Our refractory metallurgists review incoming requests within one business day.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          organization: '',
                          email: '',
                          phone: '',
                          testRequirement: 'Full Characterization Suite (All Disciplines)',
                          sampleType: 'Dense Shaped Refractory Bricks',
                          timeline: 'Standard (5-7 business days)',
                          message: ''
                        });
                      }}
                      className="mt-4 px-6 py-2.5 bg-charcoal hover:bg-black text-white text-xs font-mono font-bold tracking-wider uppercase transition-colors"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="border-b border-industrial-border pb-4 mb-6">
                      <h2 className="text-xl font-bold text-charcoal">
                        Refractory Testing Intake & Project Consultation
                      </h2>
                      <p className="text-xs text-charcoal-500 font-mono mt-1">
                        Mandatory fields are marked with an asterisk (*). All submissions are audited under Procedure R-01 data governance.
                      </p>
                    </div>

                    {errorMessage && (
                      <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-mono flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-mono font-bold text-charcoal-900 uppercase tracking-wider mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Dr. Pieter van Dijk"
                          className="w-full px-4 py-3 bg-industrial-lightGray/50 border border-industrial-border text-sm text-charcoal focus:bg-white focus:border-industrial-orange focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-charcoal-900 uppercase tracking-wider mb-2">
                          Organization / Steel Plant *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.organization}
                          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                          placeholder="e.g. Tata Steel IJmuiden"
                          className="w-full px-4 py-3 bg-industrial-lightGray/50 border border-industrial-border text-sm text-charcoal focus:bg-white focus:border-industrial-orange focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-mono font-bold text-charcoal-900 uppercase tracking-wider mb-2">
                          Corporate Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@steelmaker.com"
                          className="w-full px-4 py-3 bg-industrial-lightGray/50 border border-industrial-border text-sm text-charcoal focus:bg-white focus:border-industrial-orange focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-charcoal-900 uppercase tracking-wider mb-2">
                          Telephone Contact
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+31 251 491111"
                          className="w-full px-4 py-3 bg-industrial-lightGray/50 border border-industrial-border text-sm text-charcoal focus:bg-white focus:border-industrial-orange focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-mono font-bold text-charcoal-900 uppercase tracking-wider mb-2">
                          Testing Scope Requirement
                        </label>
                        <select
                          value={formData.testRequirement}
                          onChange={(e) => setFormData({ ...formData, testRequirement: e.target.value })}
                          className="w-full px-4 py-3 bg-industrial-lightGray/50 border border-industrial-border text-xs font-mono text-charcoal focus:bg-white focus:border-industrial-orange focus:outline-none transition-colors"
                        >
                          <option>Full Characterization Suite (All Disciplines)</option>
                          <option>Mechanical Suite (CCS / MOR / HMOR)</option>
                          <option>Thermal Suite (RUL / Creep in Compression / PLC)</option>
                          <option>Chemical Assay (WD-XRF Oxide Breakdown)</option>
                          <option>Post-Mortem Lining Analysis & Investigation</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-charcoal-900 uppercase tracking-wider mb-2">
                          Material Type
                        </label>
                        <select
                          value={formData.sampleType}
                          onChange={(e) => setFormData({ ...formData, sampleType: e.target.value })}
                          className="w-full px-4 py-3 bg-industrial-lightGray/50 border border-industrial-border text-xs font-mono text-charcoal focus:bg-white focus:border-industrial-orange focus:outline-none transition-colors"
                        >
                          <option>Dense Shaped Refractory Bricks</option>
                          <option>Insulating Firebricks (IFB)</option>
                          <option>Unshaped Monolithics & Castables</option>
                          <option>Carbon / Microporous Hot Metal Blocks</option>
                          <option>Silica / Andalusite Stove Checkers</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-charcoal-900 uppercase tracking-wider mb-2">
                        Relining Campaign & Testing Details *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Detail sample origin, relining campaign, kiln/furnace position, specifications, and special tolerances..."
                        className="w-full px-4 py-3 bg-industrial-lightGray/50 border border-industrial-border text-sm text-charcoal focus:bg-white focus:border-industrial-orange focus:outline-none transition-colors resize-y"
                      ></textarea>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-8 py-3.5 bg-industrial-orange hover:bg-industrial-orange-dark disabled:bg-charcoal-400 text-white font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center space-x-2 transition-colors shadow-sm"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Transmitting Inquiry...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Submit Laboratory Inquiry</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
