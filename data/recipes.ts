export type Recipe = {
  slug: string;
  title: string;
  intro: string;
  category: string;
  diet: string;
  prep: number;
  cook: number;
  temperature: number;
  servings: number;
  basket: string;
  image: string;
  ingredients: string[];
  steps: string[];
  tip: string;
};

const base = [
  ["knusprige-kartoffelspalten", "Knusprige Kartoffelspalten", "Kartoffeln & Gemüse", "Vegan", 12, 22, 190, "Kartoffeln, Paprika und Rosmarin – außen kross, innen weich.", ["800 g festkochende Kartoffeln", "1 EL Rapsöl", "1 TL Paprikapulver", "Rosmarin, Salz und Pfeffer"]],
  ["saftige-haehnchenbrust", "Saftige Hähnchenbrust", "Hähnchen & Fleisch", "Fleisch", 8, 16, 180, "Ein unkompliziertes Feierabendgericht mit würziger Kräuterkruste.", ["2 Hähnchenbrustfilets", "1 EL Olivenöl", "1 TL Kräuter", "Paprika, Salz und Pfeffer"]],
  ["lachs-mit-zitrone", "Lachs mit Zitrone & Dill", "Fisch", "Fisch", 8, 11, 180, "Zarter Lachs mit frischer Zitrone – schnell und zuverlässig zubereitet.", ["2 Lachsfilets", "1 Bio-Zitrone", "1 TL Öl", "Dill, Salz und Pfeffer"]],
  ["kichererbsen-crunch", "Gerösteter Kichererbsen-Crunch", "Snacks", "Vegan", 6, 15, 190, "Knuspriger Snack mit Rauchpaprika für Sofa, Lunchbox oder Salat.", ["1 Dose Kichererbsen", "1 TL Öl", "Rauchpaprika", "Salz"]],
  ["feta-gemuese-paekchen", "Feta-Gemüse-Päckchen", "Vegetarisch", "Vegetarisch", 10, 16, 180, "Mediterranes Gemüse und cremiger Feta in einer kleinen ofenfesten Form.", ["200 g Feta", "1 Zucchini", "200 g Cherrytomaten", "Oregano und 1 TL Öl"]],
  ["apfel-zimt-ringe", "Warme Apfel-Zimt-Ringe", "Dessert", "Vegetarisch", 10, 10, 180, "Ein duftendes Dessert mit wenig Aufwand und viel Zimt.", ["2 feste Äpfel", "1 TL Zimt", "1 TL Zucker", "1 TL Zitronensaft"]],
  ["falafel-baellchen", "Grüne Falafel-Bällchen", "Vegetarisch", "Vegan", 15, 14, 190, "Kräuterfrische Falafel mit knuspriger Hülle und saftigem Kern.", ["250 g Kichererbsen", "1 kleine Zwiebel", "Petersilie", "Kreuzkümmel und Salz"]],
  ["parmesan-brokkoli", "Parmesan-Brokkoli", "Kartoffeln & Gemüse", "Vegetarisch", 8, 11, 185, "Röstiger Brokkoli mit würziger Parmesankruste.", ["500 g Brokkoli", "30 g Parmesan", "1 TL Öl", "Knoblauch, Salz und Pfeffer"]],
  ["mini-frikadellen", "Saftige Mini-Frikadellen", "Familienküche", "Fleisch", 12, 12, 185, "Kleine Frikadellen, die bei Groß und Klein gut ankommen.", ["500 g Hackfleisch", "1 Ei", "2 EL Semmelbrösel", "Senf, Salz und Pfeffer"]],
  ["suesskartoffel-pommes", "Süßkartoffel-Pommes", "Snacks", "Vegan", 12, 18, 195, "Würzige Süßkartoffel-Sticks mit feiner Maisstärke-Kruste.", ["600 g Süßkartoffeln", "1 EL Maisstärke", "1 EL Öl", "Paprika und Salz"]],
  ["fruehstuecks-eier", "Frühstücks-Eier im Förmchen", "Frühstück", "Vegetarisch", 5, 9, 170, "Warme Frühstückseier mit Spinat und Tomaten direkt aus dem Airfryer.", ["4 Eier", "1 Handvoll Spinat", "6 Cherrytomaten", "Salz und Pfeffer"]],
  ["bananen-hafer-muffins", "Bananen-Hafer-Muffins", "Backen", "Vegetarisch", 12, 15, 165, "Saftige kleine Muffins, natürlich gesüßt mit reifer Banane.", ["2 reife Bananen", "120 g Haferflocken", "2 Eier", "1 TL Backpulver"]],
  ["tofu-sesam-bites", "Sesam-Tofu-Bites", "Vegetarisch", "Vegan", 15, 16, 190, "Knuspriger Tofu mit Soja, Sesam und einem Hauch Ingwer.", ["400 g Naturtofu", "1 EL Sojasauce", "1 EL Stärke", "Sesam und Ingwer"]],
  ["quesadillas", "Knusprige Gemüse-Quesadillas", "Familienküche", "Vegetarisch", 10, 8, 180, "Goldene Tortillas mit Käse, Mais und Paprika.", ["4 kleine Tortillas", "120 g Reibekäse", "1 Paprika", "80 g Mais"]],
  ["garnelen-knoblauch", "Knoblauch-Garnelen", "Fisch", "Fisch", 8, 8, 190, "Saftige Garnelen mit Knoblauch, Petersilie und Zitrone.", ["400 g Garnelen", "2 Knoblauchzehen", "1 TL Öl", "Petersilie und Zitrone"]],
  ["rosenkohl-balsamico", "Balsamico-Rosenkohl", "Kartoffeln & Gemüse", "Vegan", 10, 16, 190, "Herzhafter Rosenkohl mit karamellisierten Kanten.", ["500 g Rosenkohl", "1 EL Balsamico", "1 TL Ahornsirup", "1 TL Öl und Salz"]],
  ["curry-blumenkohl", "Curry-Blumenkohl", "Vegetarisch", "Vegan", 8, 14, 190, "Goldbrauner Blumenkohl mit milder Currynote.", ["1 kleiner Blumenkohl", "1 EL Öl", "2 TL Currypulver", "Salz"]],
  ["haehnchen-nuggets", "Hausgemachte Hähnchen-Nuggets", "Familienküche", "Fleisch", 15, 12, 190, "Knusprige Nuggets mit einer einfachen Cornflakes-Panade.", ["500 g Hähnchenbrust", "60 g Cornflakes", "1 Ei", "Paprika und Salz"]],
  ["camembert", "Gebackener Camembert", "Snacks", "Vegetarisch", 5, 9, 180, "Cremiger Käse mit knuspriger Hülle für einen gemütlichen Abend.", ["2 kleine Camemberts", "1 Ei", "Semmelbrösel", "Preiselbeeren zum Servieren"]],
  ["zimtschnecken", "Schnelle Mini-Zimtschnecken", "Backen", "Vegetarisch", 10, 11, 170, "Warme Zimtschnecken aus Blätterteig für spontanen Besuch.", ["1 Rolle Blätterteig", "30 g Butter", "2 EL Zucker", "2 TL Zimt"]],
  ["pizza-baguettes", "Bunte Pizza-Baguettes", "Familienküche", "Vegetarisch", 10, 9, 180, "Ein schneller Klassiker mit Tomate, Gemüse und Käse.", ["2 Baguettebrötchen", "100 ml Passata", "120 g Käse", "Paprika, Mais und Oregano"]],
  ["mozzarella-sticks", "Mozzarella-Sticks", "Snacks", "Vegetarisch", 20, 8, 190, "Knusprige Käse-Sticks mit würziger Kräuterpanade.", ["250 g fester Mozzarella", "1 Ei", "Semmelbrösel", "Italienische Kräuter"]],
  ["kokos-garnelen", "Kokos-Garnelen", "Fisch", "Fisch", 15, 9, 190, "Exotisch-knusprige Garnelen mit Kokosflocken.", ["400 g Garnelen", "1 Ei", "50 g Kokosraspeln", "40 g Semmelbrösel"]],
  ["ratatouille", "Schnelles Airfryer-Ratatouille", "Vegetarisch", "Vegan", 15, 20, 180, "Sommergemüse mit Kräutern, unkompliziert in einer Form gegart.", ["1 Zucchini", "1 Aubergine", "1 Paprika", "Tomaten, Öl und Kräuter"]],
  ["haehnchenschenkel", "Knusprige Hähnchenschenkel", "Hähnchen & Fleisch", "Fleisch", 10, 24, 190, "Würzige Haut und saftiges Fleisch – ein unkompliziertes Familienessen.", ["4 kleine Hähnchenschenkel", "1 EL Öl", "Paprika", "Salz, Pfeffer und Knoblauch"]],
  ["ofengemuese", "Buntes Airfryer-Ofengemüse", "Kartoffeln & Gemüse", "Vegan", 12, 16, 190, "Farbenfrohes Gemüse mit Röstaromen und frischen Kräutern.", ["1 Zucchini", "2 Paprika", "1 rote Zwiebel", "1 EL Öl und Kräuter"]],
  ["birnen-crumble", "Birnen-Crumble", "Dessert", "Vegetarisch", 12, 15, 170, "Fruchtiger Crumble mit Haferflocken und Zimt.", ["3 Birnen", "60 g Haferflocken", "40 g Mehl", "40 g Butter und Zimt"]],
  ["lachsbaellchen", "Lachs-Bällchen mit Kräutern", "Fisch", "Fisch", 15, 11, 185, "Zarte Lachs-Bällchen für Bowl, Salat oder schnellen Snack.", ["400 g Lachsfilet", "1 Ei", "2 EL Semmelbrösel", "Dill und Zitrone"]],
  ["blumenkohl-wings", "BBQ-Blumenkohl-Wings", "Snacks", "Vegan", 15, 18, 190, "Würzige Blumenkohl-Röschen mit klebriger BBQ-Glasur.", ["1 Blumenkohl", "80 ml Pflanzendrink", "80 g Mehl", "4 EL BBQ-Sauce"]],
  ["schoko-lava-cakes", "Kleine Schoko-Lava-Cakes", "Dessert", "Vegetarisch", 12, 8, 180, "Warme Schokoküchlein mit weichem Kern für besondere Momente.", ["100 g Zartbitterschokolade", "80 g Butter", "2 Eier", "50 g Zucker und 30 g Mehl"]],
] as const;

