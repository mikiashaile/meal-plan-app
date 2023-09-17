import { useState } from "react";

const mealTypes = ["Breakfast", "Lunch", "Snack", "Dinner"];

export default function Form({ onAddMeal }) {
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
