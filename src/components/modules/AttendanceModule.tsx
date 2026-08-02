'use client';

import React, { useState } from 'react';
import { QrCode, Search, CheckCircle2, AlertCircle, Clock, ShieldCheck, UserCheck, Sparkles, RefreshCw } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { AttendanceRecord, MemberProfile } from '@/lib/types';
import { MOCK_ATTENDANCE, MOCK_MEMBERS } from '@/lib/mock-data';

interface AttendanceModuleProps {
  onScanCompleted?: () => void;
}

export const AttendanceModule: React.FC<AttendanceModuleProps> = ({ onScanCompleted }) => {
  const [attendanceList, setAttendanceList] = useState<AttendanceRecord[]>(MOCK_ATTENDANCE);
  const [qrInput, setQrInput] = useState('');
  const [scanResult, setScanResult] = useState<{ success: boolean; message: string; member?: MemberProfile } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSimulateScan = (codeToScan?: string) => {
    const targetCode = codeToScan || qrInput || 'APEX-MEMBER-7722';
    const foundMember = MOCK_MEMBERS.find((m) => m.qrCode.toLowerCase() === targetCode.toLowerCase() || m.user.email.toLowerCase() === targetCode.toLowerCase());

    if (!foundMember) {
      setScanResult({
        success: false,
        message: 'Invalid QR Pass Code or unregistered member account.',
      });
      return;
    }

    if (foundMember.membership?.status !== 'ACTIVE') {
      setScanResult({
        success: false,
        message: `Access Denied: Membership status is ${foundMember.membership?.status || 'EXPIRED'}. Please renew.`,
        member: foundMember,
      });
      return;
    }

    const newRecord: AttendanceRecord = {
      id: `att-${Date.now()}`,
      userId: foundMember.userId,
      userName: foundMember.user.name,
      userAvatar: foundMember.user.avatar,
      userRole: 'MEMBER',
      checkInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      method: 'QR_CODE',
    };

    setAttendanceList([newRecord, ...attendanceList]);
    setScanResult({
      success: true,
      message: `Welcome, ${foundMember.user.name}! Access Granted.`,
      member: foundMember,
    });
    setQrInput('');
    if (onScanCompleted) onScanCompleted();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Attendance & QR Check-in Terminal</h2>
          <p className="text-xs text-zinc-400 mt-1">Real-time facility access scanner and receptionist check-in console.</p>
        </div>
      </div>

      {/* Terminal Scanner Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* QR Scanner Hardware Simulator Card */}
        <Card glow className="bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 border-cyan-500/40 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <QrCode className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">Live Scanner Terminal</h3>
            </div>
            <Badge variant="cyan">SCANNER ONLINE</Badge>
          </div>

          {/* Scanner Viewfinder Box */}
          <div className="relative w-full h-52 bg-zinc-950 rounded-2xl border-2 border-dashed border-cyan-500/40 flex flex-col items-center justify-center p-4 overflow-hidden group">
            <div className="absolute inset-0 bg-cyan-500/5 animate-pulse" />
            <div className="w-full h-0.5 bg-cyan-400 absolute top-0 animate-[bounce_3s_infinite] shadow-[0_0_15px_#06b6d4]" />
            
            <QrCode className="w-16 h-16 text-cyan-400/80 mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-xs font-semibold text-zinc-300 text-center">Position QR Pass Code in Viewfinder</p>
            <p className="text-[10px] text-zinc-500 text-center mt-1">Supports Mobile App Passes & Printed Keytags</p>
          </div>

          {/* Quick Demo Scan Buttons */}
          <div className="mt-4 space-y-2">
            <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">Quick Test Member Scan:</label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs text-zinc-300 justify-start"
                onClick={() => handleSimulateScan('APEX-MEMBER-7722')}
              >
                Scan David Chen (Active)
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs text-zinc-300 justify-start"
                onClick={() => handleSimulateScan('APEX-MEMBER-3322')}
              >
                Scan James (Expired)
              </Button>
            </div>

            <div className="pt-3 flex gap-2">
              <Input
                placeholder="Or type QR code manually..."
                value={qrInput}
                onChange={(e) => setQrInput(e.target.value)}
                className="text-xs"
              />
              <Button variant="glow" size="sm" onClick={() => handleSimulateScan()}>
                Scan
              </Button>
            </div>
          </div>

          {/* Scan Result Feedback Card */}
          {scanResult && (
            <div
              className={`mt-4 p-3.5 rounded-xl text-xs flex items-center gap-3 border ${
                scanResult.success
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                  : 'bg-rose-500/10 border-rose-500/40 text-rose-400'
              }`}
            >
              {scanResult.success ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
              <div>
                <p className="font-bold">{scanResult.message}</p>
                {scanResult.member && <p className="text-[10px] opacity-80">Plan: {scanResult.member.membership?.plan?.name}</p>}
              </div>
            </div>
          )}
        </Card>

        {/* Receptionist Manual Check-in Console */}
        <Card className="lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">Today's Check-in Log</h3>
                <p className="text-xs text-zinc-400">Recorded entry scans for current operating session</p>
              </div>
              <Badge variant="purple">{attendanceList.length} Checked In</Badge>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-500 uppercase tracking-wider font-semibold">
                    <th className="pb-3 px-2">Member</th>
                    <th className="pb-3 px-2">Check-in Time</th>
                    <th className="pb-3 px-2">Method</th>
                    <th className="pb-3 px-2 text-right">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {attendanceList.map((item) => (
                    <tr key={item.id} className="hover:bg-zinc-800/40 transition-colors">
                      <td className="py-3 px-2 flex items-center gap-2.5">
                        <img
                          src={item.userAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                          alt={item.userName}
                          className="w-7 h-7 rounded-full object-cover border border-zinc-700"
                        />
                        <span className="font-semibold text-white">{item.userName}</span>
                      </td>
                      <td className="py-3 px-2 text-zinc-300">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-zinc-500" />
                          {item.checkInTime}
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <Badge variant={item.method === 'QR_CODE' ? 'cyan' : 'purple'}>{item.method}</Badge>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <span className="text-[11px] font-semibold text-emerald-400 flex items-center justify-end gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" /> Approved
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
