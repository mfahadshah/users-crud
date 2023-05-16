import './App.css';

import {
  BrowserRouter,
  Route,
  HashRouter as Router,
  Switch,
} from "react-router-dom";

import AddUser from "./Components/users/AddUser";
import Layout from "./Components/Layout";
import ProtectedRoute from "./ProtectedRoute";
import SignIn from "./Components/auth/SignIn";
import UsersList from "./Components/users/UsersList";
import logo from './logo.svg';

function App() {

  return (
    <Router>
      <Switch>
        
        <Route exact path="/" component={SignIn} />

        <Layout>
          <Switch>
            {/*<ProtectedRoute exact path="/dashboard" component={Dashboard} />
            <ProtectedRoute exact path="/distributors" component={DistributorsList} />
            <ProtectedRoute exact path="/distributors/:id" component={AddDistributor} />
            <ProtectedRoute exact path="/retailers" component={RetailersList} />
            <ProtectedRoute exact path="/retailers/:id" component={AddRetailer} />
            <ProtectedRoute exact path="/regions" component={RegionsList} />
            <ProtectedRoute exact path="/regions/:id" component={AddRegion} />
            <ProtectedRoute exact path="/products" component={ProductsList} />
            <ProtectedRoute exact path="/products/:id" component={AddProduct} /> */}  
            <ProtectedRoute exact path="/users" component={UsersList} />  
            <ProtectedRoute exact path="/users/:id" component={AddUser} />  
            {/* <ProtectedRoute exact path="/merchandisers" component={MerchandisersList} />  
            <ProtectedRoute exact path="/merchandiser/:id" component={AddMerchandiser} />
            <ProtectedRoute exact path="/regional_managers" component={RegionalManagersList} />  
            <ProtectedRoute exact path="/regional_manager/:id" component={AddRegionalManager} />                   */}
          </Switch>
        </Layout>
      </Switch>
    </Router>
  );
}

export default App;
