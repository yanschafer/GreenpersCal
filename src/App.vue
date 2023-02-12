<template>
  <img class="logo" src="./assets/logo.png">
  <CalendarComponent>
  </CalendarComponent>
  <div class="row">
    <div class="col legend">
      <div class="container legend-day"></div>
      <h6 class="legend-heading">День</h6>
    </div>
    <div class="col legend">
      <div class="container legend-night"></div>
      <h6 class="legend-heading">Ночь</h6>
    </div>
  </div>
</template>

<script>

import CalendarComponent from "@/components/CalendarComponent.vue";

export default {
  name: 'App',
  components: {
    CalendarComponent
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');
#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.legend {
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo {
  width: 15rem;
  margin-bottom: 2rem;
}
.legend-day {
  background: #619fa8;
  color: white;
  padding: 0;
  height: 2rem;
  width: 2rem;
  margin-left: 0;
  margin-right: 1rem;
  border-radius: 5px;
}
.legend-night {
  background: #283b42;
  color: white;
  padding: 0;
  height: 2rem;
  width: 2rem;
  margin-left: 0;
  margin-right: 1rem;
  border-radius: 5px;
}
.row {
  margin-top: 1rem;
}
.legend-heading {
  margin: 0;
}

</style>
