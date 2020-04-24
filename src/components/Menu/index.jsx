import  React, {useState} from "react";

import "./index.css";
import history from "../../helpers/history";

import Sound from "react-sound";
const soundPath = "../../sounds/click.mp3";
function Menu() {
  const [ play, setPlay ] = useState("STOPPED");

  const playClick = () => {
    setPlay("PLAYING")
    
  }
  return <div className={"pageContainer menuPage"}>
      <Sound url={"http://www.orangefreesounds.com/wp-content/uploads/2019/03/Button-click-sound-effect.mp3?_=1"} playStatus={play} onFinishedPlaying={()=>{setPlay("STOPPED")}} />
      <div className={"bgGirl"}></div>
      <div className={"menuContainer"}>
        <div
          onClick={() => {
            //playClick()
            history.push("/play");
          }}
          className="menuItem"
        >
          NEW GAME
        </div>
        <div
          onClick={() => {
            history.push("/options");
          }}
          className="menuItem"
        >
          OPTIONS
        </div>
      </div>
    </div>
  
}

export default Menu;
