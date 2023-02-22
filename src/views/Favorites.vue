<template>
  <h1>Favorites</h1>
  <div v-if="favorites.length">
    <div v-for="fav in favorites" :key="fav.id" class="favorite">
      <router-link :to="{ name: 'BookDetails', params: { id: fav.bookId } }">
        <div class="project">
          <div class="actions">
            <h2>{{ fav.book.title }} - {{ fav.book.id }}</h2>
            <div class="icons">
              <span @click.prevent="deleteFavorite(fav)" class="material-icons">delete</span>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
  <div v-else-if="loading">
    <p>Loading favorites...</p>
  </div>
  <div v-else>
    <p>Nothing found.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      favorites: [],
      loading: false,
    }
  },
  mounted() {
    const headers = new Headers();
    this.loading = true;
    if (sessionStorage.getItem('credentials')) {
      headers.append('Authorization', 'Basic ' + sessionStorage.getItem('credentials'));
      headers.append('Accept', 'application/json');
    }
    fetch('http://192.168.178.58:8090/api/v1/favorites', {
      headers: headers
    })
      .then(res => res.json())
      .then(async (data) => {
        const books = await Promise.all(data.map(fav => {
          return fetch(`http://192.168.178.58:8090/api/v1/books/${fav.bookId}`, {
            headers: headers
          }).then(res => res.json())
        }))
        this.favorites = data.map((fav, i) => {
          return {
            ...fav,
            book: books[i]
          }
        })
        this.loading = false;
      })
      .catch(err => console.log(err.message))
  },
  methods: {
    deleteFavorite(fav) {
      const index = this.favorites.indexOf(fav);
      if (index > -1) {
        this.favorites.splice(index, 1);
      }
      const headers = new Headers();
      if (sessionStorage.getItem('credentials')) {
        headers.append('Authorization', 'Basic ' + sessionStorage.getItem('credentials'));
        headers.append('Content-Type', 'application/json');
      }
      fetch('http://192.168.178.58:8090/api/v1/favorites',
        {
          method: 'DELETE',
          headers: headers,
          body: JSON.stringify({
            userId: 1,
            bookId: fav.bookId
          })
        })
        .catch(err => console.log(err.message))
    },
  }

}
</script>

<style>
.project:hover {
  color: white;
  background: teal;
}

a {
  text-decoration: none;
}

.project {
  margin: 20px auto;
  background: white;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
  color: #444;
  max-width: 650px;
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
</style>