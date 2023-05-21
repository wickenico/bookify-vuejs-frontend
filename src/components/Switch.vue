<template>
  <div class="switch-container">
    <label class="switch">
      <input type="checkbox" :checked="isDarkMode" @change="$emit('toggle-dark-mode', $event.target.checked)">
      <span class="slider"></span>
    </label>
    <i class="material-icons switch-icon">{{ isDarkMode ? 'nightlight_round' : 'wb_sunny' }}</i>
  </div>
</template>

<script>
export default {
  props: {
    isDarkMode: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>
.switch-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
  margin-right: 1px;
  margin-top: 10px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
}

input:checked+.slider {
  background-color: teal;
}

input:focus+.slider {
  box-shadow: 0 0 1px teal;
}

input:checked+.slider:before {
  -webkit-transform: translateX(16px);
  -ms-transform: translateX(16px);
  transform: translateX(16px);
}

.switch-icon {
  font-size: 24px;
  color: #ccc;
  margin-top: 10px;
}

.switch-icon:hover {
  color: gold;
}
</style>
