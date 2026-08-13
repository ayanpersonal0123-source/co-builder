import React, { useState, useEffect } from 'react';
import { BuilderProfile, HomeownerProject, ConnectionRequest, LeadMatch } from './types';
import { 
  getStoredBuilders, 
  saveSingleBuilder, 
  getStoredProjects, 
  saveSingleProject, 
  getStoredConnections, 
  saveConnectionRequest 
} from './utils/storage';
import { matchBuildersForProject } from './utils/matching';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProcessSection } from './components/ProcessSection';
import { FeaturedBuilders } from './components/FeaturedBuilders';
import { BuilderCallout } from './components/BuilderCallout';
import { Footer } from './components/Footer';

import { BuilderOnboarding } from './components/BuilderOnboarding';
import { HomeownerFlowModal } from './components/HomeownerFlowModal';
import { MatchedBuildersView } from './components/MatchedBuildersView';
import { BuilderDetailModal } from './components/BuilderDetailModal';
import { BuilderDashboard } from './components/BuilderDashboard';
import { AdminPanel } from './components/AdminPanel';
import { ConnectionRequestModal } from './components/ConnectionRequestModal';

export default function App() {
  const [builders, setBuilders] = useState<BuilderProfile[]>([]);
  const [projects, setProjects] = useState<HomeownerProject[]>([]);
  const [connections, setConnections] = useState<ConnectionRequest[]>([]);

  // View state
  const [currentTab, setCurrentTab] = useState<'home' | 'find-builders' | 'register-builder' | 'builder-dashboard' | 'admin-panel' | 'matched-results'>('home');
  
  // Active Builder session state
  const [activeBuilderId, setActiveBuilderId] = useState<string | null>(null);

  // Active Submitted Homeowner Requirement
  const [currentProject, setCurrentProject] = useState<HomeownerProject | null>(null);
  const [currentMatches, setCurrentMatches] = useState<LeadMatch[]>([]);

  // Modals state
  const [showHomeownerModal, setShowHomeownerModal] = useState<boolean>(false);
  const [detailModalBuilder, setDetailModalBuilder] = useState<BuilderProfile | null>(null);
  const [connectModalBuilder, setConnectModalBuilder] = useState<BuilderProfile | null>(null);

  // Initialize data from local storage
  useEffect(() => {
    const loadedBuilders = getStoredBuilders();
    const loadedProjects = getStoredProjects();
    const loadedConnections = getStoredConnections();

    setBuilders(loadedBuilders);
    setProjects(loadedProjects);
    setConnections(loadedConnections);

    if (loadedBuilders.length > 0) {
      setActiveBuilderId(loadedBuilders[0].id);
    }
  }, []);

  const activeBuilder = builders.find(b => b.id === activeBuilderId) || builders[0];

  // Handle Homeowner Requirement Submission
  const handleSubmitRequirement = (newProject: HomeownerProject) => {
    const updatedProjects = saveSingleProject(newProject);
    setProjects(updatedProjects);
    setShowHomeownerModal(false);

    // Calculate matches
    const matches = matchBuildersForProject(builders, newProject);
    setCurrentProject(newProject);
    setCurrentMatches(matches);
    setCurrentTab('matched-results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Builder Registration & Payment Completion
  const handleCompleteBuilderRegistration = (newRegisteredBuilder: BuilderProfile) => {
    const updatedBuilders = saveSingleBuilder(newRegisteredBuilder);
    setBuilders(updatedBuilders);
    setActiveBuilderId(newRegisteredBuilder.id);
    setCurrentTab('builder-dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Connection Request Submission
  const handleSendConnectionRequest = (req: ConnectionRequest) => {
    const updatedConnections = saveConnectionRequest(req);
    setConnections(updatedConnections);
    setConnectModalBuilder(null);
  };

  // Admin Actions
  const handleToggleBuilderStatus = (builderId: string) => {
    const updated = builders.map(b => {
      if (b.id === builderId) {
        return { ...b, status: b.status === 'active' ? ('suspended' as const) : ('active' as const) };
      }
      return b;
    });
    setBuilders(updated);
    localStorage.setItem('cobuilder_builders_v1', JSON.stringify(updated));
  };

  const handleToggleFeatured = (builderId: string) => {
    const updated = builders.map(b => {
      if (b.id === builderId) {
        return { ...b, isFeatured: !b.isFeatured };
      }
      return b;
    });
    setBuilders(updated);
    localStorage.setItem('cobuilder_builders_v1', JSON.stringify(updated));
  };

  const handleChangePlan = (builderId: string, plan: 'STARTER' | 'PRIORITY') => {
    const updated = builders.map(b => {
      if (b.id === builderId) {
        return { ...b, plan, isFeatured: plan === 'PRIORITY' };
      }
      return b;
    });
    setBuilders(updated);
    localStorage.setItem('cobuilder_builders_v1', JSON.stringify(updated));
  };

  const handleUpdateProfile = (updatedBuilder: BuilderProfile) => {
    const updated = saveSingleBuilder(updatedBuilder);
    setBuilders(updated);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-amber-500 selection:text-slate-950 flex flex-col justify-between">
      
      {/* Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        openHomeownerModal={() => setShowHomeownerModal(true)}
        activeBuilderPlan={activeBuilder?.plan}
        activeBuilderName={activeBuilder?.fullName}
        onSelectBuilderPortal={() => {
          if (activeBuilder) {
            setCurrentTab('builder-dashboard');
          } else {
            setCurrentTab('register-builder');
          }
        }}
      />

      {/* VIEW 1: HOMEPAGE */}
      {currentTab === 'home' && (
        <main className="grow">
          <Hero
            onFindBuilder={() => setShowHomeownerModal(true)}
            onRegisterBuilder={() => setCurrentTab('register-builder')}
            onQuickSearchCity={() => {
              setCurrentTab('find-builders');
            }}
          />

          <ProcessSection
            onStartFlow={() => setShowHomeownerModal(true)}
          />

          <FeaturedBuilders
            builders={builders}
            onSelectBuilder={(b) => setDetailModalBuilder(b)}
            onRequestConnect={(b) => setConnectModalBuilder(b)}
          />

          <BuilderCallout
            onRegisterClick={() => setCurrentTab('register-builder')}
          />
        </main>
      )}

      {/* VIEW 2: FIND BUILDERS CATALOG */}
      {currentTab === 'find-builders' && (
        <main className="grow py-8">
          <FeaturedBuilders
            builders={builders}
            onSelectBuilder={(b) => setDetailModalBuilder(b)}
            onRequestConnect={(b) => setConnectModalBuilder(b)}
          />
        </main>
      )}

      {/* VIEW 3: BUILDER ONBOARDING (6-STEP QUESTIONNAIRE + PREVIEW + PAYMENT WALL) */}
      {currentTab === 'register-builder' && (
        <main className="grow">
          <BuilderOnboarding
            onCompleteAndPay={handleCompleteBuilderRegistration}
            onCancel={() => setCurrentTab('home')}
          />
        </main>
      )}

      {/* VIEW 4: MATCHED BUILDERS RESULTS */}
      {currentTab === 'matched-results' && currentProject && (
        <main className="grow">
          <MatchedBuildersView
            project={currentProject}
            matches={currentMatches}
            onBack={() => setCurrentTab('home')}
            onSelectBuilder={(b) => setDetailModalBuilder(b)}
            onRequestConnect={(b) => setConnectModalBuilder(b)}
          />
        </main>
      )}

      {/* VIEW 5: BUILDER DASHBOARD */}
      {currentTab === 'builder-dashboard' && activeBuilder && (
        <main className="grow">
          <BuilderDashboard
            builder={activeBuilder}
            projects={projects}
            connections={connections}
            onUpgradePlan={(bId) => handleChangePlan(bId, 'PRIORITY')}
            onUpdateProfile={handleUpdateProfile}
          />
        </main>
      )}

      {/* VIEW 6: ADMIN PANEL */}
      {currentTab === 'admin-panel' && (
        <main className="grow">
          <AdminPanel
            builders={builders}
            projects={projects}
            onToggleBuilderStatus={handleToggleBuilderStatus}
            onToggleFeatured={handleToggleFeatured}
            onChangePlan={handleChangePlan}
            onApproveBuilder={(id) => handleToggleBuilderStatus(id)}
          />
        </main>
      )}

      {/* Footer */}
      <Footer
        onFindBuilder={() => setShowHomeownerModal(true)}
        onRegisterBuilder={() => setCurrentTab('register-builder')}
        onOpenAdmin={() => setCurrentTab('admin-panel')}
      />

      {/* MODAL 1: HOMEOWNER REQUIREMENT FLOW */}
      {showHomeownerModal && (
        <HomeownerFlowModal
          onClose={() => setShowHomeownerModal(false)}
          onSubmitRequirement={handleSubmitRequirement}
        />
      )}

      {/* MODAL 2: BUILDER FULL PROFILE DETAIL */}
      {detailModalBuilder && (
        <BuilderDetailModal
          builder={detailModalBuilder}
          onClose={() => setDetailModalBuilder(null)}
          onRequestConnect={(b) => {
            setDetailModalBuilder(null);
            setConnectModalBuilder(b);
          }}
        />
      )}

      {/* MODAL 3: CONNECTION REQUEST */}
      {connectModalBuilder && (
        <ConnectionRequestModal
          builder={connectModalBuilder}
          onClose={() => setConnectModalBuilder(null)}
          onSubmitConnection={handleSendConnectionRequest}
        />
      )}

    </div>
  );
}
