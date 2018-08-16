import React, { Component } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import Typed from "react-typed";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

// Google Analytics
import ReactGA from "react-ga";

// Loading assets
import "./css/master.css";
import logo from "./graphic_assets/mmf_logo.png";

// Loading the data this way for now
import data from "./library/category.json";

// Loading the different components
import Name from "./components/Name";
import Footer from "./components/Footer";
import Category from "./components/Category";
import Buttons from "./components/Buttons";
import Popup from "./components/Popup";
import Logo from "./components/Logo";

library.add(faTimesCircle);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: data,
      currentCategory: "head",
      characterName: "myCharacter",
      currentPose: undefined,
      UIDisplayed: true,
      popup: false
    };
    this.updateCategory = this.updateCategory;
    this.updateCharacterName = this.updateCharacterName;
    this.updatePose = this.updatePose;
    this.updatePopup = this.updatePopup;
  }

  // Update the state of parent App from child Component
  updateCategory = currentCategory => {
    this.setState({ currentCategory });
  };
  updateCharacterName = characterName => {
    this.setState({ characterName });
  };
  updatePose = currentPose => {
    this.setState({ currentPose });
  };
  updatePopup = popup => {
    this.setState({ popup });
  };

  componentDidMount() {
    // Google Analytics for the page
    ReactGA.initialize("UA-41837285-1");
    ReactGA.pageview("/mmf-hero");
  }

  render() {
    return (
      <div>
        <BrowserView>
          <Logo />
          <Name
            characterName={this.state.characterName}
            updateCharacterName={this.updateCharacterName}
          />
          <Footer />
          <Buttons 
            characterName={this.state.characterName}
            updatePopup={this.updatePopup}
          />
          <Popup
            popupDisplayed={this.state.popup}
            message={"Sorry this feature is still in development..."}
            updatePopup={this.updatePopup}
          />

          <div className="abs top right panel">
            <Category
              category={this.state.category}
              currentCategory={this.state.currentCategory}
              updateCategory={this.updateCategory}
              currentPose={this.state.currentPose}
              updatePose={this.updatePose}
              UIDisplayed={this.state.UIDisplayed}
            />
          </div>
        </BrowserView>
        <MobileView>
          <div className="abs top left smartphone">
            <img src={logo} alt="company logo" />
            <div className="fullScreenMessage">
              <Typed
                strings={[
                  "Sorry, this content is currently unavailable on mobile... ^2000",
                  "Come back soon for updates!"
                ]}
                typeSpeed={40}
                showCursor={false}
              />
            </div>
          </div>
        </MobileView>
      </div>
    );
  }
}

export default App;
