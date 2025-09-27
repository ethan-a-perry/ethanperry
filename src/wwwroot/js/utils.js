export function formatDate(date) {
    // Returns Jan 09, 2025
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });
}

export function formatDateYYYYMMDD(date) {
    if (!date) return;
    return date.toISOString().split('T')[0];
}