import React, { createContext, useContext, useEffect, useReducer, useRef, useState } from "react";

const HOST_API = "http://localhost:8080/api"
const initialState = {
  list: [],
  item: {}
}
const Store = createContext(initialState);

const Form = () => {

  //Hooks
  const formRef = useRef(null);
  const { dispatch, state: { item } } = useContext(Store);
  const [state, setState] = useState(item);

  //Función para agregar un dato
  const onAdd = (event) => {
    event.preventDefault();

    const request = {
      name: state.name,
      id: null,
      isCompleted: false
    };

    fetch(HOST_API + "/todo", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then((todo) => {
        dispatch({ type: "add-item", item: todo })
        setState({ name: "" });
        formRef.current.reset();
      })
  }

  //Función para editar un dato
  const onEdit = (event) => {
    event.preventDefault();

    const request = {
      name: state.name,
      id: item.id,
      isCompleted: item.isCompleted
    };

    fetch(HOST_API + "/todo", {
      method: "PUT",
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then((todo) => {
        dispatch({ type: "update-item", item: todo })
        setState({ name: "" });
        formRef.current.reset();
      })
  }

  //Formulario para recibir los datos, sirve para agregar y actualizar
  return (
    <form ref={formRef}>
      <input
        type="text" name="name" defaultValue={item.name} onChange={(event) => {
          setState({ ...state, name: event.target.value })
        }}
      />
      {
        item.id &&
        <button onClick={onEdit}>Actualizar</button>
      }
      {
        !item.id &&
        <button onClick={onAdd}>Agregar</button>
      }
    </form>
  );
}

const List = () => {
  const { dispatch, state } = useContext(Store);

  //Se usa el Hook Effect para mostrar todos los datos
  useEffect(() => {
    fetch(HOST_API + "/todos")
      .then(response => response.json())
      .then((list) => {
        dispatch({ type: "update-list", list })
      })
  }, [state.list.length, dispatch])

  //Función para eliminar un dato
  const onDelete = (id) => {
    fetch(HOST_API + "/" +id+ "/todo", {
      method: "DELETE"
    })
    .then(() => {
      dispatch({ type: "delete-item", id })
    })
  };

  //Función para mostrar los datos en el formulario que serán editados
  const onEdit = (todo) => {
    dispatch({ type: "edit-item", item: todo })
  };

  //Estructura para mostrar los datos
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Nombre</td>
            <td>¿Está completado?</td>
          </tr>
        </thead>
        <tbody>
          {
            state.list.map((todo) => {
              return (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.name}</td>
                  <td>{todo.isCompleted === true ? "SI" : "NO"}</td>
                  <td><button onClick={() => onEdit(todo)}>Editar</button></td>
                  <td><button onClick={() => onDelete(todo.id)}>Eliminar</button></td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}

//Función para recorrer el array dependiendo de la acción para realizar (Agregar, Actualizar, Eliminar)
function reducer(state, action) {
  switch (action.type) {
    case 'update-item':
      const listUpdateEdit = state.list.map((item) => {
        if (item.id === action.item.id) {
          return action.item;
        }
        return item;
      });
      return { ...state, list: listUpdateEdit, item: {} }
    case 'delete-item':
      const listUpdate = state.list.filter((item) => {
        return item.id !== action.id;
      });
      return { ...state, list: listUpdate }
    case 'update-list':
      return { ...state, list: action.list }
    case 'edit-item':
      return { ...state, item: action.item }
    case 'add-item':
      const newList = state.list;
      newList.push(action.item);
      return { ...state, list: newList }
    default:
      return state;
  }
}

//Componente para evitar el uso de props, para usar los datos más globales
const StoreProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Store.Provider
      value={{ state, dispatch }}
    >
      {children}
    </Store.Provider>
  );
}

//Función principal que llama cada componente para visualizarlo en la página
function App() {
  return (
    <StoreProvider>
      <Form />
      <List />
    </StoreProvider>
  );
}

export default App;
