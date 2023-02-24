<template>
  <div v-if="book">
    <div class="book-info">
      <div v-if="book.imageUrl && book.imageUrl !== 'null'" class="book-cover">
        <img :src="book.imageUrl" alt="Book Cover Image">
      </div>
      <div v-else>
        <img src="https://via.placeholder.com/200x300?text=No+Cover" alt="Book Cover Image">
      </div>
      <div class="book-details">
        <h1>{{ book.title }}</h1>
        <h3 v-if="book.subtitle && book.subtitle !== 'null'">{{ book.subtitle }}</h3>
        <div class="book-rating">
          <template v-if="book.rating === 'FIVE'">
            <span class="star">★</span>
            <span class="star">★</span>
            <span class="star">★</span>
            <span class="star">★</span>
            <span class="star">★</span>
          </template>
          <template v-else-if="book.rating === 'FOUR'">
            <span class="star">★</span>
            <span class="star">★</span>
            <span class="star">★</span>
            <span class="star">★</span>
            <span class="star-zero">★</span>
          </template>
          <template v-else-if="book.rating === 'THREE'">
            <span class="star">★</span>
            <span class="star">★</span>
            <span class="star">★</span>
            <span class="star-zero">★</span>
            <span class="star-zero">★</span>
          </template>
          <template v-else-if="book.rating === 'TWO'">
            <span class="star">★</span>
            <span class="star">★</span>
            <span class="star-zero">★</span>
            <span class="star-zero">★</span>
            <span class="star-zero">★</span>
          </template>
          <template v-else-if="book.rating === 'ONE'">
            <span class="star">★</span>
            <span class="star-zero">★</span>
            <span class="star-zero">★</span>
            <span class="star-zero">★</span>
            <span class="star-zero">★</span>
          </template>
          <template v-else-if="book.rating === 'ZERO'">
            <span class="star-zero">★</span>
            <span class="star-zero">★</span>
            <span class="star-zero">★</span>
            <span class="star-zero">★</span>
            <span class="star-zero">★</span>
          </template>
        </div>
        <span @click.prevent="handleFavorite(book.id)" class="material-icons"
          :class="{ red: isFavorite === 'true' }">favorite</span>
        <div v-if="bookError" class="error">{{ bookError }}</div>
      </div>
    </div>
    <div class="book">
      <div class="book-attribute">
        <div class="label">{{ "ID" }}</div>
        <div class="value">{{ book.id }}</div>
      </div>

      <div class="book-separator"></div>

      <div class="book-attribute">
        <div class="label">{{ "Tags" }}</div>
        <div v-if="bookTags.length">
          <div v-for="bookTag in bookTags" :key="bookTag.id" class="pill">
            <router-link :to="{ name: 'TagDetails', params: { id: bookTag.id } }">
              <span class="bookTag-pill">{{ bookTag.name }}</span>
            </router-link>
          </div>
        </div>
      </div>

      <div class="book-separator"></div>

      <div class="book-attribute">
        <div class="label">{{ "ISBN-10" }}</div>
        <div class="value">{{ book.isbn10 }}</div>
      </div>

      <div class="book-separator"></div>

      <div class="book-attribute">
        <div class="label">{{ "ISBN-13" }}</div>
        <div class="value">{{ book.isbn13 }}</div>
      </div>

      <div class="book-separator"></div>

      <div class="book-attribute">
        <div class="label">{{ "Author" }}</div>
        <div class="value">{{ book.author }}</div>
      </div>

      <div class="book-separator"></div>

      <div class="book-attribute">
        <div class="label">{{ "Publisher" }}</div>
        <div class="value">{{ book.publisher }}</div>
      </div>

      <div class="book-separator"></div>

      <div class="book-attribute">
        <div class="label">{{ "Pages" }}</div>
        <div class="value">{{ book.pages }}</div>
      </div>

      <div class="book-separator"></div>

      <div class="book-attribute">
        <div class="label">{{ "Self Link" }}</div>
        <div class="value">{{ book.selfLink }}</div>
      </div>

      <div class="book-separator"></div>

      <div class="book-attribute">
        <div class="label">{{ "Published Date" }}</div>
        <div class="value">{{ book.publishedDate }}</div>
      </div>

      <div class="book-separator"></div>

      <div class="book-attribute">
        <div class="label">{{ "Description" }}</div>
        <div class="value">{{ book.description }}</div>
      </div>

      <div class="book-separator"></div>

      <div class="book-attribute">
        <div class="label">{{ "Print Type" }}</div>
        <div class="value">{{ book.printType }}</div>
      </div>

      <div class="book-separator"></div>

      <div class="book-attribute">
        <div class="label">{{ "Category" }}</div>
        <div class="value">{{ book.category }}</div>
      </div>

      <div class="book-separator"></div>

      <div class="book-attribute">
        <div class="label">{{ "Maturity Rating" }}</div>
        <div class="value">{{ book.maturityRating }}</div>
      </div>

      <div class="book-separator"></div>

      <div class="book-attribute">
        <div class="label">{{ "Language" }}</div>
        <div class="value">{{ book.language }}</div>
      </div>

      <div class="book-separator"></div>

      <div class="book-attribute">
        <div class="label">{{ "Info Link" }}</div>
        <div class="value">{{ book.infoLink }}</div>
      </div>

      <div class="book-separator"></div>

      <div class="book-attribute">
        <div class="label">{{ "Read Status" }}</div>
        <div class="value">{{ book.readStatus }}</div>
      </div>

      <div class="book-separator"></div>

      <div class="book-attribute">
        <div class="label">{{ "Added On" }}</div>
        <div class="value">{{ book.addedOnDate }}</div>
      </div>

      <div class="book-separator"></div>

      <div class="book-attribute">
        <div class="label">{{ "Personal Rating" }}</div>
        <div class="value">{{ book.rating }}</div>
      </div>

    </div>
  </div>
  <div v-else>
    <p>Loading book details ...</p>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      book: null,
      isFavorite: null,
      bookError: null,
      bookTags: [],
    }
  },
  mounted() {
    const headers = new Headers();
    if (sessionStorage.getItem('credentials')) {
      headers.append('Authorization', 'Basic ' + sessionStorage.getItem('credentials'));
      headers.append('Accept', 'application/json');
    }
    fetch('http://192.168.178.58:8090/api/v1/books/' + this.id, {
      headers: headers
    })
      .then(res => res.json())
      .then(data => this.book = data)
      .catch(err => console.log(err.message)),
      this.fetchFavorite();
    this.fetchBookTags();

  },
  methods: {
    async handleFavorite(id) {
      const headers = new Headers();
      if (sessionStorage.getItem('credentials')) {
        headers.append('Authorization', 'Basic ' + sessionStorage.getItem('credentials'));
        headers.append('Content-Type', 'application/json');
      }
      fetch('http://192.168.178.58:8090/api/v1/favorites', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          userId: 1,
          bookId: id
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Book is already a favorite.')
          }
          this.fetchFavorite()
          return response.json();
        })
        .catch((error) => {
          console.error('There was a problem with the API request:', error);
          this.bookError = error.message;
        });
    },

    async fetchFavorite() {
      try {
        if (sessionStorage.getItem('credentials')) {
          headers.append('Authorization', 'Basic ' + sessionStorage.getItem('credentials'));
          headers.append('Accept', '*/*');
        }
        const response = await fetch('http://192.168.178.58:8090/api/v1/favorites/1/' + this.id, {
          headers: headers
        });
        const data = await response.text();
        this.isFavorite = data;
      } catch (error) {
        console.log(error.message);
      }
    },
    async fetchBookTags() {
      try {
        const headers = new Headers();
        if (sessionStorage.getItem('credentials')) {
          headers.append('Authorization', 'Basic ' + sessionStorage.getItem('credentials'));
          headers.append('Accept', 'application/json');
        }
        const uri = "http://192.168.178.58:8090/api/v1/books/" + this.id + "/tags";
        const response = await fetch(uri, {
          headers: headers
        });
        const data = await response.json();
        this.bookTags = data;
      } catch (error) {
        console.log(error.message);
      }
    },

  }
}
</script>

