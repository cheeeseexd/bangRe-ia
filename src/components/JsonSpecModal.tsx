import React, { useState } from 'react';
import { BANG_SPEC, MAIN_PAGES_PHASE1, AUDIT_LOG_PHASE1, CHANGELOG_PHASE1 } from '../data/bangSpecData';
import { X, Copy, Check, Download, FileJson } from 'lucide-react';

interface JsonSpecModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JsonSpecModal: React.FC<JsonSpecModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedSchema, setSelectedSchema] = useState<'main_pages' | 'full_spec' | 'audit_log'>('main_pages');

  if (!isOpen) return null;

  const getPayload = () => {
    switch (selectedSchema) {
      case 'main_pages':
        return {
          schemaVersion: "2026.1.0-phase1",
          description: "Bang Design 2026 Phase 1 Top-Level Main Pages Specification",
          approvedPrimaryNavigation: AUDIT_LOG_PHASE1.approvedPrimaryNav,
          mainPages: MAIN_PAGES_PHASE1
        };
      case 'audit_log':
        return {
          auditLog: AUDIT_LOG_PHASE1,
          changeLog: CHANGELOG_PHASE1
        };
      case 'full_spec':
        return BANG_SPEC;
    }
  };

  const currentPayload = getPayload();
  const jsonString = JSON.stringify(currentPayload, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bang-design-${selectedSchema}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-none flex items-center justify-center p-4">
      <div className="bg-white border border-black max-w-4xl w-full max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-[#E5E5E5] bg-[#FAFAFA] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <FileJson className="w-4 h-4 text-black" />
            <span className="text-xs font-bold text-black">
              JSON Specification Inspector
            </span>
          </div>

          <div className="flex items-center space-x-1 border border-[#E5E5E5] bg-white p-0.5 text-xs">
            <button
              onClick={() => setSelectedSchema('main_pages')}
              className={`px-2.5 py-1 text-xs transition-colors ${
                selectedSchema === 'main_pages'
                  ? 'bg-black text-white font-medium'
                  : 'text-[#525252] hover:text-black'
              }`}
            >
              [01] Phase 1 Main Pages ({MAIN_PAGES_PHASE1.length})
            </button>
            <button
              onClick={() => setSelectedSchema('audit_log')}
              className={`px-2.5 py-1 text-xs transition-colors ${
                selectedSchema === 'audit_log'
                  ? 'bg-black text-white font-medium'
                  : 'text-[#525252] hover:text-black'
              }`}
            >
              [02] Audit & Change Log
            </button>
            <button
              onClick={() => setSelectedSchema('full_spec')}
              className={`px-2.5 py-1 text-xs transition-colors ${
                selectedSchema === 'full_spec'
                  ? 'bg-black text-white font-medium'
                  : 'text-[#525252] hover:text-black'
              }`}
            >
              [03] Full Blueprint Tree
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="px-2.5 py-1 text-xs border border-[#E5E5E5] bg-white hover:border-black flex items-center space-x-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-black" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy JSON'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-2.5 py-1 text-xs border border-[#E5E5E5] bg-white hover:border-black flex items-center space-x-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-black hover:text-white border border-[#E5E5E5]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* JSON Code Viewer */}
        <div className="flex-1 overflow-auto p-4 bg-[#111111] text-[#E5E5E5] text-xs font-mono leading-relaxed selection:bg-white selection:text-black">
          <pre>{jsonString}</pre>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#E5E5E5] bg-[#FAFAFA] flex justify-between items-center text-[11px] text-[#737373]">
          <span>Schema Target: WordPress Elementor Pro + ACF Pro</span>
          <span>Size: ~{Math.round(jsonString.length / 1024)} KB</span>
        </div>
      </div>
    </div>
  );
};


