export function formatDate(date) {
    // Returns YYYY-MM-DD
    return date.toISOString().split("T")[0];
}