const images = ["/heroes/hero-familie-airfryer.webp", "/heroes/hero-paar-date-night-airfryer.webp", "/heroes/hero-freunde-spieleabend-airfryer.webp", "/heroes/hero-mehrgenerationen-airfryer.webp"];

export const recipes: Recipe[] = base.map((item, index) => ({
  slug: item[0], title: item[1], category: item[2], diet: item[3], prep: item[4], cook: item[5], temperature: item[6], intro: item[7], ingredients: [...item[8]],
  servings: 4,
  basket: index % 4 === 0 ? "ab 5 Litern" : index % 3 === 0 ? "ab 4 Litern" : "ab 3,5 Litern",
  image: images[index % images.length],
  steps: [
    "Alle Zutaten vorbereiten und möglichst gleichmäßig portionieren. Den Airfryer bei Bedarf kurz vorheizen.",
    `Die vorbereiteten Zutaten locker in den Korb geben und bei ${item[6]} °C zunächst ${Math.max(5, Math.floor(item[5] / 2))} Minuten garen.`,
    "Korb herausziehen, Inhalt wenden oder kräftig schütteln und anschließend fertig garen.",
    "Garzustand prüfen, nach Geschmack würzen und direkt servieren.",
  ],
  tip: "Der Korb sollte nicht zu voll sein. Lieber in zwei Durchgängen garen – so kann die heiße Luft besser zirkulieren.",
}));

export function getRecipe(slug: string) {
  return recipes.find((recipe) => recipe.slug === slug);
}
