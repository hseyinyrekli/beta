import "../../styles/SearchAndFilter.css";
import { useLanguage } from "../../i18n/LanguageContext";
import type { SearchAndFilterProps, Todo, TodoFilter } from "../../types";

export function filterTodos(todos: Todo[], filter: TodoFilter) {
  if (filter === "completed") {
    return todos.filter((todo) => todo.completed);
  }

  if (filter === "in-progress") {
    return todos.filter((todo) => !todo.completed);
  }

  return todos;
}

export function searchTodos(todos: Todo[], query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return todos;
  }

  return todos.filter((todo) =>
    todo.title.toLowerCase().includes(normalizedQuery)
  );
}

function SearchAndFilter({
  activeFilter,
  displayLimit,
  onFilterChange,
  onDisplayLimitChange,
  onSearchChange,
  searchQuery,
  todos,
}: SearchAndFilterProps) {
  const { t } = useLanguage();
  const completedCount = todos.filter((todo) => todo.completed).length;
  const pendingCount = todos.length - completedCount;

  return (
    <section className="control-panel mt-5" id="controls">

      <div className="control-layout">
        <div className="filter-cluster">
          <button
            className={`filter-tile ${activeFilter === "all" ? "active-filter" : ""}`}
            onClick={() => onFilterChange("all")}
            type="button"
          >
            <span>{t("search.all")}</span>
            <strong>{todos.length}</strong>
          </button>
          <button
            className={`filter-tile ${activeFilter === "completed" ? "active-filter" : ""}`}
            onClick={() =>
              onFilterChange(activeFilter === "completed" ? "all" : "completed")
            }
            type="button"
          >
            <span>{t("search.completed")}</span>
            <strong>{completedCount}</strong>
          </button>
          <button
            className={`filter-tile ${activeFilter === "in-progress" ? "active-filter" : ""}`}
            onClick={() =>
              onFilterChange(activeFilter === "in-progress" ? "all" : "in-progress")
            }
            type="button"
          >
            <span>{t("search.inProgress")}</span>
            <strong>{pendingCount}</strong>
          </button>
        </div>

        <div className="search-panel">
          <label className="search-label" htmlFor="todo-search">
            {t("search.searchTitles")}
          </label>
          <input
            className="search-input"
            id="todo-search"
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={t("search.searchPlaceholder")}
            type="text"
            value={searchQuery}
          />
          <label className="search-label search-select-label" htmlFor="todo-display-limit">
            {t("search.viewRange")}
          </label>
          <select
            className="search-input search-select"
            id="todo-display-limit"
            onChange={(event) => onDisplayLimitChange(Number(event.target.value))}
            value={displayLimit}
          >
            <option value={10}>1-10</option>
            <option value={50}>1-50</option>
            <option value={100}>1-100</option>
          </select>
        </div>
      </div>
    </section>
  )
}

export default SearchAndFilter
