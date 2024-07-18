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

  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <Flex>
          <MonthDropdown
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />
          <b>2024</b>
        </Flex>
        <Calendar selectedMonth={selectedMonth} />
      </Container>
    </QueryClientProvider>
  );
}

export default App;
