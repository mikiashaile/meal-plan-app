import { useState } from "react";

const initialMeals = [
  { id: 1, description: "Scrumbled Eggs", type: "Breakfast", consumed: false },
  { id: 2, description: "Chips", type: "Snack", consumed: false },
];

const mealTypes = ["Breakfast", "Lunch", "Snack", "Dinner"];

function App() {
  const [meals, setMeals] = useState(initialMeals);

  function handleAddMeal(meal) {
    setMeals((meals) => [...meals, meal]);
  }

  function handleDeletMeal(id) {
    setMeals((meals) => meals.filter((meal) => meal.id !== id));
  }

  function handleMealConsumed(id) {
    setMeals((meals) =>
      meals.map((meal) =>
        meal.id === id ? { ...meal, consumed: !meal.consumed } : meal
      )
    );
  }

  function handleClearMeals() {
    const confirm = window.confirm(
      "Are you sure you want to remove all means?"
    );
    if (confirm) setMeals([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddMeal={handleAddMeal} setMeals={setMeals} />
      <MealList
        meals={meals}
        onDeleteMeal={handleDeletMeal}
        onToggleConsumed={handleMealConsumed}
        onClearMeals={handleClearMeals}
      />
      <Stats meals={meals} />
    </div>
  );
}

function Logo() {
  return <h1>🫔 Meal Plan 🍱</h1>;
}

function Form({ onAddMeal }) {
  const [mealDesc, setMealDesc] = useState("");
  const [mealType, setMealType] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!mealDesc || !mealType) return;

    const newMeal = {
      description: mealDesc,
      type: mealType,
      id: Date.now(),
      consumed: false,
    };
    onAddMeal(newMeal);
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

function MealList({ meals, onDeleteMeal, onToggleConsumed, onClearMeals }) {
  const [sortBy, setSortBy] = useState("");
  let sortedMeals;

  if (!sortBy) sortedMeals = meals;
  if (sortBy === "description")
    sortedMeals = meals
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "type")
    sortedMeals = meals.slice().sort((a, b) => a.type.localeCompare(b.type));
  if (sortBy === "consumed")
    sortedMeals = meals
      .slice()
      .sort((a, b) => Number(a.consumed) - Number(b.consumed));

  return (
    <div className="list">
      <ul>
        {sortedMeals.map((meal) => (
          <Meal
            meal={meal}
            key={meal.id}
            onDeleteMeal={onDeleteMeal}
            onToggleConsumed={onToggleConsumed}
          />
        ))}
      </ul>
      <div className="action">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort Input</option>
          <option value="description">Sort by Meal description</option>
          <option value="type">Sort by Meal type</option>
          <option value="consumed">Sort by Consumed Status</option>
          <option></option>
        </select>
        <button onClick={onClearMeals}>Clear Meals</button>
      </div>
    </div>
  );
}

function Meal({ meal, onDeleteMeal, onToggleConsumed }) {
  return (
    <li>
      <input
        type="checkbox"
        value={meal.consumed}
        onChange={() => onToggleConsumed(meal.id)}
      />
      <span style={meal.consumed ? { textDecoration: "line-through" } : {}}>
        {meal.type}: {meal.description}
      </span>
      <button onClick={() => onDeleteMeal(meal.id)}>❌</button>
    </li>
  );
}

function Stats({ meals }) {
  const totalMeals = meals.length;
  const consumedMeals = meals.filter((meal) => meal.consumed).length;
  const consumedByPercent = Math.round((consumedMeals / totalMeals) * 100);
  return (
    <em>
      <footer className="stats">
        {consumedByPercent === 100
          ? "You have consumed all your meals for the day 🫄🏽"
          : ` You have added ${totalMeals} meals for the day. You have already consumed
        ${consumedMeals} (${consumedByPercent}%) of them`}
      </footer>
    </em>
  );
}

export default App;
