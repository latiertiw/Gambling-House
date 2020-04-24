import React from "react";
import Sound from "react-sound";
import "./index.css";
import history from "../../helpers/history";
import ReactCardFlip from "react-card-flip";
import SoundContext from "../../stores/soundContext";

class GameScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      flipped: undefined,
      level: 0,
      score: 0,
      time: 30,
      timer: null,
      cards: [],
      levelPassed: false,
      levelFailed: false,
      trueFlipped: 0,
    };
    this.flipCard = this.flipCard.bind(this);
  }

  componentDidMount() {
    this.createCards();

    let timer = setInterval(() => {
      if (this.state.time) {
        this.setState({ time: this.state.time - 1 });
      } else this.setState({ levelFailed: true });
    }, 1000);

    this.setState({ timer });
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  createCards() {
    const { level } = this.state;

    let initialArray = this.shuffle([1, 2, 3, 4, 5, 6]);

    let unshuffeledIndexes =
      level == 0 ? initialArray.slice(0, 2) : initialArray.slice(0, 4);
    let indexes = this.shuffle(unshuffeledIndexes.concat(unshuffeledIndexes));

    let cards = indexes.map((index, i) => {
      return { flipped: false, opened: false, card: index, index: i };
    });

    this.setState({ cards });
  }

  flipCard(index) {
    const { flipped, trueFlipped, level } = this.state;
    let trueFlippedCopy = trueFlipped;
    const cards = JSON.parse(JSON.stringify(this.state.cards));
    for (let i = 0; i < cards.length; i += 1) {
      if (cards[i].flipped == false && index == i) {
        cards[i].flipped = true;
        if (flipped == undefined) {
          this.setState({ cards, flipped: i });
        } else {
          this.setState({ cards, flipped: undefined });
          if (cards[i].card == cards[flipped].card) {
            cards[i].opened = true;
            cards[flipped].opened = true;
            this.setState({
              trueFlipped: trueFlippedCopy + 2,
              score: this.state.score + 30,
            });

            trueFlippedCopy += 2;
            console.log(trueFlippedCopy);
            if (level == 0 && trueFlippedCopy == 4)
              this.setState({ levelPassed: true });
            if (level == 1 && trueFlippedCopy == 8)
              this.setState({ levelPassed: true });
          } else {
            setTimeout(() => {
              this.unflipCard(i);
              this.unflipCard(flipped);
            }, 1500);
          }
        }
      }
    }
  }

  unflipCard(index) {
    const copiedCards = JSON.parse(JSON.stringify(this.state.cards));
    for (let i = 0; i < copiedCards.length; i += 1) {
      if (copiedCards[i].flipped == true && index == i) {
        copiedCards[i].flipped = false;
        this.setState({ cards: copiedCards });
      }
    }
  }

  getGameField() {
    const { level } = this.state;
    return (
      <div className={level == 0 ? "gameField" : "gameFieldBig"}>
        {this.state.cards.map((item) => {
          return (
            <Card
              opened={item.opened}
              key={item.index}
              flipCard={this.flipCard}
              unflipCard={this.unflipCard}
              flipped={item.flipped}
              imageNumber={item.card}
              index={item.index}
            />
          );
        })}
      </div>
    );
  }

  componentWillUnmount() {
    const { timer } = this.state;
    clearInterval(timer);
  }

  startNewLevel() {
    this.setState({ level: 1 });
    setTimeout(() => {
      this.createCards();
      this.setState({
        time: 30,
        levelFailed: false,
        levelPassed: false,
        flipped: undefined,
        trueFlipped: 0,
      });
    }, 100);
  }

  startNewGame() {
    this.setState({ level: 0 });
    setTimeout(() => {
      this.createCards();
      this.setState({
        score: 0,
        time: 30,
        levelFailed: false,
        levelPassed: false,
        flipped: undefined,
        trueFlipped: 0,
      });
    }, 100);
  }

  render() {
    const { level, levelPassed, levelFailed } = this.state;
    return (
      <div className={"pageContainer gameScreen"}>
        <div className="timerContainer">Time: 00:{this.state.time}</div>
        <div
          onClick={() => {
            history.goBack();
          }}
          className="exitContainer"
        ></div>

        {levelFailed && (
          <div className="alertContainer">
            <div className="alertGameOver">GAME OVER</div>
            <div className="alertScore">SCORE: {this.state.score}</div>
            <div
              onClick={() => {
                this.startNewGame();
              }}
              className="menuItem"
            >
              PLAY AGAIN
            </div>
          </div>
        )}
        {levelPassed && (
          <div className="alertContainer">
            <div className="alertGameOver">YOU WIN</div>
            <div className="alertScore">SCORE: {this.state.score}</div>
            <div
              onClick={() => {
                this.startNewLevel();
              }}
              className="menuItem"
            >
              NEXT LEVEL
            </div>
          </div>
        )}
        <div className="scoreContainer">Score: {this.state.score}</div>
        {this.getGameField()}
      </div>
    );
  }
}

export default GameScreen;

class Card extends React.Component {
  flip(i) {
    this.props.flipCard(i);
  }

  constructor(props) {
    super(props);
    this.state = {
      play: "STOPPED",
    };
  }

  setPlay(status) {
    this.setState({ play: status });
  }

  playClick() {
    this.setPlay("PLAYING");
  }

  render() {
    const { index, opened, imageNumber, flipped } = this.props;

    return (
      <SoundContext.Consumer>
        {({ on, toggleSound }) => (
          <>
            <Sound
              url={
                "http://www.orangefreesounds.com/wp-content/uploads/2018/07/Card-flip-sound-effect.mp3?_=1"
              }
              autoLoad={true}
              playStatus={this.state.play}
              onFinishedPlaying={() => {
                this.setPlay("STOPPED");
              }}
            />
            <ReactCardFlip isFlipped={flipped}>
              <div
                onClick={() => {
                    if(on == true) this.playClick();
                    this.flip(index);
                }}
                className="card"
              ></div>
              <div className={opened == true ? "opened" : ""}>
                <div className={"card card" + imageNumber}></div>
              </div>
            </ReactCardFlip>
          </>
        )}
      </SoundContext.Consumer>
    );
  }
}
