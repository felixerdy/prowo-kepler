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
import { processRowObject } from "kepler.gl/dist/processors";

// import SavedMap from "./components/saved-map";

const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line

class App extends Component {
  async componentDidMount() {
    const dataService = new DataService();
    const nameData = await dataService.getName(
      "6139b33384c610001ca8efd4"
    );
    const keplerglhumidata = await dataService.dataService(["6139b33384c610001ca8efd4","6138914684c610001c260ef5"],"rel. Luftfeuchte");
    const keplergltempdata = await dataService.dataService(["6139b33384c610001ca8efd4","6138914684c610001c260ef5"],"Temperatur");
  
    this.setState({
      data1: { 
        info: {
          label: "Temperatur",
          id: "temp_map",
        },
        data: processRowObject(keplergltempdata),
      },
      data2: {
        info: {
          label: "Luftfeuchte",
          id: "humi_map",
        },
        data: processRowObject(keplerglhumidata),
      },
    });
  }

  async componentDidUpdate(prevProps) {
    if (!prevProps.keplerGl.foo && this.props.keplerGl.foo) {
      //console.log("data", this.state.data);
      this.props.dispatch(
        wrapTo(
          "foo",
          addDataToMap({
            datasets: [this.state.data1],
            options: {
              centerMap: true,
            },
            config: {
              mapStyle: {
                styleType: "dark",
              },

            },
          })
        )
      );
    }
    if (!prevProps.keplerGl.bar && this.props.keplerGl.bar) {
      //console.log("data", this.state.data);
      this.props.dispatch(
        wrapTo(
          "bar",
          addDataToMap({
            datasets: [this.state.data2],
            options: {
              centerMap: true,
            },
            config: {
              mapStyle: {
                styleType: "light",
              },
            },
          })
        )
      );
    }
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
      <div style={{ position: "absolute", width: "100%", height: "100%" }}>
        <button onClick={() => this._openModal("foo")}>
          Show Kepler.gl id: foo
        </button>
        <button onClick={() => this._openModal("bar")}>
          Show Kepler.gl id: bar
        </button>
        {/* <button onClick={() => this._openModal("bar")}>
          Show Kepler.gl id: bar
        </button> */}

        <Modal isOpen={modal === "foo"}>
          <div>
            Temperatur
          </div>
          <button onClick={this._closeModal}>Close</button>
          <FreshMap
            dispatch={this.props.dispatch}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            id="foo"
          />
        </Modal>
        <Modal isOpen={modal === "bar"}>
          <div>
            Luftfeuchte
          </div>
          <button onClick={this._closeModal}>Close</button>
          <FreshMap
            dispatch={this.props.dispatch}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            id="bar"
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
