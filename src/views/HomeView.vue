<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" style="width: 30%; height: 30%;">
    <h1>Bookify</h1>
    <div class="card-container">
    <div class="card">
      <div class="card__header">
        <img class="card__image"
          src="https://images.pexels.com/photos/3995842/pexels-photo-3995842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Card Image">
      </div>
      <div class="card__body">
        <h3 class="card__title">Library</h3>
        <p class="card__description">Manage your saved books.</p>
        <button class="card__button" @click="goToBooks">Go to Books</button>
      </div>
    </div>

    <div class="card">
      <div class="card__header">
        <img class="card__image"
          src="https://images.pexels.com/photos/7412069/pexels-photo-7412069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Card Image">
      </div>
      <div class="card__body">
        <h3 class="card__title">Search</h3>
        <p class="card__description">Search a book by ISBN.</p>
        <button class="card__button" @click="goToSearch">Go to Search</button>
      </div>
    </div>

    <div class="card">
      <div class="card__header">
        <img class="card__image"
          src="https://images.pexels.com/photos/5054213/pexels-photo-5054213.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Card Image">
      </div>
      <div class="card__body">
        <h3 class="card__title">User</h3>
        <p class="card__description">Manage your user.</p>
        <button class="card__button" @click="goToUser">Go to User</button>
      </div>
    </div>
    
  </div>
</div>
</template>

<script>
import router from '@/router';

export default {
  
  name: 'HomeView',
  data() {
    return {
      username: ''
    }
  },
  components: {
  },
  mounted() {
    this.username = sessionStorage.getItem('username');
  },
  methods: {
    goToBooks() {
      router.push({ name: 'Books' });
    },
    goToSearch() {
      router.push({ name: 'Search' });
    },
    goToUser() {
      router.push({ path: '/user/' +  this.username})
    },
  },
}
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 250px;
  background-color: #fff;
  border: 1px solid teal;
  transition: box-shadow 0.3s ease-in-out;
  flex-basis: calc(25% - 20px);
  margin: 0 10px;
}

.card:hover {
  transform: perspective(1000px) scale(1.05);
  box-shadow: 0 0 20px teal;
}

.card__header {
  width: 100%;
  height: 150px;
  overflow: hidden;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card__body {
  width: 100%;
  padding: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card__title {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: bold;
}

.card__description {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #6c757d;
}

.card__button {
  display: block;
  width: 65%;
  border: none;
  background-color: teal;
  color: white;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  border: 1px solid teal;
}

.card__button:hover {
  border: 1px solid black;
  background: #003030;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0px;
}
</style>
