
const balaklavaImage = new URL('../images/balaklava.jpg', import.meta.url);
const rosahutorImage = new URL('../images/rosa-hutor.jpg', import.meta.url);
const kolskiyImage = new URL('../images/kolskiy.jpg', import.meta.url)
const kareliaImage = new URL('../images/karelia.jpg', import.meta.url);
const nizhny_NovgorodImage = new URL('../images/Nizhny_Novgorod.jpg', import.meta.url);
const kurshskaya_kosaImage = new URL('../images/kurshskaya_kosa.jpg', import.meta.url)

const whoIsTheGoat = [
  // меняем исходные пути на переменные
  { name: 'Michael Jordan', image: jordanImage },
  { name: 'Lebron James', link: jamesImage },
  { name: 'Kobe Bryant', link: bryantImage },
];

export const initialElements = [
  {
    name: 'Балаклава',
    link: balaklavaImage,
    alt: 'Балаклавская бухта летом: море и гора'
  },
  {
    name: 'Роза-Хутор',
    link: rosahutorImage,
    alt: 'Роза-хутор: вид с вершины Роза-пик зимой, снег и голубое небо'
  },
  {
    name: 'Кольский полуостров',
    link: kolskiyImage,
    alt:  'Кольский полуостров: каменные уступы, рыже-зелёный мох на земле и серое небо'
  },
  {
    name: 'Карелия',
    link: kareliaImage,
    alt:  'Волны Белого моря и остров, заросший соснами, вдали'
  },
  {
    name: 'Нижний Новгород',
    link: nizhny_NovgorodImage,
    alt:  'Прогулочная дорожка вокруг стен нижегородского Кремля на холме'
  },
  {
    name: 'Куршская коса',
    link: kurshskaya_kosaImage,
    alt:  'Куршская Коса: изогнутые сосны и легкий утренний туман'
  }
];
