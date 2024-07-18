import React from 'react';
import styled from 'styled-components';
import { MONTH_ARRAY } from '../constants';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';

// const Select = styled.select`
//   height: 40px;
//   width: 160px;
//   font-size: 20px;
// `;

interface Props {
  selectedMonth: string;
  setSelectedMonth: (value: string) => void;
}

const MonthDropdown = ({ selectedMonth, setSelectedMonth }: Props) => {
  const handleChange = (e: any): void => setSelectedMonth(e.target.value);

  function changeMonth(value: string) {
    setSelectedMonth(value);
  }

  return (
    <Select onValueChange={changeMonth} value={selectedMonth}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Month" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Months</SelectLabel>
          {MONTH_ARRAY.map((month) => (
            <SelectItem value={month}>{month}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
    // <Select value={selectedMonth} onChange={handleChange}>
    //
    // </Select>
  );
};

export default MonthDropdown;
