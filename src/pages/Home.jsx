import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, Activity, Bookmark, Search, ChevronRight, Info, AlertTriangle, ShieldCheck } from 'lucide-react';

const KNOWLEDGE_BASE = [
  {
    id: 'malware',
    title: 'What is Malware?',
    icon: <AlertTriangle className="text-orange-500" size={24} />,
    description: 'Malicious software designed to disrupt, damage, or gain unauthorized access to a computer system.',
    tips: ['Keep OS updated', 'Use Antivirus', 'Avoid shady links']
  },
  {
    id: 'phishing',
    title: 'Spotting Phishing',
    icon: <Info className="text-blue-500" size={24} />,
    description: 'Fraudulent attempts to obtain sensitive information by disguising as a trustworthy entity in electronic communication.',
    tips: ['Verify sender email', 'Check URLs carefully', 'Never share OTPs']
  },
  {
    id: 'ransomware',
    title: 'Ransomware 101',
    icon: <ShieldAlert className="text-red-500" size={24} />,
    description: 'A type of malware that restricts access to your data or system, demanding a ransom to restore it.',
    tips: ['Keep offline backups', 'Use robust firewalls', 'Train employees']
  }
];

export default function Home() {
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCard, setActiveCard] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/explorer');
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 space-y-16 animate-in fade-in duration-700">
      
      <section className="text-center space-y-8 relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-500/20 via-slate-50/0 to-slate-50/0 dark:from-brand-500/10 dark:via-slate-900/0 dark:to-slate-900/0 blur-2xl"></div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white drop-shadow-sm">
          Cyber Threat Intelligence <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-cyan-400">
            Made Accessible
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Explore, analyze, and manage real-world cyber threats. Stay informed with interactive dashboards and rule-based scam analysis.
        </p>
        
        <form onSubmit={handleSearch} className="max-w-xl mx-auto relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-2 border-slate-200 dark:border-slate-800 rounded-2xl leading-5 bg-transparent placeholder-slate-400 focus:outline-none focus:ring-0 focus:border-brand-500 transition-all text-lg text-slate-900 dark:text-white shadow-sm hover:shadow-md focus:shadow-lg"
            placeholder="Search for threats, CVEs, or malware..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="absolute inset-y-2 right-2 px-6 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-colors shadow-sm">
            Search
          </button>
        </form>
      </section>
      
      <section className="pt-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="text-brand-500" size={32} />
            Quick Knowledge Base
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {KNOWLEDGE_BASE.map((item) => (
            <div 
              key={item.id}
              onClick={() => setActiveCard(activeCard === item.id ? null : item.id)}
              className={`glass rounded-2xl p-6 cursor-pointer transition-all duration-300 transform ${
                activeCard === item.id 
                  ? "ring-2 ring-brand-500 scale-[1.02] bg-white/90 dark:bg-slate-800/90 shadow-xl" 
                  : "hover:bg-slate-50/50 dark:hover:bg-slate-800/50 hover:scale-[1.01] hover:shadow-lg"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-100 dark:bg-slate-800/50 rounded-xl">
                  {item.icon}
                </div>
                <ChevronRight className={`text-slate-400 transition-transform duration-300 ${activeCard === item.id ? "rotate-90" : ""}`} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {item.description}
              </p>
              
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                activeCard === item.id ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"
              }`}>
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Key Defense Tips:</h4>
                  <ul className="space-y-1">
                    {item.tips.map((tip, idx) => (
                      <li key={idx} className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" /> {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
        <Link to="/explorer" className="glass p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-3 hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:border-brand-200 dark:hover:border-brand-800 transition-all group">
          <Search className="text-slate-400 group-hover:text-brand-500 transition-colors" size={32} />
          <span className="font-semibold text-slate-900 dark:text-white">Threat Explorer</span>
        </Link>
        <Link to="/dashboard" className="glass p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-3 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-200 dark:hover:border-purple-800 transition-all group">
          <Activity className="text-slate-400 group-hover:text-purple-500 transition-colors" size={32} />
          <span className="font-semibold text-slate-900 dark:text-white">Analytics</span>
        </Link>
        <Link to="/bookmarks" className="glass p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-3 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:border-amber-200 dark:hover:border-amber-800 transition-all group">
          <Bookmark className="text-slate-400 group-hover:text-amber-500 transition-colors" size={32} />
          <span className="font-semibold text-slate-900 dark:text-white">Bookmarks</span>
        </Link>
        <Link to="/quiz" className="glass p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-3 hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-200 dark:hover:border-green-800 transition-all group">
          <div className="text-slate-400 group-hover:text-green-500 transition-colors text-3xl font-bold">?</div>
          <span className="font-semibold text-slate-900 dark:text-white">Take Quiz</span>
        </Link>
      </section>
    </div>
  );
}
