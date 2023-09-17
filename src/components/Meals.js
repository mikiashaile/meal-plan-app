import { useState } from "react";
import Meal from "./Meal";

export default function MealList({
  meals,
  onDeleteMeal,
  onToggleConsumed,
  onClearMeals,
}) {
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
