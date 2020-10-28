import React, { Component } from "react";
import ReactToPrint from "react-to-print";

class PrintDegreeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => {
            return <a href="#">Print This</a>;
          }}
          content={() => this.componentRef}
        />
        <ComponentToPrint ref={(el) => (this.componentRef = el)} />
      </div>
    );
  }
}

export default PrintDegreeComponent;
