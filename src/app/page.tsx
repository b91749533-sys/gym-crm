'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { DashboardModule } from '@/components/modules/DashboardModule';
import { MembersModule } from '@/components/modules/MembersModule';
import { MembershipsModule } from '@/components/modules/MembershipsModule';
import { AttendanceModule } from '@/components/modules/AttendanceModule';
import { WorkoutBuilderModule } from '@/components/modules/WorkoutBuilderModule';
import { NutritionModule } from '@/components/modules/NutritionModule';
import { PaymentsModule } from '@/components/modules/PaymentsModule';
import { InventoryModule } from '@/components/modules/InventoryModule';
import { StaffModule } from '@/components/modules/StaffModule';
import { AiSuiteModule } from '@/components/modules/AiSuiteModule';
import { ReportsModule } from '@/components/modules/ReportsModule';
import { SettingsModule } from '@/components/modules/SettingsModule';
import { Modal } from '@/components/ui/Modal';
import { UserRole, User } from '@/lib/types';
import { MOCK_USERS } from '@/lib/mock-data';

export default function GymCRMMainApp() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [currentRole, setCurrentRole] = useState<UserRole>('ADMIN');
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS.admin);
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  const handleRoleSwitch = (newRole: UserRole) => {
    setCurrentRole(newRole);
    const key = newRole.toLowerCase();
    setCurrentUser(MOCK_USERS[key] || MOCK_USERS.admin);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex font-sans antialiased selection:bg-cyan-500 selection:text-zinc-950">
      {/* Sidebar Navigation */}
      <Sidebar currentTab={currentTab} onSelectTab={setCurrentTab} userRole={currentRole} />

      {/* Main Content Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          currentUser={currentUser}
          onSwitchRole={handleRoleSwitch}
          onOpenCheckIn={() => setIsCheckInModalOpen(true)}
          onSearchQuery={(q) => {
            setGlobalSearch(q);
            if (q.length > 2 && currentTab !== 'members') setCurrentTab('members');
          }}
        />

        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {currentTab === 'dashboard' && (
            <DashboardModule
              onNavigate={setCurrentTab}
              onOpenCheckIn={() => setIsCheckInModalOpen(true)}
              onOpenAddMember={() => setCurrentTab('members')}
            />
          )}

          {currentTab === 'members' && <MembersModule initialSearch={globalSearch} />}
          {currentTab === 'memberships' && <MembershipsModule />}
          {currentTab === 'attendance' && <AttendanceModule />}
          {currentTab === 'trainers' && <WorkoutBuilderModule />}
          {currentTab === 'workouts' && <WorkoutBuilderModule />}
          {currentTab === 'nutrition' && <NutritionModule />}
          {currentTab === 'payments' && <PaymentsModule />}
          {currentTab === 'inventory' && <InventoryModule />}
          {currentTab === 'staff' && <StaffModule />}
          {currentTab === 'ai-suite' && <AiSuiteModule />}
          {currentTab === 'reports' && <ReportsModule />}
          {currentTab === 'settings' && <SettingsModule />}
        </main>
      </div>

      {/* Quick QR Check-in Terminal Modal */}
      <Modal
        isOpen={isCheckInModalOpen}
        onClose={() => setIsCheckInModalOpen(false)}
        title="Live QR Pass Access Terminal"
        subtitle="Position member pass code under scanner camera"
        maxWidth="max-w-xl"
      >
        <AttendanceModule onScanCompleted={() => setTimeout(() => setIsCheckInModalOpen(false), 2000)} />
      </Modal>
    </div>
  );
}
