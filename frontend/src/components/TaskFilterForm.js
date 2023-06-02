import React from 'react';

const TaskFilterForm = ({ filterOptions, setFilterOptions, handleFilterSubmit }) => {
  return (
    <form className="filter-form" onSubmit={handleFilterSubmit}>
      <label>
        Sort by Deadline:
        <input
          type="checkbox"
          checked={filterOptions.sortByDeadline}
          onChange={(e) =>
            setFilterOptions((prevOptions) => ({
              ...prevOptions,
              sortByDeadline: e.target.checked,
            }))
          }
        />
      </label>
      <label>
        Sort by Priority:
        <input
          type="checkbox"
          checked={filterOptions.sortByPriority}
          onChange={(e) =>
            setFilterOptions((prevOptions) => ({
              ...prevOptions,
              sortByPriority: e.target.checked,
            }))
          }
        />
      </label>
      <label>
        Filter by Tags:
        <input
          type="checkbox"
          checked={filterOptions.sortByTags}
          onChange={(e) =>
            setFilterOptions((prevOptions) => ({
              ...prevOptions,
              sortByTags: e.target.checked,
            }))
          }
        />
        {filterOptions.sortByTags && (
          <input
            type="text"
            className="tags-filter"
            value={filterOptions.tags}
            onChange={(e) =>
              setFilterOptions((prevOptions) => ({
                ...prevOptions,
                tags: e.target.value,
              }))
            }
          />
        )}
      </label>
      <label>
        Filter by Pending Activities:
        <input
          type="checkbox"
          checked={filterOptions.sortByCompleted}
          onChange={(e) =>
            setFilterOptions((prevOptions) => ({
              ...prevOptions,
              sortByCompleted: e.target.checked,
            }))
          }
        />
      </label>
      <label>
        Sort by Alphabetical Order:
        <select
          value={filterOptions.sortAlphabeticalOrder}
          onChange={(e) =>
            setFilterOptions((prevOptions) => ({
              ...prevOptions,
              sortAlphabeticalOrder: e.target.value,
            }))
          }
        >
          <option value="">No Sorting</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>
      <button type="submit">Apply Filters</button>
    </form>
  );
};

export default TaskFilterForm;
