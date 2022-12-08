import product1 from './assets/images/product1.png';
import product2 from './assets/images/product2.png';
import productHero2 from './assets/images/product-hero2.png';
import product3 from './assets/images/product3.png';
import product4 from './assets/images/product4.png';
import productHero4 from './assets/images/product-hero4.png';
import product5 from './assets/images/product5.png';
import product6 from './assets/images/product6.png';
import productHero6 from './assets/images/product-hero6.png';
import product7 from './assets/images/product7.png';
import product8 from './assets/images/product8.png';
import productHero8 from './assets/images/product-hero8.png';
import product9 from './assets/images/product9.png';
import product10 from './assets/images/product10.png';
import product11 from './assets/images/product11.png';
import { Sizes } from './typings.d';

export const products = [
  {
    id: 1,
    image: product1,
    name: 'Jacket CLR Black',
    collection: 'Fable of Colors',
    category: 'Jacket',
    size: Sizes.L,
    color: 'black',
    price: 710,
  },
  {
    id: 2,
    heroImage: productHero2,
    image: product2,
    name: 'Jacket CLR Blue',
    collection: 'Fable of Colors',
    category: 'Jacket',
    size: Sizes.L,
    color: 'blue',
    price: 550,
  },
  {
    id: 3,
    image: product3,
    name: 'Jacket CLR Ruby',
    collection: 'Fable of Colors',
    category: 'Jacket',
    size: Sizes.L,
    color: 'ruby',
    price: 800,
  },
  {
    id: 4,
    heroImage: productHero4,
    image: product4,
    name: 'Jacket CLR White',
    collection: 'Fable of Colors',
    category: 'Jacket',
    size: Sizes.L,
    color: 'white',
    price: 920,
  },
  {
    id: 5,
    image: product5,
    name: 'Jacket CLR Green',
    collection: 'Fable of Colors',
    category: 'Jacket',
    size: Sizes.S,
    color: 'green',
    price: 929,
  },
  {
    id: 6,
    heroImage: productHero6,
    image: product6,
    name: 'Jacket CLR Orange',
    collection: 'Fable of Colors',
    category: 'Jacket',
    size: Sizes.L,
    color: 'orange',
    price: 420,
  },
  {
    id: 7,
    image: product7,
    name: 'Shorts CLR Blue',
    collection: 'Fable of Colors',
    category: 'Shorts',
    size: Sizes.L,
    color: 'blue',
    price: 470,
  },
  {
    id: 8,
    heroImage: productHero8,
    image: product8,
    name: 'Shorts CLR Black',
    collection: 'Fable of Colors',
    category: 'Shorts',
    size: Sizes.L,
    color: 'black',
    price: 570,
  },
  {
    id: 9,
    image: product9,
    name: 'Shorts CLR White',
    collection: 'Fable of Colors',
    category: 'Shorts',
    size: Sizes.L,
    color: 'white',
    price: 1120,
  },
  {
    id: 10,
    image: product10,
    name: 'Shorts CLR Orange',
    collection: 'Fable of Colors',
    category: 'Shorts',
    size: Sizes.L,
    color: 'orange',
    price: 875,
  },
  {
    id: 11,
    image: product11,
    name: 'Shorts CLR Ruby',
    collection: 'Fable of Colors',
    category: 'Shorts',
    size: Sizes.XL,
    color: 'ruby',
    price: 835,
  },
];

export const colors = [
  { id: 1, hex: '#F4E1CC' },
  { id: 2, hex: '#262626' },
  { id: 3, hex: '#9FAED9' },
  { id: 4, hex: '#56AA91' },
  { id: 5, hex: '#707070' },
  { id: 6, hex: '#743821' },
  { id: 7, hex: '#C89607' },
  { id: 8, hex: '#214133' },
];

export const sizes = [Sizes.XS, Sizes.S, Sizes.M, Sizes.L, Sizes.XL];
