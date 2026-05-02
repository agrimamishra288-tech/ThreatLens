import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeBookmark, updateNote } from '../store/bookmarksSlice';
import { Link } from 'react-router-dom';
import { Trash2, Edit3, Save, ExternalLink, Bookmark } from 'lucide-react';

export default function Bookmarks() {
  const bookmarks = useSelector(state => state.bookmarks.items);
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);
  const [tempNote, setTempNote] = useState('');

  const handleEditNote = (id, currentNote) => {
    setEditingId(id);
    setTempNote(currentNote || '');
  };

  const handleSaveNote = (id) => {
    dispatch(updateNote({ id, note: tempNote }));
    setEditingId(null);
  };

  if (bookmarks.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center space-y-6">
        <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-400">
          <Bookmark className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">No Bookmarks Yet</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          You haven't saved any threats to your bookmarks. Head over to the Explorer to find interesting intelligence.
        </p>
        <Link to="/explorer" className="inline-block px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors">
          Explore Threats
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Your Bookmarks</h1>
      
      <div className="grid gap-6">
        {bookmarks.map((threat) => (
          <div key={threat.id} className="glass rounded-xl p-6 flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-grow space-y-3">
              <div className="flex items-center justify-between">
                <Link to={`/threat/${threat.id}`} className="text-xl font-bold text-slate-900 dark:text-white hover:text-brand-500 transition-colors flex items-center gap-2">
                  {threat.title}
                  <ExternalLink className="w-4 h-4 opacity-50" />
                </Link>
                <button
                  onClick={() => dispatch(removeBookmark(threat.id))}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title="Remove bookmark"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{threat.description}</p>
              
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <Edit3 className="w-4 h-4" /> Personal Note
                  </h4>
                  {editingId !== threat.id && (
                    <button
                      onClick={() => handleEditNote(threat.id, threat.note)}
                      className="text-xs text-brand-600 hover:text-brand-700 dark:text-brand-400 font-medium"
                    >
                      {threat.note ? 'Edit' : 'Add note'}
                    </button>
                  )}
                </div>
                
                {editingId === threat.id ? (
                  <div className="space-y-2">
                    <textarea
                      value={tempNote}
                      onChange={(e) => setTempNote(e.target.value)}
                      className="w-full p-3 bg-white dark:bg-slate-900 border border-brand-300 dark:border-brand-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white resize-none h-24"
                      placeholder="Add your analysis or thoughts here..."
                      autoFocus
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 rounded-md transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveNote(threat.id)}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-brand-600 text-white rounded-md hover:bg-brand-700 transition-colors"
                      >
                        <Save className="w-4 h-4" /> Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg text-sm text-slate-700 dark:text-slate-300 min-h-[3rem]">
                    {threat.note ? threat.note : <span className="text-slate-400 italic">No notes added yet.</span>}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
