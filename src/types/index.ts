import type { ReactNode } from "react";

export type Language = "tr" | "en";

export type TranslationParams = Record<string, string | number>;

export type TodoFilter = "all" | "completed" | "in-progress";

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, params?: TranslationParams) => string;
}

export interface LanguageProviderProps {
  children: ReactNode;
}

export interface MainLayoutProps {
  children: ReactNode;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  todo: Todo | null;
}

export interface SectionsProps {
  errorMessage: string;
  isLoading: boolean;
  onRetry: () => void;
  todos: Todo[];
  onOpenDetail: (todo: Todo) => void;
}

export interface SearchAndFilterProps {
  activeFilter: TodoFilter;
  displayLimit: number;
  onFilterChange: (filter: TodoFilter) => void;
  onDisplayLimitChange: (value: number) => void;
  onSearchChange: (value: string) => void;
  searchQuery: string;
  todos: Todo[];
}
