//              1
function getData(callback) {
//      2
    setTimeout(()=>{
//          3
        callback('Some Data');
    }, 3000);
}
//          4
getData((data) => {
    console.log(data);
});
console.log("hello world")

/* 
1: Added a parameter to the getData() function. THis parameter is going to expect a callback function when invoked.
2: Set the setTimeout() method. This will wait the allotted milliseconds (3000) before executing the code inside it.
3: We grab the parameter, it's expecting a function to be invoked and send any data we receive('some data').
4: We invoke our getData() fuction with an anonymous function as the argument. This anonymous function simply console.logs the recived data ('some data')
*/