<template>
  <div class="contact-page">
    <h1>Contact Us</h1>
    <form @submit.prevent="sendEmail" ref="form">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" name="from_name" v-model="name" required>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="from_email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" name="message" v-model="message" rows="5" required></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
    <div v-if="showSuccessMessage">
      <p>Email sent successfully!</p>
    </div>

  </div>
</template>
  
<script>
import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_6h1e9u2';
const TEMPLATE_ID = 'template_pgndkcm';
const PUBLIC_KEY = '2wibScKmdqdxRkolc';

export default {
  data() {
    return {
      name: '',
      email: '',
      message: '',
      showSuccessMessage: false
    }
  },
  methods: {
    sendEmail() {
      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this.$refs.form, PUBLIC_KEY)
        .then((result) => {
          console.log('SUCCESS!', result.text);
          // Clear form fields after submission
          this.name = '';
          this.email = '';
          this.message = '';
          this.showSuccessMessage = true;
        }, (error) => {
          console.log('FAILED...', error.text);
        });
    }
  }
}
</script>
  
<style>
.contact-page {
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
</style>
  