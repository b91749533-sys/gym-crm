'use client';

import React, { useState, useEffect } from 'react';
import { Search, Bell, Shield, ChevronDown, Sparkles, CheckCircle2, User as UserIcon, Sun, Moon, Monitor } from 'lucide-react';
import { UserRole, User } from '@/lib/types';
import { Badge } from '../ui/Badge';

interface HeaderProps {
  currentUser: User;
  onSwitchRole: (role: UserRole) => void;
  onOpenCheckIn: () => void;
  onSearchQuery?: (query: string) => void;
}

export type ThemeMode = 'dark' | 'light' | 'system';

export const Header: React.FC<HeaderProps> = ({ currentUser, onSwitchRole, onOpenCheckIn, onSearchQuery }) => {
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [searchVal, setSearchVal] = useState('');

  // Handle Theme switching
  useEffect(() => {
    const root = document.documentElement;
    const applyTheme = (mode: ThemeMode) => {
      root.classList.remove('dark', 'light');
      if (mode === 'system') {
        const systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.classList.add(systemIsDark ? 'dark' : 'light');
      } else {
        root.classList.add(mode);
      }
    };

    applyTheme(theme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = () => {
      if (theme === 'system') applyTheme('system');
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [theme]);

  const rolesList: { role: UserRole; label: string; badge: string }[] = [
    { role: 'ADMIN', label: 'Alex Vance (Admin)', badge: 'ADMIN' },
    { role: 'MANAGER', label: 'Sarah Jenkins (Manager)', badge: 'MANAGER' },
    { role: 'TRAINER', label: 'Marcus Stone (Trainer)', badge: 'TRAINER' },
    { role: 'RECEPTIONIST', label: 'Elena Rostova (Receptionist)', badge: 'RECEPTIONIST' },
    { role: 'MEMBER', label: 'David Chen (Member)', badge: 'MEMBER' },
  ];

  const themeOptions: { mode: ThemeMode; label: string; icon: React.ReactNode }[] = [
    { mode: 'light', label: 'Light', icon: <Sun className="w-4 h-4 text-amber-400" /> },
    { mode: 'dark', label: 'Dark', icon: <Moon className="w-4 h-4 text-cyan-400" /> },
    { mode: 'system', label: 'System', icon: <Monitor className="w-4 h-4 text-purple-400" /> },
  ];

  return (
    <header className="h-16 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900 px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Search Input */}
      <div className="relative w-72 md:w-96">
        <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchVal}
          onChange={(e) => {
            setSearchVal(e.target.value);
            if (onSearchQuery) onSearchQuery(e.target.value);
          }}
          placeholder="Quick search members, plans, invoices..."
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all"
        />
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-3">
        {/* Quick Check-in Terminal Shortcut */}
        <button
          onClick={onOpenCheckIn}
          className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 text-cyan-400 border border-cyan-500/30 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>QR Check-in Pass</span>
        </button>

        {/* Theme Switcher Dropdown (Light, Dark, System) */}
        <div className="relative">
          <button
            onClick={() => setShowThemeMenu(!showThemeMenu)}
            className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-xl transition-colors flex items-center gap-1.5 border border-zinc-800/60"
            title={`Current theme: ${theme}`}
          >
            {theme === 'light' && <Sun className="w-4 h-4 text-amber-400" />}
            {theme === 'dark' && <Moon className="w-4 h-4 text-cyan-400" />}
            {theme === 'system' && <Monitor className="w-4 h-4 text-purple-400" />}
          </button>

          {showThemeMenu && (
            <div className="absolute right-0 mt-2 w-44 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-1.5 z-40">
              <div className="px-3 py-1.5 text-[10px] font-bold text-zinc-500 uppercase tracking-wider border-b border-zinc-800/80 mb-1">
                Appearance Theme
              </div>
              <div className="space-y-0.5">
                {themeOptions.map((opt) => (
                  <button
                    key={opt.mode}
                    onClick={() => {
                      setTheme(opt.mode);
                      setShowThemeMenu(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                      theme === opt.mode ? 'bg-zinc-800 text-cyan-400 font-semibold' : 'text-zinc-300 hover:bg-zinc-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {opt.icon}
                      <span>{opt.label} Mode</span>
                    </div>
                    {theme === opt.mode && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notifications Icon Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-xl transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-cyan-400 absolute top-2 right-2 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-cyan-400 absolute top-2 right-2" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-4 z-40">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <span className="text-xs font-bold text-white uppercase tracking-wider">System Notifications</span>
                <span className="text-[10px] text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded-full border border-cyan-800">3 New</span>
              </div>
              <div className="mt-3 space-y-3.5">
                <div className="flex items-start gap-3 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-zinc-200">Emily Watson VIP Renewal</p>
                    <p className="text-[11px] text-zinc-400">$599.00 processed successfully via Card.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-xs">
                  <Bell className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-zinc-200">Membership Expiration Alert</p>
                    <p className="text-[11px] text-zinc-400">Robert Taylor membership expires in 3 days.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Demo Role Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-2.5 bg-zinc-900 hover:bg-zinc-800/80 border border-zinc-800 px-3 py-1.5 rounded-xl transition-colors"
          >
            <img
              src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
              alt={currentUser.name}
              className="w-6 h-6 rounded-full object-cover border border-zinc-700"
            />
            <div className="text-left hidden md:block">
              <p className="text-xs font-semibold text-white leading-tight">{currentUser.name}</p>
              <p className="text-[10px] text-zinc-400 font-mono leading-tight">{currentUser.role}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-2 z-40">
              <div className="px-3 py-2 text-[10px] font-bold text-zinc-500 uppercase tracking-wider border-b border-zinc-800">
                Switch Demo User & RBAC Role
              </div>
              <div className="py-1 space-y-1">
                {rolesList.map((item) => (
                  <button
                    key={item.role}
                    onClick={() => {
                      onSwitchRole(item.role);
                      setShowRoleMenu(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors ${
                      currentUser.role === item.role ? 'bg-zinc-800 text-cyan-400 font-semibold' : 'text-zinc-300 hover:bg-zinc-800/50'
                    }`}
                  >
                    <span>{item.label}</span>
                    <Badge variant={item.role === 'ADMIN' ? 'cyan' : item.role === 'TRAINER' ? 'purple' : 'default'}>
                      {item.badge}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

