function outerFunction(arg){
    var variableInOuterFunction = arg;

    function bar(){
        console.log(variableInOuterFunction);  // Access a variable from outer scope
    }

    // Call the local function to demonstrate that it has to arg
    bar();
}

outerFunction('hello closure!');               // logs hello closure!
