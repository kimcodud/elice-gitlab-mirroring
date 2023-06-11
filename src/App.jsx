import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Router from "./routes/Router";

const App = () => {
  return (
    <div>
      <Header />
      <Router />
      <Footer />
    </div>
  );
};

export default App;
