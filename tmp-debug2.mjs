import fs from "fs";
import path from "path";
const data = await fs.promises.readFile(path.resolve('public/models/character.enc'));
const iv = data.slice(0,16);
const encrypted = data.slice(16);
const password = 'Character3D#@';
const pwBuffer = new TextEncoder().encode(password);
const hashed = await crypto.subtle.digest('SHA-256', pwBuffer);
const key = await crypto.subtle.importKey('raw', hashed.slice(0,32), {name:'AES-CBC'}, false, ['decrypt']);
let decrypted;
try {
  decrypted = await crypto.subtle.decrypt({name:'AES-CBC', iv}, key, encrypted);
} catch (e) {
  console.error('decrypt error', e);
  process.exit(1);
}
const arr = new Uint8Array(decrypted);
console.log(arr.slice(0,16));
console.log(new TextDecoder().decode(arr.slice(0,16)));
