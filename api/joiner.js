export default function handler(req, res) {
    const { placeId, gameInstanceId } = req.query;
    
    if (!placeId || !gameInstanceId) {
        return res.status(400).send('Missing placeId or gameInstanceId');
    }
    
    const robloxUrl = `roblox://placeId=${placeId}&gameInstanceId=${gameInstanceId}`;
    const robloxUrlAlt = `roblox://experiences/start?placeId=${placeId}&gameInstanceId=${gameInstanceId}`;
    const webUrl = `https://www.roblox.com/games/start?placeId=${placeId}&launchData=${gameInstanceId}`;
    
    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Joining GAG2 Server...</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
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
    max-width: 400px;
    width: 100%;
    border: 1px solid rgba(255,255,255,0.1);
}
h1 { 
    font-size: 26px; 
    margin-bottom: 15px; 
    background: linear-gradient(90deg, #00ff88, #00b3ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
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
    margin-top: 15px;
    width: 100%;
    cursor: pointer;
    border: none;
}
.info {
    background: rgba(0,0,0,0.3);
    padding: 12px;
    border-radius: 8px;
    margin-top: 20px;
    font-family: monospace;
    font-size: 11px;
    word-break: break-all;
    text-align: left;
    border-left: 3px solid #00ff88;
}
.spinner {
    border: 3px solid rgba(255,255,255,0.2);
    border-top: 3px solid #00ff88;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    animation: spin 0.8s linear infinite;
    margin: 20px auto;
}
@keyframes spin { 100% { transform: rotate(360deg); } }
.status {
    font-size: 12px;
    color: #00ff88;
    margin-top: 10px;
}
</style>
</head>
<body>
<div class="container">
<div style="font-size:40px;">🌱</div>
<h1>Joining GAG2 Server</h1>
<div class="spinner"></div>
<p id="status">Launching Roblox...</p>
<p class="status" id="attempt">Attempt 1/3</p>
<a href="${robloxUrlAlt}" class="btn" id="joinBtn">🚀 Open in Roblox</a>
<a href="${webUrl}" class="btn" style="background: linear-gradient(135deg, #667eea, #764ba2); margin-top: 10px;">🌐 Open in Browser</a>
<div class="info">
<b>Place ID:</b> ${placeId}<br>
<b>Server ID:</b> ${gameInstanceId}
</div>
</div>
<script>
const placeId = "${placeId}";
const jobId = "${gameInstanceId}";

// Multiple protocol formats to try
const urls = [
    \`roblox://experiences/start?placeId=\${placeId}&gameInstanceId=\${jobId}\`,
    \`roblox://placeId=\${placeId}&gameInstanceId=\${jobId}\`,
    \`roblox-player:1+launchmode:play+gameinfo:\${jobId}+placelauncherurl:https%3A%2F%2Fassetgame.roblox.com%2FGame%2FPlaceLauncher.ashx%3Frequest%3DRequestGameJob%26placeId%3D\${placeId}%26gameId%3D\${jobId}\`,
];

let attempt = 0;
const status = document.getElementById('status');
const attemptEl = document.getElementById('attempt');

function tryJoin() {
    if (attempt >= urls.length) {
        status.textContent = "Auto-join failed. Tap the button below ⬇️";
        attemptEl.textContent = "";
        return;
    }
    attempt++;
    attemptEl.textContent = \`Attempt \${attempt}/\${urls.length}\`;
    
    // Create hidden iframe to launch protocol (better than location.href)
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = urls[attempt - 1];
    document.body.appendChild(iframe);
    
    // Also try location method
    setTimeout(() => {
        window.location.href = urls[attempt - 1];
    }, 100);
    
    // Try next protocol after 2 seconds
    setTimeout(tryJoin, 2000);
}

// Start auto-join immediately
window.addEventListener('load', () => {
    setTimeout(tryJoin, 100);
});
</script>
</body>
</html>`;
    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(html);
}
