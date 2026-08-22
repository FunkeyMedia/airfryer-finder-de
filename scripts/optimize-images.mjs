import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const source = process.argv[2];
const target = process.argv[3];
if (!source || !target) throw new Error("source and target are required");
await fs.mkdir(target, { recursive: true });
const files = (await fs.readdir(source)).filter((name) => /\.(png|jpe?g)$/i.test(name));
await Promise.all(files.map(async (name) => {
  const output = path.join(target, `${path.parse(name).name}.webp`);
  await sharp(path.join(source, name))
    .resize(720, 720, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 78, alphaQuality: 82, effort: 4 })
    .toFile(output);
}));
console.log(`Optimized ${files.length} images`);
