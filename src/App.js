import React from "react";
import axios from "axios";
// import JSONPretty from "react-json-pretty";
import ReactJson from "react-json-view";
import "./styles.css";
// import "react-json-pretty/themes/monikai.css";

const { useState } = React;
//
export default function App() {
  const [counter, setCounter] = useState(0);
  const [randusr, setRandusr] = useState(null);
  const [randjsn, setRandjsn] = useState(null);
  const getUsrInf = () => {
    let sUrl = "https://randomuser.me/api";
    return new Promise((resolve, reject) => {
      axios
        .get(sUrl)
        .then(
          (res) => {
            console.log(res.data);
            return resolve(res.data);
          },
          (err) => {
            console.error("err1", err);
            return reject(err);
          }
        )
        .catch((err) => {
          console.error("err2", err);
          return reject(err);
        });
    });
  };

  const btnClk = () => {
    getUsrInf().then(
      (res) => {
        console.log("res->", res.results[0]);
        let o = res.results;
        // const{gender, title} = ...o;
        for (let {
          gender: g,
          name: { title: t, first: f, last: l }
        } of o) {
          console.log(g, t, f, l);
        }
        // setRandusr(f);
        setRandusr(
          JSON.stringify(
            res,
            (k) => {
              return k === "name" || k === "location";
            },
            2
          ) || "no user data"
        );
        setRandjsn(res.results[0]);
      },
      (err) => {
        console.error(err);
      }
    );
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <p> {counter} </p>
      <button
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        Inc by One
      </button>
      <button onClick={btnClk}>get random user info</button>
      <hr />

      {/* <JSONPretty id="tmp" data={randusr}></JSONPretty> */}
      <ReactJson src={randjsn}></ReactJson>

      <img src={randjsn.picture.thumbnail} alt="alt" />
    </div>
  );
}
