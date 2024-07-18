import cx from 'classnames';

interface Props {
  firstDay: Date;
  italy: any[];
  usa: any[];
}

function getFirstDayOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function getWeekdayOfFirstDay(date: Date): number {
  return date.getDay();
}

function adjustDateForFirstDay(
  date: Date,
  day: number,
  weekdayOfFirstDay: number,
): Date {
  if (day === 0 && weekdayOfFirstDay === 0) {
    date.setDate(date.getDate() - 7);
  } else if (day === 0) {
    date.setDate(date.getDate() + (day - weekdayOfFirstDay));
  } else {
    date.setDate(date.getDate() + 1);
  }
  return date;
}

function isHoliday(date: Date, holidays: any[]): any {
  const holiday = holidays.find(
    (holiday) => holiday.date === date.toISOString().split('T')[0],
  );
  return holiday;
}

function CalendarDays({ firstDay, italy, usa }: Props) {
  let firstDayOfMonth = getFirstDayOfMonth(firstDay);
  let weekdayOfFirstDay = getWeekdayOfFirstDay(firstDayOfMonth);
  let currentDays = [];

  for (let day = 0; day < 42; day++) {
    firstDayOfMonth = adjustDateForFirstDay(
      firstDayOfMonth,
      day,
      weekdayOfFirstDay,
    );

    let calendarDay = {
      currentMonth: firstDayOfMonth.getMonth() === firstDay.getMonth(),
      date: new Date(firstDayOfMonth),
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      selected: firstDayOfMonth.toDateString() === firstDay.toDateString(),
      year: firstDayOfMonth.getFullYear(),
      ItalyHoliday: isHoliday(firstDayOfMonth, italy),
      USAHoliday: isHoliday(firstDayOfMonth, usa),
    };

    currentDays.push(calendarDay);
  }

  return (
    <div className="w-full flex-grow flex flex-wrap justify-center box-border">
      {currentDays.map((day) => {
        const inCurrentMonth = day.month === firstDay.getMonth();
        return (
          <div
            className={cx('w-32 h-20 relative border border-gray-400', {
              'bg-gray-300': !inCurrentMonth,
            })}
          >
            <p>{day.number}</p>
            <div>
              {day.ItalyHoliday && (
                <p className="rounded-2xl bg-red-500 p-1 text-white text-xs text-center mx-1">
                  {day.ItalyHoliday.name}
                </p>
              )}
              {day.USAHoliday && (
                <p className="rounded-2xl bg-blue-600 p-1 text-white text-xs text-center mx-1">
                  {day.USAHoliday.name}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CalendarDays;
