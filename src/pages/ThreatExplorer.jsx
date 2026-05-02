import { useState, useMemo } from 'react';
import useFetchThreats from '../hooks/useFetchThreats';
import useDebounce from '../hooks/useDebounce';
import ThreatCard from '../components/ThreatCard';
import Loader from '../components/UI/Loader';
import { Search, Filter, AlertCircle } from 'lucide-react';

export default function ThreatExplorer() {
  const { threats, loading, error } = useFetchThreats();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const debouncedSearch = useDebounce(searchTerm, 300);

  const filteredThreats = useMemo(() => {
    let result = [...threats];

    if (debouncedSearch) {
      const lowercased = debouncedSearch.toLowerCase();
      result = result.filter(t => 
        t.title.toLowerCase().includes(lowercased) || 
        t.description.toLowerCase().includes(lowercased)
      );
    }

    if (categoryFilter) {
      result = result.filter(t => t.category === categoryFilter);
    }

    if (sortOrder) {
      const severityScores = { Critical: 4, High: 3, Medium: 2, Low: 1 };
      result.sort((a, b) => {
        if (sortOrder === 'severity-desc') return severityScores[b.severity] - severityScores[a.severity];
        if (sortOrder === 'severity-asc') return severityScores[a.severity] - severityScores[b.severity];
        return 0;
      });
    }

    return result;
  }, [threats, debouncedSearch, categoryFilter, sortOrder]);

  const categories = useMemo(() => {
    const cats = new Set(threats.map(t => t.category));
    return Array.from(cats);
  }, [threats]);

  const totalPages = Math.ceil(filteredThreats.length / itemsPerPage);
  const paginatedThreats = filteredThreats.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useMemo(() => setCurrentPage(1), [debouncedSearch, categoryFilter, sortOrder]);

  if (loading) return <Loader fullScreen />;

  if (error) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Failed to load intelligence</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Threat Explorer</h1>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search threats..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white"
            />
          </div>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white"
          >
            <option value="">Sort by...</option>
            <option value="severity-desc">Severity (High to Low)</option>
            <option value="severity-asc">Severity (Low to High)</option>
          </select>
        </div>
      </div>

      {filteredThreats.length === 0 ? (
        <div className="text-center py-20 bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
          <p className="text-lg text-slate-500 dark:text-slate-400">No threats found matching your criteria.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedThreats.map(threat => (
              <ThreatCard key={threat.id} threat={threat} />
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 pt-8">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className="px-4 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg disabled:opacity-50 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                Previous
              </button>
              <span className="text-slate-600 dark:text-slate-400 font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
                className="px-4 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg disabled:opacity-50 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
