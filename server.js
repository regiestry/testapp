const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'connection-test-webapp',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/github', async (_req, res) => {
  try {
    const githubResponse = await fetch('https://api.github.com/rate_limit', {
      headers: {
        'User-Agent': 'connection-test-webapp'
      }
    });

    if (!githubResponse.ok) {
      return res.status(502).json({
        ok: false,
        message: 'Reached GitHub, but received a non-OK response.',
        status: githubResponse.status
      });
    }

    const data = await githubResponse.json();

    return res.json({
      ok: true,
      message: 'GitHub API reachable from this server.',
      githubStatus: githubResponse.status,
      remaining: data?.rate?.remaining ?? null,
      reset: data?.rate?.reset ?? null
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Could not reach GitHub API from this server.',
      error: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Connection test app running at http://localhost:${port}`);
});
