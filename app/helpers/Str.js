module.exports = {
    snakeCase: function (string) {
        function check(string) {
            return string.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
        }
        function checkAndConvert(string) {
            return check(string).replace(/ /g, '_');
        }
    }
}