import { Message } from 'element-ui';
import { each, set, get, cloneDeep, trim, toNumber, isNumber, isString, concat } from 'lodash';

let timeout = null;
export const debounce = (fn, interval = 500) => {
	return () => {
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			fn.apply(this, arguments);
		}, interval);
	};
};

export const showMessage = (msg = '提交成功', type = 'success') => {
	Message({
		message: msg,
		type: type,
		duration: 3 * 1000,
	});
};

export const formatTreeData = (d) => {
	each(d, (item) => {
		each(item.data, (v, k) => {
			if (k == 'type') {
				set(item, 'innerType', v);
			} else if (v) {
				set(item, k, v);
			}
			if (k == 'name') {
				set(item, 'label', v);
			}
		});
		delete item.data;
		if (item.children) {
			formatTreeData(item.children);
		}
	});
	return d;
};


export const formatSelectData = (d) => {
	each(d, (item) => {
		each(item, (v, k) => {
			if (k == 'id') {
				set(item, 'value', v);
			}
			if (k == 'name') {
				set(item, 'label', v);
			}
		});

		if (item.children) {
			formatSelectData(item.children);
		}
	});
	return d;
};

export const getCheckedArr = (d) => {
	let res = [];
	each(d, (i) => {
		if (i.checked) {
			res.push(i.id);
		}
		if (i.children) {
			res = concat(res, getCheckedArr(i.children));
		}
	});
	return res;
};

// 清除空格
export const clearSpace = (d) => {
	each(d, (v, k) => {
		if (isNumber(v)) {
			d[k] = toNumber(trim(v));
		}
		if (isString(v)) {
			d[k] = trim(v);
		}
		if (v == '') {
			v = null;
		}
	});
	return d;
};
