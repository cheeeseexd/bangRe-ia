import React, { useState, useRef, useEffect } from 'react';
import { BANG_SPEC, IANode } from '../data/bangSpecData';
import { ArrowUpRight, Search, ZoomIn, ZoomOut, ChevronDown, ChevronRight, SlidersHorizontal, Eye } from 'lucide-react';

interface WireframeTreeProps {
  selectedNodeId: string;
  onSelectNode: (nodeId: string) => void;
  onPreviewLivePage: (slug: string) => void;
}

export const WireframeTree: React.FC<WireframeTreeProps> = ({
  selectedNodeId,
  onSelectNode,
  onPreviewLivePage
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [viewMode, setViewMode] = useState<'orthogonal_tree' | 'column_grid' | 'journey_flow'>('orthogonal_tree');
  
  // Default sub-branches collapsed so IA Overview shows only main pages until user expands a parent
  const [expandedHubs, setExpandedHubs] = useState<Record<string, boolean>>({});

  const activeNode = BANG_SPEC.iaNodes.find(n => n.id === selectedNodeId) || BANG_SPEC.iaNodes[0];

  const toggleHub = (id: string) => {
    setExpandedHubs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'offer': return 'bg-black text-white';
      case 'industry': return 'bg-[#F4F4F4] text-black border border-[#E5E5E5]';
      case 'work': return 'bg-[#F4F4F4] text-black border border-[#E5E5E5]';
      case 'partnership': return 'bg-[#F4F4F4] text-black border border-[#E5E5E5]';
      case 'conversion': return 'bg-black text-white';
      case 'archive': return 'bg-[#FAFAFA] text-[#737373] border border-dashed border-[#E5E5E5]';
      default: return 'bg-white text-black border border-[#E5E5E5]';
    }
  };

  const rootNode = BANG_SPEC.iaNodes.find(n => n.id === 'node-home')!;
  const primaryBranches = BANG_SPEC.iaNodes.filter(n => n.parentId === 'node-home');
  const getSubNodes = (parentId: string) => BANG_SPEC.iaNodes.filter(n => n.parentId === parentId);

  // Quick helper to check if node matches active filter
  const isNodeVisible = (node: IANode) => {
    const matchesCat = filterCategory === 'all' || node.category === filterCategory;
    const matchesSearch = !searchQuery || 
      node.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.level.includes(searchQuery);
    return matchesCat && matchesSearch;
  };

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-[calc(100vh-54px)] bg-white border-t border-[#E5E5E5]">
      {/* LEFT CANVAS: Orthogonal Architecture Blueprint */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        {/* Architectural Toolbar */}
        <div className="bg-[#FAFAFA] border-b border-[#E5E5E5] px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-3">
            <span className="text-black font-medium text-xs">structure blueprint</span>
            <span className="text-[#D4D4D4]">/</span>
            <span className="text-[#737373] text-[11px]">{BANG_SPEC.iaNodes.length} pages mapped</span>
            <span className="text-[#D4D4D4]">/</span>
            <span className="text-[#737373] text-[11px]">wordpress + elementor pro target</span>
          </div>

          {/* View Mode & Filter Controls */}
          <div className="flex items-center space-x-2">
            {/* View Mode Toggle */}
            <div className="flex border border-[#E5E5E5] bg-white">
              <button
                onClick={() => setViewMode('orthogonal_tree')}
                className={`px-2.5 py-1 text-[11px] transition-colors ${
                  viewMode === 'orthogonal_tree'
                    ? 'bg-black text-white font-medium'
                    : 'text-[#525252] hover:text-black hover:bg-[#F9F9F9]'
                }`}
              >
                orthogonal tree
              </button>
              <button
                onClick={() => setViewMode('column_grid')}
                className={`px-2.5 py-1 text-[11px] transition-colors ${
                  viewMode === 'column_grid'
                    ? 'bg-black text-white font-medium'
                    : 'text-[#525252] hover:text-black hover:bg-[#F9F9F9]'
                }`}
              >
                hierarchy grid
              </button>
              <button
                onClick={() => setViewMode('journey_flow')}
                className={`px-2.5 py-1 text-[11px] transition-colors ${
                  viewMode === 'journey_flow'
                    ? 'bg-black text-white font-medium'
                    : 'text-[#525252] hover:text-black hover:bg-[#F9F9F9]'
                }`}
              >
                conversion journey
              </button>
            </div>

            {/* Filter */}
            <div className="flex border border-[#E5E5E5] bg-white">
              {['all', 'offer', 'industry', 'service', 'conversion'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-2 py-1 text-[11px] transition-colors ${
                    filterCategory === cat
                      ? 'bg-black text-white font-medium'
                      : 'text-[#737373] hover:text-black hover:bg-[#F9F9F9]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="search slug or name..."
                className="px-2.5 py-1 text-[11px] bg-white border border-[#E5E5E5] focus:border-black focus:outline-none w-36"
              />
            </div>

            {/* Zoom */}
            <div className="flex items-center border border-[#E5E5E5] bg-white">
              <button
                onClick={() => setZoomLevel(prev => Math.max(70, prev - 10))}
                className="px-1.5 py-1 text-[#737373] hover:text-black"
                title="zoom out"
              >
                <ZoomOut className="w-3 h-3" />
              </button>
              <span className="px-1.5 text-[10px] text-[#525252]">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel(prev => Math.min(130, prev + 10))}
                className="px-1.5 py-1 text-[#737373] hover:text-black"
                title="zoom in"
              >
                <ZoomIn className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* TREE CANVAS */}
        <div className="flex-1 overflow-auto bg-blueprint-grid p-8 lg:p-10">
          <div
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left' }}
            className="min-w-[1440px] pb-32"
          >
            {/* VIEW MODE 1: PURE ORTHOGONAL TREE */}
            {viewMode === 'orthogonal_tree' && (
              <div className="flex flex-col items-center">
                {/* Level 00: Apex Root */}
                <div className="text-xs text-[#737373] mb-2.5 font-medium">
                  [00.0] root apex & conversion master
                </div>

                <div
                  onClick={() => onSelectNode(rootNode.id)}
                  className={`w-[460px] cursor-pointer bg-white p-5 border transition-all text-left ${
                    selectedNodeId === rootNode.id
                      ? 'border-black ring-2 ring-black border-t-4'
                      : 'border-[#E5E5E5] hover:border-black'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#737373] font-medium">[00.0]</span>
                    <span className="text-[11px] px-2 py-0.5 bg-black text-white font-medium">
                      master root
                    </span>
                  </div>
                  <div className="text-lg font-medium text-black lowercase mb-1">
                    {rootNode.title}
                  </div>
                  <div className="text-xs text-[#737373] mb-2.5">
                    {rootNode.slug}
                  </div>
                  <p className="text-xs text-[#525252] leading-relaxed mb-3.5">
                    {rootNode.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {rootNode.components.slice(0, 6).map((comp, idx) => (
                      <span key={idx} className="text-[11px] px-2 py-0.5 border border-[#E5E5E5] text-[#525252] bg-[#FAFAFA]">
                        {comp.toLowerCase()}
                      </span>
                    ))}
                    {rootNode.components.length > 6 && (
                      <span className="text-[11px] px-2 py-0.5 bg-[#F4F4F4] text-[#737373]">
                        +{rootNode.components.length - 6}
                      </span>
                    )}
                  </div>
                </div>

                {/* SVG Orthogonal Connector Spine */}
                <div className="w-[1360px] h-14 relative flex items-center justify-center my-0">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1360 56">
                    {/* Stem down from root apex center (x=680, y=0 to y=28) */}
                    <line x1="680" y1="0" x2="680" y2="28" stroke="#000000" strokeWidth="1.5" />
                    
                    {/* Main horizontal bus at y=28 spanning the columns */}
                    {primaryBranches.length > 1 && (
                      <line
                        x1={1360 / primaryBranches.length / 2}
                        y1="28"
                        x2={1360 - (1360 / primaryBranches.length / 2)}
                        y2="28"
                        stroke="#000000"
                        strokeWidth="1.5"
                      />
                    )}

                    {/* Dynamic branch drops down to each child column */}
                    {primaryBranches.map((_, idx) => {
                      const colWidth = 1360 / primaryBranches.length;
                      const cx = colWidth * idx + colWidth / 2;
                      return (
                        <line key={idx} x1={cx} y1="28" x2={cx} y2="56" stroke="#000000" strokeWidth="1.5" />
                      );
                    })}
                  </svg>
                </div>

                {/* Level 01 Columns */}
                <div className="grid grid-cols-6 gap-5 w-[1360px] items-start">
                  {primaryBranches.map((branch) => {
                    const children = getSubNodes(branch.id);
                    const isExpanded = expandedHubs[branch.id] ?? true;
                    const isSelected = selectedNodeId === branch.id;
                    const visible = isNodeVisible(branch);

                    return (
                      <div
                        key={branch.id}
                        className={`flex flex-col items-center transition-opacity ${visible ? 'opacity-100' : 'opacity-30'}`}
                      >
                        {/* Branch Card */}
                        <div
                          onClick={() => onSelectNode(branch.id)}
                          className={`w-full cursor-pointer bg-white p-4 border text-left transition-all ${
                            isSelected
                              ? 'border-black ring-2 ring-black border-t-4'
                              : 'border-[#E5E5E5] hover:border-black'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[11px] text-[#737373] font-medium">[{branch.level}]</span>
                            <span className={`text-[10px] px-1.5 py-0.5 ${getCategoryBadge(branch.category)}`}>
                              {branch.category}
                            </span>
                          </div>
                          <div className="text-sm font-medium text-black lowercase truncate mb-1">
                            {branch.title}
                          </div>
                          <div className="text-xs text-[#737373] truncate mb-2.5">
                            {branch.slug}
                          </div>

                          {children.length > 0 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleHub(branch.id);
                              }}
                              className="w-full py-1.5 text-[11px] text-center border border-[#E5E5E5] bg-[#FAFAFA] hover:bg-black hover:text-white transition-colors font-medium"
                            >
                              {isExpanded ? `hide ${children.length} sub-pages` : `show ${children.length} sub-pages`}
                            </button>
                          )}
                        </div>

                        {/* Orthogonal Sub-Tree SVG & Nodes */}
                        {children.length > 0 && isExpanded && (
                          <div className="w-full flex flex-col items-center mt-2.5">
                            <div className="w-[1.5px] h-3.5 bg-black" />
                            <div className="w-full space-y-2.5 border-l-2 border-black pl-2.5">
                              {children.map((childNode) => {
                                const isChildSelected = selectedNodeId === childNode.id;
                                const childVisible = isNodeVisible(childNode);

                                return (
                                  <div
                                    key={childNode.id}
                                    onClick={() => onSelectNode(childNode.id)}
                                    className={`w-full cursor-pointer bg-white p-3 border text-left transition-all ${
                                      !childVisible ? 'opacity-30' : ''
                                    } ${
                                      isChildSelected
                                        ? 'border-black ring-2 ring-black border-l-4'
                                        : 'border-[#E5E5E5] hover:border-black'
                                    }`}
                                  >
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-[10px] text-[#737373] font-medium">[{childNode.level}]</span>
                                      {childNode.category === 'offer' && (
                                        <span className="text-[9px] bg-black text-white px-1.5 py-0.5 font-medium">
                                          primary offer
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-xs font-medium text-black lowercase leading-snug mb-0.5">
                                      {childNode.title}
                                    </div>
                                    <div className="text-[11px] text-[#737373] truncate">
                                      {childNode.slug}
                                    </div>
                                    {childNode.redirectNotes && (
                                      <div className="mt-1.5 text-[10px] text-amber-900 bg-amber-50 px-1.5 py-0.5 border border-amber-200">
                                        301 redirect rule
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* VIEW MODE 2: HIERARCHY COLUMN GRID */}
            {viewMode === 'column_grid' && (
              <div className="space-y-8">
                <div className="text-xs text-[#737373]">
                  structured by level taxonomy (00.0 root, 01.0 offers & capabilities, 02.0 industries, 03.0 work, 04.0 engagement, 05.0 conversion)
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {BANG_SPEC.iaNodes.filter(isNodeVisible).map((node) => (
                    <div
                      key={node.id}
                      onClick={() => onSelectNode(node.id)}
                      className={`p-4 bg-white border cursor-pointer transition-all ${
                        selectedNodeId === node.id
                          ? 'border-black ring-2 ring-black'
                          : 'border-[#E5E5E5] hover:border-black'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-[#737373]">[{node.level}]</span>
                        <span className={`text-[9px] px-1.5 py-0.5 ${getCategoryBadge(node.category)}`}>
                          {node.category}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-black lowercase mb-1">
                        {node.title}
                      </div>
                      <div className="text-xs text-[#737373] mb-2">{node.slug}</div>
                      <p className="text-xs text-[#525252] line-clamp-2 leading-relaxed mb-3">
                        {node.description}
                      </p>
                      <div className="flex justify-between items-center text-[10px] text-[#737373] pt-2 border-t border-[#E5E5E5]">
                        <span>{node.components.length} components</span>
                        <span className="text-black font-medium">{node.primaryCTA}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW MODE 3: CONVERSION JOURNEY FLOW */}
            {viewMode === 'journey_flow' && (
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="text-xs text-[#737373]">
                  sequential visitor conversion path: arrival → qualification → offer routing → strategy call
                </div>

                <div className="space-y-4">
                  {[
                    { step: '01. arrive', page: 'home [/]', action: 'evaluate value within 5 seconds; review verified metrics & client proof' },
                    { step: '02. understand fit', page: 'choose your path selector', action: 'self-select between idea stage, product redesign, DFM tooling, or digital growth' },
                    { step: '03. branch to offer', page: 'product design to mfg [/product-design-to-manufacturing] OR digital growth [/digital-growth]', action: 'review capabilities, deliverables, and validated case study metrics' },
                    { step: '04. self-qualify', page: '4-step qualification engine [/start-for-free]', action: 'answer 4 short questions on stage, product type, and timeline' },
                    { step: '05. conversion close', page: 'calendar booking / brief / ai concierge', action: 'confirm 30-minute strategy call with leadership or submit confidential NDA brief' }
                  ].map((j, i) => (
                    <div key={i} className="p-4 border border-[#E5E5E5] bg-white flex items-start space-x-4">
                      <div className="w-8 h-8 bg-black text-white flex items-center justify-center text-xs font-semibold shrink-0">
                        0{i + 1}
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="flex justify-between">
                          <span className="text-xs font-medium text-black lowercase">{j.step}</span>
                          <span className="text-[11px] text-[#737373]">{j.page}</span>
                        </div>
                        <p className="text-xs text-[#525252] leading-relaxed">{j.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR: Focused Node Inspector */}
      <div className="w-full lg:w-[380px] bg-[#FAFAFA] border-l border-[#E5E5E5] flex flex-col h-full overflow-y-auto">
        {/* Header */}
        <div className="p-5 border-b border-[#E5E5E5] bg-white">
          <div className="flex items-center justify-between text-xs text-[#737373] mb-1.5 font-medium">
            <span>node details</span>
            <span>[{activeNode.level}]</span>
          </div>
          <h2 className="text-lg font-medium text-black lowercase mb-1.5">
            {activeNode.title}
          </h2>
          <div className="text-xs text-[#525252] bg-[#F4F4F4] px-2.5 py-1.5 border border-[#E5E5E5] font-mono">
            {activeNode.slug}
          </div>
        </div>

        {/* Inspector Body */}
        <div className="p-5 space-y-5 text-xs">
          {/* Action: Open in Live View */}
          <button
            onClick={() => onPreviewLivePage(activeNode.slug)}
            className="w-full py-3 px-3 bg-black text-white hover:bg-neutral-800 text-xs font-medium flex items-center justify-center space-x-2 transition-colors"
          >
            <span>view in 2026 live layout</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          {/* Strategic Purpose */}
          <div className="space-y-1.5">
            <div className="text-[11px] text-[#737373] font-medium">
              purpose & function
            </div>
            <div className="p-3 bg-white border border-[#E5E5E5] text-[#333333] leading-relaxed text-xs">
              {activeNode.description}
            </div>
          </div>

          {/* Target Buyer */}
          {activeNode.targetAudience && (
            <div className="space-y-1.5">
              <div className="text-[11px] text-[#737373] font-medium">
                target buyer
              </div>
              <div className="p-2.5 bg-white border border-[#E5E5E5] text-[#333333] text-xs">
                {activeNode.targetAudience}
              </div>
            </div>
          )}

          {/* Component Inventory */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[11px] text-[#737373] font-medium">
              <span>component blueprint</span>
              <span>{activeNode.components.length} modules</span>
            </div>
            <div className="bg-white border border-[#E5E5E5] divide-y divide-[#F4F4F4]">
              {activeNode.components.map((comp, idx) => (
                <div key={idx} className="p-2 flex items-center justify-between text-xs">
                  <span className="text-[#737373] text-[11px]">0{idx + 1}.</span>
                  <span className="text-black font-medium">{comp.toLowerCase()}</span>
                  <span className="text-[10px] text-[#737373] bg-[#F4F4F4] px-1.5 py-0.5 border border-[#E5E5E5]">
                    acf field
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sub-items */}
          {activeNode.subItems && activeNode.subItems.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[11px] text-[#737373] font-medium">
                capabilities / items
              </div>
              <div className="p-2.5 bg-white border border-[#E5E5E5] space-y-1">
                {activeNode.subItems.map((item, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-[#525252]">
                    <span className="text-black">•</span>
                    <span>{item.toLowerCase()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Primary CTA */}
          <div className="space-y-1.5">
            <div className="text-[11px] text-[#737373] font-medium">
              single primary conversion goal
            </div>
            <div className="p-2.5 bg-white border border-black flex items-center justify-between">
              <span className="font-medium text-black">{activeNode.primaryCTA}</span>
              <span className="text-[10px] bg-black text-white px-1.5 py-0.5">
                single cta
              </span>
            </div>
          </div>

          {/* Redirect / SEO rule */}
          {activeNode.redirectNotes && (
            <div className="space-y-1.5">
              <div className="text-[11px] text-amber-900 font-medium">
                legacy redirect & seo rule
              </div>
              <div className="p-2.5 bg-amber-50 border border-amber-200 text-amber-950 text-xs leading-relaxed">
                {activeNode.redirectNotes}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
