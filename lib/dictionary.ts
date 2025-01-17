type NestedValue = string | NestedDictionary | Array<Record<string, string>>;

interface NestedDictionary {
  [key: string]: NestedValue;
}

export interface Dictionary {
  [key: string]: NestedDictionary;
}

export async function getDictionary(locale: string): Promise<Dictionary> {
  switch (locale) {
    case 'en':
      return (await import('../messages/en.json')).default as Dictionary;
    case 'fr':
      return (await import('../messages/fr.json')).default as Dictionary;
    case 'es':
      return (await import('../messages/es.json')).default as Dictionary;
    default:
      return (await import('../messages/en.json')).default as Dictionary; // Fallback to English
  }
}

// Example usage (you can remove this in production)
async function test() {
  const enDictionary = await getDictionary('en');
  const frDictionary = await getDictionary('fr');
  const esDictionary = await getDictionary('es');

  console.log('English:', enDictionary.Header.title);
  console.log('French:', frDictionary.Header.title);
  console.log('Spanish:', esDictionary.Header.title);
}

// Uncomment the line below to run the test
// test();

