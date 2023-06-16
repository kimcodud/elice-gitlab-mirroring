import "./App.css";
import Header from "./components/Header/Header";
import Router from "./routes/Router";

const App = () => {
  const excludedPage = "/plannerMap/:id";

  const currentPath = window.location.pathname;

  const shouldRenderFooter = () => {
    return currentPath !== excludedPage;
  };

  return (
    <div>
      <Header />
      <Router />
    </div>
  );
};

export default App;
