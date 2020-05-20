import {EVENT_TYPES} from "../const.js";

const MINUTES_INCREMENT = 5;
const COST_INCREMENT = 10;
const MAX_SENTENCES = 5;

const destinations = [
  `Amsterdam`,
  `Geneva`,
  `Chamonix`,
  `Saint Petersburg`
];

const descriptionSentences = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const getRandomArrayElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomDate = (date = new Date()) => {
  const targetDate = date;

  const targetDateMinutes = targetDate.getMinutes();

  const currentMinutes = targetDateMinutes % 5 !== 0 ?
    Math.floor(targetDateMinutes / MINUTES_INCREMENT) * MINUTES_INCREMENT : targetDateMinutes;

  const minutesToAdd = Math.ceil(Math.random() * 24) * MINUTES_INCREMENT; // 5 minutes-2 hours

  targetDate.setMinutes(currentMinutes + minutesToAdd);

  return targetDate;
};

const getRandomDescription = () => {

  return new Array(Math.ceil(Math.random() * MAX_SENTENCES)).fill(``).map(() => {
    return descriptionSentences[Math.round(Math.random() * descriptionSentences.length - 1)];
  }).join(` `);
};

const generateEvent = () => {
  const startDate = getRandomDate();

  return {
    type: getRandomArrayElement(EVENT_TYPES),
    destination: getRandomArrayElement(destinations),
    startDate,
    endDate: getRandomDate(new Date(startDate.getTime())),
    cost: Math.ceil(Math.random() * 50) * COST_INCREMENT,
    isFavorite: Math.random() > 0.5,
    extraOffers: [
      {
        title: `Order Uber`,
        shortTitle: `uber`,
        price: 20
      }
    ],
    info: {
      description: getRandomDescription().trim(),
      photos: [`http://picsum.photos/248/152?r=${Math.random()}`]
    }
  };
};

const generateEvents = (count) => {
  return new Array(count).fill(``).map(generateEvent).sort((a, b) => {
    return a.startDate - b.startDate;
  });
};

export {generateEvent, generateEvents};
