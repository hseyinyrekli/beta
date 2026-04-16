import { useEffect } from "react";
import "../../styles/Modal.css";
import { useLanguage } from "../../i18n/LanguageContext";
import type { ModalProps } from "../../types";

function Modal({ isOpen, onClose, todo }: ModalProps) {
    const { t } = useLanguage();

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleEscape);

        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen || !todo) {
        return null;
    }

    return (
        <>
            <div
                aria-hidden="true"
                className="detail-backdrop"
                onClick={onClose}
            />
            <div
                aria-labelledby="todoDetailModalLabel"
                aria-modal="true"
                className="detail-modal-shell"
                id="modal-preview"
                role="dialog"
                tabIndex={-1}
            >
                <div className="detail-modal-card">
                    <div className="detail-modal-header">
                        <div>
                            <span className="eyebrow">{t("modal.todoDetail")}</span>
                            <h5 className="modal-title" id="todoDetailModalLabel">
                                {t("modal.record")} #{todo.id}
                            </h5>
                        </div>
                        <button
                            aria-label="Close"
                            className="detail-close-button"
                            onClick={onClose}
                            type="button"
                        >
                            {t("modal.close")}
                        </button>
                    </div>
                    <div className="detail-modal-body">
                        <div className="detail-story">
                            <div>
                                <span className={`todo-status ${todo.completed ? "done" : "pending"}`}>
                                    {todo.completed ? t("modal.completed") : t("modal.inProgress")}
                                </span>
                                <h3>{todo.title}</h3>
                                <p>{t("modal.description", { userId: todo.userId })}</p>
                            </div>

                            <div className="detail-mini-grid">
                                <div className="detail-mini-card">
                                    <span>{t("modal.userId")}</span>
                                    <strong>{todo.userId}</strong>
                                </div>
                                <div className="detail-mini-card">
                                    <span>Todo ID</span>
                                    <strong>{todo.id}</strong>
                                </div>
                                <div className="detail-mini-card">
                                    <span>{t("modal.state")}</span>
                                    <strong>{todo.completed ? t("modal.closedLoop") : t("modal.openLoop")}</strong>
                                </div>
                                <div className="detail-mini-card">
                                    <span>{t("modal.surface")}</span>
                                    <strong>{t("modal.liveDataset")}</strong>
                                </div>
                            </div>
                        </div>

                        <div className="detail-sidebar">
                            <div className="detail-sidebar-card">
                                <span className="eyebrow">{t("modal.overview")}</span>
                                <p>{t("modal.overviewDescription")}</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal;
