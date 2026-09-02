// Konwencja opengraph-image w Next.js generuje pliki bez rozszerzenia.
// Statyczne hostingi (GitHub Pages) ustalaja Content-Type po rozszerzeniu,
// wiec bez tego kroku crawlery dostaja application/octet-stream i odrzucaja
// obrazek. Dopisujemy .png i poprawiamy odwolania w HTML.
import { readdir, rename, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const OUT = "out";
const NAME = "opengraph-image";

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name);
      return entry.isDirectory() ? walk(path) : [path];
    }),
  );
  return files.flat();
}

const files = await walk(OUT);

const images = files.filter((file) => file.endsWith(`/${NAME}`));
for (const image of images) {
  await rename(image, `${image}.png`);
}

const pages = files.filter((file) => file.endsWith(".html"));
for (const page of pages) {
  const html = await readFile(page, "utf8");
  const patched = html.replaceAll(`/${NAME}?`, `/${NAME}.png?`);
  if (patched !== html) await writeFile(page, patched);
}

console.log(`opengraph: ${images.length} plikow, ${pages.length} stron`);
