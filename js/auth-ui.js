// auth function
function checkLogin() {
  return localStorage.getItem("authToken") === "true";
}

function Login() {
  localStorage.setItem("authToken", "true");
}

function Logout() {
  localStorage.removeItem("authToken");
  showLoginPage();
}

function showLoginPage() {
  elements.loginPage.classList.remove("hidden");
  elements.dashboardPage.classList.add("hidden");
}

function showDashboard() {
  elements.loginPage.classList.add("hidden");
  elements.dashboardPage.classList.remove("hidden");
}

//loading, error, empty
function showLoading() {
  elements.loading.classList.remove("hidden");
  elements.error.classList.add("hidden");
  elements.empty.classList.add("hidden");
  document.getElementById("posts-table-container").classList.add("hidden");
}

function hideLoading() {
  elements.loading.classList.add("hidden");
  document.getElementById("posts-table-container").classList.remove("hidden");
}

function showError(message) {
  elements.loading.classList.add("hidden");
  elements.error.textContent = message;
  elements.error.classList.remove("hidden");
  elements.empty.classList.add("hidden");
  document.getElementById("posts-table-container").classList.add("hidden");
}

function showEmpty() {
  elements.loading.classList.add("hidden");
  elements.error.classList.add("hidden");
  elements.empty.classList.remove("hidden");
  document.getElementById("posts-table-container").classList.add("hidden");
}

function showSection(sectionToShow) {
  elements.postsSection.classList.add("hidden");
  elements.editSection.classList.add("hidden");
  sectionToShow.classList.remove("hidden");

  // update nav
  var navLinks = document.querySelectorAll(".nav-link");
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].classList.remove("active");
  }

  if (sectionToShow === elements.postsSection) {
    elements.postsNav.classList.add("active");
  } else {
    elements.createNav.classList.add("active");
  }
}

// load posts API
async function loadPosts() {
  try {
    showLoading();

    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const posts = await response.json();
    AppState.posts = posts;
    AppState.filteredPosts = [...posts];
    hideLoading();
    Posts.renderPosts();
  } catch (error) {
    showError("Failed to load posts. Please try again.");
    console.log("Error:", error.message);
  }
}
