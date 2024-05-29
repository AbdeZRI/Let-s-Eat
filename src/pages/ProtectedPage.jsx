import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedPage = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulazione di un'API call per ottenere i dati dell'utente autenticato
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/user', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Invia il token di accesso nell'intestazione Authorization
          },
        });
        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);
        } else {
          // Se la richiesta non è autorizzata, reindirizza alla pagina di login
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    // Rimuovi il token dal localStorage per effettuare il logout
    localStorage.removeItem('token');
    // Reindirizza alla pagina di login
    navigate('/login');
  };

  return (
    <div>
      <h2>Welcome, {userData && userData.name}!</h2>
      {userData && (
        <div>
          <p>Email: {userData.email}</p>
          {/* Aggiungi altri dettagli dell'utente, come il ruolo, l'immagine del profilo, ecc. */}
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProtectedPage;
