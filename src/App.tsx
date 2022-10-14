import { Routes } from "react-router";
import { BrowserRouter, Route } from "react-router-dom";
import AboutIconLink from "./components/AboutIconLink";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import Header from "./components/Header";
import { FeedbackProvider } from "./context/FeedbackContext";
import AboutPage from "./pages/AboutPage";


function App() {

  return (
    <FeedbackProvider>
      <BrowserRouter>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" 
              element= {
              <>
                <AboutIconLink />
                <FeedbackForm />
                <FeedbackStats />
                <FeedbackList /> 
              </>
              }
              />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </FeedbackProvider>
  ) 
}

export default App;