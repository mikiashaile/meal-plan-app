export default function Meal({ meal, onDeleteMeal, onToggleConsumed }) {
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
