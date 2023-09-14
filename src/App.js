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
      <MealList mealList={meals} setMeals={setMeals} />
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
    if (!mealDesc || !mealType) return;

    const newMeal = { description: mealDesc, type: mealType, id: Date.now() };

    setMeals([...mealList, newMeal]);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you want to eat today</h3>
      <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
        {/* to create options from 1 to 20 */}
        {/* {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))} */}
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

function MealList({ mealList, setMeals }) {
  return (
    <div className="list">
      <ul>
        {mealList.map((meal) => (
          <Meal
            meal={meal}
            key={meal.id}
            mealList={mealList}
            setMeals={setMeals}
          />
        ))}
      </ul>
    </div>
  );
}

function Meal({ meal, mealList, setMeals }) {
  function handleDelete() {
    const updatedMeals = mealList.filter((m) => m.id !== meal.id);
    setMeals(updatedMeals);
  }
  return (
    <li>
      <span style={meal.eaten ? { textDecoration: "line-through" } : {}}>
        {meal.type}: {meal.description}
      </span>
      <button onClick={handleDelete}>❌</button>
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
