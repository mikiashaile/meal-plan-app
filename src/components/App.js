import { useState } from "react";
import Form from "./Form";
import MealList from "./Meals";
import Stats from "./Stats";

const initialMeals = [
  { id: 1, description: "Scrumbled Eggs", type: "Breakfast", consumed: false },
  { id: 2, description: "Chips", type: "Snack", consumed: false },
];

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

export default App;
