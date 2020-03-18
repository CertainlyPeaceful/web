const btn = document.querySelectorAll(".btn");

btn.forEach(button => {
    button.addEventListener("mouseenter", () => {
        button.innerText = "X";
    });
});
btn.forEach(button => {
    button.addEventListener("mouseout", () => {
        button.innerText = "";
    });
});