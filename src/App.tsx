import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import Game from "./pages/game";
import Bingo from "./pages/bingo";
import Leaderboard from "./pages/leaderboard";
import Layout from "./layout";
import Bingoboard from "./pages/bingoboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout><Outlet /></Layout>}>
          <Route path="/home" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/bingo" element={<Bingo />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/bingoboard" element={<Bingoboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
