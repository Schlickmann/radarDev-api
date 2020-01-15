class Utils {
    parseStringAsArray(str) {
        return str.split(',').map(s => s.toUpperCase().trim());
    }
}

module.exports = new Utils();