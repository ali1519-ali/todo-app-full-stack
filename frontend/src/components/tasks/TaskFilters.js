// frontend/src/components/tasks/TaskFilters.js
import React from 'react';

const TaskFilters = ({ filter, setFilter, sort, setSort }) => {
  return (
    <div className="task-filters flex flex-wrap gap-6 mb-6 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-100">
      <div className="filter-group">
        <label htmlFor="status-filter" className="block text-sm font-bold text-indigo-700 mb-2 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Status:
        </label>
        <select
          id="status-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border-2 border-indigo-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent py-2 px-4 bg-white font-medium"
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-filter" className="block text-sm font-bold text-indigo-700 mb-2 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
          Sort by:
        </label>
        <select
          id="sort-filter"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border-2 border-indigo-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent py-2 px-4 bg-white font-medium"
        >
          <option value="created">Date Created</option>
          <option value="title">Title</option>
        </select>
      </div>
    </div>
  );
};

export default TaskFilters;