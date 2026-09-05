import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

function processDocument() {
  // 1. Read the raw text file using fs
  const rawContent = fs.readFileSync(mdxPath, 'utf8');

  // 2. Parse the file. 
  // 'data' contains the front-matter object. 'content' contains the rest of the body.
  const { data, content } = matter(rawContent);

  console.log('--- Front Matter Found ---');
  console.log(data); // e.g., { title: 'My Page', sidebar_position: 2, reviewStatus: 'needs-review' }

  // 3. Run your conditional logic based on the front-matter values
  if (data.reviewStatus) {
    console.log('⚠️ Skipping logic: This document is marked for review.');
    return;
  }
}