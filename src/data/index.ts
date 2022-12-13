import { Sizes } from '../typings.d';

import {
  productHeroA,
  productHeroB,
  productHeroC,
  productHeroD,
  productHeroE,
} from '../assets';

import products from './products';

const categories = [
  {
    id: 1,
    name: 'jacket',
  },
  { id: 2, name: 'shorts' },
];

const colors = [
  { id: 1, hex: '#F4E1CC' },
  { id: 2, hex: '#262626' },
  { id: 3, hex: '#9FAED9' },
  { id: 4, hex: '#56AA91' },
  { id: 5, hex: '#707070' },
  { id: 6, hex: '#743821' },
  { id: 7, hex: '#C89607' },
  { id: 8, hex: '#214133' },
];

const sizes = [Sizes.XS, Sizes.S, Sizes.M, Sizes.L, Sizes.XL];

const heroProducts = [
  products.find((p) => p.id == 2),
  { id: null, heroImage: productHeroA },
  products.find((p) => p.id == 6),
  { id: null, heroImage: productHeroB },
  products.find((p) => p.id == 8),
  products.find((p) => p.id == 4),
  { id: null, heroImage: productHeroC },
  { id: null, heroImage: productHeroD },
  { id: null, heroImage: productHeroE },
];

export { products, categories, colors, sizes, heroProducts };
