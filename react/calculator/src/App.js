import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            formula: '',
            currentValue: '0',
            evaluated: false
        }
        this.addDigitToCurrentValue = this.addDigitToCurrentValue.bind(this);
        this.handleDigitInput = this.handleDigitInput.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.cancel = this.cancel.bind(this);
        this.clear = this.clear.bind(this);
        this.backspace = this.backspace.bind(this);
        this.handleDecimal = this.handleDecimal.bind(this);
        this.addDecimalToCurrentValue = this.addDecimalToCurrentValue.bind(this);
        this.positiveToggle = this.positiveToggle.bind(this);
        this.handleOperator = this.handleOperator.bind(this);
        this.addOperatorToFormula = this.addOperatorToFormula.bind(this);
        this.getResult = this.getResult.bind(this);
    }
componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
    window.resizeTo(200, 800);
}
    
handleKeyPress(event){
    switch(event.keyCode){
        case 8:
            this.backspace();
            break;
        case 13:
            this.getResult();
            break;
        case 27:
            this.cancel();
            break;
        case 48:
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
            this.addDigitToCurrentValue(String.fromCharCode(event.keyCode));
            break;
        case 106:
            this.addOperatorToFormula('*');
            break;
        case 107:
            this.addOperatorToFormula('+');
            break;
        case 109:
            this.addOperatorToFormula('-');
            break;
        case 110:
            this.addDecimalToCurrentValue('.');
            break;
        case 111:
            this.addOperatorToFormula('/');
            break;
        default:
            break;
    }
}
    
handleDigitInput(event){
    this.addDigitToCurrentValue(event.target.value);
}
addDigitToCurrentValue(digit){
    if(this.state.currentValue === '0' || this.state.evaluated)
        this.setState({
            currentValue: digit,
            evaluated: false
        })
    else
        this.setState({
            currentValue: this.state.currentValue + digit
        })
}
    
handleDecimal(event){
    this.addDecimalToCurrentValue(event.target.value);
}
addDecimalToCurrentValue(char){
    if(this.state.currentValue.indexOf(char) < 0 || this.state.evaluated){
        this.setState({
            currentValue: this.state.evaluated ? 
            '0' + char :
            this.state.currentValue + char,
            evaluated: false
        })
    }
}

handleOperator(event){
    this.addOperatorToFormula(event.target.value)
}
addOperatorToFormula(operator){
    if(this.state.formula === '')
        this.setState({
            formula: `${this.state.currentValue} ${operator}`,
            evaluated: true
        })
    else
        this.setState({
            formula: this.state.evaluated ?
            this.state.formula.replace(/\D$/, operator) :
            `${this.state.formula} ${this.state.currentValue} ${operator}`,
            currentValue: this.state.evaluated ?
            this.state.currentValue :
            // eslint-disable-next-line
            eval(`${this.state.formula} ${this.state.currentValue}`).toString(),
            evaluated: true
        })
}
    
positiveToggle(){
    if(this.state.currentValue !== '0')
        this.setState({
            currentValue: this.state.currentValue[0] === '-' ?
            this.state.currentValue.substring(1) :
            '-'+this.state.currentValue
        })
}
    
cancel(){
    this.setState({
        currentValue: '0'
    })
}

clear() {
    this.setState ({
        formula: '',
        currentValue: '0'
    })
}
    
backspace() {
    if (!this.state.evaluated) {
        if(this.state.currentValue.length>1) {
            this.setState({
                currentValue: this.state.currentValue.substring(0, this.state.currentValue.length-1)
            })
        }
        else
            this.clear();
    }
}
    
getResult(){
        this.setState({
            // eslint-disable-next-line
            currentValue: eval(`${this.state.formula} ${this.state.currentValue}`),
            formula: '',
            evaluated: true
        })
}
    
  render() {
      return (<div id="calculator">
                <Display currentValue={this.state.currentValue} formula={this.state.formula}/>
                <Buttons handleDigitInput={this.handleDigitInput}
                         handleDecimal={this.handleDecimal}
                         handleOperator={this.handleOperator}
                         cancel={this.cancel}
                         clear={this.clear}
                         backspace={this.backspace}
                         positiveToggle={this.positiveToggle}
                         getResult={this.getResult}/>
             </div>);
  }
};

class Buttons extends React.Component{
    render() {
        return (<div id="buttons">
                 <button id="cancel" onClick={this.props.cancel}>CE</button>
                 <button id="clear" onClick={this.props.clear}>C</button>
                 <button id="correct" onClick={this.props.backspace}>&#60;&minus;</button>
                 <button id="divide" value="/" onClick={this.props.handleOperator}>&divide;</button>
                 <button id="seven" className="digit" value="7" onClick={this.props.handleDigitInput}>7</button>
                 <button id="eight" className="digit" value="8" onClick={this.props.handleDigitInput}>8</button>
                 <button id="nine" className="digit" value="9" onClick={this.props.handleDigitInput}>9</button>
                 <button id="multiply" value="*" onClick={this.props.handleOperator}>&times;</button>
                 <button id="four" className="digit" value="4" onClick={this.props.handleDigitInput}>4</button>
                 <button id="five" className="digit" value="5" onClick={this.props.handleDigitInput}>5</button>
                 <button id="six" className="digit" value="6" onClick={this.props.handleDigitInput}>6</button>
                 <button id="subtract" value="-" onClick={this.props.handleOperator}>&minus;</button>
                 <button id="one" className="digit" value="1" onClick={this.props.handleDigitInput}>1</button>
                 <button id="two" className="digit" value="2" onClick={this.props.handleDigitInput}>2</button>
                 <button id="three" className="digit" value="3" onClick={this.props.handleDigitInput}>3</button>
                 <button id="add" value="+" onClick={this.props.handleOperator}>+</button>
                 <button id="pos-neg" onClick={this.props.positiveToggle}>&#177;</button>
                 <button id="zero" className="digit" value="0" onClick={this.props.handleDigitInput}>0</button>
                 <button id="decimal" value="." onClick={this.props.handleDecimal}>.</button>
                 <button id="equals" value="=" onClick={this.props.getResult}>=</button>
             </div>);
    }
};
                
class Display extends React.Component{
                render(){
            return (
                <div id="display">
                   <div id="formula">{this.props.formula}</div>
                   <div id="input">{this.props.currentValue}</div>
                </div>);
    }
};
                
export default App;
