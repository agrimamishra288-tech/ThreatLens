import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, AlertTriangle, Info } from 'lucide-react';

const severityColors = {
  Critical: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800',
  High: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800',
  Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
  Low: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800',
};


const ThreatCard = React.memo(({ threat }) => {
  return (
    <div className="glass rounded-xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-brand-100 dark:bg-brand-900/30 rounded-lg text-brand-600 dark:text-brand-400">
       
            {threat.category === 'Phishing' ? <Info size={20} /> :
             threat.category === 'Malware' || threat.category === 'Ransomware' ? <ShieldAlert size={20} /> :
             <AlertTriangle size={20} />}
          </div>
          <div>
            <h3 className="font-bold text-lg dark:text-white line-clamp-1">{threat.title}</h3>
            <span className="text-sm text-slate-500 dark:text-slate-400">{threat.category}</span>
          </div>
        </div>
     
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${severityColors[threat.severity] || severityColors.Medium}`}>
          {threat.severity}
        </span>
      </div>
      
      <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-grow line-clamp-3">
        {threat.description}
      </p>
      
      <Link
        to={`/threat/${threat.id}`}
        className="w-full text-center px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-medium rounded-lg transition-colors"
      >
        View Details
      </Link>
    </div>
  );
});

export default ThreatCard;
