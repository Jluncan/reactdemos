
const { useState } = React;

function FruitListItem(props) {
  return (
    <li>
      {props.fruit.name} | <button onClick ={props.onRemove}>Delete</button>
    </li>
  );
}
//data
function FruitList() {
  const [fruits, setFruits] = useState([
    { id: 1, name: "apple" },
    { id: 2, name: "orange" },
    { id: 3, name: "blueberry" },
    { id: 4, name: "banana" },
    { id: 5, name: "kiwi" },
  ]);
  //function/event handlers
  function removeFruit(fruit) {
    let updatedFruits = fruits.filter((f) => f.id !== fruit.id);
    setFruits(updatedFruits);
  }
  //html
  return (
    <ul>
      {fruits.map((fruit) => (
        <FruitListItem key={fruit.id} fruit={fruit} onRemove={() => removeFruit(fruit)} /> // if you need yo wrap a function in a function use () and then => such as onRemove={() =>removeFruit(fruit)} />
      ))}
    </ul>
  );
}

function App() {
  return <FruitList />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
