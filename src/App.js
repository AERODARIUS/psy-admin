import React from 'react';
import { Button, DatePicker } from 'antd';
import 'antd/dist/antd.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Button type="primary">PRESS ME</Button>
      <DatePicker placeholder="select date" />
    </div>
  );
}

export default App;
