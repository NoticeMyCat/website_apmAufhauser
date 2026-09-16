import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const allowedRoots = ["app", "components", "lib", "docs", "tests"];
const allowedTopFiles = new Set(["PRODUCT.md", "DESIGN.md", "AGENTS.md", "package.json", "next.config.ts"]);

function resolveAllowed(relativePath) {
  const normalized = relativePath.replace(/^\.\//, "");
  const top = normalized.split("/")[0];
  if (!allowedTopFiles.has(normalized) && !allowedRoots.includes(top)) {
    throw new Error("Path is outside the review scope");
  }
  const absolute = path.resolve(root, normalized);
  if (!absolute.startsWith(`${root}${path.sep}`)) throw new Error("Invalid path");
  return absolute;
}

async function listFiles(directory = ".") {
  const results = [];
  async function walk(current) {
    for (const entry of await fs.readdir(current, { withFileTypes: true })) {
      if (["node_modules", ".next", ".git", "source"].includes(entry.name)) continue;
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) await walk(full);
      else results.push(path.relative(root, full));
      if (results.length >= 300) return;
    }
  }
  if (directory === ".") {
    for (const file of allowedTopFiles) {
      try { await fs.access(path.join(root, file)); results.push(file); } catch {}
    }
    for (const directoryName of allowedRoots) {
      try { await walk(path.join(root, directoryName)); } catch {}
    }
  } else {
    await walk(resolveAllowed(directory));
  }
  return results.join("\n");
}

async function searchText(query, directory = ".") {
  const files = (await listFiles(directory)).split("\n").filter(Boolean);
  const hits = [];
  for (const file of files) {
    if (!/\.(?:ts|tsx|css|md|json)$/.test(file)) continue;
    const lines = (await fs.readFile(resolveAllowed(file), "utf8")).split("\n");
    lines.forEach((line, index) => {
      if (line.toLowerCase().includes(query.toLowerCase())) hits.push(`${file}:${index + 1}:${line.trim()}`);
    });
    if (hits.length >= 100) break;
  }
  return hits.slice(0, 100).join("\n") || "No matches";
}

const tools = [
  {
    type: "function",
    function: {
      name: "read_file",
      description: "Read a UTF-8 project file within the approved review scope.",
      parameters: { type: "object", properties: { path: { type: "string" } }, required: ["path"] },
    },
  },
  {
    type: "function",
    function: {
      name: "list_files",
      description: "List project files in an approved directory.",
      parameters: { type: "object", properties: { directory: { type: "string" } } },
    },
  },
  {
    type: "function",
    function: {
      name: "search_text",
      description: "Search project text and return matching file lines.",
      parameters: {
        type: "object",
        properties: { query: { type: "string" }, directory: { type: "string" } },
        required: ["query"],
      },
    },
  },
];

const messages = [
  {
    role: "system",
    content: "You are a conservative code reviewer. Inspect the real project with tools before answering. Do not output replacement templates. Do not invent missing files, business facts, or requirements. Recommend only defects supported by file evidence.",
  },
  {
    role: "user",
    content: "Review the current APM Aufhauser Next.js website for useful unfinished implementation work. First read PRODUCT.md, DESIGN.md, docs/LAUNCH.md, docs/CONTENT-REVIEW.md, package.json, and relevant source files. Preserve the approved German content, bright-only theme, seamless hero, compact footer, 90 euro price, map consent, and email-draft contact fallback. Exclude credentials, purchases, legal sign-off, real email sending, DNS, deployment, generic redesign, new marketing sections, and changes to business facts. Return at most three concrete, high-confidence improvements with exact file paths and evidence. If no worthwhile defect remains, say that clearly.",
  },
];

for (let turn = 0; turn < 18; turn += 1) {
  const response = await fetch("http://127.0.0.1:11434/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "qwen3.5:9b", messages, tools, stream: false, think: false, options: { temperature: 0.1, num_predict: 900 } }),
  });
  if (!response.ok) throw new Error(`Ollama returned ${response.status}`);
  const payload = await response.json();
  const message = payload.message;
  messages.push(message);
  if (!message.tool_calls?.length) {
    if (message.content?.trim()) {
      process.stdout.write(message.content);
      process.exit(0);
    }
    messages.push({ role: "user", content: "Return the concise final review now. Do not call more tools unless evidence is missing." });
    continue;
  }
  for (const call of message.tool_calls) {
    const { name, arguments: args } = call.function;
    let content;
    try {
      if (name === "read_file") content = await fs.readFile(resolveAllowed(args.path), "utf8");
      else if (name === "list_files") content = await listFiles(args.directory || ".");
      else if (name === "search_text") content = await searchText(args.query, args.directory || ".");
      else content = "Unknown tool";
    } catch (error) {
      content = `Tool error: ${error instanceof Error ? error.message : String(error)}`;
    }
    messages.push({ role: "tool", tool_name: name, content: content.slice(0, 30000) });
  }
}

throw new Error("Qwen review exceeded the bounded tool-call loop");
