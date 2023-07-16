import React, { useEffect, useState } from 'react';
import './EvaluationTable.css';
import ItemList from '../Item/ItemList';
import axios from 'axios';

const EvaluationTable = () => {
  const [items, setItems] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios
      .post('https://slaft.retailmkt.mx/SLMKT01/slaft_app/SlaftCamp_ws/obtenerObjetosTags_byColeccion.php', { coleccion: 'coleccion1' })
      .then(response => {
        const newItems = response.data.map(obj => ({
          id: obj.id,
          codigo: obj.codigo,
          ancho: obj.ancho,
          alto: obj.alto,
          fondo: obj.fondo,
          rank: obj.rank,
          area: obj.area,
          no_cont: obj.no_cont,
          no_obj: obj.no_obj,
          nombre_obj: obj.nombre_obj,
          clave_obj: obj.clave_obj,
          foto: obj.foto,
          tags: obj.tags,
        }));

        setItems(prevItems => {
          const filteredItems = prevItems.filter(item => !newItems.some(newItem => newItem.id === item.id));
          return [...filteredItems, ...newItems];
        });
      })
      .catch(error => {
        console.error('Error al realizar la solicitud POST', error);
      });
  }, []);

  useEffect(() => {
    axios
      .post('https://slaft.retailmkt.mx/SLMKT01/slaft_app/SlaftCamp_ws/obtener_tags.php')
      .then(response => {
        setTags(response.data);
      })
      .catch(error => {
        console.error('Error al realizar la solicitud POST para obtener los tags', error);
      });
  }, []);

  return (
    <table className="evaluation-table">
      <thead>
        <tr>
          <th>Foto</th>
          <th>Tienda</th>
          <th>Contenedor</th>
          <th>Objeto</th>
          <th>Clave</th>
          <th>Etiquetas</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <ItemList
            id={item.id}
            codigo={item.codigo}
            rank={item.rank}
            area={item.area}
            no_cont={item.no_cont}
            no_obj={item.no_obj}
            nombre_obj={item.nombre_obj}
            clave_obj={item.clave_obj}
            foto={item.foto}
            key={item.id}
            ancho={item.ancho}
            alto={item.alto}
            fondo={item.fondo}
            tags={tags}
          />
        ))}
      </tbody>
    </table>
  );
};

export default EvaluationTable;
