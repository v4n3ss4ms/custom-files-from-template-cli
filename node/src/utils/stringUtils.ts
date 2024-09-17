export function toKebabCase(str: string): string {
  return str
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Replace spaces and special characters with '-'
      .replace(/^-+|-+$/g, ''); // Remove dashes at the beginning or at the end
}

export function toCamelCase(str: string): string {
  return str
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase()) // Convert to camelCase
      .replace(/^(.)/, (_, chr) => chr.toLowerCase()); // Ensure the first letter is lowercase
}

export function toPascalCase(str: string): string {
  return str
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase()) // Convert to CamelCase
      .replace(/^(.)/, (_, chr) => chr.toUpperCase()); // Ensure the first letter is uppercase
}

export function toSnakeCase(str: string): string {
  return str
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_') // Replace spaces and special characters with '_'
      .replace(/^_+|_+$/g, ''); // Remove underscores from the beginning or end
}
