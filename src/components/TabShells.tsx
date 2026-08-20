import React from 'react';
import { Layers, ArrowRight, ShieldAlert, FileText, Database, Compass, Lock } from 'lucide-react';

export const SubpagesTabShell: React.FC = () => {
  return (
    <div className="bg-white text-black min-h-[calc(100vh-54px)] p-6 lg:p-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#737373]">
          <span>Phase 2 Roadmap</span>
          <span>/</span>
          <span className="text-black">[03] Subpages Shell</span>
        </div>

        <div className="border border-black p-8 bg-[#FAFAFA] space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 text-xs font-bold bg-black text-white">
              <Lock className="w-3.5 h-3.5" />
              <span>Phase 1 Scope Gate: Subpages Tab Shell</span>
            </div>
            <h2 className="text-xl font-bold text-black tracking-tight">
              Phase 2: Subpage Breakdown & Detailed Service/Sector Mapping
            </h2>
            <p className="text-xs text-[#525252] leading-relaxed">
              Per the Phase 1 strategy, subpages are preserved in their current inventory state and will be systematically broken down, scoped, and authored in Phase 2 once top-level navigation and main page messaging are confirmed.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-white border border-[#E5E5E5] space-y-2">
              <div className="font-bold text-black flex items-center space-x-1.5">
                <Layers className="w-4 h-4 text-black" />
                <span>What We Do Subpages (9 Modules)</span>
              </div>
              <ul className="space-y-1 text-[#525252] text-[11px]">
                <li>• Product Design to Manufacturing (Flagship Offer)</li>
                <li>• Digital Growth (Flagship Offer)</li>
                <li>• Product Strategy & Feasibility</li>
                <li>• Product Design & Industrial Styling</li>
                <li>• UX & Service Design</li>
                <li>• Product Engineering & Simulation</li>
                <li>• Managed Production & Tooling</li>
                <li>• 3D & Product Visualization</li>
                <li>• Growth & Launch Support (Pattern-X)</li>
              </ul>
            </div>

            <div className="p-4 bg-white border border-[#E5E5E5] space-y-2">
              <div className="font-bold text-black flex items-center space-x-1.5">
                <Compass className="w-4 h-4 text-black" />
                <span>Industry Clusters (4 Priority Tracks)</span>
              </div>
              <ul className="space-y-1 text-[#525252] text-[11px]">
                <li>• Medical & Scientific Products</li>
                <li>• Industrial & Automation Robotics</li>
                <li>• Consumer Hardware & Appliances</li>
                <li>• Mobility, Energy & Infrastructure</li>
                <li className="pt-2 text-[#737373] italic">↳ 15 legacy sector routes clustered cleanly into 4 main hubs</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-white border border-dashed border-black text-xs text-[#525252] flex items-start space-x-3">
            <ShieldAlert className="w-4 h-4 text-black shrink-0 mt-0.5" />
            <div>
              <strong className="text-black block mb-0.5">Phase 2 Execution Instruction:</strong>
              Do not modify subpage records or URL slugs until Phase 1 main pages and navigation hierarchy are fully approved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RedirectsTabShell: React.FC = () => {
  return (
    <div className="bg-white text-black min-h-[calc(100vh-54px)] p-6 lg:p-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#737373]">
          <span>Phase 3 Roadmap</span>
          <span>/</span>
          <span className="text-black">[04] Legacy & Redirects Shell</span>
        </div>

        <div className="border border-black p-8 bg-[#FAFAFA] space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 text-xs font-bold bg-black text-white">
              <Lock className="w-3.5 h-3.5" />
              <span>Phase 1 Scope Gate: Legacy & Redirects Tab Shell</span>
            </div>
            <h2 className="text-xl font-bold text-black tracking-tight">
              Phase 3: 301 Redirect Rules & Legacy SEO Preservation
            </h2>
            <p className="text-xs text-[#525252] leading-relaxed">
              This shell reserves the architecture for 100% 301 redirect mapping and zero-broken-link enforcement across 500+ legacy blog URLs, old partnership pages, and renamed routes.
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <div className="font-bold text-black">Core Redirect Policy:</div>
            <div className="p-4 bg-white border border-[#E5E5E5] space-y-2 font-mono text-[11px] text-[#525252]">
              <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-1.5">
                <span>/start-for-free → /contact (Talk to Bang)</span>
                <span className="text-black font-semibold">301 Permanent</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-1.5">
                <span>/plans → /how-we-work</span>
                <span className="text-black font-semibold">301 Permanent</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-1.5">
                <span>/program/partner-old → /how-we-work</span>
                <span className="text-black font-semibold">301 Permanent</span>
              </div>
              <div className="flex items-center justify-between pb-0.5">
                <span>/insights/* (500+ blog articles)</span>
                <span className="text-black font-semibold">Preserved 200 OK (Zero Renames)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EvidenceTabShell: React.FC = () => {
  return (
    <div className="bg-white text-black min-h-[calc(100vh-54px)] p-6 lg:p-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#737373]">
          <span>Phase 4 Roadmap</span>
          <span>/</span>
          <span className="text-black">[05] Content & Evidence Shell</span>
        </div>

        <div className="border border-black p-8 bg-[#FAFAFA] space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 text-xs font-bold bg-black text-white">
              <Lock className="w-3.5 h-3.5" />
              <span>Phase 1 Scope Gate: Content & Evidence Tab Shell</span>
            </div>
            <h2 className="text-xl font-bold text-black tracking-tight">
              Phase 4: Proof, Case Study Evidence & Source Audit
            </h2>
            <p className="text-xs text-[#525252] leading-relaxed">
              This tab shell reserves the structured proof repository for cross-referencing client logos, NDA-cleared deliverables, patent certificates, and validated performance metrics against local source documents.
            </p>
          </div>

          <div className="p-4 bg-white border border-[#E5E5E5] space-y-3 text-xs">
            <div className="font-bold text-black">Verification Audit Checklist:</div>
            <ul className="space-y-1.5 text-[11px] text-[#525252]">
              <li className="flex items-center space-x-2">
                <span className="w-3.5 h-3.5 border border-black flex items-center justify-center text-[9px] font-bold">1</span>
                <span>Audit all project revenue metrics and Kickstarter claims with client release forms</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-3.5 h-3.5 border border-black flex items-center justify-center text-[9px] font-bold">2</span>
                <span>Verify ISO 13485, FDA 510(k), and military test reports against client DHF files</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-3.5 h-3.5 border border-black flex items-center justify-center text-[9px] font-bold">3</span>
                <span>Confirm leadership bios, patent registry numbers, and testing lab equipment inventory</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-3.5 h-3.5 border border-black flex items-center justify-center text-[9px] font-bold">4</span>
                <span>Validate client testimonial quotes and partner endorsements</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
