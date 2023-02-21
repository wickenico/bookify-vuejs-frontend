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
        fetch('http://192.168.178.58:8090/api/v1/favorites/' + this.id, {
        headers: {
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBdXRoZW50aWNhdGlvbiIsImlzcyI6ImNvbS5tYWF4Z3IiLCJ1c2VyTmFtZSI6IndpY2tlIiwidXNlcklkIjowLCJlbWFpbCI6Im5pY28ud2lja2Vyc2hlaW0zQHlhaG9vLmRlIn0.sVSfYDOrJBnl1tuzrJ4qUL59lpCsQbK5n0WxLIqOx5nq4XbmcFlkXw6azWOpblCDowfcYdYXx8OrpFoaYbMWHw',
            'Accept': 'application/json',
        }
      })
      .then(res => res.json())
      .then(data => this.favorite = data)
      .catch(err => console.log(err.message))
  }

}
</script>

<style>

</style>