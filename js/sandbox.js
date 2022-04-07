function compileLine(line, context) {
    return {
        compiledLine: line,
        context: context,
    };
}

function compileProgram(program) {
    const programLines = program.split('\n');
    let context = 'default';
    let jsProgram = '';

    for (let line of programLines) {
        let returnValues = compileLine(line, context);
        jsProgram += returnValues.compiledLine + '\n';
        context = returnValues.context;
    }

    return jsProgram;
}

const testButton = document.getElementById('test');
const programInput = document.getElementById('programme');
testButton.addEventListener('click', () => {
    let jsProgram = compileProgram(programInput.value);
    console.log(jsProgram);
});
