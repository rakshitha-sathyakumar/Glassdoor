import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import StudentHome from './Student/LandingPage/home_student';
import StudentProfile from './Student/Profile/profile_student';
<<<<<<< HEAD
import StudentResume from './Student/Resume/resume_student'
import companyProfile from './Employer/companyProfile';
import updateCompany from './Employer/update';

=======
import StudentResume from './Student/Resume/resume_student';
import Login from './Student/Login/Login';
import CompanyLogin from './Employer/Login/companyLogin';
>>>>>>> 5fc43c0ac0db7c3fec7fa434acb4f42128f4684d

class Main extends Component {
    render() {
        return (
            <div>
                <Route exact path="/student/home" component={StudentHome} />
                <Route exact path="/student/profile" component={StudentProfile} />
                <Route exact path="/student/resume" component={StudentResume} />
<<<<<<< HEAD
                <Route exact path="/company/profile" component={companyProfile} />
                <Route exact path = "/company/profileUpdate" component={updateCompany} />


=======
                <Route exact path="/student/login" component={Login} />
                <Route exact path="/company/login" component={CompanyLogin} />
>>>>>>> 5fc43c0ac0db7c3fec7fa434acb4f42128f4684d
            </div>
        )
    }
}

export default Main;