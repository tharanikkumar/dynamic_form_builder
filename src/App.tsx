import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import DynamicForm from './components/DynamicForm';
import './App.css';

const App: React.FC = () => {
  const [rollNumber, setRollNumber] = useState<string | null>(null);

  return (
    <div className="container">
      <h1>Dynamic Form Builder</h1>
      {!rollNumber ? (
        <LoginForm onLoginSuccess={(roll) => setRollNumber(roll)} />
      ) : (
        <DynamicForm rollNumber={rollNumber} />
      )}
    </div>
  );
};

export default App;
