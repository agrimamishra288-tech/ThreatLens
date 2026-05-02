import { useMemo } from 'react';
import useFetchThreats from '../hooks/useFetchThreats';
import Loader from '../components/UI/Loader';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#14b8a6', '#0ea5e9', '#8b5cf6', '#ec4899', '#f59e0b'];
const SEVERITY_COLORS = {
  Critical: '#ef4444',
  High: '#f97316',
  Medium: '#eab308',
  Low: '#22c55e'
};

export default function Dashboard() {
  const { threats, loading, error } = useFetchThreats();

  const categoryData = useMemo(() => {
    const counts = threats.reduce((acc, threat) => {
      acc[threat.category] = (acc[threat.category] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [threats]);

  const severityData = useMemo(() => {
    const counts = threats.reduce((acc, threat) => {
      acc[threat.severity] = (acc[threat.severity] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [threats]);

  if (loading) return <Loader fullScreen />;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Threat Intelligence Dashboard</h1>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="glass p-6 rounded-2xl h-[400px] flex flex-col">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Threats by Category</h2>
          <div className="flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-6 rounded-2xl h-[400px] flex flex-col">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Severity Distribution</h2>
          <div className="flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={severityData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" allowDecimals={false} />
                <RechartsTooltip 
                  cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }}
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={SEVERITY_COLORS[entry.name] || '#14b8a6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="glass p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Quick Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
            <p className="text-3xl font-extrabold text-brand-500">{threats.length}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Total Threats</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
            <p className="text-3xl font-extrabold text-red-500">{severityData.find(d => d.name === 'Critical')?.value || 0}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Critical Severity</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
            <p className="text-3xl font-extrabold text-purple-500">{categoryData.length}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Categories</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
            <p className="text-3xl font-extrabold text-blue-500">100%</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">System Health</p>
          </div>
        </div>
      </div>
    </div>
  );
}
