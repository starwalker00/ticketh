import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// eslint-disable-next-line
import { Navigation, Footer, Home, About, Check } from "./components";
function App() {
  return (
    <div className="App d-flex p-2 flex-column align-self-center justify-content-center">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/check" exact component={() => <Check />} />
          <Route path="/about" exact component={() => <About />} />
        </Switch>
        {/* <Footer /> */}
        {/* style={{flexGrow: "1"}} */}
      </Router>
    </div>
  );
}

export default App;