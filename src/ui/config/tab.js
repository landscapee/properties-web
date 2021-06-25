/*
 * @Descripttion: 
 * @version: 
 * @Author: xdh.ss
 * @Date: 2020-05-13 11:01:31
 * @LastEditors: xdh.ss
 * @LastEditTime: 2020-05-13 17:36:31
 */
import Dictionary from '../lib/dictionary';
import {concat} from 'lodash';
const demoTabs = [
    {
        id: 'demo_plan_list',
        columns: [
            {key: 'ind', label: '序号', width: '40px', type: 'index'},
            {key: 'waybillCode', label: '运单号', width: '200px', type: 'simple'},
            {key: 'des', label: '目的地', width: '200px', type: 'simple'},
            {key: 'number', label: '件数', width: '70px', type: 'simple'},
            {key: 'weight', label: '重量', width: '70px', type: 'simple'},
            {key: 'specialCode', label: '特货代码', width: '100px', type: 'simple'},
            {
                key: 'flightDate', label: '航班日期', width: '200px', type: 'simple',
                display: r => Dictionary.formatDateTime(r.flightDate, 'YYYY-MM-DD HH:mm')
            },
            {
                key: 'remark', label: '备注', width: '', type: 'edit',
                editConfig: {
                    type: 'input',
                    switch: r => {
                        return true;
                    }
                }
            },
            {
                key: '', label: '操作', width: '200px', type: 'operate',
                operates: [
                    {
                        type: 'button', value: '确认到达',
                        display: r => r.arrive ? '已到达' : '确认到达',
                        disabled: r => r.arrive ? true : false,
                        event: 'submit'
                    },
                    {
                        type: 'button', value: '查看', event: 'viewsRow'
                    }
                ]
            }
        ]
    }
]

export default concat(demoTabs)