async function runCheck(endpoint, outputId) {
  const output = document.getElementById(outputId);
  output.textContent = 'Checking...';

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    output.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    output.textContent = JSON.stringify(
      {
        ok: false,
        error: error.message
      },
      null,
      2
    );
  }
}

document.getElementById('healthBtn').addEventListener('click', () => {
  runCheck('/api/health', 'healthOutput');
});

document.getElementById('githubBtn').addEventListener('click', () => {
  runCheck('/api/github', 'githubOutput');
});
