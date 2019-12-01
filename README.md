# Endspurt: A feature-rich countdown library


![](https://img.shields.io/npm/v/endspurt/latest)
![](https://img.shields.io/snyk/vulnerabilities/npm/endspurt)
![](https://github.com/herteleo/endspurt/workflows/Release/badge.svg)
![](https://github.com/herteleo/endspurt/workflows/Lint/badge.svg)


## Installation

**Via a CDN**

```html
<script src="https://cdn.jsdelivr.net/npm/endspurt"></script>
<script src="https://unpkg.com/endspurt"></script>
```

**Via NPM**

```bash
npm install --save endspurt
```

```js
import Endspurt from 'endspurt';
```


## Basic usage

```js
const options = { include: ['hours', 'minutes', 'seconds'] };
const myCountdown = new Endspurt('YYYY-MM-DDT00:00:00', options);

myCountdown.on('updated', (distance) => {
  const { hours, minutes, seconds } = distance;
  console.log(`${hours.value} hours, ${minutes.padded} minutes and ${seconds.padded} seconds remaining.`);
});

myCountdown.on('finished', () => {
  console.log('Celebrate!');
});

myCountdown.start();
```


## API

### `new Endspurt(value, options)`

#### `value`
Allowed formats:
- `undefined`
- `new Date()`
- Timestamp as `Number`
- Timestamp as `String`
- `'YYYY-MM-DD'`
- `'YYYY-MM-DDT00:00:00'`
- ```js
  {
    year: 'YYYY',
    month: 'MM',
    day: 'DD',
    hour: 'HH',   // optional, default: '00'
    minute: 'II', // optional, default: '00'
    second: 'SS', // optional, default: '00'
  }
  ```

#### `options`
Defined as `Object`. [See options reference](#options)


### Methods

```js
const myCountdown = new Endspurt(value, options);

myCountdown.setEndDate(Date);      // set new end-date, see valid value formats above
myCountdown.setOptions(Object);    // override options
myCountdown.start();               // start countdown interval
myCountdown.stop();                // stop countdown interval
myCountdown.on(String, Function);  // register event callbacks
```


### Events

```js
myCountdown.on('finished', Function);     // triggered when time is reached
myCountdown.on('initialized', Function);  // triggered when Endspurt is ready
myCountdown.on('started', Function);      // triggered when myCountdown.start() is called
myCountdown.on('stopped', Function);      // triggered when myCountdown.stop() is called
myCountdown.on('terminated', Function);   // triggered when time is reached and options.terminate is set to true
myCountdown.on('updated', Function);      // triggered on every interval iteration
```

Every event gets the `distance` object as first parameter.

```js
myCountdown.on('updated', function (distance) {
  console.log(distance);
});
```

**Example output**
```js
{
  years: { value: 1, padded: '01', raw: 1 },
  months: { value: 1, padded: '01', raw: 1 },
  weeks: { value: 2, padded: '02', raw: 2 },
  days: { value: 6, padded: '06', raw: 6 },
  hours: { value: 2, padded: '02', raw: 2 },
  minutes: { value: 59, padded: '59', raw: 59 },
  seconds: { value: 13, padded: '13', raw: 13 },
  milliseconds: { value: 987, padded: '0987', raw: 987 },
}
```


## Options

| Option          | Format  | Default value                             | Description
|-----------------|---------|------------------------------------------:|------------
| include         | Array   | [*See below*](#default-value-for-include) | Include defined periods in calculation
| interval        | Number  | `200`                                     | Define (in milliseconds) at which interval the `updated`-event should be called
| terminate       | Boolean | `true`                                    | Stop interval if countdown has finished
| timezoneOffset  | Number  | `0`                                       | Manual timezone offset in milliseconds
| yearsPad        | Number  | `1`                                       | Number of leading zeros for `distance.years.padded` output
| monthsPad       | Number  | `2`                                       | Number of leading zeros for `distance.months.padded` output
| weeksPad        | Number  | `2`                                       | Number of leading zeros for `distance.weeks.padded` output
| daysPad         | Number  | `2`                                       | Number of leading zeros for `distance.days.padded` output
| hoursPad        | Number  | `2`                                       | Number of leading zeros for `distance.hours.padded` output
| minutesPad      | Number  | `2`                                       | Number of leading zeros for `distance.minutes.padded` output
| secondsPad      | Number  | `2`                                       | Number of leading zeros for `distance.seconds.padded` output
| millisecondsPad | Number  | `4`                                       | Number of leading zeros for `distance.milliseconds.padded` output

### Default value for `include`
```js
['years', 'weeks', 'days', 'hours', 'minutes', 'seconds', 'milliseconds']
```
