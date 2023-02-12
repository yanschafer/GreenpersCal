<template>
  <div class="container cal-body">
    <h5 class="month">{{ currMonth }}</h5>
    <div class="row weekdays-row">
      <h6 class="weekday">Пн</h6>
      <h6 class="weekday">Вт</h6>
      <h6 class="weekday">Ср</h6>
      <h6 class="weekday">Чт</h6>
      <h6 class="weekday">Пт</h6>
      <h6 class="weekday weekend">Сб</h6>
      <h6 class="weekday weekend">Вс</h6>
    </div>
    <div class="container-fluid items">
      <CalendarItem v-for="day in days" :label="day.label" :type="day.type" :key="Date.now() + day.label"/>
    </div>
  </div>
</template>

<script>
import CalendarItem from "@/components/CalendarItem.vue";

export default {
  name: "CalendarComponent",
  components: {CalendarItem},
  data() {
    return {
      monthLabels: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
      currMonth: "",
      days: [
          {
            label: "30",
            type: "disabled"
          },
        {
          label: "31",
          type: "disabled"
        },
        {
          label: "1",
          type: "day"
        },
        {
          label: "2",
          type: "night"
        },
        {
          label: "3",
          type: "default"
        },
        {
          label: "4",
          type: "default"
        },
        {
          label: "5",
          type: "default"
        },
        {
          label: "6",
          type: "default"
        },
        {
          label: "7",
          type: "default"
        },
        {
          label: "8",
          type: "default"
        },
        {
          label: "9",
          type: "default"
        },
        {
          label: "10",
          type: "default"
        },
        {
          label: "11",
          type: "default"
        },
        {
          label: "12",
          type: "default"
        },
        {
          label: "13",
          type: "default"
        },
        {
          label: "14",
          type: "default"
        },
        {
          label: "15",
          type: "default"
        },
        {
          label: "16",
          type: "default"
        },
        {
          label: "17",
          type: "default"
        },
        {
          label: "18",
          type: "default"
        },
        {
          label: "19",
          type: "default"
        },
        {
          label: "20",
          type: "default"
        },
        {
          label: "21",
          type: "default"
        },
        {
          label: "22",
          type: "default"
        },
        {
          label: "23",
          type: "default"
        },
        {
          label: "24",
          type: "default"
        },
        {
          label: "25",
          type: "default"
        },
        {
          label: "26",
          type: "default"
        },
        {
          label: "27",
          type: "default"
        },
        {
          label: "28",
          type: "default"
        },
        {
          label: "1",
          type: "disabled"
        },
        {
          label: "2",
          type: "disabled"
        },
        {
          label: "3",
          type: "disabled"
        },
        {
          label: "4",
          type: "disabled"
        },
        {
          label: "5",
          type: "disabled"
        },
      ]
    }
  },
  created() {
    const date = new Date ();
    this.currMonth = this.monthLabels [date.getMonth()]
  }
}
</script>

<style scoped>
  .month {
    width: 100%;
    text-align: center;
    font-weight: 700;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.13);
  }
  .weekdays-row {
    display: grid;
    grid-template-columns: auto auto auto auto auto auto auto;
    align-items: center;
    gap: 0;
    width: 100%;
  }
  .weekday {
    padding: 0;
    width: 3rem;
    font-weight: 700;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .weekend {
    color: #a0c779;
    font-weight: 700;
  }
  .cal-body {
    border-radius: 2rem;
    background: #ffffff;
    box-shadow:  20px 20px 60px #d9d9d9,
    -20px -20px 60px #ffffff;
    padding-top: 2rem;
    padding-left: 1rem;
    padding-right: 1rem;
    width: 90vw;
    padding-bottom: 0.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .items {
    display: grid;
    height: 33vh;
    width: 100%;
    padding: 0;
    min-width: 100%;
    grid-template-columns: auto auto auto auto auto auto auto;
  }
</style>