
import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'popper.js';
import './fonts/font-awesome-4.7.0/css/font-awesome.min.css';



import Navegation from './components/navegation';
import Main from './components/main';
import Registerstudent from './components/registerstudent';
import Validateaccount from './components/validateaccount';
import Completeregisterstudent from './components/completeregisterstudent';
import Chooseregister from './components/chooseregister';
import Principal from './components/principal';
import Registeremp from './components/registeremp';
import Profile from './components/profile';
import Listaempresas from './components/listaempresas';
import Listempleos from './components/listempleos';
import Validateemp from './components/validateemp';
import Validatestudent from './components/validatestudent';
import Validateempleos from './components/validateempleos';
import Listaalumnos from './components/listaalumnos';
import Createjob from './components/createjob';
import Myjobs from './components/myjobs';
import Postulantes from './components/postulantes';
import Job from './components/job';
import Editprofilealum from './components/editprofilealum';
import Logs from './components/logs';
import ValidatePost from './components/validatepost';
import Footer from './components/footer';

import './css/App.css'
import './css/App2.css'
import './css/footer.css'
import './css/perfilempresa.css'
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'


// import Mensajes from './components/messages';

function App() {
  return (

    <Router>

      <Navegation/>

      <div className="container-pag"  >

        <Route path="/" exact component={Main} />
        <Route path="/registerstudent" component={Registerstudent} />
        <Route path="/registeremp" component={Registeremp} />
        <Route path="/validateaccount" component={Validateaccount} />
        <Route path="/completeregisterstudent" component={Completeregisterstudent} />
        <Route path="/chooseregister" component={Chooseregister} />
        <Route path="/principal" component={Principal} />
        <Route path="/profile/:id" component={Profile} />
        <Route path="/listaempresas" component={Listaempresas} />
        <Route path="/listaempleos" component={Listempleos} />
        <Route path="/validateemp" component={Validateemp} />
        <Route path="/validatestudent" component={Validatestudent} />
        <Route path="/validateempleos" component={Validateempleos} />
        <Route path="/listaalumnos" component={Listaalumnos} />
        <Route path="/createjob" component={Createjob} />
        <Route path="/myjobs" component={Myjobs} />
        <Route path="/postulantes/:job_codigo" component={Postulantes} />
        <Route path="/job/:job_codigo" component={Job} />
        <Route path="/editprofile/:id" component={Editprofilealum}/>
        <Route path="/logs" component={Logs} />
        <Route path="/validate_post" component={ValidatePost} />


        {/* <Route path="/principal" component={Principal} />
        <Route path="/validarcuenta" component={Validar} />
        <Route path="/completar_registro" component={Completar} />
      
        <Route path ="/marketplace" component={Marketplace}/>       
        <Route path ="/eventos" component={Eventos}/>
        <Route path="/grupos" component={Grupos} />        
        <Route path="/perfil/:id" component={Perfil} /> */}

          
      </div>
      {/* <Route path="/messages" component={Mensajes} />

      <Route path="/mensajeria/:id" component={Mensajeria} /> */}
    <Footer></Footer>
    </Router>


  );
}


export default App;