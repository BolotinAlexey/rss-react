export default function checkPassword(
  password: string,
  setDeg: (number: number) => void
) {
  if (!password || password.includes(' ')) {
    setDeg(0);
    return;
  }
  let matchCount = ['[A-Z]', '[a-z]', '\\d', '[@$!%*?&#]'].filter((pattern) =>
    new RegExp(pattern).test(password)
  ).length;
  if (password.length > 7) matchCount += 1;
  setDeg(matchCount);
}