<style scoped>
.book {
  padding: 5px;
  background-color: #f8f8f8;
  border: 1px solid #ccc;
}

.book-attribute {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  border-top: 1px solid #ccc;
  /* add top border to all book-attribute divs */
}

.book-attribute:first-child {
  border-top: none;
  /* remove top border from the first book-attribute div */
}

.label {
  margin-top: 10px;
  font-weight: bold;
  display: table-cell;
  vertical-align: middle;
}

.value {
  margin-top: 10px;
  display: table-cell;
  vertical-align: middle;
}

.separator {
  border-top: 1px solid #ccc;
  margin: 10px 0;
}

.book-info {
  display: flex;
  align-items: center;
  background: #ccc;
}

.book-cover {
  margin-right: 20px;
}

.book-cover img {
  width: 200px;
  height: 300px;
  border: 1px solid black;
}

.book-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
}

.book-rating {
  margin-top: 10px;
}

.star {
  font-size: 20px;
  color: gold;
}

.star-zero {
  font-size: 20px;
  color: grey;
}

.material-icons {
  font-size: 20px;
  margin-left: 10px;
  color: #bbb;
  cursor: pointer;
}

.red {
  color: red
}

.error {
  color: #ff0062;
  margin-top: 10px;
  font-size: 0.8em;
  font-weight: bold;
}

.pill {
  display: inline-block;
  margin: 20px 10px 0 0;
  padding: 6px 12px;
  background: #eee;
  border-radius: 20px;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: bold;
  color: #777;
  cursor: pointer;
}

.pill:hover {
  background: teal;
}

.bookTag-pill {
  color: black;
  text-decoration: none;
}

.bookTag-pill:hover {
  color: white;

}
</style>
