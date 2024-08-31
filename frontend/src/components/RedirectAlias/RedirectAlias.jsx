import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { ENDPOINTS } from '../../../config';
import { useNavigate } from 'react-router-dom'

function RedirectAlias() {
  const { alias } = useParams();
  const endpointRedirect = ENDPOINTS.REDIRECTURL
  const navigate = useNavigate()

    const redirectToOriginalUrl = async () => {
      try {
        const response = await fetch(`${endpointRedirect}/${alias}`, {
          method: "GET",
          credentials: "include"
        });

        const json = await response.json();

        if (!response.ok) {
          if (response.status === 404) {
            toast.error('URL not found')
            navigate('/')
          } else {
            toast.error('Something went wrong!')
          }
        }

        if (json.success) {
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
    <div>
      <p>Redirecting...</p>
    </div>
  );
}

export default RedirectAlias;