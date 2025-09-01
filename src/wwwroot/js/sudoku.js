export async function startSudoku() {
    const sudokuElement = document.getElementById("sudoku-app");
    if (!sudokuElement) return;

    try {
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
        sudokuElement.textContent = "Failed to load Sudoku app.";
    }
}