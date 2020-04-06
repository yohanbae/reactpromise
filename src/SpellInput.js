import React from "react";
import firebase from './base';

export const SpellInput = ({ spell }) => {
  const [name, setName] = React.useState(spell.text);

  const onUpdate = () => {
    const db = firebase.firestore()
    db.collection('messages').doc(spell.id).set({...spell, text:name})
  }

  const onDelete = () => {
    const db = firebase.firestore()
    db.collection('messages').doc(spell.id).delete()
  }

  return (
    <>
      <input
        value={name}
        onChange={e => {
          setName(e.target.value);
        }}
      />
      <button onClick={onUpdate}>Update</button>
      <button onClick={onDelete}>Delete</button>
    </>
  );
};