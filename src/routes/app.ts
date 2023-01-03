interface Routes {
  [key: string]: string;
}

const routes: Routes = {
  home: '',
  login: 'login',
  productDetail: 'products/:id',
  checkout: 'checkout',
  profile: 'profile',
  collections: 'collections',
};

for (const [key, value] of Object.entries(routes)) {
  routes[key] = `/${value}`;
}

export default routes;
