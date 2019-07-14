import React, { Component } from "react";
import CarCard from "./components/CarCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import cars from "./cars.json";
import Navbar from "./components/Navbar";

var maxScore = cars.lenght

class App extends Component {
  // Setting this.state.cars to the cars json array
  state = {
    cars,
    currentScore: 0,
    topScore: 0,
    clickedCars: [],
    gameMessage: "Click a car to begin!"
  };

  clickedcar = id => {
    // Filter this.state.cars for cars with an id not equal to the id being clickedd
    //const cars = this.state.cars.filter(car => car.id !== id);
    // Set this.state.cars equal to the new cars array
    //this.setState({ cars });
  //};

     // If car has already been selected (i.e. included in the clickedCars array), then Game Over!
     if (this.state.clickedCars.includes(id)) {
      this.setState({gameMessage:"You Lost!"})
      this.resetGame()
    }
    // Else, increment the score
    else {
      const score = this.state.currentScore + 1

      // Update topScore if currentScore is greater than current topScore
      if (score > this.state.topScore) {
        this.setState({topScore:score})
      }

      // If selected all cars without repeating, then you win!
      if (score === maxScore) {
        this.setState({gameMsg: "You have Won!"})
        this.resetGame()
      }
      // Add current car id to clickedCars array, update score, shuffle cars and continue playing
      else {
        this.setState({gameMessage: "You clicked a new car!"})
        this.setState({selected:this.state.clickedCars.push(id)})
        this.setState({currentScore:score})
        this.shuffleCars()
      }
    }
  }

shuffleCars = () => {
  const shuffledCars = this.shuffleArray(cars)
  this.setState({cars:shuffledCars})
}

// Shuffles array in place. ES6 version
shuffleArray = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Resets the game parameters, shuffle images
resetGame = () => {
  this.setState({currentScore:0})
  this.setState({clickedCars:[]})
  this.shuffleCars()
}

  // Map over this.state.cars and render a CarCard component for each car object
  render() {
    return (
      <div className="App">
      <Navbar
        title={"Try to not click on the same car twice!"}
        message={this.state.gameMessage}
        score={this.state.currentScore}
        topScore={this.state.topScore}
      />
      <Wrapper>
        <Title>Clicky Cars</Title>
        {this.state.cars.map(car => (
          <CarCard
            clickedcar={this.clickedcar}
            id={car.id}
            key={car.id}
            name={car.name}
            image={car.image}
          />
        ))}
      </Wrapper>
     </div>
    );
  }
}

export default App;

//I based my solution from the following github repository: https://github.com/vdelariva 

