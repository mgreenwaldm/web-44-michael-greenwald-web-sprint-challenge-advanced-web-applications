import React, { useEffect, useState } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import fetchColorService from '../services/fetchColorService';

import {api} from '../helpers/axiosWithAuth';

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(()=>{
    loadColors();
  }, []);

  const loadColors = async () => {
    const result = await fetchColorService();
    setColors(result);
  }

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = async (editColor) => {
    await api.put(`http://localhost:5000/api/colors/${editColor.id}`, editColor);
    await loadColors();
  };

  const deleteColor = async (colorToDelete) => {
    await api.delete(`http://localhost:5000/api/colors/${colorToDelete.id}`);
    await loadColors();
  };

  return (
    <div className="container">
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
      <Bubbles colors={colors}/>
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete toggleEdit, saveEdit, deleteColor and functions
