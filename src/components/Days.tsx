import cx from 'classnames';

interface Props {
  firstDay: Date;
  italy: any[];
  usa: any[];
}

function CalendarDays({ firstDay, italy, usa }: Props) {
  let firstDayOfMonth = new Date(
    firstDay.getFullYear(),
    firstDay.getMonth(),
    1,
  );
  let weekdayOfFirstDay = firstDayOfMonth.getDay();
  let currentDays = [];

  for (let day = 0; day < 42; day++) {
    if (day === 0 && weekdayOfFirstDay === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
    } else if (day === 0) {
      firstDayOfMonth.setDate(
        firstDayOfMonth.getDate() + (day - weekdayOfFirstDay),
      );
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    let calendarDay = {
      currentMonth: firstDayOfMonth.getMonth() === firstDay.getMonth(),
      date: new Date(firstDayOfMonth),
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      selected: firstDayOfMonth.toDateString() === firstDay.toDateString(),
      year: firstDayOfMonth.getFullYear(),
      ItalyHoliday: italy.find(
        (holiday) =>
          holiday.date === firstDayOfMonth.toISOString().split('T')[0],
      ),
      USAHoliday: usa.find(
        (holiday) =>
          holiday.date === firstDayOfMonth.toISOString().split('T')[0],
      ),
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
              {day.ItalyHoliday && <p>{day.ItalyHoliday.name}</p>}
              {day.USAHoliday && <p>{day.USAHoliday.name}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CalendarDays;
