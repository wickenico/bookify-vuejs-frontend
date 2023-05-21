<template>
  <div :class="{ 'dark': isDarkMode }">
    <!-- <Switch :isDarkMode="isDarkMode" @toggle-dark-mode="toggleDarkMode" /> -->
    <Navbar v-if="isMobileView" />
    <Sidenav v-else :isDarkMode="isDarkMode" @toggle-dark-mode="toggleDarkMode" />
    <router-view />
    <!-- <footer class="overlay">
      &copy; 2023 Bookify (Nico Wickersheim) &bull;
      <router-link to="/imprint" class="footer-link">Imprint</router-link> &bull;
      <router-link to="/contact" class="footer-link">Contact</router-link> &bull;
      <router-link to="/faq" class="footer-link">FAQ</router-link>
    </footer> -->
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Sidenav from './components/Sidenav.vue'
import Switch from './components/Switch.vue'

export default {
  components: { Navbar, Switch, Sidenav },
  data() {
    return {
      isDarkMode: false,
      isMobileView: false
    }
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
      document.body.classList.toggle('dark')
    },
    back() {
      this.$router.go(-1)
    },
    forward() {
      this.$router.go(1)
    },
    checkMobileView() {
      this.isMobileView = window.innerWidth <= 768
    }
  },
  mounted() {
    this.checkMobileView()
    window.addEventListener('resize', this.checkMobileView)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkMobileView)
  },
  watch: {
    isDarkMode(newVal) {
      if (newVal) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
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
  margin-top: 100px;
  /* Adjust this to match the height of your navbar */
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

.material-icons {
  font-size: 20px;
  margin-left: 10px;
  color: #bbb;
  cursor: pointer;
}

.material-icons:hover {
  color: black;
}

.overlay {
  position: fixed;
  color: black;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: teal;
  padding: 10px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
  z-index: 999;
}

.footer-link {
  color: #f2f2f2;
}

.footer-link:hover {
  color: #bbb;
}
</style>