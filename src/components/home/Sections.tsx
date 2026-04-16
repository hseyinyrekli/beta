import "../../styles/Sections.css";
import { useLanguage } from "../../i18n/LanguageContext";
import type { SectionsProps } from "../../types";

function Sections({
  errorMessage,
  isLoading,
  onRetry,
  todos,
  onOpenDetail,
}: SectionsProps) {
  const { t } = useLanguage();

  return (
    <section className="sections" id="todo-grid">
      <div id="todo-grid-list" />

      {isLoading && (
        <div className="todo-grid" aria-busy="true" aria-live="polite">
          {Array.from({ length: 6 }).map((_, index) => (
            <article className="todo-card todo-card-skeleton" key={index}>
              <div className="skeleton-line short" />
              <div className="skeleton-line title" />
              <div className="skeleton-line" />
              <div className="skeleton-line medium" />
            </article>
          ))}
        </div>
      )}

      {!isLoading && errorMessage && (
        <div className="empty-state error-state" role="alert">
          <span className="eyebrow">{t("states.errorLabel")}</span>
          <h3>{t("states.errorTitle")}</h3>
          <p>{t("states.errorDescription")}</p>
          <button className="detail-button" onClick={onRetry} type="button">
            {t("states.retry")}
          </button>
        </div>
      )}

      {!isLoading && !errorMessage && (
        <>
          <div className="todo-grid">
            {todos.map((todo) => (
              <article className="todo-card" key={todo.id}>
                <div className="todo-card-top">
                  <span className="todo-tag">Todo #{todo.id}</span>
                  <span className={`todo-status ${todo.completed ? "done" : "pending"}`}>
                    {todo.completed ? t("sections.completed") : t("sections.inProgress")}
                  </span>
                </div>

                <h3>{todo.title}</h3>
                <p>{t("sections.description", { userId: todo.userId })}</p>

                <div className="todo-card-bottom">
                  <div className="todo-meta">
                    <span>{t("sections.user")}</span>
                    <strong>{todo.userId}</strong>
                  </div>
                  <button
                    className="detail-button"
                    onClick={() => onOpenDetail(todo)}
                    type="button"
                  >
                    {t("sections.detailButton")}
                  </button>
                </div>
              </article>
            ))}
          </div>

          {todos.length === 0 && (
            <div className="empty-state">
              <span className="eyebrow">{t("sections.noMatch")}</span>
              <h3>{t("sections.noMatchTitle")}</h3>
              <p>{t("sections.noMatchDescription")}</p>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default Sections;
