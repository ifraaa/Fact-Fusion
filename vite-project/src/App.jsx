import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const [selectedcategory, setcategory] = useState("");
  const [sharebtn, setsharebtn] = useState(false);
  const [facts, setfacts] = useState([]);
  const [like, setlike] = useState(false);
  const [mind, setmind] = useState(false);
  const [falsebtn, setfalse] = useState(false);
  const [factDescription, setFactDescription] = useState("");
  const [factSource, setFactSource] = useState("");
  const [ncategory, setncategory] = useState("");
  const [selectedFactCategory, setSelectedFactCategory] = useState("");

  const newfactcategory = (e) => {
    const cat = e.target.id;
    setncategory(cat);
    setSelectedFactCategory(cat);
    console.log(cat);
  };

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
      setmind((prev) => !prev);
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
      setfalse((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };
  const getCategoryClass = (category) => `category-${category}`;

  const handleDescriptionChange = (e) => {
    setFactDescription(e.target.value);
  };

  const handleSourceChange = (e) => {
    setFactSource(e.target.value);
  };
  const handlepostfact = async () => {
    if (!factDescription || !factSource || !ncategory) {
      alert("Please fill out all fields.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/postfact", {
        fact: factDescription,
        source: factSource,
        category: ncategory.toUpperCase(),
        likeCount: 0,
        mindBlownCount: 0,
        falseCount: 0,
      });
      setFactDescription("");
      setFactSource("");
      setncategory("");
      setSelectedFactCategory("");
      setsharebtn(false);
      setlike((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getfacts();
  }, []);

  useEffect(() => {
    getfacts();
  }, [like]);

  useEffect(() => {
    getfacts();
  }, [mind]);

  useEffect(() => {
    getfacts();
  }, [falsebtn]);
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
          <h1>SHARE A FACT WITH US!!</h1>
          <textarea
            name="desc"
            id="desc"
            placeholder="Enter your fact here"
            value={factDescription}
            onChange={handleDescriptionChange}
          ></textarea>
          <input
            id="src"
            type="text"
            placeholder="enter a valid source"
            value={factSource}
            onChange={handleSourceChange}
          />
          <div>
            <h2 style={{ color: "white" }}>PICK A CATEGORY</h2>
            <ol className="categories">
              <li
                id="technology"
                onClick={newfactcategory}
                style={{
                  backgroundColor:
                    selectedFactCategory === "technology"
                      ? "white"
                      : "rgba(136, 136, 212, 0.849)",
                }}
              >
                TECHNOLOGY
              </li>
              <li
                id="history"
                onClick={newfactcategory}
                style={{
                  backgroundColor:
                    selectedFactCategory === "history"
                      ? "white"
                      : "rgb(206, 118, 118)",
                }}
              >
                HISTORY
              </li>
              <li
                id="science"
                onClick={newfactcategory}
                style={{
                  backgroundColor:
                    selectedFactCategory === "science"
                      ? "white"
                      : "rgb(119, 190, 105)",
                }}
              >
                SCIENCE
              </li>
              <li
                id="entertainment"
                onClick={newfactcategory}
                style={{
                  backgroundColor:
                    selectedFactCategory === "entertainment"
                      ? "white"
                      : "rgb(206, 106, 156)",
                }}
              >
                ENTERTAINMENT
              </li>
              <li
                id="society"
                onClick={newfactcategory}
                style={{
                  backgroundColor:
                    selectedFactCategory === "society"
                      ? "white"
                      : "rgb(219, 177, 97)",
                }}
              >
                SOCIETY
              </li>
              <li
                id="health"
                onClick={newfactcategory}
                style={{
                  backgroundColor:
                    selectedFactCategory === "health"
                      ? "white"
                      : "rgb(121, 183, 187)",
                }}
              >
                HEALTH
              </li>
              <li
                id="finance"
                onClick={newfactcategory}
                style={{
                  backgroundColor:
                    selectedFactCategory === "finance"
                      ? "white"
                      : "rgb(214, 70, 70)",
                }}
              >
                FINANCE
              </li>
              <li
                id="news"
                onClick={newfactcategory}
                style={{
                  backgroundColor:
                    selectedFactCategory === "news"
                      ? "white"
                      : "rgb(142, 78, 202)",
                }}
              >
                NEWS
              </li>
            </ol>
          </div>
          <button onClick={handlepostfact} className="post-btn">
            POST
          </button>
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
                      <div className="filtered-card">
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
                          <span className="mind-count">
                            {fact.mindBlownCount}
                          </span>
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
