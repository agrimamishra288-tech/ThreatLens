import { useState, useEffect } from 'react';

const API_KEY = 'f558677d85624cbc9a64dee02578d9b3';
const API_URL = `https://newsapi.org/v2/everything?q=cybersecurity+OR+malware+OR+ransomware&language=en&sortBy=publishedAt&pageSize=30&apiKey=${API_KEY}`;

export default function useFetchThreats() {
  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchThreats = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          if (response.status === 429) throw new Error('API Rate limit exceeded. Please try again later.');
          if (response.status === 401) throw new Error('Invalid API Key provided.');
          if (response.status === 426) throw new Error('CORS Error: NewsAPI free tier may block browser requests. Check API logs.');
          throw new Error(`Failed to fetch data from NewsAPI (Status: ${response.status})`);
        }
        
        const data = await response.json();

        if (data.status === 'error') {
          throw new Error(data.message || 'Error occurred while fetching news.');
        }

        const mappedData = data.articles
          .filter(article => article.title && article.title !== '[Removed]')
          .map((article, index) => {
            const text = `${article.title} ${article.description}`.toLowerCase();
            
            let category = 'Security News';
            if (text.includes('ransomware')) category = 'Ransomware';
            else if (text.includes('phishing')) category = 'Phishing';
            else if (text.includes('malware') || text.includes('virus')) category = 'Malware';
            else if (text.includes('breach') || text.includes('leak')) category = 'Data Breach';

            let severity = 'Medium';
            if (text.includes('critical') || text.includes('millions') || text.includes('massive')) severity = 'Critical';
            else if (text.includes('attack') || text.includes('hacker') || text.includes('stolen')) severity = 'High';

            const safeId = article.title 
              ? article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30) 
              : `news-${index}`;

            return {
              id: safeId,
              title: article.title,
              category: category,
              severity: severity,
              description: article.description || 'No description provided for this article.',
              prevention: [
                'Stay informed with the latest security intelligence.',
                'Verify external links and sources.',
                `Read full article at: ${article.source?.name || 'News Source'}`
              ],
              date: new Date(article.publishedAt).toISOString().split('T')[0],
              url: article.url
            };
          });

        setThreats(mappedData);
      } catch (err) {
        console.error("API Fetch Error:", err);
        setError(err.message || 'An unexpected network error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchThreats();
  }, []);

  return { threats, loading, error };
}
