import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Footer from "./components/Footer/Footer";
import Header from "./components/Header";

// Styles
import { Container } from "./styles/styles";

// Pages
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import User from "./pages/User";

const App = () => {
  return ( 
    <Router>
      <Container>
        <Header />
        <main >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user/:id" element={<User />} />
            <Route path="/user/update/:id" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </Container>
    </Router>
  );
}
 
export default App;