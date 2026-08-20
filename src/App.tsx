/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TopNav, AppTabType } from './components/TopNav';
import { IAFlowchartTab } from './components/IAFlowchartTab';
import { MainPagesTableTab } from './components/MainPagesTableTab';
import { SubpagesTableTab } from './components/SubpagesTableTab';
import { LegacyRedirectsTab } from './components/LegacyRedirectsTab';
import { SourcesTab } from './components/SourcesTab';
import { LiveWebsiteView } from './components/LiveWebsiteView';
import { AIConciergeModal } from './components/AIConciergeModal';
import { JsonSpecModal } from './components/JsonSpecModal';
import { BANG_SPEC } from './data/bangSpecData';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTabType>('flowchart');
  const [livePageSlug, setLivePageSlug] = useState<string>('/');
  const [isAIModalOpen, setIsAIModalOpen] = useState<boolean>(false);
  const [aiInitialPrompt, setAiInitialPrompt] = useState<string>('');
  const [isJsonModalOpen, setIsJsonModalOpen] = useState<boolean>(false);

  // Transition to live page preview
  const handlePreviewLivePage = (slug: string) => {
    setLivePageSlug(slug);
    setActiveTab('live');
  };

  // Transition from live page back to flowchart
  const handleOpenNodeInBlueprint = (slug: string) => {
    setActiveTab('flowchart');
  };

  const handleOpenAIConcierge = (prompt?: string) => {
    setAiInitialPrompt(prompt || '');
    setIsAIModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col selection:bg-black selection:text-white">
      {/* Top Universal Control Header */}
      <TopNav
        currentTab={activeTab}
        onSelectTab={(tab) => {
          if (tab === 'ai_concierge') {
            setIsAIModalOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        onOpenJsonSpec={() => setIsJsonModalOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'flowchart' && (
          <IAFlowchartTab onPreviewLivePage={handlePreviewLivePage} />
        )}

        {activeTab === 'main_pages' && (
          <MainPagesTableTab onPreviewLivePage={handlePreviewLivePage} />
        )}

        {activeTab === 'subpages' && (
          <SubpagesTableTab onPreviewLivePage={handlePreviewLivePage} />
        )}

        {activeTab === 'redirects' && (
          <LegacyRedirectsTab />
        )}

        {activeTab === 'sources' && (
          <SourcesTab />
        )}

        {activeTab === 'live' && (
          <LiveWebsiteView
            initialSlug={livePageSlug}
            onOpenAIConcierge={handleOpenAIConcierge}
            onOpenNodeInBlueprint={handleOpenNodeInBlueprint}
          />
        )}
      </main>

      {/* Floating AI Concierge Drawer */}
      <AIConciergeModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        initialQuery={aiInitialPrompt}
        onSelectNodeInTree={() => {
          setActiveTab('flowchart');
          setIsAIModalOpen(false);
        }}
      />

      {/* JSON Specification Modal */}
      <JsonSpecModal
        isOpen={isJsonModalOpen}
        onClose={() => setIsJsonModalOpen(false)}
      />
    </div>
  );
}



