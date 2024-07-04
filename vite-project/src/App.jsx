import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const [selectedcategory, setcategory] = useState("");
  const [sharebtn, setsharebtn] = useState(false);
  const [facts, setfacts] = useState([]);
  const [like, setlike] = useState(false);
  const [mind, setmind] = useState(false);

  const handlecategorychange = (e) => {
    const cat = e.target.id;
    setcategory(cat);
    console.log(cat);
  };

  const handlesharebutton = (e) => {
    setsharebtn(true);
  };

  const getfacts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getfacts");
      setfacts(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const incrementlikes = async (fact_id) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/incrementlikes/${fact_id}`
      );
      const updatedFact = response.data;

      setfacts((prevFacts) =>
        prevFacts.map((fact) =>
          fact._id === fact_id
            ? { ...fact, likeCount: updatedFact.likeCount }
            : fact
        )
      );
      setlike((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  const incrementmindemoji = async (fact_id) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/incrementmindemoji/${fact_id}`
      );
      const updatedFact = response.data;

      setfacts((prevFacts) =>
        prevFacts.map((fact) =>
          fact._id === fact_id
            ? { ...fact, mindBlownCount: updatedFact.mindBlownCount }
            : fact
        )
      );
      setlike((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  const incrementfalsecount = async (fact_id) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/incrementfalsecount/${fact_id}`
      );
      const updatedFact = response.data;

      setfacts((prevFacts) =>
        prevFacts.map((fact) =>
          fact._id === fact_id
            ? { ...fact, mindBlownCount: updatedFact.mindBlownCount }
            : fact
        )
      );
      setlike((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };
  const getCategoryClass = (category) => `category-${category}`;

  useEffect(() => {
    getfacts();
  }, []);

  useEffect(() => {
    getfacts();
  }, [like]);

  useEffect(() => {
    getfacts();
  }, [mind]);
  return (
    <>
      <div className="header">
        <img className="logo" src="/src/assets/logo.png" alt="" />
        <h1 className="learned">
          <b>FACT FUSION</b>
        </h1>
        <button
          onClick={handlesharebutton}
          id="share-btn"
          className="share-btn"
        >
          SHARE A FACT
        </button>
      </div>
      {sharebtn === true ? (
        <div className="fact-form">
          <h1>SHARE YOUR FACTS WITH US!!</h1>
          <textarea
            name="desc"
            id="desc"
            placeholder="Enter your fact here"
          ></textarea>
          <input id="src" type="text" placeholder="enter a valid source" />
          <div>
            <h2 style={{ color: "white" }}>PICK A CATEGORY</h2>
            <ol className="categories">
              <li
                id="tech"
                style={{
                  backgroundColor: "rgba(136, 136, 212, 0.849)",
                }}
              >
                TECHNOLOGY
              </li>
              <li
                id="hist"
                style={{
                  backgroundColor: "rgb(206, 118, 118)",
                }}
              >
                HISTORY
              </li>
              <li
                id="sci"
                style={{
                  backgroundColor: "rgb(119, 190, 105)",
                }}
              >
                SCIENCE
              </li>
              <li
                id="enter"
                style={{
                  backgroundColor: "rgb(206, 106, 156)",
                }}
              >
                ENTERTAINMENT
              </li>
              <li
                id="society"
                style={{
                  backgroundColor: "rgb(219, 177, 97)",
                }}
              >
                SOCIETY
              </li>
              <li
                id="health"
                style={{
                  backgroundColor: "rgb(121, 183, 187)",
                }}
              >
                HEALTH
              </li>
              <li
                id="finance"
                style={{
                  backgroundColor: "rgb(214, 70, 70)",
                }}
              >
                FINANCE
              </li>
              <li
                id="news"
                style={{
                  backgroundColor: "rgb(142, 78, 202)",
                }}
              >
                NEWS
              </li>
            </ol>
          </div>
          <button className="post-btn">POST</button>
        </div>
      ) : (
        <>
          <div className="facts-list">
            {facts.map((fact, index) => (
              <div className="card" key={fact._id}>
                <p
                  className={`category-text ${getCategoryClass(fact.category)}`}
                >
                  {fact.category}
                </p>
                <p className="desc">{fact.fact}</p>
                <a href={fact.source} target="_blank" className="source">
                  (source)
                </a>
                <button
                  onClick={() => incrementlikes(fact._id)}
                  className="like-button"
                >
                  <img
                    src="/src/assets/thumbs up.png"
                    alt="Thumbs Up"
                    className="thumb"
                  />{" "}
                  <span className="like-count">{fact.likeCount}</span>
                </button>
                <button
                  onClick={() => incrementmindemoji(fact._id)}
                  className="mind-button"
                >
                  <img
                    src="/src/assets/mind blowing.png"
                    alt="mind blowing"
                    className="mind"
                  />{" "}
                  <span className="mind-count">{fact.mindBlownCount}</span>
                </button>
                <button
                  onClick={() => incrementfalsecount(fact._id)}
                  className="false-button"
                >
                  <img
                    src="/src/assets/false.png"
                    alt="false"
                    className="false"
                  />{" "}
                  <span className="false-count">{fact.falseCount}</span>
                </button>
              </div>
            ))}
          </div>
          <div className="choice">
            <h2>PICK A CATEGORY</h2>
            <ol className="categories">
              <li
                id="technology"
                onClick={handlecategorychange}
                style={{
                  backgroundColor: "rgba(136, 136, 212, 0.849)",
                }}
              >
                TECHNOLOGY
              </li>
              <li
                id="history"
                onClick={handlecategorychange}
                style={{
                  backgroundColor: "rgb(206, 118, 118)",
                }}
              >
                HISTORY
              </li>
              <li
                id="science"
                onClick={handlecategorychange}
                style={{
                  backgroundColor: "rgb(119, 190, 105)",
                }}
              >
                SCIENCE
              </li>
              <li
                id="entertainment"
                onClick={handlecategorychange}
                style={{
                  backgroundColor: "rgb(206, 106, 156)",
                }}
              >
                ENTERTAINMENT
              </li>
              <li
                id="society"
                onClick={handlecategorychange}
                style={{
                  backgroundColor: "rgb(219, 177, 97)",
                }}
              >
                SOCIETY
              </li>
              <li
                id="health"
                onClick={handlecategorychange}
                style={{
                  backgroundColor: "rgb(121, 183, 187)",
                }}
              >
                HEALTH
              </li>
              <li
                id="finance"
                onClick={handlecategorychange}
                style={{
                  backgroundColor: "rgb(214, 70, 70)",
                }}
              >
                FINANCE
              </li>
              <li
                id="news"
                onClick={handlecategorychange}
                style={{
                  backgroundColor: "rgb(142, 78, 202)",
                }}
              >
                NEWS
              </li>
            </ol>
          </div>
          {selectedcategory && (
            <>
              <h2
                className={` h2-text ${getCategoryClass(
                  selectedcategory.toUpperCase()
                )}`}
              >{`Facts of category : ${selectedcategory}`}</h2>
              <div className="filtered-facts">
                {facts.map((fact, index) => (
                  <div key={index}>
                    {selectedcategory === fact.category.toLowerCase() ? (
                      <div className="card">
                        <p
                          className={`category-text ${getCategoryClass(
                            fact.category
                          )}`}
                        >
                          {fact.category}
                        </p>
                        <p className="desc">{fact.fact}</p>
                        <a
                          href={fact.source}
                          target="_blank"
                          className="source"
                        >
                          (source)
                        </a>
                        <button className="like-button">
                          <img
                            src="/src/assets/thumbs up.png"
                            alt="Thumbs Up"
                            className="thumb"
                          />{" "}
                          <span className="like-count">{fact.likeCount}</span>
                        </button>
                        <button className="mind-button">
                          <img
                            src="/src/assets/mind blowing.png"
                            alt="mind blowing"
                            className="mind"
                          />{" "}
                          <span className="mind-count">
                            {fact.mindBlownCount}
                          </span>
                        </button>
                        <button className="false-button">
                          <img
                            src="/src/assets/false.png"
                            alt="false"
                            className="false"
                          />{" "}
                          <span className="false-count">{fact.falseCount}</span>
                        </button>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default App;
