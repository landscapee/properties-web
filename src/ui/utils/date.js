import moment from 'moment';
import { isNumber, isDate, parseInt, isString, each, isArray } from 'lodash';
// import { remote } from './electron';

export const getNaturalDate = (time) => {
	return parseInt(moment(time).format('YYYYMMDD'));
};
/**
 * 计算运营日
 * @param  {[int]} time [数字型timestamp]
 * @param  {[string]} time [字符串timestamp]
 * @param  {[moment]} time [moment对象]
 * @param  {[Date]} time [日期对象]
 * @return {[int]}      [YYYYMMDD]
 */
export const getOperationDate = (time) => {
	let scheduleTime;
	// 数字, 识别为 timestamp
	if (time == null) {
		scheduleTime = moment();
	} else if (parseInt(time) == time) {
		scheduleTime = moment(time, 'x');
	} else {
		scheduleTime = moment(time);
	}
	if (!scheduleTime.isValid()) {
		throw new Error('not support time format');
	}
	scheduleTime = scheduleTime.hour() < 4 ? scheduleTime.add(-1, 'days') : scheduleTime;
	return parseInt(scheduleTime.format('YYYYMMDD'));
};
/**
 * 获取上一个运营日
 * @param time
 * @returns {*}
 */
export const getLastOperationDate = (time) => {
	let scheduleTime = moment(time);
	let lastScheduleTime = scheduleTime.add(-1, 'days');
	return getOperationDate(lastScheduleTime);
};
/**
 * 获取下一个运营日
 * @param time
 * @returns {*}
 */
export const getNextOperationDate = (time) => {
	let scheduleTime = moment(time);
	let nextScheduleTime = scheduleTime.add(1, 'days');
	return getOperationDate(nextScheduleTime);
};

export const dateSerialization = (date) => {
	if (!isDate(date)) {
		return date;
	}
	return moment(date).format();
};

export const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z\+\d{2}$/;

export const reviver = (key, value) => {
	if (typeof value === 'string' && dateFormat.test(value)) {
		return new Date(value);
	}

	return value;
};
export const date2String = (obj) => {
	each(obj, (v, k) => {
		if (isArray(v)) {
			each(v, (i) => {
				date2String(i);
			});
		}
		if (Object.prototype.toString.call(v) == '[object Object]') {
			date2String(v);
		}
		if (isDate(v)) {
			obj[k] = dateSerialization(v);
		}
	});
};
export const stringDateExtend = (obj) => {
	if (Object.prototype.toString.call(obj) === '[object Array]') {
		each(obj, (item) => {
			stringDateExtend(item);
		});
	}
	if (Object.prototype.toString.call(obj) !== '[object Object]') {
		return obj;
	}
	each(obj, (v, k) => {
		if (isArray(v)) {
			each(v, (i) => {
				stringDateExtend(i);
			});
		}
		if (Object.prototype.toString.call(v) === '[object Object]') {
			stringDateExtend(v);
		}
		if (typeof v === 'string' && dateFormat.test(v)) {
			v = v.replace(/Z.*/g, '');
			obj[`${k}DisplayYMDHM`] = formatDate(v, 'YYYY-MM-DD HH:mm', '--');
			obj[`${k}DisplayYMD`] = formatDate(v, 'YYYY-MM-DD', '--');
			obj[`${k}DisplayDDHHmm`] = formatDate(v, '(DD)HHmm', '--');
			obj[`${k}`] = new Date(v);
			obj[`${k}Origin`] = v;
		}
	});
};

