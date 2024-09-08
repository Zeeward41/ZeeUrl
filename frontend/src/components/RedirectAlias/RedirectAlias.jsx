import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ENDPOINTS } from '../../../config';
import { useNavigate, useLocation } from 'react-router-dom'
import './RedirectAlias.css'

function RedirectAlias() {
  const { alias } = useParams();
  const endpointRedirect = ENDPOINTS.REDIRECTURL
  const navigate = useNavigate()
  const location = useLocation()
  const [ redirect, setRedirect] = useState(false)

    const redirectToOriginalUrl = async () => {
      try {
        const response = await fetch(`${endpointRedirect}/${alias}`, {
          method: "GET",
          credentials: "include"
        });

        const json = await response.json();

        if (!response.ok) {
          setRedirect(false)
          if (response.status === 404) {
            navigate('/notfound', { state: { from: location}, replace: true})
          } else {
            toast.error('Something went wrong!')
          }
        }

        if (json.success) {
            setRedirect(true)
            window.location.href = json.data
        }
        
      } catch (err) {
        toast.error('Something went wrong... try again!');
      }
    };

  useEffect(() => {

    redirectToOriginalUrl()

  }, []);

  return (
    redirect ? (
    <div className='redirecting'>
      <p>Redirecting...</p>
    </div>) : ''
  );
}

export default RedirectAlias;