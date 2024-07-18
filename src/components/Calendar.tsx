import React, { useEffect, useState } from 'react';
import Days from './Days';
import { useQuery } from '@tanstack/react-query';
import { BASE_URL } from '../constants';

interface Props {
  selectedMonth: string;
}

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = ({ selectedMonth }: Props): JSX.Element => {
  const [firstDate, setFirstDate] = useState<Date>(new Date());
  const getMonthDate = () => {
    const date = new Date(selectedMonth + ' 1, 2024');
    // first day of the month
    return date;
  };

  function getHolidaysItaly() {
    return fetch('https://date.nager.at/api/v3/publicholidays/2024/39')
      .then((res) => res.json())
      .then((data) => data);
  }
  function getHolidaysAmerica() {
    return fetch('https://date.nager.at/api/v3/publicholidays/2024/1')
      .then((res) => res.json())
      .then((data) => data);
  }

  const queryItaly = useQuery({
    queryKey: ['holidaysItaly'],
    queryFn: getHolidaysItaly,
  });
  const queryAmerica = useQuery({
    queryKey: ['holidaysUSA'],
    queryFn: getHolidaysAmerica,
  });

  useEffect(() => {
    const firstDate = getMonthDate();
    setFirstDate(firstDate);
  }, [selectedMonth]);

  return (
    <div className="w-full flex-grow flex flex-col">
      <div className="w-full flex items-center justify-around h-10 color-white">
        {weekdays.map((weekday) => {
          return (
            <div className="">
              <p>{weekday}</p>
            </div>
          );
        })}
      </div>
      <div>{firstDate && <Days day={firstDate} />}</div>
    </div>
  );
};

export default Calendar;
