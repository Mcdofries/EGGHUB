export default function handler(req, res) {
    const { placeId, gameInstanceId } = req.query;
    
    if (!placeId || !gameInstanceId) {
        return res.status(400).send('Missing placeId or gameInstanceId');
    }
    
    const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Joining GAG2 Server...</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #667eea 100%);
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            text-align: center;
            padding: 20px;
        }
        .container {
            background: rgba(0,0,0,0.4);
            padding: 40px 30px;
            border-radius: 20px;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            max-width: 400px;
            width: 100%;
            border: 1px solid rgba(255,255,255,0.1);
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        h1 { 
            font-size: 26px; 
            margin-bottom: 15px; 
            background: linear-gradient(90deg, #00ff88, #00b3ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        p { font-size: 15px; opacity: 0.9; margin: 8px 0; }
        .btn {
            display: inline-block;
            background: linear-gradient(135deg, #00b09b, #96c93d);
            color: white;
            padding: 16px 40px;
            border-radius: 12px;
            text-decoration: none;
            font-size: 17px;
            font-weight: 700;
            margin-top: 20px;
            border: none;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 4px 15px rgba(0,176,155,0.4);
            width: 100%;
        }
        .btn:hover { 
            transform: translateY(-2px); 
            box-shadow: 0 6px 20px rgba(0,176,155,0.6);
        }
        .btn:active { transform: translateY(0); }
        .info {
            background: rgba(0,0,0,0.3);
            padding: 12px;
            border-radius: 8px;
            margin-top: 20px;
            font-family: 'Courier New', monospace;
            font-size: 11px;
            word-break: break-all;
            text-align: left;
            border-left: 3px solid #00ff88;
        }
        .info strong { color: #00ff88; }
        .spinner {
            border: 3px solid rgba(255,255,255,0.2);
            border-top: 3px solid #00ff88;
            border-radius: 50%;
            width: 45px;
            height: 45px;
            animation: spin 0.8s linear infinite;
            margin: 20px auto;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .emoji { font-size: 40px; margin-bottom: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="emoji">🌱</div>
        <h1>Joining GAG2 Server</h1>
        <div class="spinner"></div>
        <p>Launching Roblox...</p>
        <p style="font-size:13px; opacity:0.7;">If nothing happens, tap below 👇</p>
        <a href="roblox://experiences/start?placeId=${placeId}&gameInstanceId=${gameInstanceId}" class="btn">
            🚀 Open in Roblox
        </a>
        <div class="info">
            <strong>Place ID:</strong> ${placeId}<br>
            <strong>Server ID:</strong> ${gameInstanceId}
        </div>
    </div>
    
    <script>
        // Auto-launch Roblox protocol
        setTimeout(() => {
            window.location.href = "roblox://experiences/start?placeId=${placeId}&gameInstanceId=${gameInstanceId}";
        }, 300);
    </script>
</body>
</html>`;
    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(html);
}
