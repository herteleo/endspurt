export default (value) => {
  if (value instanceof Date || ['string', 'number'].includes(typeof value)) {
    const date = new Date(Number(value) || value);

    if (!Number.isNaN(Date.parse(date))) {
      return date;
    }
  }

  if (!(value instanceof Date) && typeof value === 'object') {
    const {
      year,
      month,
      day,
      hour = '00',
      minute = '00',
      second = '00',
    } = value;

    const date = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);

    if (!Number.isNaN(date)) {
      return date;
    }
  }

  throw new Error(`__PKG_NAME__: 'value' is not a valid date: '${value}'
    allowed formats:
      - new Date()
      - <timestamp> or '<timestamp>'
      - 'YYYY-MM-DD' or 'YYYY-MM-DDTHH:II:SS'
      - {
          year: 'YYYY',
          month: 'MM',
          day: 'DD',
          hour: 'HH',   // optional, default: '00'
          minute: 'II', // optional, default: '00'
          second: 'SS', // optional, default: '00'
        }
  `);
};
