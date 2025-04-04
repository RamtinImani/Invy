import Storage from "./Storage.js";
//! selectors:
const productTitle = document.querySelector("#product-title");
const productQuantity = document.querySelector("#product-quantity");
const productCategory = document.querySelector("#product-category");
const productAddBtn = document.querySelector("#add-new-product");
const productSearchInput = document.querySelector("#search-input");
const productSelectedSort = document.querySelector("#sort-products");
const productLengthDOM = document.querySelector("#products-length");
//! edit product modal:
const productModalBackdrop = document.querySelector(".modal-backdrop");
const productModal = document.querySelector(".modal");
const productCloseModalBtn = document.querySelector(".modal__header-close");
const productModalForm = document.querySelector(".modal__form");
const productModalInput = document.querySelector(".modal__form-input");
const productEditModalBtn = document.querySelector(".modal__edit-button");

class ProductView {
  constructor() {
    productAddBtn.addEventListener("click", (e) => this.addNewProduct(e));
    productSearchInput.addEventListener("input", (e) => this.searchProduct(e));
    productSelectedSort.addEventListener("change", (e) => this.sortProducts(e));
    this.products = [];

    //* hide modal when user click on backdrop or close btn
    productModalBackdrop.addEventListener("click", this.hideModal);
    productCloseModalBtn.addEventListener("click", this.hideModal);
  }

  addNewProduct(e) {
    e.preventDefault();

    const title = productTitle.value;
    const quantity = productQuantity.value;
    const category = productCategory.value;

    if (!title || !quantity || !category) return;

    Storage.saveProduct({ title, quantity, category });

    this.products = Storage.getAllProducts();

    this.createProductList(this.products);

    productTitle.value = "";
    productQuantity.value = "";
    productCategory.value = "";

    //! save products length value
    Storage.saveProductsLength(this.products.length);
    this.productsLength();
  }

  setProducts() {
    this.products = Storage.getAllProducts();
  }

  createProductList(products) {
    let result = "";

    products.forEach((product) => {
      //! find select options based on their value(id)
      const selectedCategory = Storage.getAllCategories().find(
        (category) => category.id === Number(product.category)
      );

      result += `<div class="flex items-center justify-between text-slate-100 mb-2">
          <span class="font-bold">${product.title}</span>
          <div class="flex items-center gap-x-5">
            <span>${new Date(product.createdAt).toLocaleDateString("fa-IR")}</span>
            <span class="text-slate-400 text-sm border border-slate-400 rounded-full px-3 py-0.5"
              >${selectedCategory.title}</span
            >
            <span
              class="bg-slate-500 size-7 rounded-full flex justify-center items-center font-bold border-2 border-slate-300"
              >${product.quantity}</span
            >
            <button data-product-id=${
              product.id
            } class="edit-product inline-block text-sm border border-blue-400 text-blue-400 rounded-full px-3 py-0.5">
              Edit
            </button>
            <button data-product-id=${
              product.id
            } class="delete-product inline-block text-sm border border-rose-400 text-rose-400 rounded-full px-3 py-0.5">
              Delete
            </button>
          </div>
        </div>`;
    });

    const productsList = document.querySelector("#products-list");
    productsList.innerHTML = result;

    //! delete button event and selection
    const deleteBtns = [...document.querySelectorAll(".delete-product")];
    deleteBtns.forEach((button) => {
      button.addEventListener("click", (e) => this.deleteProduct(e));
    });

    //! edit button event and selection
    const editBtns = [...document.querySelectorAll(".edit-product")];
    editBtns.forEach((button) => {
      button.addEventListener("click", (e) => this.editProduct(e));
    });
  }

  searchProduct(e) {
    const searchValue = e.target.value.trim().toLowerCase();

    const searchedProduct = this.products.filter((product) => {
      return product.title.trim().toLowerCase().includes(searchValue);
    });

    this.createProductList(searchedProduct);
  }

  sortProducts(e) {
    const selectedSort = e.target.value;
    //! sort products
    this.products = Storage.getAllProducts(selectedSort);
    //! show them on DOM
    this.createProductList(this.products);
  }

  deleteProduct(e) {
    const productId = e.target.dataset.productId;

    Storage.deleteProduct(productId);
    this.products = Storage.getAllProducts();
    //! show them on DOM
    this.createProductList(this.products);
    //! update products length
    Storage.saveProductsLength(this.products.length);
    this.productsLength();
  }

  editProduct(e) {
    //! show modal
    this.showModal();

    const productId = Number(e.target.dataset.productId);

    this.products = Storage.getAllProducts();

    const editedProduct = this.products.find((product) => product.id === productId);
    productModalInput.value = editedProduct.title;
    //! add submit event to modal form
    productModalForm.addEventListener("submit", (event) => {
      event.preventDefault();

      editedProduct.title = productModalInput.value;

      Storage.saveProduct(editedProduct);

      this.createProductList(this.products);

      //! hide modal
      this.hideModal();
    });
  }

  productsLength() {
    const productsLength = Storage.getProductsLength();
    productLengthDOM.textContent = productsLength;
  }

  showModal() {
    productModalBackdrop.classList.add("show-modal-backdrop");
    productModal.classList.add("show-modal");
  }

  hideModal() {
    productModalBackdrop.classList.remove("show-modal-backdrop");
    productModal.classList.remove("show-modal");
  }
}

export default new ProductView();
