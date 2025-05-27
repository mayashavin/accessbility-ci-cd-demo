const https = require('https');

async function postComment() {
  const summary = process.env.SUMMARY_CONTENT;
  const prNumber = process.env.PR_NUMBER;
  const githubRepository = process.env.GITHUB_REPOSITORY;
  const token = process.env.GH_TOKEN;

  if (!summary || summary.trim() === '') {
    console.log('Summary is empty or only whitespace. Skipping PR comment.');
    // Exiting with 0 because an empty summary might be a valid outcome of the previous step,
    // and we don't want to fail the workflow if the script intentionally did not produce a summary.
    // If an empty summary should be an error, the summarization script should fail.
    process.exit(0);
  }

  if (!prNumber) {
    console.error('Error: PR_NUMBER environment variable is not set.');
    process.exit(1);
  }

  if (!githubRepository || !githubRepository.includes('/')) {
    console.error(
      'Error: GITHUB_REPOSITORY environment variable is not set or invalid.'
    );
    process.exit(1);
  }
  const [owner, repo] = githubRepository.split('/');

  if (!token) {
    console.error('Error: GH_TOKEN environment variable is not set.');
    process.exit(1);
  }

  const body = `## Automated Accessibility Summary\n\n${summary}`;
  const postData = JSON.stringify({ body });

  const options = {
    hostname: 'api.github.com',
    path: `/repos/${owner}/${repo}/issues/${prNumber}/comments`,
    method: 'POST',
    headers: {
      Authorization: `token ${token}`,
      'User-Agent': 'GitHub-Action-Post-Comment-Script/1.0',
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
      Accept: 'application/vnd.github.v3+json',
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => (responseBody += chunk));
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log(
            `Successfully posted comment to PR #${prNumber}. Status: ${res.statusCode}`
          );
          resolve();
        } else {
          console.error(
            `Failed to post PR comment. Status: ${res.statusCode}, Response: ${responseBody}`
          );
          reject(
            new Error(
              `Failed to post comment. GitHub API responded with ${res.statusCode}`
            )
          );
        }
      });
    });

    req.on('error', (error) => {
      console.error('Error making HTTPS request to GitHub API:', error.message);
      reject(new Error(`HTTPS request failed: ${error.message}`));
    });

    req.write(postData);
    req.end();
  });
}

postComment().catch((error) => {
  // The error messages are already logged by the point of rejection.
  // Just ensure the process exits with a failure code.
  console.error('Script execution failed.');
  process.exit(1);
});
