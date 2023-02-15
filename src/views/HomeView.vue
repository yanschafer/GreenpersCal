<template>
  <img class="logo" src="@/assets/logo.png">
  <div class="container cal-body" v-if="loaded">
    <div class="row">
      <button class="col" @click="prevMonth">{{ "<-" }}</button>
      <h5 class="month col">{{ month }} ({{ yearNum }})</h5>
      <button class="col" @click="nextMonth">{{ "->" }}</button>
    </div>

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
      <CalendarItem @click="selectDay(day, index)" v-for="(day, index) in days" :label="day.label" :type="day.type" :key="Date.now() + day.label"/>
    </div>
  </div>
  <div class="row legend-row">
    <div class="col legend">
      <button class="container legend-day" @click="selectMarker('day')"><i class="fa-solid fa-sun icon-day"></i></button>
      <h6 class="legend-heading">День</h6>
    </div>
    <div class="col legend">
      <button class="container legend-night" @click="selectMarker('night')"><i class="fa-solid fa-moon icon-night"></i></button>
      <h6 class="legend-heading">Ночь</h6>
    </div>

  </div>
  <div class="row button-save-row">
    <div class="col button-save-col">
      <button type="button" @click="save" class="btn btn-primary">Сохранить</button>
    </div>
  </div>
</template>

<script>

// за 3 дня
// Если сегодня 4 то начинать выбирать можно с 8
//


import CalendarItem from "@/components/CalendarItem.vue";
import {Api} from "@/api/Api";

export default {
  name: 'HomeView',
  components: {
    CalendarItem
  },
  data() {
    return {
      monthLabels: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
      currMonth: "",
      monthNum: 0,
      yearNum: 0,
      currMarker: 'default',
      diff: 0,
      startedMonth: 0,
      startedDate: 0,
      loaded: false,
      months: [{month: 0, days: []},{month: 0, days: []},],
    }
  },
  async created() {
    this.monthNum = (new Date()).getMonth();
    this.startedMonth = this.monthNum;
    this.startedDate = (new Date()).getDate();
    if (this.startedDate >= 27) {
      this.monthNum++;
      this.startedMonth++
      this.startedDate = -3;
    }
    this.yearNum = (new Date()).getFullYear();
    this.loaded = false;
    await this.calculate();
    this.nextMonth();
    await this.calculate();
    this.prevMonth();
    this.loaded = true;
  },
  methods: {
    save() {
      const api = new Api();
      api.saveData(JSON.stringify(this.months));
    },
    prevMonth() {
      if (this.diff <= 0) {
        return;
      }

      this.diff--;

      if (this.monthNum < 1) {
        this.yearNum--;
        this.monthNum = 11;
        return;
      }
      this.monthNum--;
    },
    nextMonth() {
      if (this.diff >= 1) {
        return;
      }

      this.diff++;

      if (this.monthNum > 10) {
        this.yearNum++;
        this.monthNum = 0;
        return;
      }
      this.monthNum++;
    },
    async calculate() {
      const api = new Api();
      const fromServer = await api.getData(this.monthNum);
      if (fromServer.length) {
        console.log(fromServer[0])
        console.log(fromServer[0].month)
        console.log(JSON.parse(fromServer[0].days));
        this.months[this.diff] = {
          month: fromServer[0].month,
          days: JSON.parse(fromServer[0].days)
        }
        return;
      }
      const days = [];
      const date = new Date ();
      const year = date.getFullYear()
      const month = this.monthNum;
      const firstDay = new Date(year,month,1)
      const firstWeekDay = firstDay.getDay()
      // const prevMonthLastDay = new Date(year, month, 0).getDate();
      let lastDayCurMonth = new Date(year,month+1,-1).getDate()

      console.log(lastDayCurMonth);
      if (lastDayCurMonth == 27 && this.yearNum % 4 == 0) {
        lastDayCurMonth = 28;
      }

      for (let i = 0; i < lastDayCurMonth + 1; i++) {
        days.push({
          month: this.monthNum,
          day: i,
          label: i + 1,
          type: this.calculateType(i)
        });
      }

      // console.log('PREV MONTH', prevMonthLastDay)

      for (let i = 0; i < firstWeekDay - 1; i++) {
        days.unshift({
          month: false,
          day: false,
          label: "",
          type: "disabled"
        })
      }

      // const daysDiff = 42 - days.length;

      // for (let i = 0; i < daysDiff; i++) {
      //   days.push({
      //     month: this.monthNum + 1,
      //     day: i,
      //     label: i + 1,
      //     type: this.calculateType(i)
      //   });
      //
      //   if (days.length % 7 == 0) {
      //     break;
      //   }
      // }

      console.log('calculation');

      this.months[this.diff].month = this.monthNum;
      this.months[this.diff].days = days;
    },
    calculateType(day) {
      if (this.startedMonth < this.monthNum) {
        return 'default';
      }
      if (this.startedDate + 3 <= day) {
        return 'default'
      }
      return 'disabled';
    },
    selectMarker(type) {
      this.currMarker = type;
    },
    selectDay(day, index) {
      if (day.month === false)
        return;
      if (this.days[index - 1].type === 'night' && this.currMarker === 'day')
        return;
      day.type = this.currMarker;
      console.log(this.months[0])
      console.log(this.months[1])
    }
  },
  computed: {
    month() {
      return this.monthLabels[this.months[this.diff].month]
    },
    days() {
      return this.months[this.diff].days;
    }
  },
}
</script>

<style>
.legend-row {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');
#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.btn {
  width: 90vw;
  background-color: #96b963;
  border: 1px solid #f1ffdb;
}
.btn:hover {
  width: 90vw;
  background-color: #7e9857!important;
  border: 1px solid #8aa85a;
}
.btn:focus {
  width: 90vw;
  background-color: #7e9857!important;
  border: 1px solid #8aa85a;
}
.btn:active {
  width: 90vw;
  background-color: #7e9857;
  border: 1px solid #8aa85a;
}
.button-save-col {
  display: flex;
  justify-content: center;
}
.button-save-row {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
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
  color: #619fa8;
  border: none;
  padding: 0;
  height: 2rem;
  width: 2rem;
  margin-left: 0;
  margin-right: 1rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.legend-day:hover {
  background: transparent;
  border: 1px solid #619fa8;
  color: #619fa8;
  transition: all 1s ease;
}
.legend-day:focus {
  background: transparent;
  border: 1px solid #619fa8;
  color: #619fa8;
  transition: all 1s ease
}
.legend-day:focus-within {
  background: transparent;
  border: 1px solid #619fa8;
  color: #619fa8;
  transition: all 1s ease
}
.legend-day:active {
  background: transparent;
  border: 1px solid #619fa8;
  color: #619fa8;
  transition: all 1s ease
}

.legend-night {
  background: #283b42;
  color: #283b42;
  padding: 0;
  height: 2rem;
  border: none;
  width: 2rem;
  margin-left: 0;
  margin-right: 1rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.legend-night:hover {
  background: transparent;
  border: 1px solid #283b42;
  color: #283b42;
  transition: all 1s ease;
}
.legend-night:focus {
  background: transparent;
  border: 1px solid #283b42;
  color: #283b42;
  transition: all 1s ease
}
.legend-night:focus-within {
  background: transparent;
  border: 1px solid #283b42;
  color: #283b42;
  transition: all 1s ease
}
.legend-night:active {
  background: transparent;
  border: 1px solid #283b42;
  color: #283b42;
  transition: all 1s ease
}

.row {
  margin-top: 1rem;
}
.legend-heading {
  margin: 0;
}

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
