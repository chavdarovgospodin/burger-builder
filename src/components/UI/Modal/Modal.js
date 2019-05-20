import React, { Component } from "react";
import classes from "./Modal.css";
import Aux from "../../../hoc/Aux/Aux";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translate(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}
        >
          <span className={classes.Exit} onClick={this.props.modalClosed}>
            &#10007;
          </span>
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
