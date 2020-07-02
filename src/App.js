import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {Provider} from 'react-redux'
import * as Firebase from 'firebase';


import allArticles from './pages/articles/allArticles'
import articleDetail from './pages/articles/articleDetail'
import addArticle from './pages/admin/addArticle'
import Login from './pages/admin/login'
import Signup from './pages/admin/signup'
import Profile from './pages/admin/profile'
import Setting from './pages/admin/setting'
import Store from './store/store'
import apiKey from './constants/apiKey';

function App() {


  // Initialize firebase...
  if (!Firebase.apps.length) {
    Firebase.initializeApp(apiKey.FirebaseConfig)
  }

  return (
    <Provider store={Store}>
      <Router>
        <Switch>
          <Route path='/' exact component={allArticles} />
          <Route path='/detail/:id' component={articleDetail} />
          <Route path='/addBlog' component={addArticle} />
          <Route path='/addBlog/:id' component={addArticle} />
          <Route path='/Login' component={Login} />
          <Route path='/Signup' component={Signup} />
          <Route path='/Profile' component={Profile} />
          <Route path="/Setting" component={Setting} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
