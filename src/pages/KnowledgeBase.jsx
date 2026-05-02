import { Shield, Bug, MailWarning, UserX, Lock, Network } from 'lucide-react';

// Static data array for the educational content
const knowledgeData = [
{
    id: 'malware',
    title: 'Malware',
    icon: <Bug className="w-8 h-8 text-red-500" />,
    description: 'Malware (Malicious Software) is an umbrella term for viruses, worms, trojans, and other harmful computer programs hackers use to wreak destruction and gain access to sensitive information.',
    prevention: 'Install a trusted Antivirus, keep your OS updated, and avoid downloading files from untrusted websites.'
},
{
  id: 'phishing',
    title: 'Phishing',
    icon: <MailWarning className="w-8 h-8 text-orange-500" />,
    description: 'Phishing is a cyber attack that uses disguised email as a weapon. The attacker masquerades as a trusted entity (like your bank) to trick you into clicking a malicious link or revealing your passwords.',
    prevention: 'Never click links in unsolicited emails. Always verify the sender’s email address carefully.'
},
{
  id: 'catfishing',
    title: 'Catfishing',
    icon: <UserX className="w-8 h-8 text-purple-500" />,
    description: 'Catfishing is a deceptive activity where a person creates a fictional persona or fake identity on a social networking service, usually targeting a specific victim for financial gain or emotional manipulation.',
    prevention: 'Do not send money to people you have only met online. Reverse image search their profile pictures.'
},
{
  id: 'worm',
    title: 'Computer Worm',
    icon: <Network className="w-8 h-8 text-green-500" />,
    description: 'A computer worm is a type of malware that spreads copies of itself from computer to computer. A worm can replicate itself without any human interaction, making it highly contagious.',
    prevention: 'Use strong firewalls, keep your operating system updated to patch vulnerabilities, and avoid clicking suspicious links.'
},
{
  id: 'ransomware',
    title: 'Ransomware',
    icon: <Lock className="w-8 h-8 text-yellow-500" />,
    description: 'Ransomware is malware that employs encryption to hold a victim’s information at ransom. A user or organization’s critical data is encrypted so that they cannot access files unless they pay the hacker.',
    prevention: 'Maintain regular offline backups of all your important data so you can restore it without paying.'
  },
  {
    id: 'social-engineering',
    title: 'Social Engineering',
    icon: <Shield className="w-8 h-8 text-blue-500" />,
    description: 'Social engineering is the psychological manipulation of people into performing actions or divulging confidential information. It relies on human error rather than technical vulnerabilities.',
    prevention: 'Be skeptical of urgent requests for money or information. Verify identities through a secondary communication channel.'
  }
];

export default function KnowledgeBase() {
  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
          Cyber Awareness <span className="text-brand-500">Knowledge Base</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Understanding the threats is the first step to defending against them. 
          Learn about the most common cybersecurity terms and how to protect yourself.
        </p>
      </div>

      {/* Grid of Knowledge Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          knowledgeData.map((item) => (
          <div key={item.id} className="glass rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col h-full border-t-4 border-t-brand-500">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                {item.icon}
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{item.title}</h2>
            </div>
            
            <div className="flex-grow space-y-4">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">What is it?</h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
              
              <div className="bg-brand-50 dark:bg-brand-900/20 p-4 rounded-xl border border-brand-100 dark:border-brand-900/50">
                <h3 className="text-sm font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-1">How to prevent it:</h3>
                <p className="text-slate-800 dark:text-slate-200 text-sm font-medium">
                  {item.prevention}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}
