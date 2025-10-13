// build.mjs
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const TRANSLATIONS_FILE = 'testi_tradotti.json';
const CONTENT_DIR = path.join('src', 'content');
const SOURCE_LANG = 'it';
const TARGET_LANGS = ['en', 'fr', 'es', 'de', 'pt'];

async function main() {
  console.log('Inizio la ricostruzione dei file Markdown tradotti...');

  try {
    const translationsData = JSON.parse(await fs.readFile(TRANSLATIONS_FILE, 'utf-8'));

    for (const lang of TARGET_LANGS) {
      console.log(`\n--- Processo la lingua: ${lang.toUpperCase()} ---`);
      const langTranslations = translationsData[lang];
      if (!langTranslations) {
        console.warn(`ATTENZIONE: Nessuna traduzione trovata per la lingua '${lang}'. Salto.`);
        continue;
      }

      for (const relativePath in langTranslations) {
        const translatedData = langTranslations[relativePath];
        const sourcePath = path.join(CONTENT_DIR, SOURCE_LANG, relativePath);
        const targetPath = path.join(CONTENT_DIR, lang, relativePath);

        // Leggi il file sorgente originale per recuperare il frontmatter completo
        const sourceFileContent = await fs.readFile(sourcePath, 'utf-8');
        const { data: sourceFrontmatter } = matter(sourceFileContent);

        // Ricostruisci il nuovo frontmatter
        const newFrontmatter = {
          ...sourceFrontmatter, // Mantiene tutti i campi originali (category, related, etc.)
          title: translatedData.title, // Sovrascrive il titolo
          sources: sourceFrontmatter.sources.map((s, i) => ({
            ...s,
            text: translatedData.sources[i] || s.text // Sovrascrive il testo della fonte
          }))
        };

        // Ricostruisci il file .md completo
        const newFileContent = matter.stringify(translatedData.content, newFrontmatter);

        // Crea la cartella di destinazione se non esiste
        await fs.mkdir(path.dirname(targetPath), { recursive: true });

        // Scrivi il nuovo file
        await fs.writeFile(targetPath, newFileContent);
        console.log(`File creato: ${targetPath}`);
      }
    }

    console.log('\nRicostruzione completata con successo!');

  } catch (error) {
    console.error('\nERRORE durante la ricostruzione:', error);
  }
}

main();