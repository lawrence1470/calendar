import './global.css';
import React, { useState } from 'react';
import styled from 'styled-components';
import { MonthDropdown, Calendar } from './components';
import { MONTH_ARRAY } from './constants';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const Container = styled.div`
  margin: 32px;
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const queryClient = new QueryClient();

const CURRENT_DATE = new Date();
const CURRENT_MONTH_IDX = CURRENT_DATE.getMonth();
const CURRENT_MONTH = MONTH_ARRAY[CURRENT_MONTH_IDX];

function App() {
  const [selectedMonth, setSelectedMonth] = useState<string>(CURRENT_MONTH);
  const [customHolidays, setCustomHolidays] = useState<
    { name: string; date: Date }[]
  >([]);

  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <Flex>
          <MonthDropdown
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />
          <b>Year: 2024</b>
        </Flex>
        <div className="w-[900px] h-[600px] flex flex-col mt-8 mx-auto justify-center">
          <h1>
            Current Month: <strong>{selectedMonth}</strong>
          </h1>
          <div className="flex justify-center text-lg font-bold">
            <h2 className="underline">Holidays for USA 🇺🇸 and Italy 🇮🇹 </h2>
          </div>
          <Calendar selectedMonth={selectedMonth} />
        </div>
      </Container>
    </QueryClientProvider>
  );
}

export default App;
