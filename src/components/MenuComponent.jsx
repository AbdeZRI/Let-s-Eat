import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; // Importa PropTypes

const MenuComponent = ({ newMenuItem }) => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetchMenuItems();
  }, [newMenuItem]); // Aggiorna quando viene aggiunto un nuovo elemento

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/menu-items');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.error('Error fetching menu items:', error.message);
    }
  };
  

  return (
    <div>
      <h2>Menu</h2>
      <ul>
        {menuItems.map(item => (
          <li key={item.id}>
            {item.nom} - {item.categorie} - {item.prix_ht}
          </li>
        ))}
      </ul>
      <Link to="/menu-items/add">Aggiungi nuovo elemento al menu</Link>
    </div>
  );
};

// Aggiungi la validazione delle props utilizzando PropTypes
MenuComponent.propTypes = {
  newMenuItem: PropTypes.object // Aggiungi il tipo di prop (puoi aggiustare il tipo in base alle tue esigenze)
};

export default MenuComponent;
