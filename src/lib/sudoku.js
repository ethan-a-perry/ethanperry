export async function startSudoku() {
    const sudokuElement = document.getElementById("sudoku-app");
    if (!sudokuElement) return;

    try {
        window.addEventListener("sudokuAppReady", () => {
            const loader = document.getElementById("sudoku-app");
            loader.className = "full-width";
        });

        await new Promise((resolve, reject) => {
            const s = document.createElement("script");
            s.src = "/sudoku/_framework/blazor.webassembly.js";
            s.setAttribute("autostart", "false");
            s.onload = resolve;
            s.onerror = () => reject(new Error("Failed to load Blazor runtime"));
            document.head.appendChild(s);
        });

        await window.Blazor.start({
            loadBootResource: (type, name, defaultUri) =>
                defaultUri.startsWith("_framework/") ? `/sudoku/${defaultUri}` : defaultUri
        });
    } catch (err) {
        console.error("Error starting Blazor WASM:", err);

        const span = document.createElement('span');

        span.textContent = 'Failed to load Sudoku app. Please try again later.';
        span.classList.add("sudoku-app-failure")

        sudokuElement.appendChild(span);
    }
}