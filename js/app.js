function initEventListeners() {
  elements.loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    Validation.clearErrors();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    let isValid = true;
    if (!Validation.isValidEmail(email)) {
      Validation.showError("email-error", "Please enter a valid email");
      isValid = false;
    }

    if (!Validation.isValidPassword(password)) {
      Validation.showError(
        "password-error",
        "Password must be at least 6 Numbers long"
      );
      isValid = false;
    }

    if (isValid) {
      Login();
      showDashboard();
      loadPosts();
    }
  });

  elements.logoutBtn.addEventListener("click", () => {
    Logout();
  });

  elements.postsNav.addEventListener("click", (e) => {
    e.preventDefault();
    showSection(elements.postsSection);
  });

  elements.createNav.addEventListener("click", (e) => {
    e.preventDefault();
    Posts.createNewPost();
  });

  elements.searchInput.addEventListener("input", (e) => {
    Posts.searchPosts(e.target.value);
  });

  document.getElementById("clear-search-btn").addEventListener("click", () => {
    Posts.resetSearch();
  });

  elements.sortSelect.addEventListener("change", (e) => {
    Posts.sortPosts(e.target.value);
  });

  elements.pageSizeSelect.addEventListener("change", (e) => {
    Posts.changePageSize(e.target.value);
  });

  elements.prevBtn.addEventListener("click", () => Posts.prevPage());
  elements.nextBtn.addEventListener("click", () => Posts.nextPage());

  elements.postForm.addEventListener("submit", (e) => {
    e.preventDefault();
    Validation.clearErrors();

    const title = document.getElementById("post-title").value.trim();
    const body = document.getElementById("post-body").value.trim();

    let isValid = true;

    if (title.length < 3) {
      Validation.showError(
        "title-error",
        "Title must be at least 3 characters"
      );
      isValid = false;
    }

    if (body.length < 10) {
      Validation.showError("body-error", "Body must be at least 10 characters");
      isValid = false;
    }

    if (isValid) {
      Posts.savePost(title, body);
    }
  });

  elements.cancelBtn.addEventListener("click", () => {
    showSection(elements.postsSection);
  });

  elements.resetBtn.addEventListener("click", () => {
    document.getElementById("post-title").value = "";
    document.getElementById("post-body").value = "";
    Validation.clearErrors();
  });
}

function initApp() {
  initEventListeners();

  if (checkLogin()) {
    showDashboard();
    loadPosts();
  } else {
    showLoginPage();
  }
}

document.addEventListener("DOMContentLoaded", initApp);
