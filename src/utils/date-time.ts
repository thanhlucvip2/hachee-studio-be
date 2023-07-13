import * as moment from 'moment-timezone';

import { TIMEZONE } from './constants';

export const parseDateTime = (dateTime = '') => {
  const dateTimeType = dateTime === '' ? moment.now() : dateTime;
  return moment.tz(dateTimeType, TIMEZONE);
};
