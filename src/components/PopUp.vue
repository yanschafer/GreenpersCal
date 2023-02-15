<template>
  <div class="row popup-row">
    <div class="container popup-box">
      <p><i class="fa-solid fa-circle-check tick"></i> <i class="fa-solid fa-circle-xmark cross"></i> Изменения сохранены</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopUp"
}
</script>

<style scoped>
.cross {
  color: red;
}
.tick {
  color: limegreen;
}
.popup-row {
  position: fixed;
  top: 0;
  margin-bottom: 2rem;
  width: 100%;
}
.popup-box {
  border-radius: 1rem;
  background: #ffffff;
  box-shadow:  20px 20px 60px #d9d9d9,
  -20px -20px 60px #ffffff;
  padding-top: 1.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  width: 90vw;
  padding-bottom: 0.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>