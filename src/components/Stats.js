export default function Stats({ meals }) {
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
