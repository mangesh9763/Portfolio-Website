import fs from "fs";
import path from "path";
import * as THREE from "three";
import { GLTFLoader, DRACOLoader } from "three-stdlib";

const encPath = path.resolve('public/models/character.enc');
const data = await fs.promises.readFile(encPath);
const iv = data.slice(0, 16);
const encrypted = data.slice(16);
const password = 'Character3D#@';
const pwBuffer = new TextEncoder().encode(password);
const hashed = await crypto.subtle.digest('SHA-256', pwBuffer);
const key = await crypto.subtle.importKey('raw', hashed.slice(0,32), {name:'AES-CBC'}, false, ['decrypt']);
const decrypted = await crypto.subtle.decrypt({name:'AES-CBC', iv}, key, encrypted);
const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
const decoderUrl = new URL('public/draco/', import.meta.url).href;
console.log('DRACO URL', decoderUrl);
dracoLoader.setDecoderPath(decoderUrl);
loader.setDRACOLoader(dracoLoader);
loader.parse(new Uint8Array(decrypted), new URL('file:///'+path.resolve('.')).href, (gltf) => {
  const names = [];
  gltf.scene.traverse(obj => {
    if (obj.name && obj.name.length) names.push(obj.name);
  });
  const unique = [...new Set(names)].sort();
  console.log('names count', unique.length);
  console.log(unique.slice(0,200));
  const spine = unique.filter(n => /spine|head|neck|face/i.test(n));
  console.log('spine/head names', spine);
}, (error) => {
  console.error('parse error', error);
});
