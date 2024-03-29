<template>
  <div>
    <h1>Search</h1>
    <div class="search-container form-group has-search">
      <span class="fa fa-search form-control-feedback"></span>
      <input type="text" class="form-control" id="search-input" placeholder="Type ISBN..." v-model="searchQuery" />
    </div>
    <button class="btn btn-primary" @click="searchBooks">Show me the Book <i class="fa fa-paper-plane"></i></button>
    <div v-if="searchError" class="error">{{ searchError }}</div>
    <div v-if="searchResults">
      <h2>Search Results:</h2>
      <div>
        <div v-if="searchResults.imageUrl && searchResults.imageUrl !== 'null'" class="book-cover">
          <img :src="searchResults.imageUrl" alt="Book Cover Image">
        </div>
        <h3>{{ searchResults.title }}</h3>
        <p v-for="author in searchResults.authors" :key="author">{{ author }}</p>
        <button class="btn btn-primary" @click="addBook">Add book to library <i class="fa fa-floppy-o"
            aria-hidden="true"></i></button>
      </div>
      <div v-if="bookAdded" class="book-added">
        <h1>Book successfully added! </h1>
        <p><router-link :to="{ name: 'BookDetails', params: { id: bookAdded.id } }">
            <button class="btn btn-primary">Go to Book Details <i class="fa fa-arrow-right"
                aria-hidden="true"></i></button>
          </router-link></p>
        <p><router-link :to="{ name: 'Books' }">
            <button class="btn btn-primary">Go to Books <i class="fa fa-list-ul" aria-hidden="true"></i></button>
          </router-link></p>
        <p><button class="btn btn-primary" @click="resetPage">Start new Search <i class="fa fa-refresh"
              aria-hidden="true"></i></button></p>
      </div>
    </div>
    <div v-if="showBarcodeScanner">
      <StreamBarcodeReader ref="barcodeReader" @decode="onDecode" @loaded="onLoaded"></StreamBarcodeReader>
    </div>
  </div>
</template>

<script>
import { StreamBarcodeReader } from "vue-barcode-reader";
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
  name: 'Search',
  components: {
    StreamBarcodeReader,
  },
  data() {
    return {
      searchQuery: '',
      searchResults: null,
      searchError: null,
      bookAdded: null,
      showBarcodeScanner: true
    };
  },
  mounted() {
    checkCameraSettings();
  },
  methods: {
    searchBooks() {
      if (!this.searchQuery) {
        this.searchResults = null;
        return;
      }
      const headers = new Headers();
      if (sessionStorage.getItem('credentials')) {
        headers.append('Authorization', 'Basic ' + sessionStorage.getItem('credentials'));
        headers.append('Content-Type', 'application/json');
      }
      const apiUrl = this.apiUrl + `/search?isbn=${this.searchQuery.replace(/-/g, '')}`;
      console.log(apiUrl)
      fetch(apiUrl, {
        headers: headers
      })
        .then((response) => {
          console.log(response)
          if (response.ok) {
            return response.json();
          } else if (response.status === 409) {
            throw new Error('Book already exists.');
          } else if (response.status === 404) {
            throw new Error('Invalid ISBN.');
          } else {
            throw new Error('Api response was not ok.');
          }
        })
        .then((data) => {
          this.searchResults = data;
          console.log(this.searchResults)
        })
        .catch((error) => {
          console.error('There was a problem with the API request:', error);
          this.searchError = error.message;
        });
    },
    async addBook() {
      try {
        const headers = new Headers();
        if (sessionStorage.getItem('credentials')) {
          headers.append('Authorization', 'Basic ' + sessionStorage.getItem('credentials'));
          headers.append('Content-Type', 'application/json');
        }
        const response = await fetch(this.apiUrl + '/books', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(this.searchResults)
        });

        if (response.ok) {
          toast.success("Book successfully added to library!", {
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
          return this.bookAdded = await response.json();
          // handle success case, e.g. show success message
        } else {
          // handle error case, e.g. show error message
        }
      } catch (error) {
        // handle error case, e.g. show error message
      }
    },
    onDecode(result) {
      console.log(result)
      this.searchQuery = result;
      this.searchBooks();
      this.$nextTick(() => {
        this.$refs.barcodeReader.$nextTick(() => {
          if (typeof this.$refs.barcodeReader.stop === 'function') {
            this.$refs.barcodeReader.stop();
          }
          this.showBarcodeScanner = false; // Hide the barcode scanner window
        });
      });
    },
    onError(error) {
      console.error('Barcode reader error:', error);
      // Handle the error, e.g., display an error message
    },
    onLoaded(result) { console.log(result) },
    resetPage() {
      window.location.reload();
    },
    // Check camera access permission
    async checkCameraAccess() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        // Camera access is allowed
        stream.getTracks().forEach(track => track.stop());
        return true;
      } catch (error) {
        // Camera access is denied or an error occurred
        return false;
      }
    },
    // Usage
    async checkCameraSettings() {
      const cameraAccessAllowed = await checkCameraAccess();
      if (cameraAccessAllowed) {
        console.log('Camera access is allowed.');
        // Perform actions when camera access is allowed
      } else {
        console.log('Camera access is denied.');
        // Perform actions when camera access is denied
      }
    }
  }
};
</script>


<style scoped>
.search-container {
  max-width: 420px;
  margin: 10px auto;
  background: #f2f2f2;
  text-align: left;
  padding: 5px;
  border-radius: 10px;
  margin-bottom: 10px;
}

button {
  max-width: 420px;
  width: 100%;
  margin-bottom: 30px;
  border: 1px solid teal;
}

button:hover {
  border: 1px solid black;
  background: #003030;
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

.book-details {
  margin: 20px 0;
  font-size: 16px;
}

.error {
  color: #ff0062;
  margin-top: 10px;
  font-size: 0.8em;
  font-weight: bold;
}

.book-cover img {
  width: 200px;
  height: 300px;
  border: 1px solid black;
}

.book-added {
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 20px;
  border: 2px solid #42b983;
  border-radius: 10px;
  background-color: #f0fff4;
  color: #42b983;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}

.book-added a {
  color: #42b983;
}
</style>