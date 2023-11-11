import React, { useState } from 'react';
import './App.css';
import TicTacToeTable from './components/TicTacToeTable';

function App() {
  const [tableSize, setTableSize] = useState<number>(3);
  return (
    <div className="App">
      <TicTacToeTable rowAndColumnAmount={tableSize} setTableSize={setTableSize} />
    </div>
  );
}

export default App;
