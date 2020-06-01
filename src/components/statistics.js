import AbstractSmartComponent from "./abstract-smart-component.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {TimeUnits, getDuration} from '../utils/common.js';

const getEventDuration = (event) => {
  return getDuration(event.startDate, event.endDate);
};

const BACKGROUND_COLOR = `#f2f2f2`;
const BAR_HEIGHT = 55;

const getExpenses = (events) => {
  let flyExpenses = 0;
  let stayExpenses = 0;
  let driveExpenses = 0;
  let lookExpenses = 0;
  let eatExpenses = 0;
  let rideExpenses = 0;

  events.forEach((event) => {
    switch (event.type) {
      case `Flight`:
        flyExpenses += event.cost;
        break;
      case `Check-in`:
        stayExpenses += event.cost;
        break;
      case `Drive`:
        driveExpenses += event.cost;
        break;
      case `Sightseeing`:
        lookExpenses += event.cost;
        break;
      case `Restaurant`:
        eatExpenses += event.cost;
        break;
      case `Taxi`:
      case `Bus`:
      case `Train`:
      case `Ship`:
      case `Transport`:
        rideExpenses += event.cost;
        break;
    }
  });

  return {
    flyExpenses,
    stayExpenses,
    driveExpenses,
    lookExpenses,
    eatExpenses,
    rideExpenses
  };
};

const getTransportUsageCount = (events) => {
  let flyCount = 0;
  let driveCount = 0;
  let rideCount = 0;
  let sailCount = 0;

  events.forEach((event) => {
    switch (event.type) {
      case `Flight`:
        flyCount++;
        break;
      case `Drive`:
        driveCount++;
        break;
      case `Taxi`:
      case `Bus`:
      case `Train`:
      case `Transport`:
        rideCount++;
        break;
      case `Ship`:
        sailCount++;
        break;
    }
  });

  return {
    flyCount,
    driveCount,
    rideCount,
    sailCount
  };
};

const getLongestTypes = (events) => {
  const durations = {
    flyDuration: 0,
    stayDuration: 0,
    driveDuration: 0,
    lookDuration: 0,
    eatDuration: 0,
    rideDuration: 0
  };

  events.forEach((event) => {
    switch (event.type) {
      case `Flight`:
        durations.flyDuration += getEventDuration(event);
        break;
      case `Check-in`:
        durations.stayDuration += getEventDuration(event);
        break;
      case `Drive`:
        durations.driveDuration += getEventDuration(event);
        break;
      case `Sightseeing`:
        durations.lookDuration += getEventDuration(event);
        break;
      case `Restaurant`:
        durations.eatDuration += getEventDuration(event);
        break;
      case `Taxi`:
      case `Bus`:
      case `Train`:
      case `Ship`:
      case `Transport`:
        durations.rideDuration += getEventDuration(event);
        break;
    }
  });

  for (const duration in durations) {
    if (durations[duration]) {
      durations[duration] = Math.floor(durations[duration] / TimeUnits.MILLISECONDS_IN_A_SECOND / TimeUnits.SECONDS_IN_A_MINUTE / TimeUnits.MINUTES_IN_AN_HOUR);
    }
  }

  return durations;
};

const renderMoneyChart = (moneyCtx, expenses) => {
  const {flyExpenses, stayExpenses, driveExpenses, lookExpenses, eatExpenses, rideExpenses} = expenses;
  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [`FLY`, `STAY`, `DRIVE`, `LOOK`, `EAT`, `RIDE`],
      datasets: [{
        data: [flyExpenses, stayExpenses, driveExpenses, lookExpenses, eatExpenses, rideExpenses],
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        minBarLength: 50,
        barThickness: 44
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTransportChart = (transportCtx, transportUsageCount) => {
  const {flyCount, driveCount, rideCount, sailCount} = transportUsageCount;
  return new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [`FLY`, `DRIVE`, `RIDE`, `SAIL`],
      datasets: [{
        data: [flyCount, driveCount, rideCount, sailCount],
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        minBarLength: 50,
        barThickness: 44,
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTimeSpentChart = (timeSpendCtx, logestTypes) => {

  const {flyDuration, stayDuration, driveDuration, lookDuration, eatDuration, rideDuration} = logestTypes;

  return new Chart(timeSpendCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [`FLY`, `STAY`, `DRIVE`, `LOOK`, `EAT`, `RIDE`],
      datasets: [{
        data: [flyDuration, stayDuration, driveDuration, lookDuration, eatDuration, rideDuration],
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        minBarLength: 50,
        barThickness: 44
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}H`
        }
      },
      title: {
        display: true,
        text: `TIME SPENT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const createStatisticsTemplate = () => {
  return (
    /* html */
    `<section class="statistics" style="background-color: ${BACKGROUND_COLOR};">
      <h2 class="visually-hidden">Trip statistics</h2>

      <div class="statistics__item statistics__item--money">
        <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--transport">
        <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--time-spend">
        <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
      </div>
    </section>`
  );
};

class Statistics extends AbstractSmartComponent {
  constructor(eventsModel) {
    super();
    this._eventsModel = eventsModel;

    this._moneyChart = null;
    this._transportChart = null;
    this._timeSpentChart = null;

    this._renderCharts();
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  show() {
    super.show();

    this.rerender();
  }

  recoverListeners() { }

  rerender() {
    super.rerender();

    this._renderCharts();
  }

  _renderCharts() {
    const events = this._eventsModel.getEvents();

    const expenses = getExpenses(events);
    const transportUsageCount = getTransportUsageCount(events);
    const longetsTypes = getLongestTypes(events);

    const element = this.getElement();

    const moneyCtx = element.querySelector(`.statistics__chart--money`);
    const transportCtx = element.querySelector(`.statistics__chart--transport`);
    const timeSpendCtx = element.querySelector(`.statistics__chart--time`);

    moneyCtx.height = BAR_HEIGHT * 6;
    transportCtx.height = BAR_HEIGHT * 4;
    timeSpendCtx.height = BAR_HEIGHT * 6;

    this._moneyChart = renderMoneyChart(moneyCtx, expenses);
    this._transportChart = renderTransportChart(transportCtx, transportUsageCount);
    this._timeSpentChart = renderTimeSpentChart(timeSpendCtx, longetsTypes);
  }
}

export {Statistics as default};
