/**
 * Censors a word by keeping the first and last character visible
 * and replacing all middle characters with '*'.
 *
 * @param {string} str - The input word to censor.
 * @returns {string} - The censored word.
 *
 * @example
 * censorWord('hello'); // returns 'h***o'
 * censorWord('hi'); // returns 'h*'
 */
export function censorWord(str) {
    if (typeof str !== 'string' || str.length === 0) return '';
    if (str.length === 1) return '*';
    if (str.length === 2) return str[0] + '*';
    return str[0] + '*'.repeat(str.length - 2) + str.slice(-1);
}

/**
 * Censors a phone number by converting it to a string, optionally preserving
 * the country code prefix (e.g., +1), and censoring the rest.
 *
 * @param {string|number} number - The phone number to censor.
 * @returns {string} - The censored phone number.
 *
 * @example
 * censorPhone('+1234567890'); // returns '+1********0'
 * censorPhone(9876543210); // returns '9********0'
 */
export function censorPhone(number) {
    if (typeof number !== 'string') number = String(number);

    // Optional: Keep country code if present (e.g., +1)
    const countryCodeMatch = number.match(/^\+\d+/);
    let countryCode = '';
    if (countryCodeMatch) {
        countryCode = countryCodeMatch[0];
        number = number.slice(countryCode.length);
    }
    return countryCode + censorWord(number);
}

/**
 * Censors an email address by censoring both the local part (before @)
 * and the domain name (but leaving the top-level domain visible).
 *
 * @param {string} email - The email address to censor.
 * @returns {string} - The censored email address.
 *
 * @example
 * censorEmail('john.doe@example.com'); // returns 'j******e@e******e.com'
 * censorEmail('a@b.com'); // returns 'a@b.com'
 */
export function censorEmail(email) {
    if (typeof email !== 'string' || !email.includes('@')) return email;
    const [local, domain] = email.split('@');
    const domainParts = domain.split('.');

    // Censor domain name but keep top-level domain (TLD) visible
    const domainName = domainParts[0];
    const tld = domainParts.slice(1).join('.') || '';

    return (
        censorWord(local) +
        '@' +
        censorWord(domainName) +
        (tld ? '.' + tld : '')
    );
}

/**
 * Censors a full name (e.g., first and last name) by censoring
 * each word separately.
 *
 * @param {string} name - The full name to censor.
 * @returns {string} - The censored full name.
 *
 * @example
 * censorFullName('John Doe'); // returns 'J**n D*e'
 * censorFullName('A B'); // returns 'A *'
 */
export function censorFullName(name) {
    if (typeof name !== 'string') return '';
    const parts = name.trim().split(/\s+/);
    return parts.map(part => censorWord(part)).join(' ');
}
