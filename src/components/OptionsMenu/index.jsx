import React from "react";

import "./index.css";
import Sound from "react-sound";
import SoundContext from "../../stores/soundContext";

class OptionsMenu extends React.Component {
  static contextType = SoundContext;

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
    return (
      <SoundContext.Consumer>
        {({ on, toggleSound }) => (
          <div className={"pageContainer menuPage"}>
            <Sound
              url={
                "http://www.orangefreesounds.com/wp-content/uploads/2019/03/Button-click-sound-effect.mp3?_=1"
              }
              playStatus={this.state.play}
              onFinishedPlaying={() => {
                this.setPlay("STOPPED");
              }}
            />
            <div className={"optionsLine"}>OPTIONS</div>
            <div className={"menuContainer"}>
              <div
                onClick={() => {
                    if(on != false) this.playClick()
                  toggleSound();
                }}
                className="menuItem"
              >
                SOUND {on == true ? "OFF" : "ON"}
              </div>
              {/* <div className="menuItem">NOTIF. ON</div> */}
            </div>
          </div>
        )}
      </SoundContext.Consumer>
    );
  }
}

export default OptionsMenu;
