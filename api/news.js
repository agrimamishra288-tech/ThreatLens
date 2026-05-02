export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const API_KEY = process.env.NEWS_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: 'NEWS_API_KEY environment variable is not set.' });
  }

  const url = `https://newsapi.org/v2/everything?q=cybersecurity+OR+malware+OR+ransomware&language=en&sortBy=publishedAt&pageSize=30&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Failed to fetch from NewsAPI.' });
  }
}
