import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { ENDPOINTS } from '../../../config';

function RedirectAlias() {
  const { alias } = useParams();
  const endpointRedirect = ENDPOINTS.REDIRECTURL

  useEffect(() => {
    const redirectToOriginalUrl = async () => {
      try {
        const response = await fetch(`${endpointRedirect}/${alias}`, {
          method: "GET",
        });

        const json = await response.json();

        if (json.success) {
            console.log(json.data)
            window.location.href = json.data
        } else if (!json.ok) {
          if (response.status === 404) {
            toast.error('URL not Found');
          } else {
            toast.error('Something went wrong!');
          }
        }
      } catch (err) {
        toast.error('Something went wrong... try again!');
      }
    };

    redirectToOriginalUrl();
  }, [alias]);

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
}

export default RedirectAlias;