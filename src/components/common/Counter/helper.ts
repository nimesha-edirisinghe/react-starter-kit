export const getCountMessage = (count: number) => {
  if (count === 0) return 'Start counting!';
  if (count < 0) return 'Going negative!';
  if (count <= 10) return 'Getting started';
  if (count <= 50) return 'Nice progress!';
  if (count <= 100) return "You're on fire!";
  return 'Counter master!';
};
