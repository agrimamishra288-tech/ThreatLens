import { Loader2 } from 'lucide-react';

export default function Loader({ fullScreen = false }) {
  // If fullScreen is passed as true via props, make the loader take up the whole screen
  const containerClasses = `flex flex-col items-center justify-center space-y-4 ${
    fullScreen ? 'min-h-[calc(100vh-4rem)]' : 'min-h-[200px]'
  }`;

  return (
    <div className={containerClasses}>
      <Loader2 className="h-10 w-10 text-brand-500 animate-spin" />
      <p className="text-slate-500 dark:text-slate-400 font-medium animate-pulse">Loading intelligence...</p>
    </div>
  );
}
