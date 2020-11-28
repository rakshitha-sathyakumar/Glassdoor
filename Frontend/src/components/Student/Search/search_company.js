import React, { Component } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/navbar_student';
import backendServer from '../../../webConfig';
import axios from 'axios';

class SearchCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: '',
    };
    this.searchResults(this.props.match.params.keyword);
  }
  searchResults = (param) => {
    const data = {
      company_name: param,
    };
    axios
      .post(`${backendServer}company/search/company`, data)
      .then((response) => {
        console.log(response.data);
        this.setState({
          searchResults: response.data,
        });
      })
      .catch((error) => {
        console.log('error');
        console.log(error);
      });
  };
  componentWillReceiveProps(nextProp) {
    console.log('next:', nextProp);
    this.searchResults(nextProp.match.params.keyword);
  }
  render() {
    let renderOutput = (
      <h3>
        <b>No results found</b>
      </h3>
    );
    if (
      this.state.searchResults &&
      Object.keys(this.state.searchResults).length > 0
    ) {
      renderOutput = [];
      for (var key of Object.keys(this.state.searchResults)) {
        console.log('key:', key);

        console.log('i value:', this.state.searchResults[key]);
        let value = this.state.searchResults[key];
        renderOutput.push(
          <div className='container'>
            <Card border-width='10px' style={{ width: '100%', color: 'black' }}>
              <Card.Body>
                <div class='d-flex'>
                  <div class='pull-left'>
                    <Card.Img
                      variant='top'
                      class='building-icon'
                      src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEX///8AAACmpqZFRUVCQkLa2totLS3y8vJlZWUfHx9xcXHIyMgpKSnx8fE/Pz+Pj49VVVUJCQnCwsLq6uoUFBSurq7R0dH4+PhRUVFfX1+VlZWBgYEyMjKIiIhra2t5eXmgoKAZGRm2trbZ2dk3Nzfj4+M48jMoAAAEBklEQVR4nO3d6XqiMBSAYW1r3RcUt45t1er93+JMRwkawulRJI34fT95Auk7TF0wxVqNiIiIiIh+ve2Tp8a/JRzUPbX8LeGzL2ELIUKEPwijqgsHjfKa9UIQvpQ4w/y16sImwpJDWDyEZZcRzvcTof08GSeN+ld6wOCE3XokVH9Kxo2kcfVe3xwwQKHYiVCqjdBfCBHer7D1ZvXpFMZDe9zLvQi39sCGU9jLHLBzL8KpPXDmFLbn9jiE3kNoQpiE0HsITQiTEHoPoQlhEkLvqd89fbmFmQPejfC9Oz6r++QWju1xoxzhYnx13VKEeV19FaNAu8oLnxEiRHjW+nzH3AIW9uVHbvOx2Uz7AH8UjmZXtCtDePOKPOM/V174glARwuIhlEKoKStsipl3vHN53MnxMkL1ruUIu3FPaGPe+7fa0rhd+nNmhduNtGt88mqhHKH8Ckr5unQjvcefylOc/N1CwELxKgZChAh1wsWnVcspjDr2uJVauLR3HXkVXr3a5FMtnNm7dr0Ky7zmfRRmLoOOEV4VQhPCJIQ1hAgvDaEJYRLCGkKEl1Z0tcn9Ct/21p9kb93CL2vYvqUWTu1dn7wK86rOVQyECBGGK1wn4xbyuICFE/l2T41k3FgcNk2fJ7PChjzFvmThzQvvE9Jbh1AKoSaExUMohVBTRjhbDYRW5p1xZyeNW4irTcQpXkNZbSK/amO1CUKECBXC3Whx1ujZKYwWVqO2Wjiwpxh4FbLa5P6vCCNEiBDhIYSaEJoQJiGsIUR4aY8rrP5qk7V9c+exW2jfObr/oRZu7SmmXoWO+zu7hPXYGhVHamHeFFynQYjw4YXrZJz8uUUUsHD/PhR6N5cAp9Kw4Zu02mQmT8FqkwtDWDyEUgg1ISweQqlyhOvFSCp5Pu63llJDczyHcChOsUxXqpQj/CO/pkqW0E7kYSnIIWzJ+6av+H5XGJcljBEiRHgUvq6sNk5hvLPHqYWRvecq9imMJvbId6ewYw9rtrXC18y11g+v5/BaYV8vbNr7IrwqhGkIjyH8DqHZgFATwjSExxB+h9BsQKjpcYVRw7pj8/zPzYUT+z7TfoWZN+DtWwvzpgjsOk0BYV4IESL0IVzKU5QtnHbEkufJIsK1OMNn2Z89KSsiVIdQU1nCD7OhqkLOoa6QhdU/hwh1IdTEI01unEOzoarC6p9DhLpCFvJ7qAuhJoS5PbyQRxpdIQs5h7oQauJ/aW6Pew6b9jmc+xfOT74X5Otwr8JB4+K6m8MPbn+XyewgXKYbetaGCzr+dKdfhJJZHO5ocrw7w2mOTT+Ut0fu9suncB0ru8LeJbx8qoBSCa/41wwm3TlEGHL8Hv6vKX9FSOBlFsMREREREZGX/gIAA/VAN9vp3wAAAABJRU5ErkJggg=='
                    ></Card.Img>
                  </div>
                  <div class='col-md-4'>
                    <Card.Title>
                      <h4 className='ml-3' style={{ color: 'green' }}>
                        <b>{value.name}</b>
                      </h4>
                    </Card.Title>
                    <h6>
                      {value.city && <span>{value.city},</span>}
                      {value.state && <span> {value.state}</span>}
                    </h6>
                  </div>

                  <div class='col-md-2'>
                    <h4>
                      {value.reviews && (
                        <span>
                          <b>{value.reviews}</b>
                        </span>
                      )}
                    </h4>
                    Reviews
                  </div>
                  <div class='col-md-2'>
                    <h4>
                      {value.reviews && (
                        <span>
                          <b>{value.reviews}</b>
                        </span>
                      )}
                    </h4>
                    Salaries
                  </div>
                  <div class='col-md-2'>
                    <h4>
                      {value.reviews && (
                        <span>
                          <b>{value.interviews}</b>
                        </span>
                      )}
                    </h4>
                    Interviews
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        );
      }
    }
    return (
      <React.Fragment>
        <Navbar />
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12 mt-5'>
              <h3
                style={{ color: '#028A0F', textAlign: 'center' }}
                className='pl-3'
              >
                Showing Results for "{this.props.match.params.keyword}"
              </h3>
            </div>
            {renderOutput}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchCompany;
