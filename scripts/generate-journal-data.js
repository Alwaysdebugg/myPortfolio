#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const CONTENT_DIR = path.join(process.cwd(), "content/journal");
const OUTPUT_FILE = path.join(
  process.cwd(),
  "src/data/generated-journal.json"
);

const VALID_TYPES = new Set(["build", "decision", "bug", "learning"]);
const VALID_STATUSES = new Set([
  "open",
  "in-progress",
  "shipped",
  "revisited",
]);

function calculateReadingTime(content) {
  return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200));
}

function normalizeLinks(links) {
  if (!Array.isArray(links)) return [];

  return links
    .filter(
      (link) =>
        link && typeof link.label === "string" && typeof link.href === "string"
    )
    .map(({ label, href }) => ({ label, href }));
}

function parseEntry(fileName) {
  const filePath = path.join(CONTENT_DIR, fileName);
  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);
  const slug = data.slug || path.basename(fileName, ".md");

  if (!data.title || !data.summary || !data.publishedAt) {
    throw new Error(
      `${fileName} must include title, summary, and publishedAt frontmatter`
    );
  }

  if (!VALID_TYPES.has(data.type)) {
    throw new Error(`${fileName} has an unsupported journal type: ${data.type}`);
  }

  if (!VALID_STATUSES.has(data.status)) {
    throw new Error(
      `${fileName} has an unsupported journal status: ${data.status}`
    );
  }

  return {
    id: slug,
    slug,
    title: data.title,
    summary: data.summary,
    publishedAt: data.publishedAt,
    updatedAt: data.updatedAt,
    type: data.type,
    status: data.status,
    version: data.version,
    tags: Array.isArray(data.tags) ? data.tags : [],
    links: normalizeLinks(data.links),
    readingTime: data.readingTime || calculateReadingTime(content),
    isPublished: data.isPublished !== false,
    content: content.trim(),
  };
}

function generateJournalData() {
  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
  }

  const entries = fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"))
    .map(parseEntry)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  fs.writeFileSync(OUTPUT_FILE, `${JSON.stringify(entries, null, 2)}\n`);
  console.log(
    `Generated ${entries.length} journal entr${entries.length === 1 ? "y" : "ies"}`
  );
}

if (require.main === module) {
  try {
    generateJournalData();
  } catch (error) {
    console.error("Failed to generate journal data:", error);
    process.exit(1);
  }
}

module.exports = { generateJournalData };
