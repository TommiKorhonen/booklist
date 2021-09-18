import Header from "./components/Header";
import Main from "./components/Main";
import { BooksContextProvider } from "./context/BooksContext";


function App() {
  return (
    <BooksContextProvider >
      <div className="container mx-auto">
        <Header />
        <Main />
      </div>
    </BooksContextProvider>
  );
}

export default App;
