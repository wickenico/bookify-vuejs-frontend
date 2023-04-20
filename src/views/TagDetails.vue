<template>
  <div v-if="tag">
    <h1>Books with tag <span class="tag-name">{{ tag.name }}</span></h1>
  </div>
  <div v-if="books">
    <div v-for="book in books" :key="book.id" class="book">
      <router-link :to="{ name: 'BookDetails', params: { id: book.id } }">
        <div class="project">
          <div class="actions">
            <div>
              <h2>{{ book.title }}</h2>
            </div>
            <div class="icons">
              <span @click.prevent="deleteBookTag(book, tag)" class="material-icons">
                delete
              </span>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
  <div v-else>
    <p>Loading books ...</p>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
  props: ['id'],
  data() {
    return {
      tag: null,
      books: []
    }
  },
  mounted() {
    const headers = new Headers();
    if (sessionStorage.getItem('credentials')) {
      headers.append('Authorization', 'Basic ' + sessionStorage.getItem('credentials'));
      headers.append('Accept', 'application/json');
    }
    fetch(this.apiUrl + '/tags/' + this.id + '/books', {
      headers: headers
    })
      .then(res => res.json())
      .then(data => this.books = data)
      .catch(err => console.log(err.message));

    fetch(this.apiUrl + '/tags/' + this.id, {
      headers: headers
    })
      .then(res => res.json())
      .then(data => this.tag = data)
      .catch(err => console.log(err.message));

  },
  methods: {
    async deleteBookTag(book, tag) {
      if (this.confirm("Are you sure you want to delete this BookTag?")) {
        const index = this.books.indexOf(book);
        if (index > -1) {
          this.books.splice(index, 1);
        }
        try {
          const headers = new Headers();
          if (sessionStorage.getItem('credentials')) {
            headers.append('Authorization', 'Basic ' + sessionStorage.getItem('credentials'));
            headers.append('Accept', 'application/json');
          }
          const response = await fetch(this.apiUrl + '/books/' + book.id + '/tags/' + tag.id + '/delete',
            {
              method: 'DELETE',
              headers: headers
            })
          if (response.ok) {
            toast.success('BookTag ' + tag.name + ' successfully deleted!', {
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
          }
        } catch (error) {
          console.log(error.message)
        }
      }
    },
    confirm(message) {
      return window.confirm(message);
    },
  }
}
</script>

<style scoped>
.tag-name {
  font-weight: bold;
  color: teal;
}

.project {
  margin: 20px auto;
  background: white;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
  color: #444;
  max-width: 700px;
}

.project:hover {
  color: white;
  background: teal;
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.material-icons {
  font-size: 30px;
  margin-left: 10px;
  color: #bbb;
  cursor: pointer;
}

.material-icons:hover {
  color: black;
}

.icons {
  margin-left: auto;
}
</style>