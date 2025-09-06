// Posts Management
const Posts = {
  renderPosts() {
    const startIndex = (AppState.currentPage - 1) * AppState.pageSize;
    const endIndex = startIndex + AppState.pageSize;
    const postsToShow = AppState.filteredPosts.slice(startIndex, endIndex);

    elements.loading.classList.add("hidden");
    elements.error.classList.add("hidden");
    elements.empty.classList.add("hidden");

    if (postsToShow.length === 0) {
      showEmpty();
      return;
    }

    document.getElementById("posts-table-container").classList.remove("hidden");

    elements.postsTable.innerHTML = postsToShow.map(
      (post) => `
            <tr>
                <td>${post.id}</td>
                <td>${post.title}</td>
                <td title="${post.body}">${post.body}</td>
                <td>
                    <button class="action-btn" onclick="Posts.editPost(${post.id})">Edit</button>
                </td>
            </tr>
        `
    );

    this.updatePagination();
  },

  updatePagination() {
    const totalPages = Math.ceil(
      AppState.filteredPosts.length / AppState.pageSize
    );

    elements.prevBtn.disabled = AppState.currentPage === 1;
    elements.nextBtn.disabled = AppState.currentPage === totalPages;
    elements.pageInfo.textContent = `Page ${AppState.currentPage} of ${totalPages}`;
  },

  searchPosts(query) {
    const searchTerm = query.toLowerCase().trim();

    if (searchTerm === "") {
      AppState.filteredPosts = [...AppState.posts];
    } else {
      AppState.filteredPosts = AppState.posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm) ||
          post.body.toLowerCase().includes(searchTerm)
      );
    }

    AppState.currentPage = 1;
    this.renderPosts();
  },

  resetSearch() {
    elements.searchInput.value = "";
    AppState.filteredPosts = [...AppState.posts];
    AppState.currentPage = 1;
    this.renderPosts();
  },

  sortPosts(sortBy) {
    const [field, direction] = sortBy.split("-");

    AppState.filteredPosts.sort((a, b) => {
      let aValue = a[field];
      let bValue = b[field];

      if (field === "title") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (direction === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    this.renderPosts();
  },

  changePageSize(newSize) {
    AppState.pageSize = parseInt(newSize);
    AppState.currentPage = 1;
    this.renderPosts();
  },

  nextPage() {
    const totalPages = Math.ceil(
      AppState.filteredPosts.length / AppState.pageSize
    );
    if (AppState.currentPage < totalPages) {
      AppState.currentPage++;
      this.renderPosts();
    }
  },

  prevPage() {
    if (AppState.currentPage > 1) {
      AppState.currentPage--;
      this.renderPosts();
    }
  },

  ///*///************/////***************/////**************** */
  editPost(id) {
    const post = AppState.posts.find((p) => p.id === id);
    if (post) {
      AppState.editingPost = post;
      elements.editTitle.textContent = "Edit Post";
      document.getElementById("post-title").value = post.title;
      document.getElementById("post-body").value = post.body;
      showSection(elements.editSection);
    }
  },

  createNewPost() {
    AppState.editingPost = null;
    elements.editTitle.textContent = "Create New Post";
    document.getElementById("post-title").value = "";
    document.getElementById("post-body").value = "";
    showSection(elements.editSection);
  },

  savePost(title, body) {
    if (AppState.editingPost) {
      const index = AppState.posts.findIndex(
        (p) => p.id === AppState.editingPost.id
      );
      AppState.posts[index] = { ...AppState.editingPost, title, body };
    } else {
      const newPost = {
        id: AppState.nextId++,
        title,
        body,
        userId: 1,
      };
      AppState.posts.push(newPost);
    }
    sessionStorage.setItem("posts", JSON.stringify(AppState.posts));
    AppState.filteredPosts = [...AppState.posts];
    showSection(elements.postsSection);
    this.renderPosts();
  },
};
