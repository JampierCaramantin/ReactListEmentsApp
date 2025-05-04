import { useState } from "react";
import "./App.css";

interface Item {
  id: `${string}-${string}-${string}-${string}-${string}`;
  timestamp: number;
  texto: string;
}

const INITIAL_ITEMS: Item[] = [
  { id: crypto.randomUUID(), timestamp: Date.now(), texto: "videojuegos 🎮" },
  { id: crypto.randomUUID(), timestamp: Date.now(), texto: "programacion 👨‍💻" },
  { id: crypto.randomUUID(), timestamp: Date.now(), texto: "musica 🎶" },
];

function App() {
  const [items, setItems] = useState(INITIAL_ITEMS);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { elements } = event.currentTarget;
    const input = elements.namedItem("item");
    const isInput = input instanceof HTMLInputElement;
    if (!isInput || input == null) return;

    const newItem: Item = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      texto: input.value,
    };

    setItems((prevItems) => {
      return [...prevItems, newItem];
    });
    input.value = "";
  };

  const createHandleRemoveItem = (id: Item["id"]) => () => {
    setItems((prevItems) => {
      return prevItems.filter((currentItem) => currentItem.id !== id);
    });
  };

  return (
    <main>
      <aside>
        <h1>App agregar elemenetos a lista. 📝</h1>
        <h2>En esta app se puede agregar y eliminar elementos que tenemos en la lista.</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="">
            Elemento a introducir
            <input
              name="item"
              required
              placeholder="Escribe aqui el elemento..."
              autoComplete="off"
              autoFocus
              type="text"
            />
          </label>
          <button>Añadir elemento</button>
        </form>
      </aside>

      <section>
        <h2>Lista de elementos</h2>
        {items.length === 0 ? (
          <p>No hay elementos en la lista, crea tu lista 🚀</p>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.texto}
                <button onClick={createHandleRemoveItem(item.id)} className="btdelete">🗑️</button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
