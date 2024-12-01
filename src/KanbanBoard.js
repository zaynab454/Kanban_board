import React, { useState } from 'react';

const KanbanBoard = () => {
  const [toDoTasks, setToDoTasks] = useState([
    { id: 1, title: 'Task 1', description: '', status: 'toDo' },
    { id: 2, title: 'Task 2', description: '', status: 'toDo' },
    { id: 3, title: 'Task 3', description: '', status: 'toDo' },
    { id: 4, title: 'Task 4', description: '', status: 'toDo' },
    { id: 5, title: 'Task 5', description: '', status: 'toDo' },
  ]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);

  // Quand une tâche est sélectionnée, on initialise `selectedTask` et `taskStatus`
  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowNewTaskForm(true);  // Ouvre le formulaire pour modifier la tâche
  };

  const handleCreateNewTask = () => {
    setSelectedTask({ id: Date.now(), title: '', description: '', status: 'toDo' });
    setShowNewTaskForm(true);  // Affiche le formulaire de création
  };

  // Fonction pour enregistrer la tâche dans la bonne colonne
  const handleSaveTask = () => {
    if (selectedTask) {
      // Supprime la tâche de la colonne actuelle
      if (selectedTask.status === 'toDo') {
        setToDoTasks((prev) => prev.filter((task) => task.id !== selectedTask.id));
      } else if (selectedTask.status === 'inProgress') {
        setInProgressTasks((prev) => prev.filter((task) => task.id !== selectedTask.id));
      } else if (selectedTask.status === 'done') {
        setDoneTasks((prev) => prev.filter((task) => task.id !== selectedTask.id));
      }

      // Ajoute la tâche à la bonne colonne en fonction de son statut
      if (selectedTask.status === 'toDo') {
        setToDoTasks((prev) => [...prev, selectedTask]);
      } else if (selectedTask.status === 'inProgress') {
        setInProgressTasks((prev) => [...prev, selectedTask]);
      } else if (selectedTask.status === 'done') {
        setDoneTasks((prev) => [...prev, selectedTask]);
      }
      
      // Ferme le formulaire après l'enregistrement
      setShowNewTaskForm(false);
    }
  };

  // Fonction pour changer le statut de la tâche
  const handleTaskStatusChange = (e) => {
    const newStatus = e.target.value;
    setSelectedTask({ ...selectedTask, status: newStatus });
  };

  // Formulaire de création ou d'édition de tâche
  const NewTaskForm = () => (
    <div className="new-task-form">
      <input
        type="text"
        placeholder="Title of the task"
        value={selectedTask ? selectedTask.title : ''}
        onChange={(e) => setSelectedTask({ ...selectedTask, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={selectedTask ? selectedTask.description : ''}
        onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
      />
      <select
        value={selectedTask ? selectedTask.status : 'toDo'}
        onChange={handleTaskStatusChange}
      >
        <option value="toDo">To Do</option>
        <option value="inProgress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <button onClick={handleSaveTask}>Save</button>
      <button onClick={() => setShowNewTaskForm(false)} className="cancel-button">Cancel</button>
    </div>
  );

  return (
    <div className="kanban-board">
      <button className="create-task-button" onClick={handleCreateNewTask}>Create New Task</button>

      {/* Affichage conditionnel du formulaire de création de tâche */}
      {showNewTaskForm && <NewTaskForm />}

      {/* Ne montre les colonnes qu'après la fermeture du formulaire */}
      {!showNewTaskForm && (
        <>
          <div className="task-column">
            <h2>To Do</h2>
            {toDoTasks.map((task) => (
              <div key={task.id} className="task" onClick={() => handleTaskClick(task)}>
                {task.title}
              </div>
            ))}
          </div>

          <div className="task-column">
            <h2>In Progress</h2>
            {inProgressTasks.map((task) => (
              <div key={task.id} className="task" onClick={() => handleTaskClick(task)}>
                {task.title}
              </div>
            ))}
          </div>

          <div className="task-column">
            <h2>Done</h2>
            {doneTasks.map((task) => (
              <div key={task.id} className="task" onClick={() => handleTaskClick(task)}>
                {task.title}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default KanbanBoard;
 