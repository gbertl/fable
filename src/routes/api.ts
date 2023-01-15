const routes = {
  productList: 'products',
  get productDetail() {
    return `${this.productList}/:id`;
  },
  heroProductList: 'hero-products',
  get heroProductDetail() {
    return `${this.heroProductList}/:id`;
  },
  buyerList: 'buyers',
  get buyerDetail() {
    return `${this.buyerList}/:id`;
  },
  orderList: 'orders',
  checkout: 'checkout',
};

export default routes;
