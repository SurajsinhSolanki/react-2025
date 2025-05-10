/**
 * Checks if a string is valid JSON.
 *
 * @param {string} value - The string to validate as JSON.
 * @returns {boolean} Returns true if the value is valid JSON, false otherwise.
 */
export function isValidJSON(value) {
    try {
        JSON.parse(value);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Attempts to safely parse a JSON string.
 *
 * @param {string} value - The string to parse as JSON.
 * @returns {any|null} The parsed object if valid JSON, otherwise null.
 */
export function safeParseJSON(value) {
    try {
        return JSON.parse(value);
    } catch (e) {
        return null;
    }
}

/**
 * Safely parses a string into a value of the specified type using the provided parser.
 *
 * @template T
 * @param {string} value - The input string to parse.
 * @param {(input: string) => T} parser - A parsing function that converts the string to the expected type.
 * @returns {T|null} The parsed value if successful, otherwise null.
 *
 * @example
 * // Parse a number from a string:
 * safeParse("123", Number); // returns 123
 * @example
 * // Parse JSON from a string:
 * safeParse('{"a":1}', JSON.parse); // returns { a: 1 }
 */
export function safeParse(value, parser) {
    try {
        return parser(value);
    } catch (e) {
        return null;
    }
}