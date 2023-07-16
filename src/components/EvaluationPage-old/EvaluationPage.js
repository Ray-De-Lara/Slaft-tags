import React, { useEffect, useState } from 'react';
import axios from 'axios';
import loading from '../../assets/images/pageload-spinner.gif';
import './EvaluationPage.css';
import '../Item/Item.css';
import '../Item/ItemList'

function EvaluationPage({ onApplyTagsToItems, onAddTagsToItems }) {
  const [items, setItems] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedTagsForItems, setSelectedTagsForItems] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showTags, setShowTags] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.post(
          'https://slaft.retailmkt.mx/SLMKT01/slaft_app/SlaftCamp_ws/obtenerObjetosTags_byColeccion.php',
          { coleccion: 'coleccion1' }
        );
        const newItems = response.data.map((obj) => ({
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
          tags: [],
        }));

        setItems((prevItems) => {
          const filteredItems = prevItems.filter((item) => !newItems.some((newItem) => newItem.id === item.id));
          return [...filteredItems, ...newItems];
        });
      } catch (error) {
        console.error('Error al realizar la solicitud POST', error);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.post(
          'https://slaft.retailmkt.mx/SLMKT01/slaft_app/SlaftCamp_ws/obtener_tags.php'
        );
        setTags(response.data);
      } catch (error) {
        console.error('Error al realizar la solicitud POST para obtener los tags', error);
      }
    };

    fetchTags();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(delay);
  }, []);

  const handleItemSelection = (itemId, isChecked) => {
    if (isChecked) {
      setSelectedItems((prevSelectedItems) => {
        const selectedItem = items.find((item) => item.id === itemId);
        const updatedItems = [...prevSelectedItems, selectedItem];
        return updatedItems;
      });
    } else {
      setSelectedItems((prevSelectedItems) => {
        const updatedItems = prevSelectedItems.filter((item) => item.id !== itemId);
        return updatedItems;
      });
    }
  };

  const handleApplyTagsToItems = () => {
    setSelectedItems((prevSelectedItems) => {
      const updatedItems = prevSelectedItems.map((item) => {
        const isSelected = selectedItems.some((selectedItem) => selectedItem.id === item.id);
        if (isSelected) {
          const selectedTagsForItem = selectedTagsForItems.find((tagItem) => tagItem.itemId === item.id);
          const tagsToAdd = selectedTagsForItem ? selectedTagsForItem.tags : [];
          return { ...item, tags: [...item.tags, ...tagsToAdd] };
        }
        return item;
      });
  
      onApplyTagsToItems(updatedItems);
      setSelectedItems([]);
      setSelectedTagsForItems([]);
    });
  };
  
  const handleAddTagsToItems = () => {
    setSelectedItems((prevSelectedItems) => {
      const updatedItems = prevSelectedItems.map((item) => {
        const isSelected = selectedItems.some((selectedItem) => selectedItem.id === item.id);
        if (isSelected) {
          const selectedTagsForItem = selectedTagsForItems.find((tagItem) => tagItem.itemId === item.id);
          const tagsToAdd = selectedTagsForItem ? selectedTagsForItem.tags : [];
          return { ...item, tags: [...item.tags, ...tagsToAdd] };
        }
        return item;
      });
  
      onAddTagsToItems(updatedItems);
      setSelectedItems([]);
      setSelectedTagsForItems([]);
    });
  };
  
          const handleTagSelection = (tagId, isChecked) => {
            if (isChecked) {
              setSelectedTags((prevSelectedTags) => {
                const selectedTag = tags.find((tag) => tag.id === tagId);
                const updatedTags = [...prevSelectedTags, selectedTag];
                return updatedTags;
              });
            } else {
              setSelectedTags((prevSelectedTags) => {
                const updatedTags = prevSelectedTags.filter((tag) => tag.id !== tagId);
                return updatedTags;
              });
            }
          };
        
          const handleTagApply = () => {
            setSelectedTagsForItems((prevSelectedTagsForItems) => {
              const selectedTagsForItem = {
                itemId: selectedItems[0].id,
                tags: selectedTags,
              };
        
              const updatedSelectedTagsForItems = prevSelectedTagsForItems.filter(
                (tagItem) => tagItem.itemId !== selectedItems[0].id
              );
              return [...updatedSelectedTagsForItems, selectedTagsForItem];
            });
        
            setSelectedTags([]);
            setShowTags(false);
          };
        
          return (
            <div>
              {isLoading ? (
                <div className="loading-container">
                  <img src={loading} alt="Loading" />
                </div>
              ) : (
                <div>
                    {items.map((item) => {
                      console.log(item)
                      return(
                  <div className="item card card-style">
                    <div className='div-title'>
                      <p className='item-key'>{item.clave_obj}</p>
                    </div>
                      <div key={item.id} className="item">
                        <input
                          type="checkbox"
                          checked={selectedItems.some((selectedItem) => selectedItem.id === item.id)}
                          onChange={(e) => handleItemSelection(item.id, e.target.checked)}
                        />
                        <img src={item.foto} alt={item.nombre_obj} />
                        <div className="item-details">
                          <span>{item.nombre_obj}</span>
                          <span>{item.codigo}</span>
                        </div>
                      </div>
                  </div>
                      );
                    })}
                  <div className="button-container">
                    <button onClick={handleApplyTagsToItems} disabled={selectedItems.length === 0}>
                      Apply Tags
                    </button>
                    <button onClick={() => setShowTags(true)} disabled={selectedItems.length !== 1}>
                      Add Tags
                    </button>
                  </div>
                  {showTags && (
                    <div className="tag-container">
                      {tags.map((tag) => (
                        <div key={tag.id} className="tag">
                          <input
                            type="checkbox"
                            checked={selectedTags.some((selectedTag) => selectedTag.id === tag.id)}
                            onChange={(e) => handleTagSelection(tag.id, e.target.checked)}
                          />
                          <span>{tag.nombre}</span>
                        </div>
                      ))}
                      <div className="tag-button-container">
                        <button onClick={handleTagApply} disabled={selectedTags.length === 0}>
                          Apply Tags
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        };
        
        export default EvaluationPage;


        // codigo ok
        // return (
        //   <div>
        //     <div className="tag-actions">
        //       <div className="apply-selected-section">
        //         <div className="apply-selected-text" onClick={handleApplySelectedTags}>
        //           Aplicar a objetos seleccionados
        //         </div>
        //       </div>
        //       <div className="select-all-section">
        //         <div className="select-all-text">Seleccionar todos</div>
        //       </div>
        //     </div>
      
      
        //     <div className='item-container'>
        //     {data.map((item, index) => (
                
        //         <div key={index} className="item">
        //         <div className="card-header">
        //           <input
        //             type="checkbox"
        //             checked={selectedItems.map((selectedItem) => selectedItem.id).includes(item.id)}
        //             onChange={() => handleSelectItem(item)}
        //             />
        //             <img src={item.foto} alt={item.nombre_obj} />
        //             <div className="item-details">
        //                         <span>{item.nombre_obj}</span>
        //                         <span>{item.codigo}</span>
        //                       </div>
        //           {/* {item.endpoint} */}
        //         </div>
        //         {/* <div className="card-body">
        //           <pre>{JSON.stringify(item.data, null, 2)}</pre>
        //         </div> */}
        //       </div>
        //     ))}
        //     </div>
        //     {/* {selectedItems.length > 0 && (
        //       <div>
        //         <h3>Objetos seleccionados:</h3>
        //         <pre>{JSON.stringify(selectedItems, null, 2)}</pre>
        //       </div>
        //     )} */}
        //   </div>
        // );