export default {
    isMobile() {
        // Check if the user agent is available
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;

        // Simple check for mobile user agents using regex
        const mobileRegex = /android|bb\d+|meego|mobile|avantgo|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|iphone|ipod|iris|kindle|lge|maemo|midp|mmp|opera m(ob|in)i|palm|phone|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|ipad|playbook|silk/i;

        // Return true if the user agent matches the mobile regex
        return mobileRegex.test(userAgent);
    }
};
