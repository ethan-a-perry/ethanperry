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

export function sortCollectionByMostRecent(collection) {
    // return collection.sort((a, b) =>
    //     new Date(b.data.datePublished).getTime() - new Date(a.data.datePublished).getTime()
    // );

    return collection.sort((a, b) => Date.parse(b.data.datePublished) - Date.parse(a.data.datePublished));
}