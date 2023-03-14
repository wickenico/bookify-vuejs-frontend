<template>
    <div class="contact-page">
      <h1>Contact Us</h1>
      <form @submit.prevent="submitForm" action="mailto:nico.wickersheim@yahoo.de" method="post" enctype="text/plain">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="name" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" v-model="message" rows="5" required></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        message: ''
      }
    },
    methods: {
      submitForm() {
        // Handle form submission logic here
        console.log('Form submitted!');
        // Clear form fields after submission
        this.name = '';
        this.email = '';
        this.message = '';
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
  input[type="text"], input[type="email"], textarea {
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
  