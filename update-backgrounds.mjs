import { readdirSync, writeFileSync } from 'node:fs';
const dir = new URL('./dist/backgrounds/',import.meta.url);
const names = readdirSync(dir,{withFileTypes:true}).filter(file => file.isFile() && /\.(jpe?g|png|webp|avif)$/i.test(file.name)).map(file=>file.name).sort((a,b)=>a.localeCompare(b,'ru',{numeric:true}));
writeFileSync(new URL('../backgrounds.js',dir),'window.BACKGROUNDS = '+JSON.stringify(names,null,2)+';\n');
