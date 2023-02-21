<template>
  <h1>Books</h1>
  <div class="search-container form-group has-search">
    <span class="fa fa-search form-control-feedback"></span>
    <!-- <label>Suche </label> -->
    <input type="text" class="form-control" id="search-input" placeholder="Suchbegriff eingeben..."
      v-model="searchQuery" />
  </div>
  <div class="pill-container">
    <div class="pill" :class="{ active: filterStatus === 'UNREAD' }" @click="filterStatus = 'UNREAD'">
      <span><i class="fa fa-filter" aria-hidden="true"></i> UNREAD</span>
    </div>
    <div class="pill" :class="{ active: filterStatus === 'READING' }" @click="filterStatus = 'READING'">
      <span><i class="fa fa-filter" aria-hidden="true"></i> READING</span>
    </div>
    <div class="pill" :class="{ active: filterStatus === 'READ' }" @click="filterStatus = 'READ'">
      <span><i class="fa fa-filter" aria-hidden="true"></i> READ</span>
    </div>
    <button class="btn btn-light clear" @click="clearFilters">
      <i class="fa fa-times-circle"></i> Clear</button>
  </div>
  <div v-if="filteredBooks.length">
    <div v-for="book in filteredBooks" :key="book.id">
      <router-link :to="{ name: 'BookDetails', params: { id: book.id } }">
        <div class="project"
          :class="{ readStatusREAD: book.readStatus === 'READ', readStatusReading: book.readStatus === 'READING' , readStatusUnfinished: book.readStatus === 'UNFINISHED' }">
          <div class="actions">
            <h2>{{ book.title }}</h2>
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
  },
  methods: {
    async getBooks() {
      this.loading = true;
      const response = await fetch('http://192.168.178.58:8090/api/v1/books', {
        headers: {
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBdXRoZW50aWNhdGlvbiIsImlzcyI6ImNvbS5tYWF4Z3IiLCJ1c2VyTmFtZSI6IndpY2tlIiwidXNlcklkIjowLCJlbWFpbCI6Im5pY28ud2lja2Vyc2hlaW0zQHlhaG9vLmRlIn0.sVSfYDOrJBnl1tuzrJ4qUL59lpCsQbK5n0WxLIqOx5nq4XbmcFlkXw6azWOpblCDowfcYdYXx8OrpFoaYbMWHw',
          'Accept': 'application/json',
        }
      })
      const data = await response.json();
      this.books = data;
      this.loading = false;
      
    },
    clearFilters() {
      this.searchQuery = '';
      this.filterStatus = '';
    },
    deleteBook(book) {
      const index = this.books.indexOf(book);
      if (index > -1) {
        this.books.splice(index, 1);
      }
      fetch('http://192.168.178.58:8090/api/v1/books/' + book.id,
        {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBdXRoZW50aWNhdGlvbiIsImlzcyI6ImNvbS5tYWF4Z3IiLCJ1c2VyTmFtZSI6IndpY2tlIiwidXNlcklkIjowLCJlbWFpbCI6Im5pY28ud2lja2Vyc2hlaW0zQHlhaG9vLmRlIn0.sVSfYDOrJBnl1tuzrJ4qUL59lpCsQbK5n0WxLIqOx5nq4XbmcFlkXw6azWOpblCDowfcYdYXx8OrpFoaYbMWHw',
            'Accept': 'application/json',
          },
        })
        .catch(err => console.log(err.message))
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
  border: 2px solid black;
  background: #003030;
}

.pill:hover {
  border: 2px solid black;
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
</style>