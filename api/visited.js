// Simple in-memory store (resets when Vercel restarts but that's OK)
let visitedServers = {};

// Clean old entries every minute
setInterval(() => {
    const now = Date.now();
    for (const [id, time] of Object.entries(visitedServers)) {
        if (now - time > 30 * 60 * 1000) { // 30 minutes
            delete visitedServers[id];
        }
    }
}, 60000);

export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    if (req.method === 'POST') {
        // Mark a server as visited
        try {
            const { jobId } = req.query;
            if (jobId) {
                visitedServers[jobId] = Date.now();
                return res.status(200).json({ ok: true, count: Object.keys(visitedServers).length });
            }
            return res.status(400).json({ error: 'Missing jobId' });
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }
    
    if (req.method === 'GET') {
        // Get all visited server IDs
        const now = Date.now();
        const active = {};
        for (const [id, time] of Object.entries(visitedServers)) {
            if (now - time < 30 * 60 * 1000) {
                active[id] = time;
            }
        }
        return res.status(200).json({ 
            visited: Object.keys(active),
            count: Object.keys(active).length 
        });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
}
