export default class Storage {
  static getAllCategories() {
    //! get all categories
    const savedCategories = JSON.parse(localStorage.getItem("categories")) || [];
    //! sort categories
    return savedCategories.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }

  static saveCategory(categoryToSave) {
    //! access to all categories
    const savedCategories = this.getAllCategories();
    //! check if category already exist or not?
    const existedCategory = savedCategories.find((category) => category.id === categoryToSave.id);

    //! Edit or Create category condition
    if (existedCategory) {
      // Edit
      existedCategory.title = categoryToSave.title;
      existedCategory.description = categoryToSave.description;
    } else {
      // Create
      categoryToSave.id = new Date().getTime();
      categoryToSave.createdAt = new Date().toISOString();

      savedCategories.push(categoryToSave);
    }
    //! save all categories
    localStorage.setItem("categories", JSON.stringify(savedCategories));
  }

  static getAllProducts(sort = "newest") {
    //! get all products
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    //! sort products (default: newest)
    return savedProducts.sort((a, b) => {
      if (sort === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sort === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });
  }

  static saveProduct(productToSave) {
    //! access to all categories
    const savedProducts = this.getAllProducts();
    //! check if product already exist or not?
    const existedProduct = savedProducts.find((product) => product.id === productToSave.id);

    //! Edit or Create product condition
    if (existedProduct) {
      // Edit
      existedProduct.title = productToSave.title;
      existedProduct.quantity = productToSave.quantity;
      existedProduct.category = productToSave.category;
    } else {
      // Create
      productToSave.id = new Date().getTime();
      productToSave.createdAt = new Date().toISOString();

      savedProducts.push(productToSave);
    }
    //! save all products
    localStorage.setItem("products", JSON.stringify(savedProducts));
  }

  static deleteProduct(productId) {
    const savedProducts = this.getAllProducts();

    const filteredProducts = savedProducts.filter((product) => product.id !== Number(productId));

    localStorage.setItem("products", JSON.stringify(filteredProducts));
  }

  static getProductsLength() {
    return JSON.parse(localStorage.getItem("productsLength") || "0");
  }

  static saveProductsLength(length) {
    localStorage.setItem("productsLength", JSON.stringify(length));
  }
}
