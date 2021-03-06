import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";
// make the global state available to all of our components
import { StoreProvider } from "./utils/GlobalState";
import OrderHistory from "./pages/OrderHistory";
// stripe
import Success from "./pages/Success";

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: '/graphql',
})

// after adding state (everything between its JSX tags are considered the children of <StoreProvider>)
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
            <StoreProvider>
                <Nav />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={Signup} />
                  <Route exact path="/orderHistory" component={OrderHistory} />
                  <Route exact path="/products/:id" component={Detail} />
                  <Route exact path="/success" component={Success} />
                  <Route component={NoMatch} />
                </Switch>
            </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

// before adding state
          // function App() {
          //   return (
          //     <ApolloProvider client={client}>
          //       <Router>
          //         <div>
          //           <Nav />
          //           <Switch>
          //             <Route exact path="/" component={Home} />
          //             <Route exact path="/login" component={Login} />
          //             <Route exact path="/signup" component={Signup} />
          //             <Route exact path="/orderHistory" component={OrderHistory} />
          //             <Route exact path="/products/:id" component={Detail} />
          //             <Route component={NoMatch} />
          //           </Switch>
          //         </div>
          //       </Router>
          //     </ApolloProvider>

          //   );
          // }

export default App;
