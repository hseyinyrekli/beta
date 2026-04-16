import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import SearchAndFilter from "../components/SearchAndFilter";
import Sections from "../components/Sections";
import { filterTodos, searchTodos, type TodoFilter } from "../services/todoFilterService";
import { getTodos, type Todo } from "../services/todoService";

function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<TodoFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [displayLimit, setDisplayLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [isRangeLoading, setIsRangeLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const data = await getTodos(100);
      setTodos(data);
    } catch {
      setTodos([]);
      setErrorMessage("Unable to fetch todo data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchTodos();
  }, []);

  const searchedTodos = searchTodos(todos, searchQuery);
  const rangedTodos = searchedTodos.slice(0, displayLimit);
  const visibleTodos = filterTodos(rangedTodos, filter);
  const hasNoData = !isLoading && !errorMessage && todos.length === 0;

  const handleDisplayLimitChange = (value: number) => {
    setIsRangeLoading(true);

    window.setTimeout(() => {
      setDisplayLimit(value);
      setIsRangeLoading(false);
    }, 350);
  };

  return (
    <>
      {isRangeLoading && (
        <div className="page-loading-bar" aria-label="Loading new range" />
      )}
      {!errorMessage && !hasNoData && (
        <SearchAndFilter
          activeFilter={filter}
          displayLimit={displayLimit}
          onDisplayLimitChange={handleDisplayLimitChange}
          onFilterChange={setFilter}
          onSearchChange={setSearchQuery}
          searchQuery={searchQuery}
          todos={rangedTodos}
        />
      )}
      <Sections
        errorMessage={errorMessage}
        isLoading={isLoading}
        onOpenDetail={setSelectedTodo}
        onRetry={fetchTodos}
        todos={visibleTodos}
      />
      <Modal
        isOpen={selectedTodo !== null}
        onClose={() => setSelectedTodo(null)}
        todo={selectedTodo}
      />
    </>
  );
}

export default HomePage;
