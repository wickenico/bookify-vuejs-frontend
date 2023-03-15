<template>
    <div>
        <h1>Report a Bug</h1>

        <div class="github-issue-link">
            <p>If you have encountered any issues or bugs with our web app, we encourage you to report them to us using the
                form below. Your feedback is important to us as we strive to improve our app.</p>
            <p>If you have found an issue or bug that you would like to report directly on Github, please use the following
                link:</p>
            <a href="https://github.com/wickenico/bookify-vuejs-frontend/issues/new" target="_blank">
                <i class="material-icons left">bug_report</i>Report on Github</a>
        </div>

        <div class="contact-form">
            <h3>Or use the form below to report a bug:</h3>
            <form @submit.prevent="sendBugReport" ref="form">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="from_name" v-model="name" required>
                </div>

                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="from_email" v-model="email" required>
                </div>
                <div class="form-group">
                    <label for="description">Bug Description:</label>
                    <textarea id="description" name="description" rows="5" v-model="description" required></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
            <div v-if="showSuccessMessage">
            <p>Bugreport sent successfully - Thank You!</p>
            </div>
        </div>
    </div>
</template>
  
<script>
import emailjs from '@emailjs/browser';

export default {
    data() {
    return {
      name: '',
      email: '',
      description: '',
      showSuccessMessage: false
    }
  },
  methods: {
    sendBugReport() {
      emailjs.sendForm(process.env.VUE_APP_SERVICE_ID, process.env.VUE_APP_TEMPLATE_ID, this.$refs.form, process.env.VUE_APP_PUBLIC_KEY)
        .then((result) => {
          console.log('SUCCESS!', result.text);
          // Clear form fields after submission
          this.name = '';
          this.email = '';
          this.description = '';
          this.showSuccessMessage = true;
        }, (error) => {
          console.log('FAILED...', error.text);
        });
    }
  }

}
</script>
  
<style scoped>

contact-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="text"],
input[type="email"],
textarea {
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
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

a {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  color: teal;
  transition: color 0.3s;
}

a .material-icons {
  margin-right: 2px;
  font-size: 30px;
  color: teal;
}

a:hover {
    color: #003030;
}

a .material-icons:hover {
  color: #003030;
}
</style>
  