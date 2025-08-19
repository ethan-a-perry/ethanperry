export function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
}

export function getPostsByYear(posts) {
    // Sort posts newest first
    const sorted = posts.sort((a, b) => new Date(b.data.date) - new Date(a.data.date));

    const postsByYear = {};

    for (const post of sorted) {
        const year = new Date(post.data.date).getFullYear();
        if (!postsByYear[year]) postsByYear[year] = [];
        postsByYear[year].push(post);
    }

    return postsByYear;
}