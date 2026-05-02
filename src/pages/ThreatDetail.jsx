import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addBookmark } from '../store/bookmarksSlice';
import useFetchThreats from '../hooks/useFetchThreats';
import Loader from '../components/UI/Loader';
import { ArrowLeft, BookmarkPlus, ShieldCheck, AlertOctagon } from 'lucide-react';

// Object to store different text colors based on threat severity
const severityColors = {
  Critical: 'text-red-600 dark:text-red-400',
  High: 'text-orange-600 dark:text-orange-400',
  Medium: 'text-yellow-600 dark:text-yellow-400',
  Low: 'text-green-600 dark:text-green-400',
};

export default function ThreatDetail() {
  // useParams gets the dynamic ID from the URL (e.g. /threat/123)
  const { id } = useParams();
  
  // dispatch allows us to send actions to our Redux store
  const dispatch = useDispatch();
  
  // Fetch our threat data using our custom hook
  const { threats, loading, error } = useFetchThreats();
  
  // Get bookmarks from Redux store to check if this threat is already saved
  const bookmarks = useSelector(state => state.bookmarks.items);
  const isBookmarked = bookmarks.some(b => b.id === id);

  // Conditional Rendering: Show loading state
  if (loading) return <Loader fullScreen />;
  
  // Conditional Rendering: Show error state
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;

  // Find the specific threat that matches the URL ID
  const threat = threats.find(t => t.id === id);

  // Conditional Rendering: Show empty state if threat is not found
  if (!threat) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Threat not found</h2>
        <Link to="/explorer" className="text-brand-500 hover:underline mt-4 inline-block">Return to Explorer</Link>
      </div>
    );
  }

  // Event handler for adding a bookmark
  const handleBookmark = () => {
    dispatch(addBookmark(threat));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link to="/explorer" className="inline-flex items-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Explorer
      </Link>

      <div className="glass rounded-2xl p-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-sm font-medium">
                {threat.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-current ${severityColors[threat.severity] || severityColors.Medium}`}>
                <AlertOctagon className="w-4 h-4" />
                {threat.severity} Severity
              </span>
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mt-4">{threat.title}</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">First identified: {threat.date}</p>
          </div>

          <button
            onClick={handleBookmark}
            disabled={isBookmarked}
            className="flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all"
          >
            <BookmarkPlus className="w-5 h-5" />
            {isBookmarked ? 'Bookmarked' : 'Add to Bookmarks'}
          </button>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Description</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
              {threat.description}
            </p>
          </section>

          <section className="bg-brand-50 dark:bg-brand-900/20 rounded-xl p-6 border border-brand-100 dark:border-brand-900/50">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <ShieldCheck className="text-brand-500" />
              Prevention & Mitigation
            </h2>
            <ul className="space-y-3">
              {threat.prevention.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2.5 flex-shrink-0" />
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
