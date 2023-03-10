<template>
  <h1>Books</h1>
  <div class="search-container form-group has-search">
    <span class="fa fa-search form-control-feedback"></span>
    <!-- <label>Suche </label> -->
    <input type="text" class="form-control" id="search-input" placeholder="Suchbegriff eingeben..."
      v-model="searchQuery" />
  </div>
  <div class="pill-container">
    <div class="pill" :class="{ active: filterStatus === 'UNREAD' }"
      @click="filterStatus = (filterStatus === 'UNREAD' ? '' : 'UNREAD')">
      <span><i class="fa fa-filter" aria-hidden="true"></i> UNREAD</span>
    </div>
    <div class="pill" :class="{ active: filterStatus === 'READING' }"
      @click="filterStatus = (filterStatus === 'READING' ? '' : 'READING')">
      <span><i class="fa fa-filter" aria-hidden="true"></i> READING</span>
    </div>
    <div class="pill" :class="{ active: filterStatus === 'READ' }"
      @click="filterStatus = (filterStatus === 'READ' ? '' : 'READ')">
      <span><i class="fa fa-filter" aria-hidden="true"></i> READ</span>
    </div>
    <div class="pill" :class="{ active: sortAscending }" @click="toggleSortAscending">
      <span><i class="fa fa-sort-alpha-asc" aria-hidden="true"></i> ASC</span>
    </div>
    <div class="pill" :class="{ active: sortDescending }" @click="toggleSortDescending">
      <span><i class="fa fa-sort-alpha-desc" aria-hidden="true"></i> DESC</span>
    </div>
    <button class="btn btn-light clear" @click="clearFilters">
      <i class="fa fa-times-circle"></i> Clear</button>
  </div>
  <div v-if="filteredBooks.length">
    <div v-for="book in sortedFilteredBooks" :key="book.id">
      <router-link :to="{ name: 'BookDetails', params: { id: book.id } }">
        <div class="project"
          :class="{ readStatusREAD: book.readStatus === 'READ', readStatusReading: book.readStatus === 'READING', readStatusUnfinished: book.readStatus === 'UNFINISHED' }">
          <div class="actions">
            <div v-if="book.imageUrl && book.imageUrl !== 'null'" class="book-cover">
              <img :src="book.imageUrl" alt="Book Cover Image">
            </div>
            <div v-else>
              <img src="https://via.placeholder.com/200x300?text=No+Cover" alt="Book Cover Image">
            </div>
            <div>
            <h2>{{ book.title }}</h2>
            <p>{{ book.author }}</p>
          </div>
            <div class="icons">
              <router-link :to="{ name: 'BookEdit', params: { id: book.id } }">
                <span class="material-icons">edit</span>
              </router-link>
              <span @click.prevent="deleteBook(book)" class="material-icons">delete</span>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
  <div v-else-if="loading">
    <p>Loading books...</p>
  </div>
  <div v-else>
    <p>Nothing found.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      books: [],
      searchQuery: "",
      filterStatus: '',
      loading: false,
      isFavorite: false,
      sortAscending: false,
      sortDescending: false,
    }
  },
  computed: {
    filteredBooks() {
      const query = this.searchQuery.toLowerCase();
      if (this.filterStatus) {
        return this.books.filter(book => book.readStatus === this.filterStatus && book.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
      } else {
        return this.books.filter(book => book.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
      }
    },
    sortedFilteredBooks() {
      const query = this.searchQuery.toLowerCase();
      let filteredBooks = this.books.filter((book) =>
        book.title.toLowerCase().includes(query)
      );
      if (this.filterStatus) {
        filteredBooks = filteredBooks.filter(
          (book) => book.readStatus === this.filterStatus
        );
      }

      if (this.sortAscending) {
        filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
      } else if (this.sortDescending) {
        this.sortAscending = '';
        filteredBooks.sort((a, b) => b.title.localeCompare(a.title));
      }

      return filteredBooks;
    },
  },
  methods: {
    async getBooks() {
      this.loading = true;
      const headers = new Headers();
      if (sessionStorage.getItem('credentials')) {
        headers.append('Authorization', 'Basic ' + sessionStorage.getItem('credentials'));
        headers.append('Accept', 'application/json');
      }
      const response = await fetch(this.apiUrl + '/books', {
        headers: headers
      })
      const data = await response.json();
      this.books = data;
      this.loading = false;

    },
    clearFilters() {
      this.searchQuery = '';
      this.filterStatus = '';
      this.sortAscending = '';
      this.sortDescending = false;
    },
    deleteBook(book) {
      const index = this.books.indexOf(book);
      if (index > -1) {
        this.books.splice(index, 1);
      }
      const headers = new Headers();
      if (sessionStorage.getItem('credentials')) {
        headers.append('Authorization', 'Basic ' + sessionStorage.getItem('credentials'));
        headers.append('Accept', 'application/json');
      }
      fetch(this.apiUrl + '/books/' + book.id,
        {
          method: 'DELETE',
          headers: headers
        })
        .catch(err => console.log(err.message))
    },
    toggleSortAscending() {
      this.sortAscending = true;
      this.sortDescending = false;
    },
    toggleSortDescending() {
      this.sortAscending = false;
      this.sortDescending = true;
    },
  },
  mounted() {
    this.getBooks()
  },
  watch: {
    filterStatus: function (newFilterStatus, oldFilterStatus) {
      if (newFilterStatus !== oldFilterStatus) {
        // recompute filteredBooks whenever filterStatus changes
        this.$nextTick(() => {
          this.filteredBooks;
        });
      }
    }
  }

}
</script>

<style scoped>
/* .book h2 {
  background: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  margin: 10px auto;
  max-width: 600px;
  cursor: pointer;
  color: #444;
}
 */

.search-container {
  max-width: 420px;
  margin: 10px auto;
  background: #f2f2f2;
  text-align: left;
  padding: 20px;
  border-radius: 10px;

}

label {
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}

input {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  background: #f2f2f2;
  border-bottom: 1px solid teal;
}

input:focus {
  border-color: teal;
  border-bottom: 1px solid teal;
}

.has-search .form-control {
  padding-left: 2.375rem;
}

.has-search .form-control-feedback {
  position: absolute;
  z-index: 2;
  display: block;
  width: 2.375rem;
  height: 2.375rem;
  line-height: 2.375rem;
  text-align: center;
  pointer-events: none;
  color: teal;
}

.form-control {
  color: teal;
  border-color: teal;
}

.form-control:focus {
  color: teal;
  border-color: teal;
  box-shadow: 0 0 0 0.1rem teal;
}

.pill {
  display: inline-block;
  margin: 20px 10px 0 0;
  padding: 10px 20px;
  background: teal;
  border-radius: 20px;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  border: 2px solid teal;
}

.pill.active {
  border: 2px solid burlywood;
  background: #003030;
  color: burlywood;
}

.pill:hover {
  border: 2px solid black;
  color: burlywood;
}

button {
  background: red;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  border: 2px solid red;
}

.clear:hover {
  border: 2px solid black;
  background: rgb(221, 4, 4);
}

.project {
  margin: 20px auto;
  background: white;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
  color: #444;
  max-width: 700px;
  border-left: 4px solid #e90074;
}

.project:hover {
  color: white;
  background: teal;
}

a {
  text-decoration: none;
}

h3 {
  cursor: pointer;
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.material-icons {
  font-size: 20px;
  margin-left: 10px;
  color: #bbb;
  cursor: pointer;
}

.material-icons:hover {
  color: black;
}

.readStatusREAD {
  border-left: 4px solid #00ce89;
}

.readStatusReading {
  border-left: 4px solid rgb(219, 219, 59);
}

.readStatusUnfinished {
  border-left: 4px solid blue;
}

.actions img {
  width: 66px;
  height: 100px;
}
</style>