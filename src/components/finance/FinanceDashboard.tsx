import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FinanceOverview from './FinanceOverview';
import LogExpense from './LogExpense';
import LogIncome from './LogIncome';
import Ingredients from './Ingredients';
import FinanceReports from './FinanceReports';
import FinanceLedger from './FinanceLedger';
import Payroll from './Payroll';
import DailyBalances from './DailyBalances';
import { LayoutDashboard, Receipt, TrendingUp, Scale, FileBarChart, List, Clock, Wallet } from 'lucide-react';
import type { UserProfile } from '../../types';

export type FinanceRole = 'owner' | 'manager' | 'cashier';

// Lakeside roles → finance roles: admin = owner, manager = manager, staff = cashier.
export function getFinanceRole(profile: Pick<UserProfile, 'role'> | null | undefined): FinanceRole {
  if (!profile) return 'cashier';
  if (profile.role === 'admin') return 'owner';
  if (profile.role === 'manager') return 'manager';
  return 'cashier';
}

export const FINANCE_TABS = [
  { id: 'overview',     label: 'Overview',     icon: <LayoutDashboard size={16} />, roles: ['owner', 'manager'] },
  { id: 'expense',      label: 'Log Expense',  icon: <Receipt size={16} />,         roles: ['owner', 'manager', 'cashier'] },
  { id: 'income',       label: 'Log Income',   icon: <TrendingUp size={16} />,      roles: ['owner', 'manager', 'cashier'] },
  // Daily Balances: open running ledger of Cash/KBank/Krungsri closing
  // figures, one row per date. Any of the three roles can enter or correct
  // a figure at any time (see DailyBalances.tsx) — no verify/lock workflow
  // beyond the automatic per-date lock.
  { id: 'daily-balances', label: 'Daily Balances', icon: <Wallet size={16} />,      roles: ['owner', 'manager', 'cashier'] },
  { id: 'ledger',       label: 'Ledger',       icon: <List size={16} />,            roles: ['owner', 'manager'] },
  // Payroll: time-card OCR + salary advance lookup. Deliberately excludes
  // 'cashier' — see isManager() in firestore.rules, which the
  // payroll_timecards collection is gated on.
  { id: 'payroll',      label: 'Payroll',      icon: <Clock size={16} />,           roles: ['owner', 'manager'] },
  { id: 'ingredients',  label: 'Ingredients',  icon: <Scale size={16} />,           roles: ['owner', 'manager'] },
  { id: 'reports',      label: 'Reports',      icon: <FileBarChart size={16} />,    roles: ['owner'] },
];

// `user` is the Firebase Auth user (email/uid) — the finance components read
// user.email for logged_by / updatedBy. `profile` carries the Lakeside role.
export default function FinanceDashboard({ user, profile }: { user: any; profile: UserProfile | null }) {
  const financeRole = getFinanceRole(profile);
  const tabs = FINANCE_TABS.filter(t => t.roles.includes(financeRole));
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedTab = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabs.find(t => t.id === requestedTab)?.id || tabs[0]?.id || 'expense');

  useEffect(() => {
    if (requestedTab && tabs.some(t => t.id === requestedTab)) setActiveTab(requestedTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestedTab]);

  const select = (id: string) => {
    setActiveTab(id);
    setSearchParams(prev => { prev.set('tab', id); return prev; }, { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => select(t.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === t.id ? 'border-[#c9a84c] text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>
      </div>
      {activeTab === 'overview'    && <FinanceOverview financeRole={financeRole} />}
      {activeTab === 'expense'     && <LogExpense user={user} financeRole={financeRole} />}
      {activeTab === 'income'      && <LogIncome user={user} financeRole={financeRole} />}
      {activeTab === 'daily-balances' && <DailyBalances user={user} />}
      {activeTab === 'ledger'      && <FinanceLedger user={user} financeRole={financeRole} />}
      {activeTab === 'payroll'     && <Payroll user={user} financeRole={financeRole} />}
      {activeTab === 'ingredients' && <Ingredients />}
      {activeTab === 'reports'     && <FinanceReports />}
    </div>
  );
}
