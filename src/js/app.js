import CategoryView from "./CategoryView.js";
import ProductView from "./ProductView.js";

document.addEventListener("DOMContentLoaded", () => {
  CategoryView.setCategories();
  ProductView.setProducts();

  CategoryView.createCategoriesList();
  ProductView.createProductList(ProductView.products);

  ProductView.productsLength();
});
