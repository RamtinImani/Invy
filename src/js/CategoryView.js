import Storage from "./Storage.js";
//! selectors:
const categoryTitle = document.querySelector("#category-title");
const categoryDescription = document.querySelector("#category-description");
const categoryAddBtn = document.querySelector("#add-new-category");
const categoryToggleBtn = document.querySelector("#toggle-category");
const categoryCancelBtn = document.querySelector("#cancel-category");
const categoryWrapper = document.querySelector("#category-wrapper");

class CategoryView {
  constructor() {
    categoryAddBtn.addEventListener("click", (e) => this.addNewCategory(e));
    categoryToggleBtn.addEventListener("click", (e) => this.toggleCategory(e));
    categoryCancelBtn.addEventListener("click", (e) => this.cancelCategory(e));
    this.categories = [];
  }

  addNewCategory(e) {
    e.preventDefault();
    const title = categoryTitle.value;
    const description = categoryDescription.value;
    
    if (!title || !description) return;

    Storage.saveCategory({ title, description });
    this.categories = Storage.getAllCategories();

    //! update category list option in DOM
    this.createCategoriesList();

    //! clear inputs
    categoryTitle.value = "";
    categoryDescription.value = "";

    //! display category section
    categoryWrapper.classList.add("hidden");
    categoryToggleBtn.classList.remove("hidden");
  }

  setCategories() {
    this.categories = Storage.getAllCategories();
  }

  createCategoriesList() {
    let result = `<option value="" class="bg-slate-500">Select a category</option>`;

    this.categories.forEach((category) => {
      result += `<option value=${category.id} class="bg-slate-500">${category.title}</option>`;
    });

    const categoriesList = document.querySelector("#product-category");
    categoriesList.innerHTML = result;
  }

  toggleCategory(e) {
    e.preventDefault();
    categoryWrapper.classList.remove("hidden");
    categoryToggleBtn.classList.add("hidden");
  }

  cancelCategory(e) {
    e.preventDefault();
    categoryWrapper.classList.add("hidden");
    categoryToggleBtn.classList.remove("hidden");
  }
}

export default new CategoryView();
