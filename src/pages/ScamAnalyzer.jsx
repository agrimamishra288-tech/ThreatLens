import { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle, Search } from 'lucide-react';

const SCAM_KEYWORDS = [
  { word: 'urgent', weight: 20 },
  { word: 'otp', weight: 30 },
  { word: 'password', weight: 20 },
  { word: 'click here', weight: 25 },
  { word: 'bank account', weight: 25 },
  { word: 'lottery', weight: 30 },
  { word: 'suspended', weight: 20 },
  { word: 'verify', weight: 15 },
  { word: 'winner', weight: 25 },
  { word: 'prize', weight: 25 },
  { word: 'irs', weight: 30 },
  { word: 'ssn', weight: 30 },
  { word: 'social security', weight: 30 },
  { word: 'login', weight: 15 },
  { word: 'unauthorized', weight: 20 }
];

export default function ScamAnalyzer() {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const analyzeText = () => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    setResult(null);

    setTimeout(() => {
      let score = 0;
      const foundKeywords = [];
      const lowerText = text.toLowerCase();

      SCAM_KEYWORDS.forEach(({ word, weight }) => {
        if (lowerText.includes(word)) {
          score += weight;
          foundKeywords.push(word);
        }
      });

      const finalScore = Math.min(score, 100);
      
      setResult({
        score: finalScore,
        keywords: foundKeywords,
      });
      setIsAnalyzing(false);
    }, 800);
  };

  const renderHighlightedText = () => {
    if (!result || result.keywords.length === 0) return <p className="whitespace-pre-wrap">{text}</p>;

    let highlightedText = text;
    result.keywords.forEach(kw => {
      const regex = new RegExp(`(${kw})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<mark class="bg-red-200 dark:bg-red-900/50 text-red-900 dark:text-red-200 px-1 rounded font-semibold">$1</mark>');
    });

    return <p className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Scam Message Analyzer</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Paste any suspicious email, SMS, or message below. Our rule-based engine will analyze it for common phishing and scam keywords.
        </p>
      </div>

      <div className="glass rounded-2xl p-6 space-y-4 shadow-sm">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste the suspicious message here..."
          className="w-full h-48 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white resize-none"
        />
        
        <div className="flex justify-end">
          <button
            onClick={analyzeText}
            disabled={!text.trim() || isAnalyzing}
            className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-brand-600 dark:hover:bg-brand-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <span className="flex items-center gap-2">
                <Search className="w-5 h-5 animate-pulse" /> Analyzing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5" /> Analyze Message
              </span>
            )}
          </button>
        </div>
      </div>

      {result && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <div className={`rounded-2xl p-6 border-2 ${
            result.score >= 70 ? "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/50" :
            result.score >= 40 ? "bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-900/50" :
            "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/50"
          }`}>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              
              <div className="flex-shrink-0 text-center w-full md:w-48">
                <div className="relative inline-flex items-center justify-center w-32 h-32 rounded-full border-8 border-white dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 mb-4">
                  <svg className="absolute w-full h-full transform -rotate-90">
                    <circle cx="50%" cy="50%" r="48%" fill="none" stroke="currentColor" strokeWidth="12%" className="text-slate-100 dark:text-slate-800" />
                    <circle 
                      cx="50%" cy="50%" r="48%" fill="none" stroke="currentColor" strokeWidth="12%" 
                      strokeDasharray="300" 
                      strokeDashoffset={300 - (300 * result.score) / 100}
                      className={`transition-all duration-1000 ease-out ${
                        result.score >= 70 ? "text-red-500" :
                        result.score >= 40 ? "text-orange-500" : "text-green-500"
                      }`} 
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-3xl font-black text-slate-900 dark:text-white">{result.score}%</span>
                    <span className="text-xs font-medium text-slate-500">RISK</span>
                  </div>
                </div>
                
                <h3 className={`text-xl font-bold ${
                  result.score >= 70 ? "text-red-700 dark:text-red-400" :
                  result.score >= 40 ? "text-orange-700 dark:text-orange-400" :
                  "text-green-700 dark:text-green-400"
                }`}>
                  {result.score >= 70 ? "Highly Suspicious" :
                   result.score >= 40 ? "Proceed with Caution" :
                   "Appears Safe"}
                </h3>
              </div>

              <div className="flex-grow space-y-4">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2">Analysis Report</h4>
                
                {result.keywords.length > 0 ? (
                  <div className="space-y-4">
                    <p className="text-slate-700 dark:text-slate-300">
                      We found <strong className="text-slate-900 dark:text-white">{result.keywords.length}</strong> suspicious keyword(s) often used in scams:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {result.keywords.map(kw => (
                        <span key={kw} className="px-3 py-1 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 rounded-full text-sm font-semibold border border-red-200 dark:border-red-800">
                          {kw}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-6 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                      <h5 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Message Context</h5>
                      <div className="text-slate-800 dark:text-slate-200 leading-relaxed italic border-l-4 border-slate-300 dark:border-slate-700 pl-4">
                        {renderHighlightedText()}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <p>
                      No obvious scam keywords were detected. However, always verify the sender's identity and be cautious with unsolicited links or attachments.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