export const formatDate = (date, opt, empty) => {
	if (!empty) {
		empty = '';
	}
	if (isNumber(date) || isString(date)) {
		date = new Date(date);
	}
	if (!date || !isDate(date)) {
		return empty;
	}
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	switch (opt) {
		case 'HHmm':
			return (hour >= 10 ? hour : '0' + hour) + ':' + (minute >= 10 ? minute : '0' + minute);
		case 'HHmmss':
			return (hour >= 10 ? hour : '0' + hour) + ':' + (minute >= 10 ? minute : '0' + minute) + ':' + (second >= 10 ? second : '0' + second);
		case 'HHmm(DD)':
			return (hour >= 10 ? hour : '0' + hour) + ':' + (minute >= 10 ? minute : '0' + minute) + '(' + (day >= 10 ? day : '0' + day) + ')';
		case '(DD)HHmm':
			return '(' + (day >= 10 ? day : '0' + day) + ')' + (hour >= 10 ? hour : '0' + hour) + ':' + (minute >= 10 ? minute : '0' + minute);
		case 'DD HH:mm:ss':
			return '(' + (day >= 10 ? day : '0' + day) + ')' + (hour >= 10 ? hour : '0' + hour) + ':' + (minute >= 10 ? minute : '0' + minute) + ':' + (second >= 10 ? second : '0' + second);
		case 'HH:mm:ss':
			return (hour >= 10 ? hour : '0' + hour) + ':' + (minute >= 10 ? minute : '0' + minute) + ':' + (second >= 10 ? second : '0' + second);
		case 'DD':
			return day >= 10 ? day : '0' + day;
		case 'MMDD':
			return (month >= 10 ? month : '0' + month) + '' + (day >= 10 ? day : '0' + day);
		case 'YYYY-MM-DD':
			return year + '-' + (month >= 10 ? month : '0' + month) + '-' + (day >= 10 ? day : '0' + day);
		case 'YYYY-MM-DD HH:mm':
			return year + '-' + (month >= 10 ? month : '0' + month) + '-' + (day >= 10 ? day : '0' + day) + ' ' + (hour >= 10 ? hour : '0' + hour) + ':' + (minute >= 10 ? minute : '0' + minute);
		case 'YYYY-MM-DD HH:mm:ss':
			return year + '-' + (month >= 10 ? month : '0' + month) + '-' + (day >= 10 ? day : '0' + day) + ' ' + (hour >= 10 ? hour : '0' + hour) + ':' + (minute >= 10 ? minute : '0' + minute) + ':' + (second >= 10 ? second : '0' + second);
		default:
			return empty;
	}
};
// export const getTime = () => {
// 	if (typeof window !== 'undefined' && remote) {
// 		return remote.getGlobal('now');
// 	} else {
// 		return new Date().getTime();
// 	}
// };

export const getDiffTime = (start, end) => {
	let time;
	let rt;
	let unit = 'ms';
	rt = Math.abs(parseInt(end) - parseInt(start));
	if (rt >= 1000) {
		// rt = readedTime.diff(time, 'seconds');
		time = Math.floor(rt / 1000);
		unit = 's';
	}
	if (rt >= 1000 * 60) {
		time = Math.floor(rt / 1000 / 60);
		unit = 'm';
	}
	if (rt >= 1000 * 60 * 60) {
		time = Math.floor(rt / 1000 / 60 / 60);
		unit = 'h';
	}
	if (rt >= 1000 * 60 * 60 * 24) {
		time = Math.floor(rt / 1000 / 60 / 60 / 24);
		unit = '-D';
	}
	if (rt >= 1000 * 60 * 60 * 24 * 30) {
		time = Math.floor(rt / 1000 / 60 / 60 / 24 / 30);
		unit = '-M';
	}
	time = end < start ? -time : time;
	return `${time}${unit}`;
};

export const ms2Time = (time, type, empty) => {
	if (!empty) {
		empty = '';
	}
	if (isNumber(time)) {
		time = moment.duration(time);
	}
	if (!time) {
		return empty;
	}
	let year = time.years();
	let month = time.months();
	let day = time.days();
	let hour = time.hours();
	let min = time.minutes();
	let sec = time.seconds();
	switch (type) {
		case '!s':
			return `${year ? year + '年' : ''}${month ? month + '月' : ''}${day ? day + '天' : ''}${hour ? hour + '小时' : ''}${min ? min + '分钟' : ''}`;
		default:
			return `${year ? year + '年' : ''}${month ? month + '月' : ''}${day ? day + '天' : ''}${hour ? hour + '小时' : ''}${min ? min + '分钟' : ''}${sec ? sec + '秒' : ''}`;
	}
};

export const compareTime = (startTime, stopTime) => {
	var intStartTime = 0;
	if (typeof startTime == 'string' && startTime.constructor == String) {
		var startTimeArray = startTime.split(':');
		if (startTimeArray.length == 3) {
			intStartTime = startTimeArray[0] * 3600 + startTimeArray[1] * 60 + startTimeArray[2];
		} else {
			console.err('开始时间格式错误');
			return false;
		}
	} else {
		console.err('开始时间格式错误');
		return false;
	}

	var intStopTime = 0;
	if (typeof stopTime == 'string' && stopTime.constructor == String) {
		var stopTimeArray = stopTime.split(':');
		if (stopTimeArray.length == 3) {
			intStopTime = stopTimeArray[0] * 3600 + stopTimeArray[1] * 60 + stopTimeArray[2];
		} else {
			console.err('结束时间格式错误');
			return false;
		}
	} else {
		console.err('结束时间格式错误');
		return false;
	}

	if (intStopTime < intStartTime) {
		return false;
	} else {
		return true;
	}
};
