declare global {
  interface Window {
    p5: any;
  }
}

/**
 * Carica p5.js dal vendor locale e restituisce l'istanza globale
 */
export async function loadP5() {
  const module = await import('$lib/vendor/p5.min.js');
  return module.default || window.p5;
}
