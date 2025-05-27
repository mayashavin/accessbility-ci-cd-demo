import fs from 'fs';
import path from 'path';
import { OpenAI } from 'openai';

async function main() {
  const reportsDir = process.argv[2];
  if (!reportsDir) {
    console.error(
      'Usage: node summarize-a11y.mjs <path-to-lighthouse-reports-directory>'
    );
    process.exit(1);
  }

  const openaiApiKey = process.env.OPENAI_API_KEY;
  if (!openaiApiKey) {
    console.error('Error: OPENAI_API_KEY environment variable is not set.');
    process.exit(1);
  }

  const openai = new OpenAI({ apiKey: openaiApiKey });
  const reportDetails = [];

  try {
    const files = fs.readdirSync(reportsDir);
    for (const file of files) {
      if (path.extname(file) === '.json') {
        const filePath = path.join(reportsDir, file);
        let lighthouseResult;
        try {
          const reportContent = fs.readFileSync(filePath, 'utf-8');
          lighthouseResult = JSON.parse(reportContent);
          console.log(lighthouseResult);
        } catch (parseError) {
          console.warn(
            `Warning: Could not parse JSON from file ${file}: ${parseError.message}. Skipping this file.`
          );
          continue;
        }

        if (
          !lighthouseResult ||
          !lighthouseResult.categories ||
          !lighthouseResult.audits
        ) {
          console.warn(
            `Warning: File ${file} does not appear to be a valid Lighthouse report. Skipping.`
          );
          continue;
        }

        const url =
          lighthouseResult.finalUrl ||
          lighthouseResult.requestedUrl ||
          'Unknown URL';
        const accessibilityCategory = lighthouseResult.categories.accessibility;

        if (!accessibilityCategory) {
          console.warn(
            `Warning: Accessibility category not found in report for ${url} (file: ${file}).`
          );
          reportDetails.push({
            url,
            accessibilityScoreText: 'N/A',
            failingAudits: ['Accessibility data not found in report'],
          });
          continue;
        }

        const accessibilityScore = accessibilityCategory.score;
        const failingAudits = [];

        if (accessibilityCategory.auditRefs && lighthouseResult.audits) {
          for (const auditRef of accessibilityCategory.auditRefs) {
            const audit = lighthouseResult.audits[auditRef.id];
            if (
              audit &&
              audit.score !== null &&
              audit.score < 1 &&
              audit.scoreDisplayMode !== 'manual' &&
              audit.scoreDisplayMode !== 'informative' &&
              audit.scoreDisplayMode !== 'notApplicable'
            ) {
              failingAudits.push(audit.title || audit.id);
            }
          }
        } else {
          console.warn(
            `Warning: Audit references or audit details missing for accessibility category in report for ${url} (file: ${file}).`
          );
        }

        reportDetails.push({
          url,
          accessibilityScoreText:
            accessibilityScore !== null
              ? `${Math.round(accessibilityScore * 100)}%`
              : 'N/A',
          failingAudits,
        });
      }
    }
  } catch (error) {
    console.error(
      `Error reading Lighthouse reports directory: ${error.message}`
    );
    process.exit(1);
  }

  if (reportDetails.length === 0) {
    console.log('No valid Lighthouse JSON reports found to summarize.');
    return;
  }

  let prompt = `Generate a concise summary of accessibility issues from the following Lighthouse reports.\nFor each report, include:\n- URL\n- Accessibility Score (%)\n- Key Failing Audits (titles only, if any)\n\nThen, provide a brief overall assessment of the accessibility status and any common themes or critical issues.\nBe brief and focus on actionable insights. If no failing audits, state that.\n\n`;

  reportDetails.forEach((detail, index) => {
    prompt += `Report ${index + 1}:\n`;
    prompt += `URL: ${detail.url}\n`;
    prompt += `Accessibility Score: ${detail.accessibilityScoreText}\n`;
    if (detail.failingAudits.length > 0) {
      prompt += `Failing Audits:\n${detail.failingAudits
        .map((title) => `- ${title}`)
        .join('\n')}\n`;
    } else {
      prompt += `Failing Audits: None\n`;
    }
    prompt += '\n';
  });
  prompt += 'Overall Assessment:';

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 600,
    });

    if (
      completion.choices &&
      completion.choices.length > 0 &&
      completion.choices[0].message &&
      completion.choices[0].message.content
    ) {
      console.log(completion.choices[0].message.content.trim());
    } else {
      console.error(
        'Error: Failed to get a valid summary from OpenAI. Response was empty or malformed.'
      );
      process.exit(1);
    }
  } catch (error) {
    console.error(`Error calling OpenAI API: ${error.message}`);
    if (error.response) {
      console.error('OpenAI API Response Error Data:', error.response.data);
    } else if (error.status) {
      console.error('OpenAI API Response Error Status:', error.status);
      console.error('OpenAI API Response Error Message:', error.message);
    }
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('An unexpected error occurred in the script:', error.message);
  process.exit(1);
});
