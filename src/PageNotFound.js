import './pagenotfound.css'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router';



function PageNotFound(props){
    const navigate = useNavigate();

    return(
      
  <>
  <div class="error-wrapper">
      <div class="error-container">
          <div class="error">
              <div class="error-title">
                  Errore
              </div>
              <div class="error-number">
                  URL
              </div>
              <div class="error-description">
                  Ci dispiace, ma non riusciamo a raggiungere l'URL inserito.
              </div>
              <div class="error-or">
                  <div class="or-line"></div>
                  <div class="or">Cerca</div>
              </div>
              <div class="error-textbox">
                  <input type="text" class="form-control" autofocus="" placeholder='Non ancora implementato'/>
              </div>
              <div class="error-or">
                  <div class="or-line"></div>
                  <div class="or">Oppure</div>
              </div>
              <ul class="error-actions">
                  <div class='text-center'>
                  <li>
                      <Button variant="dark" className='text' onClick={() => navigate('/')}>Torna alla Home</Button>
                  </li>
                  </div>
              </ul>
          </div>
      </div>
  </div>
  </>
  
    );
  }

  export default PageNotFound;