import React, { useState, useEffect} from 'react';
import './styles/App.css'
import {
	BrowserRouter as Router,
	Route,
	Switch,
} from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage'
import Dashboard from './components/Dashboard/Dashboard'
import Trailers from './components/Trailers/Trailers';
import TrailerDetails from './components/Trailers/TrailerDetails'
import AddTrailer from './components/Trailers/AddTrailer'
import Comments from './components/Comments/Comments';
import Users from './components/Users/Users';
import Messages from './components/Messages/Messages';
import Ratings from './components/Rating/Ratings';
import Categories from './components/Categories/Categories';
import Faqs from './components/Faq/Faq';
import About from './components/Pages/About';
import Privacy from './components/Pages/Privacy';
import Terms from './components/Pages/Terms';
import ContactInfo from './components/Pages/ContactInfo';
import AddFaq from './components/Faq/AddFaq';
import AddCategory from './components/Categories/AddCategory';

function App() {
 const [apiBaseUrl,setApiBaseUrl]=useState('https://movieapp-server.herokuapp.com')
  return ( 
    <div className="App">
      <Router>
          <Header />
          <Switch>
              <div className="content-wrapper">
              <Route exact path="/" component={HomePage}/>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route
				         exact path="/trailers"
				         render={() => <Trailers apiBaseUrl={apiBaseUrl} />}
				        />
                <Route
				         exact path="/trailerdetails/:id"
				         render={() => <TrailerDetails apiBaseUrl={apiBaseUrl}/>}
				        />
                <Route
				         exact path="/addtrailer"
				         render={() => <AddTrailer apiBaseUrl={apiBaseUrl}/>}
				        />
                <Route
				         exact path="/commentlist"
				         render={() => <Comments apiBaseUrl={apiBaseUrl}/>}
				        />
                <Route
				         exact path="/userlist"
				         render={() => <Users apiBaseUrl={apiBaseUrl}/>}
				        />
                <Route
				         exact path="/messages"
				         render={() => <Messages apiBaseUrl={apiBaseUrl}/>}
				        />
                <Route
				         exact path="/ratings"
				         render={() => <Ratings apiBaseUrl={apiBaseUrl}/>}
				        />
				<Route
				         exact path="/categories"
				         render={() => <Categories apiBaseUrl={apiBaseUrl}/>}
				        />
				<Route
				         exact path="/addcategory"
				         render={() => <AddCategory apiBaseUrl={apiBaseUrl}/>}
				        />
				<Route
				         exact path="/faqs"
				         render={() => <Faqs apiBaseUrl={apiBaseUrl}/>}
				        />
				<Route
				  exact path="/addfaq"
				  render={() => <AddFaq apiBaseUrl={apiBaseUrl} />}
				/>
				<Route
						exact path="/about"
						render={() => <About apiBaseUrl={apiBaseUrl} />}
						/>
				<Route
						exact path="/privacypolicy"
						render={() => <Privacy apiBaseUrl={apiBaseUrl}/>}
						/>
				<Route
						exact path="/termsofuse"
						render={() => <Terms apiBaseUrl={apiBaseUrl}/>}
						/>
				<Route
						exact path="/contactinfo"
						render={() => <ContactInfo apiBaseUrl={apiBaseUrl}/>}
						/>

              </div> 
          </Switch>
          <Footer/> 
      </Router>
      
    </div>
  );
}

export default App;
