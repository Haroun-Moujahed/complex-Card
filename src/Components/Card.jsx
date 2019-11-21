import React, { Component } from "react";

export class Card extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      number: "**** **** **** ****",
      valid: "**/**",
      slashtest: 0
    };
  }

  handleNumber = e => {
    let str = "";
    if (
      e.target.value.length <= 19 &&
      /^[0-9 ]*$/.test(e.target.value) === true
    ) {
      if (
        (e.target.value.length === 5 ||
          e.target.value.length === 10 ||
          e.target.value.length === 15) &&
        e.target.value[e.target.value.length - 1] !== " "
      ) {
        let aux = e.target.value[e.target.value.length - 1];
        e.target.value = e.target.value.substring(0, e.target.value.length - 1);
        e.target.value = e.target.value + " " + aux;
      }
      if (
        e.target.value.length === 5 ||
        e.target.value.length === 10 ||
        e.target.value.length === 15
      ) {
        e.target.value = e.target.value.substring(0, e.target.value.length - 1);
      }
      let str2 = e.target.value.replace(/ /g, "");
      str += str2 + "*".repeat(16 - str2.length);
      for (let i = 4; i < 19; i = i + 5) {
        str = str.split("");
        str.splice(i, 0, " ");
        str = str.join("");
      }
      this.setState({
        number: str
      });
    } else {
      alert("Card Number is not Valid");
      this.setState({
        number: "**** **** **** ****"
      });
      e.target.value = "";
    }
  };

  handleName = e => {
    let str = e.target.value;
    if (this.state.name.length < 20 && /^[a-zA-Z ]*$/.test(str) === true)
      this.setState({
        name: e.target.value.toUpperCase()
      });
    else {
      alert("Invalid Name");
      this.setState({
        name: ""
      });
      e.target.value = "";
    }
  };

  handleValid = e => {
    let str = e.target.value;
    if (str.length < 3) {
      this.setState({
        slashtest: 0
      });
    }
    if (str.length <= 5 && /^[0-9/]*$/.test(str) === true) {
      this.setState({
        valid: str
      });
    } else {
      alert("Validation date is not valid");
      this.setState({
        valid: "**/**",
        slashtest: 0
      });
      e.target.value = "";
    }
    str = e.target.value;
    if (str.length > 1 && Number(str[0] + str[1] > 12)) {
      alert("Validation date is not valid");
      this.setState({
        valid: "**/**",
        slashtest: 0
      });
      e.target.value = "";
    } else if (str.length > 1 && this.state.slashtest === 0) {
      str = str.split("");
      str.splice(2, 0, "/");
      str.join("");
      this.setState({
        valid: str,
        slashtest: 1
      });
      e.target.value += "/";
    }
    if (str[0] === "/" || str[1] === "/" || str[3] === "/" || str[4] === "/") {
      alert("Validation date is not valid");
      this.setState({
        valid: "**/**",
        slashtest: 0
      });
      e.target.value = "";
    }
  };
  render() {
    return (
      <div>
        <section className="resultCard">
          <h2 className="companyName">Company Name</h2>
          <img
            src="https://pngimage.net/wp-content/uploads/2018/05/credit-card-chip-png-3-203x200.png"
            alt="cardChip"
            className="chipImg"
          />
          <h4 className="cardNumber">{this.state.number}</h4>
          <h4 className="validThru">{this.state.valid}</h4>
          <h4 className="ownerName">{this.state.name}</h4>
          <img
            src="https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_vrt_pos_92px_2x.png"
            alt="masterCard"
            className="masterCard"
          />
        </section>
        <section className="UserInput">
          <form>
            <p>Card Number : </p>
            <input type="text" onChange={e => this.handleNumber(e)} />
            <p>Name : </p>
            <input type="text" onChange={e => this.handleName(e)} />
            <p>Valid thru : </p>
            <input type="text" onChange={e => this.handleValid(e)} />
          </form>
        </section>
      </div>
    );
  }
}

export default Card;
