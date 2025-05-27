// global.setup.js
import { setCredentials } from '@evinced/js-playwright-sdk';

async function globalSetup(config) {
  try {
    await setCredentials({
      serviceId: process.env.EVINCED_SERVICE_ID,
      secret: process.env.EVINCED_API_KEY,
    });
  } catch (error) {
    throw new Error('Evinced SDK authorization failure.');
  }
}

export default globalSetup;
