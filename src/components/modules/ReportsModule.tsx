'use client';

import React from 'react';
import { BarChart3, Download, FileText, Calendar, Filter } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { exportToCSV } from '@/lib/export-utils';
import { MOCK_PAYMENTS, MOCK_MEMBERS, MOCK_ATTENDANCE } from '@/lib/mock-data';

export const ReportsModule: React.FC = () => {
  const reportsList = [
    { title: 'Monthly Revenue & Financial Ledger Report', count: MOCK_PAYMENTS.length, data: MOCK_PAYMENTS },
    { title: 'Member Retention & Churn Analysis Report', count: MOCK_MEMBERS.length, data: MOCK_MEMBERS },
    { title: 'Daily Facility Check-in & Peak Hour Report', count: MOCK_ATTENDANCE.length, data: MOCK_ATTENDANCE },
  ];

  const handleExport = (title: string, data: any[]) => {
    exportToCSV(title.replace(/\s+/g, '_'), data);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Reports & Business Analytics</h2>
          <p className="text-xs text-zinc-400 mt-1">Exportable CSV & PDF financial, attendance, and retention reports.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reportsList.map((rep, idx) => (
          <Card key={idx} glow className="p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <FileText className="w-6 h-6 text-cyan-400" />
                <Badge variant="cyan">{rep.count} Records</Badge>
              </div>
              <h3 className="text-base font-bold text-white mt-3">{rep.title}</h3>
              <p className="text-xs text-zinc-400 mt-1">Full dataset formatted with date filters and CSV export.</p>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full"
              icon={<Download className="w-4 h-4" />}
              onClick={() => handleExport(rep.title, rep.data)}
            >
              Export Report (CSV)
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
