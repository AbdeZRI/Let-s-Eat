import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddMenuItemForm = ({ onAdd }) => {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Creazione dell'oggetto item con i dati inseriti nel form
    const newItem = {
      nom: itemName,
      categorie: category,
      prix_ht: price
    };
    // Chiamata alla funzione onAdd passando il nuovo oggetto item
    onAdd(newItem);
    // Reset dei campi del form
    setItemName('');
    setCategory('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome del piatto"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Categoria"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="number"
        placeholder="Prezzo"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit">Aggiungi</button>
    </form>
  );
};

AddMenuItemForm.propTypes = {
  onAdd: PropTypes.func.isRequired // Validazione della prop onAdd
};

export default AddMenuItemForm;
