#!/usr/bin/env node

const https = require('https');

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

if (!SPACE_ID || !ACCESS_TOKEN) {
  console.error('Error: CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN environment variables are required');
  process.exit(1);
}

const contentType = {
  name: 'Case Study Details',
  description: 'Metadata for case studies including role, team, and timeframe',
  displayField: 'role',
  fields: [
    {
      id: 'role',
      name: 'Role',
      type: 'Symbol',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false,
    },
    {
      id: 'team',
      name: 'Team',
      type: 'Symbol',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false,
    },
    {
      id: 'timeframe',
      name: 'Timeframe',
      type: 'Symbol',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false,
    },
  ],
};

function makeRequest(method, path, body = null, customHeaders = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.contentful.com',
      path: `/spaces/${SPACE_ID}${path}`,
      method,
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        ...customHeaders,
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode >= 400) {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        } else {
          resolve(JSON.parse(data || '{}'));
        }
      });
    });

    req.on('error', reject);
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function main() {
  try {
    console.log('Creating CaseStudyDetails content type...');

    // Create the content type
    const createResponse = await makeRequest('POST', '/content_types', contentType);
    console.log('✓ Content type created:', createResponse.sys.id);

    // Publish the content type
    const version = createResponse.sys.version;
    await makeRequest('PUT', `/content_types/${createResponse.sys.id}/published`, null, {
      'X-Contentful-Version': version,
    });
    console.log('✓ Content type published');

    console.log('\nSuccess! CaseStudyDetails content type has been created and published.');
    console.log('You can now add a reference field to PageBlogPost.');
  } catch (error) {
    if (error.message.includes('HTTP 409')) {
      console.log('Content type already exists.');
      process.exit(0);
    }
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
