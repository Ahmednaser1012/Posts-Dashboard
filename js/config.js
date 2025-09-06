const AppState = {
  posts: [],
  filteredPosts: [],
  currentPage: 1,
  pageSize: 10,
  editingPost: null,
  nextId: 101,
};

// DOM Elements
const elements = {
  loginPage: document.getElementById("login-page"),
  dashboardPage: document.getElementById("dashboard-page"),
  loginForm: document.getElementById("login-form"),
  logoutBtn: document.getElementById("logout-btn"),
  postsSection: document.getElementById("posts-section"),
  editSection: document.getElementById("edit-section"),
  postsNav: document.getElementById("posts-nav"),
  createNav: document.getElementById("create-nav"),
  searchInput: document.getElementById("search-input"),
  sortSelect: document.getElementById("sort-select"),
  pageSizeSelect: document.getElementById("page-size-select"),
  postsTable: document.getElementById("posts-tbody"),
  loading: document.getElementById("loading"),
  error: document.getElementById("error"),
  empty: document.getElementById("empty"),
  prevBtn: document.getElementById("prev-btn"),
  nextBtn: document.getElementById("next-btn"),
  pageInfo: document.getElementById("page-info"),
  postForm: document.getElementById("post-form"),
  editTitle: document.getElementById("edit-title"),
  cancelBtn: document.getElementById("cancel-btn"),
  resetBtn: document.getElementById("reset-btn"),
};

// Validation
const Validation = {
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  isValidPassword(password) {
    return password.length >= 6;
  },

  showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
  },

  clearErrors() {
    document.querySelectorAll(".error").forEach((el) => (el.textContent = ""));
  },
};
