import {readdir, readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const docsDirectory = path.join(process.cwd(), 'docs');
const shouldWrite = process.argv.includes('--write');

const documentExtensions = new Set(['.md', '.mdx']);
const allowedStatuses = new Set(['draft', 'approved', 'outdated']);

/**
 * Recursively finds all .md and .mdx files in a directory.
 */
async function findDocumentFiles(directory) {
  const entries = await readdir(directory, {
    withFileTypes: true,
  });

  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      const nestedFiles = await findDocumentFiles(fullPath);
      files.push(...nestedFiles);
      continue;
    }

    const extension = path.extname(entry.name);

    if (entry.isFile() && documentExtensions.has(extension)) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Adds reviewStatus: draft when the field does not already exist.
 */
async function processDocument(filePath) {
  const source = await readFile(filePath, 'utf8');
  const parsedDocument = matter(source);

  const currentStatus = parsedDocument.data.reviewStatus;

  // Already has a review status: leave the file alone.
  if (currentStatus !== undefined) {
    if (!allowedStatuses.has(currentStatus)) {
      throw new Error(
        `${filePath} has invalid reviewStatus: ${String(currentStatus)}`,
      );
    }

    return false;
  }

  const updatedFrontMatter = {
    ...parsedDocument.data,
    reviewStatus: 'draft',
  };

  const updatedSource = matter.stringify(
    parsedDocument.content,
    updatedFrontMatter,
  );

  const relativePath = path.relative(process.cwd(), filePath);

  if (shouldWrite) {
    await writeFile(filePath, updatedSource, 'utf8');
    console.log(`Updated: ${relativePath}`);
  } else {
    console.log(`Would update: ${relativePath}`);
  }

  return true;
}

async function main() {
  const files = await findDocumentFiles(docsDirectory);
  files.sort();

  let changedCount = 0;

  for (const file of files) {
    const changed = await processDocument(file);

    if (changed) {
      changedCount += 1;
    }
  }

  console.log('');

  if (shouldWrite) {
    console.log(`Finished. Updated ${changedCount} document(s).`);
  } else {
    console.log(
      `Dry run finished. ${changedCount} document(s) would be updated.`,
    );
    console.log('Run again with --write to modify the files.');
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});