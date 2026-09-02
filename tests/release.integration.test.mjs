import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

const port = 4173;
const baseUrl = `http://127.0.0.1:${port}`;
let server;

async function waitForServer() {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("Next.js test server did not become ready");
}

async function page(path) {
  const response = await fetch(`${baseUrl}${path}`);
  assert.equal(response.status, 200, `${path} should return HTTP 200`);
  return response.text();
}

before(async () => {
  server = spawn("pnpm", ["exec", "next", "start", "--hostname", "127.0.0.1", "--port", String(port)], {
    cwd: process.cwd(),
    env: { ...process.env, NODE_ENV: "production" },
    stdio: "ignore",
  });
  await waitForServer();
});

after(() => {
  server?.kill("SIGTERM");
});

test("public pages identify the custom domain as their canonical origin", async () => {
  const html = await page("/");
  assert.match(html, /<link rel="canonical" href="https:\/\/airfryer-finder\.de"\/>/);
  assert.match(html, /<meta property="og:url" content="https:\/\/airfryer-finder\.de"\/>/);
  assert.doesNotMatch(html, /airfryer-finder-de\.vercel\.app/);

  const robots = await page("/robots.txt");
  assert.match(robots, /Sitemap: https:\/\/airfryer-finder\.de\/sitemap\.xml/);
  assert.doesNotMatch(robots, /vercel\.app/);

  const sitemap = await page("/sitemap.xml");
  assert.match(sitemap, /<loc>https:\/\/airfryer-finder\.de\/finder<\/loc>/);
  assert.doesNotMatch(sitemap, /vercel\.app/);
});

test("representative detail and utility pages use self-referencing canonicals", async () => {
  const pages = [
    ["/finder", "https://airfryer-finder.de/finder"],
    ["/airfryer/ninja-af500eusd-b0gss34zym", "https://airfryer-finder.de/airfryer/ninja-af500eusd-b0gss34zym"],
    ["/rezepte/knusprige-kartoffelspalten", "https://airfryer-finder.de/rezepte/knusprige-kartoffelspalten"],
    ["/zubehoer/philips-philips-airfryer-back-kit-b0c4yzm1bf", "https://airfryer-finder.de/zubehoer/philips-philips-airfryer-back-kit-b0c4yzm1bf"],
  ];

  for (const [path, canonical] of pages) {
    const html = await page(path);
    assert.match(html, new RegExp(`<link rel="canonical" href="${canonical}"\\/>`));
  }
});

test("legal pages are publishable and identify the responsible operator", async () => {
  const imprint = await page("/impressum");
  assert.match(imprint, /Christopher Funke/);
  assert.match(imprint, /Waldstr\. 28/);
  assert.match(imprint, /wir@funkeymedia\.de/);
  assert.doesNotMatch(imprint, /Vor Veröffentlichung/);

  const privacy = await page("/datenschutz");
  assert.match(privacy, /Verantwortlicher/);
  assert.match(privacy, /Christopher Funke/);
  assert.match(privacy, /Vercel/);
  assert.match(privacy, /Amazon/);
  assert.doesNotMatch(privacy, /Vor Veröffentlichung/);
});

test("the main finder-to-offer path is reachable and keeps affiliate disclosure", async () => {
  const home = await page("/");
  assert.match(home, /href="\/finder"/);

  const finder = await page("/finder");
  assert.match(finder, /Für wie viele Personen kochst du meistens\?/);

  const product = await page("/airfryer/ninja-af500eusd-b0gss34zym");
  assert.match(product, /href="https:\/\/www\.amazon\.de\/dp\/B0GSS34ZYM[^\"]*tag=onlinestarkei-21/);
  assert.match(product, /rel="nofollow sponsored noopener"/);
  assert.match(product, /Affiliate-Link/);
});

test("every catalog item has a local image and a correctly tagged Amazon link", () => {
  const catalog = JSON.parse(readFileSync("data/products.json", "utf8"));
  const products = [...catalog.devices, ...catalog.accessories];
  assert.equal(products.length, 273);
  assert.equal(new Set(products.map((product) => product.asin)).size, products.length);
  for (const product of products) {
    assert.ok(existsSync(`public/products/${product.asin}.webp`), `missing image for ${product.asin}`);
    assert.match(product.affiliateUrl, new RegExp(`^https://www\\.amazon\\.de/dp/${product.asin}\\?`));
    assert.match(product.affiliateUrl, /[?&]tag=onlinestarkei-21(?:&|$)/);
  }
});

test("every URL published in the sitemap returns HTTP 200", async () => {
  const sitemap = await page("/sitemap.xml");
  const paths = [...sitemap.matchAll(/<loc>https:\/\/airfryer-finder\.de([^<]*)<\/loc>/g)].map((match) => match[1] || "/");
  assert.equal(paths.length, 313);
  for (let index = 0; index < paths.length; index += 20) {
    const batch = paths.slice(index, index + 20);
    const responses = await Promise.all(batch.map(async (path) => [path, await fetch(`${baseUrl}${path}`)]));
    for (const [path, response] of responses) assert.equal(response.status, 200, `${path} should return HTTP 200`);
  }
});
