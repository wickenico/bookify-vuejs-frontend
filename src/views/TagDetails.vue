<template>
  <div v-if="tag">
    <h1>Books with tag <span class="tag-name">{{ tag.name }}</span></h1>
  </div> 
    <div v-if="books">
      <div v-for="book in books" :key="book.id" class="book">
      <router-link :to="{ name: 'BookDetails', params: { id: book.id } }">
        <h2>{{ book.title }}</h2>
      </router-link>
    </div>
  </div>
  <div v-else>
    <p>Loading books ...</p>
  </div>
</template>

<script>
export default {
    props: ['id'],
  data() {
    return {
      tag: null,  
      books: []
    }
    },
    mounted() {
     console.log('Tag id:', this.id)   
     fetch('http://192.168.178.58:8090/api/v1/tags/' + this.id + '/books', {
        headers: {
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBdXRoZW50aWNhdGlvbiIsImlzcyI6ImNvbS5tYWF4Z3IiLCJ1c2VyTmFtZSI6IndpY2tlIiwidXNlcklkIjowLCJlbWFpbCI6Im5pY28ud2lja2Vyc2hlaW0zQHlhaG9vLmRlIn0.sVSfYDOrJBnl1tuzrJ4qUL59lpCsQbK5n0WxLIqOx5nq4XbmcFlkXw6azWOpblCDowfcYdYXx8OrpFoaYbMWHw',
            'Accept': 'application/json',
        }
      })
      .then(res => res.json())
      .then(data => this.books = data)
      .catch(err => console.log(err.message));

      fetch('http://192.168.178.58:8090/api/v1/tags/' + this.id, {
        headers: {
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBdXRoZW50aWNhdGlvbiIsImlzcyI6ImNvbS5tYWF4Z3IiLCJ1c2VyTmFtZSI6IndpY2tlIiwidXNlcklkIjowLCJlbWFpbCI6Im5pY28ud2lja2Vyc2hlaW0zQHlhaG9vLmRlIn0.sVSfYDOrJBnl1tuzrJ4qUL59lpCsQbK5n0WxLIqOx5nq4XbmcFlkXw6azWOpblCDowfcYdYXx8OrpFoaYbMWHw',
            'Accept': 'application/json',
        }
      })
      .then(res => res.json())
      .then(data => this.tag = data)
      .catch(err => console.log(err.message));

  }
}
</script>

<style scoped>
.tag-name {
  font-weight: bold;
    color: teal;
}

.book h2 {
  margin: 20px auto;
    background: white;
    padding: 10px 20px;
    border-radius: 4px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
  color: #444;
  max-width: 600px;
    cursor: pointer;
}

.book h2:hover {
  color: white;
  background: teal;
}

.book a {
  text-decoration: none;
}

</style>