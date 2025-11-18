export function generatePrefix(name: string): string {
  return name
    .split(" ")
    .map((part: string) => part[0])
    .join("")
    .toUpperCase();
}
