/**
 * Created by 田倩 on 2017/6/6.
 */
//CMD的规范
function convert(input) {
    return parseFloat(input);
}
function add(a,b) {
    return convert(a) + convert(b);
}
function subtract(a,b) {
    return convert(a) - convert(b);
}
function mutiply(a,b) {
    return convert(a) * convert(b);
}
function divide(a,b) {
    return convert(a) / convert(b);
}
module.exports={add,subtract,mutiply,divide};