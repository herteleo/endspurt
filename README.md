# Endspurt - Full featured countdown library


![](https://img.shields.io/npm/v/endspurt/latest)
![](https://github.com/herteleo/endspurt/workflows/Release/badge.svg)
![](https://github.com/herteleo/endspurt/workflows/Lint/badge.svg)


## Installation

**Via CDN**

```html
<script src="https://cdn.jsdelivr.net/npm/endspurt"></script>
```

```html
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
const myCountdown = new Endspurt('YYYY-MM-DDT00:00:00');

myCountdown.on('updated', (distance) => {
  console.log(distance.years.value);
  console.log(distance.months.value);
  console.log(distance.weeks.value);
  console.log(distance.days.value);
  console.log(distance.hours.value);
  console.log(distance.minutes.value);
  console.log(distance.seconds.value);
});

myCountdown.on('finished', () => {
  console.log('Celebrate!');
});

myCountdown.start();
```


## API

```js
new Endspurt(value, options);
```
- `value` can be of type
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
- `options` can be of type
  - `Object`
  - [Go to options](#options)


### Methods

```js
const myCountdown = new Endspurt(value, options);

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

**Output**
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

| Option          | Format  | Default value                                                               | Description
|-----------------|---------|-----------------------------------------------------------------------------|------------
| terminate       | Boolean | `true`                                                                      | Stop interval if countdown has finished
| include         | Array   | `['years', 'weeks', 'days', 'hours', 'minutes', 'seconds', 'milliseconds']` | Include defined periods in calculation
| interval        | Number  | `200`                                                                       | Define (in milliseconds) how often the `updated`-event should get called
| timezoneOffset  | Number  | `0`                                                                         | Manual timezone offset in milliseconds
| yearsPad        | Number  | `1`                                                                         | Number of leading zeros for `distance.years.padded` output
| monthsPad       | Number  | `2`                                                                         | Number of leading zeros for `distance.months.padded` output
| weeksPad        | Number  | `2`                                                                         | Number of leading zeros for `distance.weeks.padded` output
| daysPad         | Number  | `2`                                                                         | Number of leading zeros for `distance.days.padded` output
| hoursPad        | Number  | `2`                                                                         | Number of leading zeros for `distance.hours.padded` output
| minutesPad      | Number  | `2`                                                                         | Number of leading zeros for `distance.minutes.padded` output
| secondsPad      | Number  | `2`                                                                         | Number of leading zeros for `distance.seconds.padded` output
| millisecondsPad | Number  | `4`                                                                         | Number of leading zeros for `distance.milliseconds.padded` output
