// Généré automatiquement — attribution des photos (Wikimedia Commons).
export interface ImageCredit {
  author: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
}

/** Clé = nom de fichier dans /public/images/blog */
export const IMAGE_CREDITS: Record<string, ImageCredit> = {
  "port-de-larmor-baden-depuis-berder.jpg": {
    "author": "Rosescreen",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Port_de_Larmor_Baden_depuis_Berder.jpg"
  },
  "le-golfe-du-morbihan-panoramio-5.jpg": {
    "author": "chisloup",
    "license": "CC BY 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Le_golfe_du_morbihan_-_panoramio_(5).jpg"
  },
  "morbihan-larmor-baden-port-panoramio.jpg": {
    "author": "rene boulay",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Morbihan_Larmor-Baden_Port_-_panoramio.jpg"
  },
  "089-larmor-baden-paludo.jpg": {
    "author": "Moreau.henri",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:089_Larmor-Baden_Paludo.jpg"
  },
  "plage-de-larmor-baden-fevrier-2013-panoramio.jpg": {
    "author": "chisloup",
    "license": "CC BY 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Plage_de_larmor_baden_fevrier_2013_-_panoramio.jpg"
  },
  "le-golfe-du-morbihan-panoramio-4.jpg": {
    "author": "chisloup",
    "license": "CC BY 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Le_golfe_du_morbihan_-_panoramio_(4).jpg"
  },
  "larmor-baden-anse-locmiquel-1.jpg": {
    "author": "S. Plaine",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Larmor-Baden_-_Anse_Locmiquel_(1).jpg"
  },
  "berder-passage-maree-basse.jpg": {
    "author": "Jean-Christophe BENOIST",
    "license": "CC BY 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Berder-Passage_mar%C3%A9e_basse.jpg"
  },
  "cromlech-d-er-lannic-et-cairn-de-gavrinis-par-drone-vue-1.jpg": {
    "author": "Pierre F631",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Cromlech_d'Er_Lannic_et_cairn_de_Gavrinis_par_drone_-_vue_1.jpg"
  },
  "larmor-baden-panoramio.jpg": {
    "author": "PJMarriott",
    "license": "CC BY 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Larmor_Baden_-_panoramio.jpg"
  },
  "port-de-larmor-baden.jpg": {
    "author": "FredSeiller",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Port_de_Larmor-Baden.jpg"
  },
  "le-golfe-du-morbihan-vu-du-port-de-larmor-baden-panoramio.jpg": {
    "author": "chisloup",
    "license": "CC BY 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Le_golfe_du_morbihan_vu_du_port_de_larmor_baden_-_panoramio.jpg"
  },
  "cairn-gavrinis-entrance.jpg": {
    "author": "Myrabella",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Cairn_Gavrinis_entrance.jpg"
  },
  "plage-du-gored-ile-aux-moines-1.jpg": {
    "author": "Ji-Elle",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Plage_du_Gored-%C3%8Ele-aux-Moines_(1).jpg"
  },
  "ile-de-berder-vegetation.jpg": {
    "author": "Ji-Elle",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:%C3%8Ele_de_Berder-V%C3%A9g%C3%A9tation.jpg"
  }
};

/** Retourne le crédit d'une image à partir de son chemin /images/blog/xxx.jpg */
export function creditFor(imageUrl: string): ImageCredit | null {
  const file = imageUrl.split("/").pop() || "";
  return IMAGE_CREDITS[file] ?? null;
}
