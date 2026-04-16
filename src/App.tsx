import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import { LanguageProvider } from "./i18n/LanguageContext";
import { AppRouterProvider } from "./router";

function App() {
  return (
    <LanguageProvider>
      <AppRouterProvider />
    </LanguageProvider>
  );
}

export default App;
