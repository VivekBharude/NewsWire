import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {Container} from 'react-bootstrap';



import Home from './components/Home';
import Newnews from './components/Newnews';
import Contact1 from './components/Contact1';
import NavBar from './components/NavBar';
import ShowNews from './components/ShowNews';
import EditNews from './components/EditNews';


const AppRoutes = ()=>{
    return(
        <BrowserRouter>
        <NavBar/>
          <Container>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/Contact' element={<Contact1 />}/>
            <Route path='/news/new' element={<Newnews />}/>
            <Route path='/news/:id' element={<ShowNews />}/>
            <Route path='/news/:id/edit' element={<EditNews />}/>
          </Routes> 
          </Container>
        </BrowserRouter>


    )
}
export default AppRoutes;
