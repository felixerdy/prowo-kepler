// Copyright (c) 2021 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React, { Component } from "react";
import { connect } from "react-redux";
import { addDataToMap, wrapTo } from "kepler.gl/actions";

import Modal from "react-modal";
import { showModal } from "./app-reducer";
import sampleData from "./data/sample-data";

import FreshMap from "./components/fresh-map";
import { DataService } from "./services/data-service";
// import SavedMap from "./components/saved-map";

const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line

class App extends Component {
  componentDidMount() {
    this.setState({
      dataService: new DataService(),
    });
  }

  async componentDidUpdate(prevProps) {
    console.log(this.state);
    if (this.state.dataService) {
      const data = await this.state.dataService.getData(
        "60c756b948c4b3001b68fb97"
      );
      console.log(data);
      const sensors = await this.state.dataService.listAllSensors(
        "60c756b948c4b3001b68fb97"
      );
      console.log(sensors);
    }
    // if (!prevProps.keplerGl.bar && this.props.keplerGl.bar) {
    //   this.props.dispatch(
    //     wrapTo(
    //       "bar",
    //       addDataToMap({
    //         datasets: sampleData,
    //         options: {
    //           centerMap: true,
    //         },
    //         config: {
    //           mapStyle: {
    //             styleType: "light",
    //           },
    //         },
    //       })
    //     )
    //   );
    // }
  }
  _closeModal = () => {
    this.props.dispatch(showModal(null));
  };

  _openModal = (id) => {
    this.props.dispatch(showModal(id));
  };

  render() {
    const {
      app: { modal },
    } = this.props;

    return (
      <div style={{ position: "absolute", width: "100%", height: "100%", textAlign: "center", padding: "300px 0px", backgroundColor: "#59595c"}}>


        <button style={{backgroundColor: "#f8df81", border: "none", padding: "15px 20px", borderRadius: "12px", margin: "5px"}} onClick={() => this._openModal("foo")}>
          Heatmap🔥
        </button>

        <button style={{backgroundColor: "#d5b6d5", border: "none", padding: "15px 20px", borderRadius: "12px", margin: "5px"}} onClick={() => this._openModal("foo")}>
          Beschleunigung🚲
        </button>

        <button style={{backgroundColor: "#9bd0b7", border: "none", padding: "15px 20px", borderRadius: "12px", margin: "5px"}} onClick={() => this._openModal("foo")}>
          GPS-Sensor🌐
        </button>

        <button style={{backgroundColor: "#f6b4bf", border: "none", padding: "15px 20px", borderRadius: "12px", margin: "5px"}} onClick={() => this._openModal("foo")}>
          Temperatur- und Luftfeuchtigkeitssensor🌡️
        </button>

        <button style={{backgroundColor: "#badfda", border: "none", padding: "15px 20px", borderRadius: "12px", margin: "5px"}} onClick={() => this._openModal("foo")}>
          UV und Beleuchtungsstärke☀️
        </button>

        <button style={{backgroundColor: "#dab894", border: "none", padding: "15px 20px", borderRadius: "12px", margin: "5px"}} onClick={() => this._openModal("foo")}>
          Luftdruck🎈
        </button>

        <button style={{backgroundColor: "#dcfffb", border: "none", padding: "15px 20px", borderRadius: "12px", margin: "5px"}} onClick={() => this._openModal("foo")}>
          Feinstaub💨
        </button>

        {/* <button onClick={() => this._openModal("bar")}>
          Show Kepler.gl id: bar
        </button> */}

        <Modal isOpen={modal === "foo"}>
          <div>
            This Kepler.gl component will always load a fresh state when re
            mounted, state inside this component will be destroyed once its
            unmounted.
          </div>
          <button onClick={this._closeModal}>Close</button>
          <FreshMap
            dispatch={this.props.dispatch}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            id="foo"
          />
        </Modal>

        {/* <Modal isOpen={modal === "bar"}>
          By passing in mint: false, This Kepler.gl instance will keep the state
          of "bar" even when it is unmounted.
          <button onClick={this._closeModal}>Close</button>
          <SavedMap
            dispatch={this.props.dispatch}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            id="bar"
          />
        </Modal> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => state;
const dispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, dispatchToProps)(App);
