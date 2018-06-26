import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            randomIndex: Math.floor(Math.random()*11)
        }
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
    this.setState({
    randomIndex: Math.floor(Math.random()*11)
            });
        };
  render() {
      const quotes = [//quotes from https://www.goodmorningquote.com/best-quotes-of-all-time/
                ['If an egg is broken by an outside force, life ends. If an egg is broken by an inside force…', 'wallfest.com'],
                ['Be more concerned with your character than your reputation, because your character…', 'John Wooden'],
                ['The first responsibility of a leader is to define reality. The last is to say thank you. In…', 'Max DePree'],
                ['Cherish all your happy moments, they make fine cushion for old age.', 'Christopher Morley'],
                [' There was never a night or a problem that could defeat sunrise or hope', 'Bern Williams'],
                ['Something I learned early is to not worry about what I can’t control. But what I can…', 'Tim Tebow'],
                ['No one is born hating another person because of the color of his skin, or his…', 'Nelson Mandela'],
                ['If you can’t do great things, do small things in a great way.', 'Napoleon Hill'],
                ['Nothing is old, nothing is new. Its just a matter of point of view.', 'Anonimus'],
                ['Hope for the best, prepare for the worst and expect nothing.', 'Anonimus'],
                ['At one point in your life, you either have the thing you want or the reasons why you don’t.', 'Andy Roddick']
            ];
      const colors = [
    'blue',
    'brown',
    'coral',
    'darkred',
    'salmon',
    'teal',
    'tomato',
    'thistle',
    'darkolivegreen',
    'rosybrown',
    'forestgreen',
    'white'     
]
      const quote = quotes[this.state.randomIndex];
      const color = colors[this.state.randomIndex];
    return (
      <div id="App" style={{backgroundColor: color}}>
        <div id='quote-box'>
            <p id='text' style={{color: color}}><span class='left quotation-mark'>&#8220;</span>{quote[0]}<span class='right quotation-mark'>&#8221;</span></p>
            <p id='author' style={{color: color}}>&#8212; {quote[1]}</p>
            <a id='tweet-quote' href="twitter.com/intent/tweet" style={{backgroundColor: color}}>t</a>
            <button id='new-quote' onClick={this.handleClick} style={{backgroundColor: color}}>new quote</button>
        </div> 
      </div>
    );
  }
}

export default App;
