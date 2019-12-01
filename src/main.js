import calculatePeriod from './utils/calculatePeriod';
import convertValueToDate from './utils/convertValueToDate';

export default class {
  constructor(value, options = {}) {
    this.initialized = false;
    this.running = false;

    this.endDate = undefined;

    this.distance = {
      years: { value: null, padded: null, raw: null },
      months: { value: null, padded: null, raw: null },
      weeks: { value: null, padded: null, raw: null },
      days: { value: null, padded: null, raw: null },
      hours: { value: null, padded: null, raw: null },
      minutes: { value: null, padded: null, raw: null },
      seconds: { value: null, padded: null, raw: null },
      milliseconds: { value: null, padded: null, raw: null },
    };

    this.events = {
      finished: [],
      initialized: [],
      started: [],
      stopped: [],
      terminated: [],
      updated: [],
      'updated-enddate': [],
    };

    this.setOptions(options);

    if (value) {
      this.setEndDate(value);
    }

    this.initialized = true;
    this.trigger('initialized');
  }

  static get version() {
    return '__PKG_VERSION__';
  }

  setOptions(options) {
    const hasOptionElse = (prop, defaultVal) => {
      if (Object.hasOwnProperty.call(options, prop)) return options[prop];
      return defaultVal;
    };

    this.options = {
      yearsPad: hasOptionElse('yearsPad', 1),
      monthsPad: hasOptionElse('monthsPad', 2),
      weeksPad: hasOptionElse('weeksPad', 2),
      daysPad: hasOptionElse('daysPad', 2),
      hoursPad: hasOptionElse('hoursPad', 2),
      minutesPad: hasOptionElse('minutesPad', 2),
      secondsPad: hasOptionElse('secondsPad', 2),
      millisecondsPad: hasOptionElse('millisecondsPad', 4),
      timezoneOffset: hasOptionElse('timezoneOffset', 0),
      terminate: hasOptionElse('terminate', true),
      include: hasOptionElse('include', Object.keys(this.distance)),
      interval: hasOptionElse('interval', 200),
    };
  }

  setEndDate(value) {
    try {
      this.endDate = convertValueToDate(value);

      if (this.running) this.interval();

      if (this.initialized) {
        this.trigger('updated-enddate');
      }
    } catch (error) {
      if (this.running) this.stop();

      this.endDate = undefined;
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  calculateDistance() {
    const actualDate = new Date();
    let distanceInMs = new Date(this.endDate - actualDate).getTime();

    if (this.options.timezoneOffset) {
      distanceInMs -= this.options.timezoneOffset;
    }

    const actualDistanceInMs = distanceInMs;

    this.options.include.forEach((period) => {
      distanceInMs -= calculatePeriod.call(this, period, distanceInMs);
    });

    return actualDistanceInMs;
  }

  interval() {
    const distanceInMs = this.calculateDistance();
    const remainingMs = Math.max(0, distanceInMs);

    this.trigger('updated');

    if (remainingMs === 0) {
      this.trigger('finished');

      if (this.options.terminate) {
        this.trigger('terminated');
        this.stop();
      }
    }
  }

  start() {
    if (!this.endDate || this.running) return;
    this.running = true;
    this.interval();

    this.timer = setInterval(() => {
      this.interval();
    }, this.options.interval);

    this.trigger('started');
  }

  stop() {
    clearInterval(this.timer);
    this.running = false;
    this.trigger('stopped');
  }

  on(event, callback) {
    if (typeof callback === 'function') {
      this.events[event].push(callback);
    }
  }

  trigger(event) {
    this.events[event].forEach((task) => task.call(this, this.distance));
  }
}
