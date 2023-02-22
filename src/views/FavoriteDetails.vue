<template>
  <div v-if="favorite">
    <h1> {{ favorite.id }}</h1>
    <p v-for="(value, key) in favorite" :key="key">
      {{ key }}: {{ value }}
    </p>
  </div>
  <div v-else>
    <p>Loading favorite details ...</p>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      favorite: null
    }
  },
  mounted() {
    const headers = new Headers();
    if (sessionStorage.getItem('credentials')) {
      headers.append('Authorization', 'Basic ' + sessionStorage.getItem('credentials'));
      headers.append('Accept', 'application/json');
    }
    fetch('http://192.168.178.58:8090/api/v1/favorites/' + this.id, {
      headers: headers
    })
      .then(res => res.json())
      .then(data => this.favorite = data)
      .catch(err => console.log(err.message))
  }

}
</script>

<style></style>