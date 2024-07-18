//法定节假日
var cnHoliday = [];
//调休工作日
var cnWorkday = [];
var cnHolidayMap = {
    '2023': [
        "2023年1月1日", // 元旦
        "2023年1月21日", "2023年1月22日", "2023年1月23日",
        "2023年1月24日", "2023年1月25日", "2023年1月26日", "2023年1月27日", // 春节
        "2023年4月5日", // 清明节
        "2023年4月29日", "2023年4月30日", "2023年5月1日", "2023年5月2日", "2023年5月3日", // 劳动节
        "2023年6月22日", "2023年6月23日", "2023年6月24日", // 端午节
        "2023年9月29日", "2023年9月30日", "2023年10月1日",
        "2023年10月2日", "2023年10月3日", "2023年10月4日",
        "2023年10月5日", "2023年10月6日" // 中秋节和国庆节连休
    ],
    '2024': [
        "2024年1月1日", // 元旦
        "2024年2月10日", "2024年2月11日", "2024年2月12日", "2024年2月13日",
        "2024年2月14日", "2024年2月15日", "2024年2月16日", "2024年2月17日", // 春节
        "2024年4月4日", "2024年4月5日", "2024年4月6日", // 清明节
        "2024年5月1日", "2024年5月2日", "2024年5月3日", "2024年5月4日", "2024年5月5日", // 劳动节
        "2024年6月10日", // 端午节
        "2024年9月15日", "2024年9月16日", "2024年9月17日", // 中秋节
        "2024年10月1日", "2024年10月2日", "2024年10月3日", "2024年10月4日",
        "2024年10月5日", "2024年10月6日", "2024年10月7日" // 国庆节
    ]
}
var cnWorkdayMap = {
    '2023': [
        "2023年1月28日", "2023年1月29日", // 春节调休上班
        "2023年4月23日", // 劳动节调休上班
        "2023年5月6日", // 劳动节调休上班
        "2023年6月25日", // 端午节调休上班
        "2023年9月29日", "2023年10月7日", "2023年10月8日" // 中秋节和国庆节调休上班
    ],
    '2024': [
        "2024年2月4日", // 春节调休上班
        "2024年2月18日", // 春节调休上班
        "2024年4月7日", // 清明节调休上班
        "2024年4月28日", // 劳动节调休上班
        "2024年5月11日", // 劳动节调休上班
        "2024年9月14日", // 中秋节调休上班
        "2024年9月29日", // 国庆节调休上班
        "2024年10月12日"  // 国庆节调休上班
    ]
}
for (let key in cnHolidayMap) {
    cnHolidayMap[key].forEach(function (day) {
        cnHoliday.push(day);
    });
}
for (let key in cnWorkdayMap) {
    cnWorkdayMap[key].forEach(function (day) {
        cnWorkday.push(day);
    });
}
// 初始化起始日期为2023年1月1日
let startDate = moment('2023-01-01');
// 初始化结束日期为今天
let todayDate = moment();
let endDate = moment(todayDate.year() + '-12-31');
// 用于存储所有星期六和星期天的数组
let weekendDays = [];
// 循环遍历每一个星期，直到结束日期
while (startDate.isBefore(endDate)) {
    // 检查是否为星期六（5）或星期天（6）
    if (startDate.weekday() === 0 || startDate.weekday() === 6) {
        // 格式化日期并添加到数组中
        weekendDays.push(startDate.format('YYYY年M月D日'));
    }
    // 循环到下一天
    startDate.add(1, 'days');
}
//根据中国法定节假日，进行调整
weekendDays.forEach(function (day) {
    if (cnWorkday.indexOf(day) === -1) {
        cnHoliday.push(day);
    }
});
