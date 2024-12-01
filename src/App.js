// App.js
import React from 'react';
import KanbanBoard from './KanbanBoard';

const App = () => {
  return (
    <div className="app-container">
      <h1>Kanban Board</h1>
      <KanbanBoard />
    </div>
  );
};

export default App;
