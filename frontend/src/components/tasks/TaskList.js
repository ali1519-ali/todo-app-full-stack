// frontend/src/components/tasks/TaskList.js
import { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import TaskFilters from './TaskFilters';

const TaskList = ({ userId, authToken }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'completed'
  const [sort, setSort] = useState('created'); // 'created', 'title'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to fetch tasks from the API
  const fetchTasks = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/api/tasks/?status_filter=${filter}&sort_by=${sort}`,
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch tasks: ${response.status}`);
      }

      const data = await response.json();
      setTasks(data);
      setFilteredTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks on initial load and when filter/sort changes
  useEffect(() => {
    if (authToken) {
      fetchTasks();
    }
  }, [authToken, filter, sort]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...tasks];

    // Apply status filter
    if (filter === 'pending') {
      result = result.filter(task => !task.completed);
    } else if (filter === 'completed') {
      result = result.filter(task => task.completed);
    }

    // Apply sorting
    if (sort === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // Sort by creation date (newest first)
      result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    setFilteredTasks(result);
  }, [tasks, filter, sort]);

  if (loading) return (
    <div className="task-list-container bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/50 animate-fade-in-up">
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
        <p className="text-gray-600">Loading your tasks...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="task-list-container bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/50 animate-fade-in-up">
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-red-100 p-4 rounded-full mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <p className="text-red-600 font-medium">Error: {error}</p>
      </div>
    </div>
  );

  return (
    <div className="task-list-container bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/50 transform transition-all duration-500 hover:shadow-3xl animate-fade-in-up">
      <div className="flex items-center justify-between mb-6 animate-fade-in-down">
        <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 h-7 w-7 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 002 2h2a2 2 0 002-2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          My Tasks
        </h2>
        <div className="text-sm font-medium text-indigo-700 bg-white/80 px-4 py-2 rounded-full shadow-sm">
          {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
        </div>
      </div>

      <TaskFilters
        filter={filter}
        setFilter={setFilter}
        sort={sort}
        setSort={setSort}
      />

      <div className="task-list mt-6 animate-fade-in-up delay-100">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-16 animate-fade-in-up delay-200">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 002 2h2a2 2 0 002-2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
            </div>
            <p className="text-xl text-gray-600 font-medium">No tasks found</p>
            <p className="text-gray-500 mt-2">Create your first task using the form above</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map((task, index) => (
              <div
                key={task.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <TaskItem
                  task={task}
                  userId={userId}
                  authToken={authToken}
                  onUpdate={fetchTasks} // Refresh tasks after update
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;