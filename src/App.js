import { useState } from "react";
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: false },
];

export default function App() {
  const [items, setItems] = useState(initialItems);
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
    console.log(items);
  }
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((items) =>
        items.id === id ? { ...items, packed: !items.packed } : items
      )
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats numItems={numItems} numPacked={numPacked} />
    </div>
  );
}
function Logo() {
  return <h1>🏝️ Pack n Travel 🎒</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("TEST");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault(); //prevents reload

    if (!description) return;

    const newItem = {
      description,
      quantity,
      packed: false,
      id: new Date(Date.now()),
    };
    console.log(newItem);

    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select
        value={quantity}
        onChange={(e) => {
          setQuantity(e.target.value);
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {" "}
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Items.."
        value={description}
        onChange={(e) => {
          console.log(e.target.value);
          setDescription(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((items) => (
          <Item
            items={items}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={items.id}
          />
        ))}
      </ul>
    </div>
  );
}
function Item({ items, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={items.packed}
        onChange={() => {
          onToggleItem(items.id);
        }}
      />
      <span style={items.packed ? { textDecoration: "Line-through" } : {}}>
        {items.quantity} {items.description}
      </span>
      <button onClick={() => onDeleteItem(items.id)}>❌</button>
    </li>
  );
}
function Stats({ numItems, numPacked }) {
  const percentage =
    numItems > 0 ? Math.round((numPacked / numItems) * 100) : 0;

  return (
    <footer className="stats">
      {numItems === 0 ? (
        <p>Start Packing Your Bags.</p>
      ) : percentage === 100 ? (
        <p>You got everything packed!!</p>
      ) : (
        <p>
          You have packed {numPacked} items on your list, and you have already
          packed {percentage}%.
        </p>
      )}
    </footer>
  );
}
