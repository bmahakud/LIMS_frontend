import React from 'react';
import { X, Lock, ShieldAlert, Cpu, CheckCircle2, Clock } from 'lucide-react';

interface LabPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LabPortalModal: React.FC<LabPortalModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-none border-t-4 border-industrial-orange shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="bg-charcoal px-6 py-5 text-white flex items-center justify-between border-b border-charcoal-700">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-industrial-orange/20 border border-industrial-orange/40 flex items-center justify-center">
              <Lock className="w-5 h-5 text-industrial-orange" />
            </div>
            <div>
              <div className="text-[11px] font-mono tracking-widest text-industrial-orange uppercase font-semibold">
                Protected Enterprise System
              </div>
              <h3 id="modal-title" className="text-lg font-bold tracking-tight text-white">
                Danieli Corus — Internal LIMS Portal
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-charcoal-400 hover:text-white transition-colors p-1.5 focus:outline-none focus:ring-2 focus:ring-industrial-orange"
            aria-label="Close portal window"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="bg-industrial-lightGray border-l-4 border-industrial-orange p-4">
            <div className="flex items-start space-x-3">
              <ShieldAlert className="w-5 h-5 text-industrial-orange flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-charcoal">
                  Design Concept Notice — Phase 2 Internal Architecture
                </h4>
                <p className="text-xs text-charcoal-500 mt-1 leading-relaxed">
                  You have accessed the preview entry point for the upcoming <strong>Danieli Corus Laboratory Information Management System (LIMS)</strong>. This public-facing concept is intentionally isolated from internal laboratory operations.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-wider text-charcoal-400 uppercase">
              Phase 2 Internal LIMS Roadmap Scope
            </h4>
            
            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div className="border border-industrial-border p-3.5 bg-white space-y-2">
                <div className="flex items-center space-x-2 text-charcoal font-semibold">
                  <Cpu className="w-4 h-4 text-industrial-teal" />
                  <span>Sample Barcode Chain-of-Custody</span>
                </div>
                <p className="text-charcoal-500 leading-normal">
                  End-to-end specimen traceability from pallet arrival through physical sectioning, testing queues, and dry archive retention.
                </p>
              </div>

              <div className="border border-industrial-border p-3.5 bg-white space-y-2">
                <div className="flex items-center space-x-2 text-charcoal font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-industrial-teal" />
                  <span>DC-SPEC Acceptance Engine</span>
                </div>
                <p className="text-charcoal-500 leading-normal">
                  Automated tolerance checking against Danieli Corus procurement limits with statistical outlier detection.
                </p>
              </div>

              <div className="border border-industrial-border p-3.5 bg-white space-y-2">
                <div className="flex items-center space-x-2 text-charcoal font-semibold">
                  <Lock className="w-4 h-4 text-industrial-teal" />
                  <span>Role-Based Engineering Access</span>
                </div>
                <p className="text-charcoal-500 leading-normal">
                  Segregated roles for Lab Technicians, Quality Supervisors, Lead Metallurgists, and External Plant Observers.
                </p>
              </div>

              <div className="border border-industrial-border p-3.5 bg-white space-y-2">
                <div className="flex items-center space-x-2 text-charcoal font-semibold">
                  <Clock className="w-4 h-4 text-industrial-teal" />
                  <span>Cryptographic Certificate Issuance</span>
                </div>
                <p className="text-charcoal-500 leading-normal">
                  Digital four-eyes sign-off workflow generating tamper-evident Inspection Certificates for plant acceptance.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-industrial-border pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-charcoal-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block animate-pulse"></span>
              <span>Internal Authentication Gateway: Scheduled for Development</span>
            </div>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 bg-charcoal text-white hover:bg-industrial-orange transition-colors font-medium text-xs uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-industrial-orange"
            >
              Return to Public Site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
