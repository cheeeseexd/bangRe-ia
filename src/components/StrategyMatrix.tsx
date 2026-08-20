import React, { useState } from 'react';
import { BANG_SPEC } from '../data/bangSpecData';
import { 
  CheckCircle2, 
  GitBranch, 
  ArrowRightLeft, 
  Activity, 
  Database, 
  FileCheck 
} from 'lucide-react';

export const StrategyMatrix: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'redirects' | 'analytics' | 'content_model' | 'golden_set'>('pipeline');

  return (
    <div className="min-h-[calc(100vh-65px)] bg-white border-t border-[#E5E5E5] flex flex-col">
      {/* Sub-Header & Navigation Tabs */}
      <div className="bg-[#FAFAFA] border-b border-[#E5E5E5] px-6 lg:px-12 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3 text-xs">
          <span className="text-black font-semibold text-xs">// strategy & technical contracts</span>
          <span className="text-[#D4D4D4]">|</span>
          <span className="text-xs text-[#737373]">Bang Design 2026 Re-Authoring Framework</span>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center border border-[#E5E5E5] bg-white">
          {[
            { id: 'pipeline', label: '01. elementor pipeline & qa', icon: GitBranch },
            { id: 'redirects', label: '02. 301 redirects & seo', icon: ArrowRightLeft },
            { id: 'analytics', label: '03. measurement events', icon: Activity },
            { id: 'content_model', label: '04. cpt schema', icon: Database },
            { id: 'golden_set', label: '05. golden set & sequence', icon: FileCheck }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 text-xs transition-colors flex items-center space-x-1.5 ${
                  activeTab === tab.id
                    ? 'bg-black text-white font-medium'
                    : 'text-[#525252] hover:text-black hover:bg-[#F9F9F9]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 lg:p-12 max-w-7xl mx-auto w-full space-y-8">
        {/* TAB 1: ELEMENTOR WORKFLOW & QA CHECKLIST */}
        {activeTab === 'pipeline' && (
          <div className="space-y-10">
            <div className="space-y-2">
              <div className="text-xs text-[#737373]">
                // elementor pro 7-stage publishing pipeline
              </div>
              <h2 className="text-2xl font-medium tracking-tight text-black lowercase">
                Publishing Pipeline & Strict Human-in-the-Loop Governance
              </h2>
              <p className="text-xs text-[#525252] max-w-3xl">
                Rule: AI may generate structured draft payloads via the WordPress REST API, but must never publish directly to production without staging QA approval.
              </p>
            </div>

            {/* Pipeline Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {BANG_SPEC.elementorWorkflow.pipeline.map((p) => (
                <div key={p.step} className="p-4 border border-[#E5E5E5] bg-[#FAFAFA] space-y-2">
                  <div className="text-xs text-[#A3A3A3]">stage {p.step}</div>
                  <div className="font-semibold text-sm text-black">{p.name}</div>
                  <p className="text-xs text-[#525252] leading-relaxed">{p.detail}</p>
                </div>
              ))}
            </div>

            {/* QA Checklist Table */}
            <div className="space-y-4 pt-4 border-t border-[#E5E5E5]">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-black lowercase">
                  Automated QA Validation Protocol (12 Checks)
                </h3>
                <span className="text-[11px] bg-black text-white px-2 py-0.5">
                  100% passing required for staging
                </span>
              </div>

              <div className="border border-[#E5E5E5] divide-y divide-[#E5E5E5]">
                {BANG_SPEC.elementorWorkflow.qaChecks.map((qa, i) => (
                  <div key={i} className="p-3 bg-white flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                      <div>
                        <span className="font-semibold text-black">{qa.check}: </span>
                        <span className="text-[#525252]">{qa.description}</span>
                      </div>
                    </div>
                    <span className="text-xs bg-[#F4F4F4] text-[#737373] px-2 py-0.5 border border-[#E5E5E5]">
                      automated ci check
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 301 REDIRECTS & SEO INTEGRITY */}
        {activeTab === 'redirects' && (
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="text-xs text-[#737373]">
                // legacy url & search equity preservation
              </div>
              <h2 className="text-2xl font-medium tracking-tight text-black lowercase">
                301 Redirect Rules & Legacy Archive Strategy
              </h2>
              <p className="text-xs text-[#525252]">
                Guarantees zero link rot, resolves duplicate canonicals, and retains 100% of organic backlink equity across 500+ blog posts.
              </p>
            </div>

            <div className="border border-black overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAFAFA] border-b border-black text-[#737373] text-[11px]">
                  <tr>
                    <th className="p-3">legacy / source url</th>
                    <th className="p-3">new 2026 target url</th>
                    <th className="p-3">http status</th>
                    <th className="p-3">strategic technical rationale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E5] bg-white">
                  {BANG_SPEC.redirectRules.map((rule, idx) => (
                    <tr key={idx} className="hover:bg-[#FAFAFA]">
                      <td className="p-3 text-amber-900 font-semibold">{rule.source}</td>
                      <td className="p-3 text-black font-semibold">{rule.target}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 bg-black text-white text-[10px]">{rule.status}</span>
                      </td>
                      <td className="p-3 text-[#525252] text-xs">{rule.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1">
              <div className="font-semibold text-xs">
                critical directive: preserved blog & insights archive
              </div>
              <p>
                The 500+ existing blog URLs on bangid.com contain substantial historical authority. They will be retained on their native slug structure with updated modern typography, canonical tags, and cross-links into the two new primary offers.
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: MEASUREMENT & ANALYTICS EVENTS */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="text-xs text-[#737373]">
                // telemetry & conversion tracking schema
              </div>
              <h2 className="text-2xl font-medium tracking-tight text-black lowercase">
                12 Standardized Analytics Events
              </h2>
              <p className="text-xs text-[#525252]">
                Instrumented across header CTAs, path selector clicks, case study filters, qualification steps, and AI Concierge interactions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {BANG_SPEC.analyticsEvents.map((evt, idx) => (
                <div key={idx} className="p-4 border border-[#E5E5E5] bg-[#FAFAFA] space-y-2 text-xs">
                  <div className="flex justify-between items-center text-[11px] text-[#737373]">
                    <span>event 0{idx + 1}</span>
                    <span className="bg-black text-white px-1.5 py-0.2">tracked</span>
                  </div>
                  <div className="font-bold text-black text-xs">{evt.event}</div>
                  <div className="text-[#525252] text-[11px]">
                    <span className="text-[#737373]">trigger: </span>{evt.trigger}
                  </div>
                  <div className="p-2 bg-white border border-[#E5E5E5] text-[11px] text-[#333333]">
                    {evt.payload}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CONTENT MODEL & CUSTOM POST TYPES */}
        {activeTab === 'content_model' && (
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="text-xs text-[#737373]">
                // acf pro structured fields & content hierarchy
              </div>
              <h2 className="text-2xl font-medium tracking-tight text-black lowercase">
                WordPress Custom Post Types (CPT) Schema
              </h2>
              <p className="text-xs text-[#525252]">
                Standardized data structures to ensure repeatable page creation and clean editorial workflows.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 border border-[#E5E5E5] bg-white space-y-3">
                <div className="text-xs text-black font-semibold">1. Case Studies CPT</div>
                <div className="text-xs text-[#525252] space-y-1 text-[11px]">
                  <div>• client_context (text)</div>
                  <div>• challenge_statement (wysiwyg)</div>
                  <div>• bang_role (text)</div>
                  <div>• process_steps (repeater)</div>
                  <div>• engineering_decisions (text)</div>
                  <div>• validated_outcome (wysiwyg)</div>
                  <div>• key_metrics (repeater)</div>
                </div>
              </div>

              <div className="p-5 border border-[#E5E5E5] bg-white space-y-3">
                <div className="text-xs text-black font-semibold">2. Capabilities CPT</div>
                <div className="text-xs text-[#525252] space-y-1 text-[11px]">
                  <div>• pillar_parent (enum)</div>
                  <div>• promise_summary (text)</div>
                  <div>• technical_deliverables (repeater)</div>
                  <div>• dfm_tooling_spec (wysiwyg)</div>
                  <div>• related_industries (post object)</div>
                  <div>• primary_cta_label (text)</div>
                </div>
              </div>

              <div className="p-5 border border-[#E5E5E5] bg-white space-y-3">
                <div className="text-xs text-black font-semibold">3. Industries CPT</div>
                <div className="text-xs text-[#525252] space-y-1 text-[11px]">
                  <div>• sector_headline (text)</div>
                  <div>• regulatory_pain_points (repeater)</div>
                  <div>• human_factors_protocol (text)</div>
                  <div>• flagship_case_study (post object)</div>
                  <div>• canonical_route (text)</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: GOLDEN SET & ROLLOUT SEQUENCE */}
        {activeTab === 'golden_set' && (
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="text-xs text-[#737373]">
                // initial build execution plan
              </div>
              <h2 className="text-2xl font-medium tracking-tight text-black lowercase">
                The Golden Set & Migration Sequence
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border border-black p-6 space-y-4">
                <div className="text-xs text-black font-bold">
                  The Golden Set (5 Core Templates)
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2 bg-[#FAFAFA] border border-[#E5E5E5] flex items-center justify-between">
                    <span className="font-semibold">01. Home Page</span>
                    <span className="text-[11px] text-[#737373]">/</span>
                  </div>
                  <div className="p-2 bg-[#FAFAFA] border border-[#E5E5E5] flex items-center justify-between">
                    <span className="font-semibold">02. Product Design to Manufacturing</span>
                    <span className="text-[11px] text-[#737373]">/product-design-to-manufacturing</span>
                  </div>
                  <div className="p-2 bg-[#FAFAFA] border border-[#E5E5E5] flex items-center justify-between">
                    <span className="font-semibold">03. Digital Growth</span>
                    <span className="text-[11px] text-[#737373]">/digital-growth</span>
                  </div>
                  <div className="p-2 bg-[#FAFAFA] border border-[#E5E5E5] flex items-center justify-between">
                    <span className="font-semibold">04. Flagship Case Study (SensiFlow)</span>
                    <span className="text-[11px] text-[#737373]">/work/sensiflow</span>
                  </div>
                  <div className="p-2 bg-[#FAFAFA] border border-[#E5E5E5] flex items-center justify-between">
                    <span className="font-semibold">05. Strategy Call & AI Concierge Flow</span>
                    <span className="text-[11px] text-[#737373]">/start-for-free</span>
                  </div>
                </div>
              </div>

              <div className="border border-[#E5E5E5] p-6 bg-[#FAFAFA] space-y-4">
                <div className="text-xs text-black font-bold">
                  Rollout Execution Sequence
                </div>
                <div className="space-y-2.5 text-xs text-[#525252]">
                  <div className="flex items-start space-x-2">
                    <span className="text-black">1.</span>
                    <span>Confirm positioning, master statement, and 2-offer taxonomy.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-black">2.</span>
                    <span>Build Swiss Modernist wireframe design system in Elementor Pro.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-black">3.</span>
                    <span>Implement Golden Set and verify 4-step qualification conversion.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-black">4.</span>
                    <span>Deploy 301 redirects (/sector/consumer, /portfolio/*, media CDN).</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-black">5.</span>
                    <span>Preserve and connect the 500+ blog archive and execute staging QA.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
