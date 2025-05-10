/**
 * @typedef {'local' | 'session'} StorageType
 * Type alias for specifying whether to use localStorage or sessionStorage.
 */

// Optional: Define a prefix for keys to avoid conflicts, especially in larger applications.
// Set to '' if no prefix is desired.
const STORAGE_PREFIX = 'my_app_';

/**
 * Gets the appropriate storage object (localStorage or sessionStorage) based on type.
 * @param {StorageType} type - The type of storage to use ('local' or 'session').
 * @returns {Storage} The Storage object.
 * @throws {Error} If an invalid storage type is provided.
 */
function getStorage(type) {
    if (type === 'local') {
        return localStorage;
    } else if (type === 'session') {
        return sessionStorage;
    } else {
        throw new Error(`Invalid storage type provided: ${type}. Use 'local' or 'session'.`);
    }
}

/**
 * Stores a key-value pair in either localStorage or sessionStorage.
 * Automatically stringifies non-string values (objects, arrays, numbers, booleans).
 * Includes basic error handling.
 *
 * @param {StorageType} type - The type of storage to use ('local' or 'session').
 * @param {string} key - The key under which to store the value.
 * @param {*} value - The value to store. Can be any serializable data type.
 *
 * @example
 * // Store a string in localStorage
 * storage.setItem('local', 'username', 'Alice');
 *
 * @example
 * // Store an object in sessionStorage
 * storage.setItem('session', 'userSettings', { theme: 'dark', notifications: true });
 *
 * @example
 * // Store a number in localStorage
 * storage.setItem('local', 'userCount', 150);
 */
function setItem(type, key, value) {
    try {
        const storage = getStorage(type);
        const prefixedKey = STORAGE_PREFIX + key;

        // Automatically stringify non-string values
        const stringValue = typeof value === 'string' ? value : JSON.stringify(value);

        storage.setItem(prefixedKey, stringValue);
        // console.log(`Successfully set item '${key}' in ${type}Storage.`); // Optional logging

    } catch (error) {
        console.error(`Error setting item '${key}' in ${type}Storage:`, error);
        // Handle specific errors like QuotaExceededError if storage is full
        if (error.name === 'QuotaExceededError') {
            console.warn(`${type}Storage quota exceeded! Could not store item '${key}'.`);
            // You might want to notify the user or clear some old data here.
        }
    }
}

/**
 * Retrieves the value associated with a key from either localStorage or sessionStorage.
 * Automatically attempts to parse the value from JSON, falling back to returning the raw string.
 * Includes basic error handling.
 *
 * @param {StorageType} type - The type of storage to use ('local' or 'session').
 * @param {string} key - The key whose value is to retrieve.
 * @returns {*} The retrieved value (parsed from JSON if possible, otherwise string), or null if the key does not exist or an error occurs.
 *
 * @example
 * // Retrieve a string from localStorage
 * const username = storage.getItem('local', 'username'); // Returns 'Alice' or null
 *
 * @example
 * // Retrieve an object from sessionStorage
 * const settings = storage.getItem('session', 'userSettings'); // Returns { theme: 'dark', notifications: true } or null
 *
 * @example
 * // Retrieve a non-existent key
 * const nonExistent = storage.getItem('local', 'nonExistentKey'); // Returns null
 */
function getItem(type, key) {
    try {
        const storage = getStorage(type);
        const prefixedKey = STORAGE_PREFIX + key;
        const stringValue = storage.getItem(prefixedKey);

        if (stringValue === null) {
            return null; // Key not found
        }

        // Attempt to parse the value from JSON
        try {
            return JSON.parse(stringValue);
        } catch (parseError) {
            // If parsing fails, return the raw string value
            return stringValue;
        }

    } catch (error) {
        console.error(`Error getting item '${key}' from ${type}Storage:`, error);
        return null; // Return null on error
    }
}

/**
 * Removes a key-value pair from either localStorage or sessionStorage.
 * Includes basic error handling.
 *
 * @param {StorageType} type - The type of storage to use ('local' or 'session').
 * @param {string} key - The key to remove.
 *
 * @example
 * // Remove 'username' from localStorage
 * storage.removeItem('local', 'username');
 *
 * @example
 * // Remove 'userSessionId' from sessionStorage
 * storage.removeItem('session', 'userSessionId');
 */
function removeItem(type, key) {
    try {
        const storage = getStorage(type);
        const prefixedKey = STORAGE_PREFIX + key;
        storage.removeItem(prefixedKey);
        // console.log(`Successfully removed item '${key}' from ${type}Storage.`); // Optional logging
    } catch (error) {
        console.error(`Error removing item '${key}' from ${type}Storage:`, error);
    }
}

/**
 * Clears all key-value pairs from either localStorage or sessionStorage for the current origin.
 * Includes basic error handling.
 *
 * @param {StorageType} type - The type of storage to clear ('local' or 'session').
 *
 * @example
 * // Clear all items from localStorage
 * storage.clear('local');
 *
 * @example
 * // Clear all items from sessionStorage
 * storage.clear('session');
 */
function clear(type) {
    try {
        const storage = getStorage(type);
        storage.clear();
        // console.log(`Successfully cleared all items from ${type}Storage.`); // Optional logging
    } catch (error) {
        console.error(`Error clearing ${type}Storage:`, error);
    }
}

/**
 * Gets the key at a specific index from either localStorage or sessionStorage.
 * Note: The order of keys is not guaranteed.
 *
 * @param {StorageType} type - The type of storage to use ('local' or 'session').
 * @param {number} index - The index of the key to retrieve (zero-based).
 * @returns {string | null} The key name (without the prefix) at the specified index, or null if the index is out of range or an error occurs.
 *
 * @example
 * // Get the key at index 0 from localStorage
 * const firstLocalKey = storage.key('local', 0);
 *
 * @example
 * // Get the key at index 1 from sessionStorage
 * const secondSessionKey = storage.key('session', 1);
 */
function key(type, index) {
    try {
        const storage = getStorage(type);
        const prefixedKey = storage.key(index);
        if (prefixedKey && prefixedKey.startsWith(STORAGE_PREFIX)) {
            // Return the key without the prefix
            return prefixedKey.substring(STORAGE_PREFIX.length);
        }
        return prefixedKey; // Return null or key without a prefix if no prefix was used or the key didn't match the prefix
    } catch (error) {
        console.error(`Error getting key at index ${index} from ${type}Storage:`, error);
        return null;
    }
}

/**
 * Gets the number of key-value pairs in either localStorage or sessionStorage.
 * Note: This returns the total number of items, regardless of whether they have the defined prefix.
 *
 * @param {StorageType} type - The type of storage to use ('local' or 'session').
 * @returns {number} The number of items in the storage, or -1 if an error occurs.
 *
 * @example
 * // Get the number of items in localStorage
 * const localItemCount = storage.length('local');
 *
 * @example
 * // Get the number of items in sessionStorage
 * const sessionItemCount = storage.length('session');
 */
function length(type) {
    try {
        const storage = getStorage(type);
        return storage.length;
    } catch (error) {
        console.error(`Error getting length of ${type}Storage:`, error);
        return -1; // Indicate error
    }
}


// Export the wrapper functions
const storage = {
    setItem,
    getItem,
    removeItem,
    clear,
    key,
    length,
};

export default storage;
