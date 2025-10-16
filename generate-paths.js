// generate-paths.js
import fs from 'fs';
import path from 'path';

export function generatePaths() {
    const contentDir = path.resolve(process.cwd(), 'src/content');
    const languages = fs.readdirSync(contentDir).filter(item => fs.statSync(path.join(contentDir, item)).isDirectory());
    const paths = new Set();
    paths.add('/');

    for (const lang of languages) {
        paths.add(`/${lang}.html`);
        const langDir = path.join(contentDir, lang);
        const categories = fs.readdirSync(langDir).filter(item => fs.statSync(path.join(langDir, item)).isDirectory());

        for (const category of categories) {
            paths.add(`/${lang}/${category}.html`);
            const categoryDir = path.join(langDir, category);
            const files = fs.readdirSync(categoryDir).filter(file => file.endsWith('.md'));

            for (const file of files) {
                const slug = file.replace(/\.md$/, '');
                paths.add(`/${lang}/${category}/${slug}.html`);
            }
        }
    }
    console.log(`Trovati ${paths.size} percorsi unici da generare.`);
    return Array.from(paths);
}