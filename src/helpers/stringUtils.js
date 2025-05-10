// src/utils/stringUtils.js

/**
 * Capitalizes the first letter of a string.
 * @param {string} str - The input string.
 * @returns {string} The formatted string with the first letter capitalized.
 */
export function capitalizeFirstLetter(str) {
    if (!str || typeof str !== "string") return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Trims spaces from both ends of the string.
 * @param {string} str - The input string.
 * @returns {string} The trimmed string.
 */
export function trimSpaces(str) {
    return str.trim();
}

/**
 * Converts a string to lowercase.
 * @param {string} str - The input string.
 * @returns {string} The string converted to lowercase.
 */
export function toLowerCase(str) {
    return str.toLowerCase();
}

/**
 * Converts a string to uppercase.
 * @param {string} str - The input string.
 * @returns {string} The string converted to uppercase.
 */
export function toUpperCase(str) {
    return str.toUpperCase();
}

/**
 * Replaces spaces with underscores in a string.
 * @param {string} str - The input string.
 * @returns {string} The formatted string.
 */
export function replaceSpacesWithUnderscores(str) {
    return str.replace(/\s+/g, "_");
}

/**
 * Converts a string into a slug (lowercase, spaces replaced with dashes).
 * Useful for URLs or SEO-friendly strings.
 * @param {string} str - The input string.
 * @returns {string} The slugified string.
 */
export function slugify(str) {
    return str
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")         // Replace spaces with dashes
        .replace(/[^\w-]+/g, "")      // Remove non-alphanumeric characters
        .replace(/--+/g, "-");        // Replace multiple dashes with a single one
}

/**
 * Checks if a string is a valid email.
 * @param {string} str - The input string.
 * @returns {boolean} True if valid email, otherwise false.
 */
export function isValidEmail(str) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(str);
}

/**
 * Checks if a string is a valid phone number (simple validation).
 * @param {string} str - The input string.
 * @returns {boolean} True if valid phone number, otherwise false.
 */
export function isValidPhoneNumber(str) {
    const phonePattern = /^[0-9]{10}$/; // Simple validation for a 10-digit phone number
    return phonePattern.test(str);
}

/**
 * Checks if the string is empty or contains only spaces.
 * @param {string} str - The input string.
 * @returns {boolean} True if the string is empty or contains only spaces, otherwise false.
 */
export function isEmptyOrWhitespace(str) {
    return !str || /^\s*$/.test(str);
}

/**
 * Converts a string into a title case (each word capitalized).
 * @param {string} str - The input string.
 * @returns {string} The string in title case.
 */
export function toTitleCase(str) {
    return str
        .toLowerCase()
        .replace(/\b(\w)/g, (match) => match.toUpperCase());
}

/**
 * Checks if a string contains only alphabetic characters (a-z, A-Z).
 * @param {string} str - The input string.
 * @returns {boolean} True if the string contains only alphabetic characters, otherwise false.
 */
export function isAlphabetic(str) {
    const alphabetPattern = /^[A-Za-z]+$/;
    return alphabetPattern.test(str);
}

/**
 * Checks if a string contains only alphanumeric characters (a-z, A-Z, 0-9).
 * @param {string} str - The input string.
 * @returns {boolean} True if the string contains only alphanumeric characters, otherwise false.
 */
export function isAlphanumeric(str) {
    const alphanumericPattern = /^[A-Za-z0-9]+$/;
    return alphanumericPattern.test(str);
}

/**
 * Converts a string from camelCase to snake_case.
 * @param {string} str - The input string.
 * @returns {string} The string in snake_case.
 */
export function camelToSnake(str) {
    return str.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
}

/**
 * Converts a string from snake_case to camelCase.
 * @param {string} str - The input string.
 * @returns {string} The string in camelCase.
 */
export function snakeToCamel(str) {
    return str.replace(/_([a-z])/g, (match, p1) => p1.toUpperCase());
}

/**
 * Sanitizes a file name by:
 * - Replacing spaces with underscores
 * - Removing all non-alphanumeric characters except underscores
 * @param {string} str - The input file name string.
 * @returns {string} The sanitized file name.
 */
export function sanitizeFileName(str) {
    return str
        .replace(/\s+/g, '_') // Replace spaces with underscores
        .replace(/[^a-zA-Z0-9_]/g, ''); // Remove everything except alphanumerics and underscores
}
