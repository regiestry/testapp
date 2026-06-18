async function runCheck(endpoint, outputId, statusId) {
  const output = document.getElementById(outputId);
  const status = document.getElementById(statusId);
  output.textContent = 'Checking...';
  if (status) { status.textContent = ''; status.className = 'status'; }

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    output.textContent = JSON.stringify(data, null, 2);
    if (status) {
      status.textContent = data.ok ? '✓ OK' : '✗ FAIL';
      status.className = 'status ' + (data.ok ? 'ok' : 'fail');
    }
  } catch (error) {
    output.textContent = JSON.stringify({ ok: false, error: error.message }, null, 2);
    if (status) { status.textContent = '✗ ERROR'; status.className = 'status fail'; }
  }
}

document.getElementById('healthBtn').addEventListener('click', () => {
  runCheck('/api/health', 'healthOutput', 'healthStatus');
});

document.getElementById('githubBtn').addEventListener('click', () => {
  runCheck('/api/github', 'githubOutput', 'githubStatus');
});

document.getElementById('runAllBtn').addEventListener('click', () => {
  runCheck('/api/health', 'healthOutput', 'healthStatus');
  runCheck('/api/github', 'githubOutput', 'githubStatus');
});
