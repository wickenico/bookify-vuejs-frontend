<template>
  <div v-if="isLoading">
    <p>Loading book details ...</p>
  </div>
  <div v-else-if="book">
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
        <span class="material-icons" :class="{ red: isFavorite === 'true' }">favorite</span>
        <div v-if="bookError" class="error">{{ bookError }}</div>
      </div>
    </div>
    <div class="book">
      <!-- <div class="book-attribute">
        <div class="label">{{ "ID" }}</div>
        <div class="value">{{ book.id }}</div>
      </div> -->

      <div class="book-attribute">
        <div class="label">{{ "Options" }}</div>
        <div>
          <div class="option-pill">
            <router-link :to="{ name: 'BookEdit', params: { id: book.id } }">
              <span class="optionButton-pill"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</span>
            </router-link>
          </div>
          <div class="option-pill">
            <span class="optionButton-pill" @click.prevent="deleteBook(book)"><i class="fa fa-trash"
                aria-hidden="true"></i> Delete</span>
          </div>
          <div class="option-pill">
            <a :href="book.selfLink" target="_blank" class="optionButton-pill"><i class="fa fa-code"
                aria-hidden="true"></i> JSON</a>
          </div>
          <div class="option-pill">
            <a :href="book.infoLink" target="_blank" class="optionButton-pill"><i class="fa fa-info"
                aria-hidden="true"></i> Info</a>
          </div>
        </div>
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
        <div class="label">{{ "Authors" }}</div>
        <div class="value">
          <div v-for="author in book.authors" :key="author">{{ author }}</div>
        </div>
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

      <!-- <div class="book-attribute">
        <div class="label">{{ "Self Link" }}</div>
        <div class="value">{{ book.selfLink }}</div>
      </div> -->

      <div class="book-separator"></div>

      <div class="book-attribute">
        <div class="label">{{ "Published Date" }}</div>
        <div class="value">{{ publishedDate_formatted }}</div>
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
        <div class="label">{{ "Categories" }}</div>
        <div class="value">
          <div v-for="category in book.categories" :key="category">{{ category }}</div>
        </div>
      </div>

      <div class="book-separator"></div>

      <div class="book-attribute">
        <div class="label">{{ "Maturity Rating" }}</div>
        <div class="value">{{ book.maturityRating }}</div>
      </div>

      <div class="book-separator"></div>

      <div class="book-attribute">
        <div class="label">{{ "Language" }}</div>
        <div class="value"> <!-- {{ book.language }} -->
          <img :src="'https://flagsapi.com/' + book.language.toUpperCase() + '/flat/16.png'" width="20" height="20">
        </div>
      </div>

      <div class="book-separator"></div>

      <!-- <div class="book-attribute">
        <div class="label">{{ "Info Link" }}</div>
        <div class="value">{{ book.infoLink }}</div>
      </div> -->

      <div class="book-separator"></div>

      <div class="book-attribute">
        <div class="label">{{ "Read Status" }}</div>
        <div class="value">{{ book.readStatus }}</div>
      </div>

      <div class="book-separator"></div>

      <div class="book-attribute">
        <div class="label">{{ "Added On" }}</div>
        <div class="value">{{ addedOnDate_formatted }}</div>
      </div>

      <div class="book-separator"></div>

      <div class="book-attribute">
        <div class="label">{{ "Comment" }}</div>
        <div class="value">{{ book.comment }}</div>
      </div>

      <div class="book-separator"></div>

      <div class="book-attribute">
        <div class="label">{{ "Personal Rating" }}</div>
        <div class="value">{{ book.rating }}</div>
      </div>

      <div class="book-separator"></div>

      <div class="book-attribute">
        <div class="label">{{ }}</div>
        <div class="value">{{ }}</div>
      </div>

    </div>
  </div>
  <div v-else>
    <p>Book not found.</p>
  </div>
</template>

<script>
import router from '@/router';
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
  props: ['id'],
  data() {
    return {
      book: null,
      isFavorite: null,
      bookError: null,
      bookTags: [],
      bookNotFound: false,
      isLoading: false
    }
  },
  computed: {
    publishedDate_formatted() {
      if (this.book) {
        const date = new Date(this.book.publishedDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
      }
    },
    addedOnDate_formatted() {
      if (this.book) {
        const date = new Date(this.book.addedOnDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
      }
    },
  },
  mounted() {
    const headers = new Headers();
    if (sessionStorage.getItem('credentials')) {
      headers.append('Authorization', 'Basic ' + sessionStorage.getItem('credentials'));
      headers.append('Accept', 'application/json');
    }
    this.isLoading = true;
    fetch(this.apiUrl + '/books/' + this.id, {
      headers: headers
    })
      .then(res => res.json())
      .then(data => {
        this.isLoading = false;
        if (!data) {
          this.bookNotFound = true; // Set bookNotFound to true if no book is found
        } else {
          this.book = data;
          this.fetchFavorite();
          this.fetchBookTags();
        }
      })
      .catch(err => {
        console.log(err.message);
        this.isLoading = false; // Set isLoading to false in case of an error
      });
  },
  methods: {
    async handleFavorite(id) {
      const headers = new Headers();
      if (sessionStorage.getItem('credentials')) {
        headers.append('Authorization', 'Basic ' + sessionStorage.getItem('credentials'));
        headers.append('Content-Type', 'application/json');
      }
      fetch(this.apiUrl + '/favorites', {
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

    confirm(message) {
      return window.confirm(message);
    },

    async fetchFavorite() {
      try {
        const headers = new Headers();
        if (sessionStorage.getItem('credentials')) {
          headers.append('Authorization', 'Basic ' + sessionStorage.getItem('credentials'));
          headers.append('Accept', '*/*');
        }
        const response = await fetch(this.apiUrl + '/favorites/1/' + this.id, {
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
        const uri = this.apiUrl + "/books/" + this.id + "/tags";
        const response = await fetch(uri, {
          headers: headers
        });
        const data = await response.json();
        this.bookTags = data;
      } catch (error) {
        console.log(error.message);
      }
    },
    async deleteBook(book) {
      if (this.confirm("Are you sure you want to delete this book?")) {
        try {
          const headers = new Headers();
          if (sessionStorage.getItem('credentials')) {
            headers.append('Authorization', 'Basic ' + sessionStorage.getItem('credentials'));
            headers.append('Accept', 'application/json');
          }
          const response = await fetch(this.apiUrl + '/books/' + book.id,
            {
              method: 'DELETE',
              headers: headers
            })

          if (response.ok) {
            toast.success("Book successfully deleted!", {
              position: "bottom-right",
              timeout: 2000,
              closeOnClick: true,
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: false,
              closeButton: "button",
              icon: true,
              rtl: false
            });
            router.push({ path: '/books' })
          }
        } catch (error) {
          console.log(error.message)
        }
      }
    }
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
  margin-top: 10px;
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

.option-pill {
  display: inline-block;
  margin: 20px 10px 0 0;
  padding: 6px 12px;
  background: teal;
  border-radius: 20px;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: bold;
  color: teal;
  cursor: pointer;
}

.option-pill:hover {
  background: teal;
}

.optionButton-pill {
  color: black;
  text-decoration: none;
}

.optionButton-pill:hover {
  color: white;
}
</style>
