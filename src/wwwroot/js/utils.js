export function formatDate(date) {
    // Returns YYYY-MM-DD
    return date.toISOString().split("T")[0];
}

export function getWritingsByYear(writings) {
    // Sort posts newest first
    const sorted = writings.slice().sort((a, b) => new Date(b.data.date) - new Date(a.data.date));

    const writingsByYear = {};

    // Group posts by year
    for (const writing of sorted) {
        const year = new Date(writing.data.date).getFullYear();
        if (!writingsByYear[year]) writingsByYear[year] = [];
        writingsByYear[year].push(writing);
    }

    // Sorted by year descending
    return Object.entries(writingsByYear)
        .sort(([a], [b]) => Number(b) - Number(a));
}