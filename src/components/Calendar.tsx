import React from 'react';
import Days from './Days';
import { useQuery } from '@tanstack/react-query';
import { BASE_URL } from '../constants';

interface Props {
  selectedMonth: string;
}

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = ({ selectedMonth }: Props): JSX.Element => {
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

  return (
    <div>
      <div className="w-full flex items-center justify-around h-10 color-white">
        {weekdays.map((weekday) => {
          return (
            <div className="">
              <p>{weekday}</p>
            </div>
          );
        })}
      </div>
      <div>
        <Days day={new Date()} />
      </div>
    </div>
  );
};

export default Calendar;
