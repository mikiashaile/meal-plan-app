const initialMeals = [
  { id: 1, description: "Scrumbled Eggs", type: "breakfast", eaten: true },
  { id: 2, description: "Orange Juice", type: "breakfast", packed: false },
  { id: 3, description: "Coffee", type: "breakfast", packed: false },
];

const mealTypes = ["Breakfast", "Lunch", "Snack", "Dinner"];

function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <MealList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🫔 Meal Plan 🍱</h1>;
}

function Form() {
  return (
    <form className="add-form">
      <h3>What do you want to eat today</h3>
      <select>
        <option value={null} label="Select meal type"></option>
        {mealTypes.map((type, index) => (
          <option value={type} label={type} key={index}></option>
        ))}
      </select>
      <input type="text" placeholder="meal description" />
      <button>Add</button>
    </form>
  );
}

function MealList() {
  return (
    <div className="list">
      <ul>
        {initialMeals.map((meal) => (
          <Meal meal={meal} key={meal.id} />
        ))}
      </ul>
    </div>
  );
}

function Meal({ meal }) {
  return (
    <li>
      <span style={meal.eaten ? { textDecoration: "line-through" } : {}}>
        {meal.type}: {meal.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <em>
      <footer className="stats">You have icluded x meals for the day</footer>
    </em>
  );
}

export default App;
