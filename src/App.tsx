import { TicketSearchPage } from "./pages/ticket/TicketSearchPage";
import "./App.css";
import { Header } from "./widgets/layout/header/Header";

const App = () => {
  return (
    <>
      <Header />
      <TicketSearchPage />
    </>
  );
};

export default App;
