import React from 'react';
import classes from './App.module.css';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {BrowserRouter, Route, Switch, Redirect, Link} from 'react-router-dom';
import Firebase from 'firebase/app';
import 'firebase/database';

const App = (props) => {
  let firebaseConfig = {
      apiKey: "AIzaSyDVqBGEGiVYohk7o643QrLjAB59mgsB08Y",
      authDomain: "burger-bar-b2f01.firebaseapp.com",
      databaseURL: "https://burger-bar-b2f01.firebaseio.com",
      projectId: "burger-bar-b2f01",
      storageBucket: "burger-bar-b2f01.appspot.com",
      messagingSenderId: "774875303197",
      appId: "1:774875303197:web:a8fe904b34d56aad60e5f4",
      measurementId: "G-JRQ73LSZ6P"
  };

  Firebase.initializeApp(firebaseConfig);

  return (
    <div className={classes.App}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/Build" exact component={BurgerBuilder}/>
            <Route path="/OrderSummary" component={Checkout}/>
            <Route path="/OrderComplete" render={() => <div className={classes.InfoBox}><h1>Order Placed!</h1>We've got your order and are building your burger(s) right away. Maybe try <Link to="/Build">building</Link> another awesome burger?<div><Link to="/Build" className="DefaultButton">Home</Link></div></div>} />
            <Redirect from="/" to="/Build" exact />
            <Route render={() => <div className={classes.InfoBox}><h1>404 - Burger Not Found</h1>We've looked really carefully and we can't seem to find that page. Maybe try <Link to="/Build">building</Link> an awesome burger instead?</div>} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
