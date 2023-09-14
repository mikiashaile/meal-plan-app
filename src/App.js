import { useState } from "react";

const initialMeals = [
  { id: 1, description: "Scrumbled Eggs", type: "breakfast", eaten: true },
  { id: 2, description: "Orange Juice", type: "breakfast", packed: false },
  { id: 3, description: "Coffee", type: "breakfast", packed: false },
];

const mealTypes = ["Breakfast", "Lunch", "Snack", "Dinner"];

function App() {
  const [meals, setMeals] = useState(initialMeals);
  return (
    <div className="app">
      <Logo />
      <Form mealList={meals} setMeals={setMeals} />
      <MealList mealList={meals} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🫔 Meal Plan 🍱</h1>;
}

function Form({ mealList, setMeals }) {
  const [mealDesc, setMealDesc] = useState("");
  const [mealType, setMealType] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newMeal = { description: mealDesc, type: mealType, id: Date.now() };

    setMeals([...mealList, newMeal]);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you want to eat today</h3>
      <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
        <option value="" label="Select meal type"></option>
        {mealTypes.map((type, index) => (
          <option value={type} label={type} key={index}></option>
        ))}
      </select>
      <input
        type="text"
        placeholder="meal description"
        value={mealDesc}
        onChange={(e) => setMealDesc(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function MealList({ mealList }) {
  return (
    <div className="list">
      <ul>
        {mealList.map((meal) => (
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
