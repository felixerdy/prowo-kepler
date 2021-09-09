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

import styled from "styled-components";
const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line

const Button = styled.button`
  background-color: ${(props) => props.buttonColor};
  border: none;
  padding: 15px 20px;
  border-radius: 12px;
  margin: 5px;
  font-size: 25px;
  font-weight: bold;
  transition: all 1s;

  &:hover {
    background-color: #000;
    cursor: pointer;
    color: #fff;
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.34),
      0 17px 50px 0 rgba(0, 0, 0, 0.29);
  }
`;

const Closebutton = styled.button`
  background-color: ${(props) => props.buttonColor};
  border: none;
  padding: 15px 20px;
  border-radius: 16px;
  margin: 5px;
  font-size: 20px;
  font-weight: bold;
  transition: all 1s;

  &:hover {
    background-color: transparent;
    cursor: pointer;
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.34),
      0 17px 50px 0 rgba(0, 0, 0, 0.29);
  }
`;

class App extends Component {
  async componentDidMount() {
    const dataService = new DataService();
    const nameData = await dataService.getName("6139b33384c610001ca8efd4");
    const keplerglhumidata = await dataService.dataService(
      ["6139b33384c610001ca8efd4", "6138914684c610001c260ef5"],
      "rel. Luftfeuchte"
    );
    const keplergltempdata = await dataService.dataService(
      ["6139b33384c610001ca8efd4", "6138914684c610001c260ef5"],
      "Temperatur"
    );

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
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          textAlign: "center",
          backgroundColor: "rgba(168,168,189,46)",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "100px",
            marginBottom: "100px",
            justifyContent: "space-evenly",
            padding: "10px",
            backgroundColor: "rgba(168,168,189,46)",
          }}
        >
          <a href="https://www.uni-muenster.de/Geoinformatics/" target="_blank">
            <img
              src="https://digitalautonomy.net/fileadmin/_processed_/d/4/csm_1623743845_DAH_Logo_ifgi_long_2b4c356743.png"
              alt="ifgi Logo"
              style={{ height: "100%" }}
            />
          </a>
          <a
            href="https://www.afg-havixbeck-billerbeck.de/index.php"
            target="_blank"
          >
            <img
              src="./afglogo.png"
              alt="Afg Logo"
              style={{ height: "100%" }}
            />
          </a>
        </div>

        <h1 style={{ color: "white", fontFamily: "helvetica" }}>
          <b>Klimadaten der senseBox-Fahrräder</b>
        </h1>

        <Button buttonColor="#f8df81" onClick={() => this._openModal("foo")}>
          {" "}
          Heatmap🔥{" "}
        </Button>
        <Button buttonColor="#d5b6d5" onClick={() => this._openModal("foo")}>
          {" "}
          Beschleunigung🚲{" "}
        </Button>
        <Button buttonColor="#f6b4bf" onClick={() => this._openModal("foo")}>
          {" "}
          Temperatur- und Luftfeuchtigkeitssensor🌡️{" "}
        </Button>
        <Button buttonColor="#badfda" onClick={() => this._openModal("foo")}>
          {" "}
          Beleuchtungsstärke⛅{" "}
        </Button>
        <Button buttonColor="#c1bbdd" onClick={() => this._openModal("foo")}>
          {" "}
          UV☀️{" "}
        </Button>
        <Button buttonColor="#dab894" onClick={() => this._openModal("foo")}>
          {" "}
          Luftdruck🎈{" "}
        </Button>
        <Button buttonColor="#dcfffb" onClick={() => this._openModal("foo")}>
          {" "}
          Feinstaub💨{" "}
        </Button>

        <h4 style={{ color: "white", fontFamily: "helvetica" }}>
          Unsere Ergebnisse der Projektwoche am ifgi!
        </h4>

        {/* <button onClick={() => this._openModal("bar")}>
          Show Kepler.gl id: bar
        </button> */}

        <Modal isOpen={modal === "foo"} style={{ content: { padding: "0" } }}>
          <div
            style={{
              display: "flex",
              height: "50px",
              justifyContent: "space-evenly",
              alignItems: "center",
              padding: "10px",
              backgroundColor: "rgba(168,168,189,46)",
              fontFamily: "helvetica",
              fontSize: "16px",
            }}
          >
            This Kepler.gl component will always load a fresh state when re
            mounted, state inside this component will be destroyed once its
            unmounted.
            <Closebutton buttonColor="transparent" onClick={this._closeModal}>
              ❌
            </Closebutton>
          </div>
          <FreshMap
            dispatch={this.props.dispatch}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            id="foo"
          />
        </Modal>
        <Modal isOpen={modal === "bar"}>
          <div>Luftfeuchte</div>
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
