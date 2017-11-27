export function toQueryString(obj) {
    var parts = [];
    Object.keys(obj).forEach(function(key) {
        parts.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
    });
    return parts.join("&");
}