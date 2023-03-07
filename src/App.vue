<template>
  <div :class="{ 'dark': isDarkMode }">
    <Switch :isDarkMode="isDarkMode" @toggle-dark-mode="toggleDarkMode" />
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Switch from './components/Switch.vue'

export default {
  components: { Navbar, Switch },
  data() {
    return {
      isDarkMode: false
    }
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
      document.body.classList.toggle('dark')
    }
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 960px;
  margin: 0 auto;
}

body {
  background: #f2f2f2;
}

button {
  background: teal;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
  cursor: pointer;
}

button:hover {
  border: 1px solid black;
  background: #003030;
}

/* Styles for dark mode */
.dark {
  background-color: #1e1e1e;
  color: #fff;
}

.dark-mode-switch {
  color: #fff;
}

.dark-mode-switch:hover {
  text-decoration: underline;
}

.dark body {
  background: #1e1e1e;
}

.dark button {
  background: #fff;
  border-color: #ccc;
  color: #fff;
}

.dark button:hover {
  background: #ccc;
  color: #1e1e1e;
}
</style>