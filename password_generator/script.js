// Extract variables from the HTML
const pass_length = document.getElementById("length");
const include_lowercase = document.getElementById("lowercase");
const include_uppercase = document.getElementById("uppercase");
const include_number = document.getElementById("numbers");
const include_symbol = document.getElementById("symbols");
const generated_password = document.getElementById("generated_password");

// Establish character codes as arrays
const lowercase_codes = fill_array(97, 122);
const uppercase_codes = fill_array(65, 90);
const number_codes = fill_array(48, 57);
const symbol_codes = fill_array(33, 47).concat(fill_array(58, 64)).concat(fill_array(91, 96)).concat(fill_array(123, 126));
function fill_array(lowest, highest) {
    const array = [];
    for (let char_num = lowest; char_num <= highest; char_num++) {
        array.push(char_num);
    }
    return array;
}

// source : https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
document.getElementById("clipboard").onclick = function() {
    const textarea = document.createElement("textarea");
    const password = document.getElementById("generated_password").innerText;
    if (!password) // no password
        return;
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Password copied to clipboard");
}
document.getElementById("select_all").onclick = function() {
    include_lowercase.checked = this.checked;
    include_uppercase.checked = this.checked;
    include_number.checked = this.checked;
    include_symbol.checked = this.checked;
}
document.getElementById("button").onclick = function() {
    let possible_char = [];
    const password = [];

    if (include_lowercase.checked)
        possible_char = possible_char.concat(lowercase_codes);
    if (include_uppercase.checked)
        possible_char = possible_char.concat(uppercase_codes);
    if (include_number.checked)
        possible_char = possible_char.concat(number_codes);
    if (include_symbol.checked)
        possible_char = possible_char.concat(symbol_codes);

    for (let i = 0; i < pass_length.value; i++)
        password.push(String.fromCharCode(possible_char[Math.floor(Math.random() * possible_char.length)]));
    
    const result = password.join("");

    document.getElementById("generated_password").innerHTML = result;
}