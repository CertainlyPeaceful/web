class calculator {
    constructor(prev, curr) {
        this.prev_disp = prev;
        this.curr_disp = curr;

        this.curr = "";
        this.prev = "";
        this.op = undefined;
    }
    push_back(num_val) {
        if (num_val === "." && this.curr.includes(".")) // one . only
            return;
        this.curr = this.curr.toString() + num_val.toString(); // Want 1 + 1 = 11 not 1 + 1 = 2 
        console.log(this.curr);
    }
    refresh_display() {
        this.curr_disp.innerText = this.curr;
    }
}

// DOM
const num_btn = document.querySelectorAll(".number");
const op_btn = document.querySelectorAll(".operator");
const eq_btn = document.querySelector("#equals")
const ac_btn = document.querySelector(".button-ac");
const del_btn = document.querySelector(".button-del");
const curr_disp = document.querySelector(".current-display");
const prev_disp = document.querySelector(".previous-display");

const calc = new calculator(prev_disp, curr_disp); // initiate object

// even listeners
num_btn.forEach(number_button => {
    number_button.addEventListener("click", () => {
        calc.push_back(number_button.innerText);
        calc.refresh_display();
    })
});
op_btn.forEach(operator_button => {
    operator_button.addEventListener("click", () => {

    })
});
eq_btn.addEventListener("click", () => {

});
ac_btn.addEventListener("click", () => {

});
del_btn.addEventListener("click", () => {

});
eq_btn.addEventListener("click", () => {

});