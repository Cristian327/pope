import React, { useEffect, useState } from "react";
import "./App.css";

import Nav from "./components/nav/Nav";
import BannerTop from "./components/banner-top/BannerTop";
import BannerBottom from "./components/banner-bottom/BannerBottom";
import Header from "./components/header/header";
import Footer from "./components/footer/Footer";

import Card from "./components/cards/Cards";
import Data from "./data/data.json";
import { textLength } from "./manage/helpers/text-space";
import { calcPercentage } from "./manage/helpers/calc-percentage";
import { calcDate } from "./manage/helpers/calcu-date";

const App = () => {
  // Data state Array
  const [data, setData] = useState({});

  useEffect(() => {
    if (!!localStorage.getItem("data")) {
      setData(JSON.parse(localStorage.getItem("data")));
    } else {
      setData(Data);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  // Button onchange and votes
  const updateLike = (positive, negative) => {
    const counterPositive = positive === "positive" ? 1 : 0;
    const counterNegative = negative === "negative" ? 1 : 0;

    const positiveSum = positive + counterPositive;
    const negativeRest = negative + counterNegative;

    return positiveSum || negativeRest;
  };

  // State If grid or list are selected
  const [selectInfo, setSelectInfo] = useState({
    list: true,
    grid: true,
  });

  // If grid or list are selected
  const toggleListOrGrid = (event) => {
    if (event.target.value === "grid") {
      setSelectInfo({ list: false, grid: true });
    } else {
      setSelectInfo({ list: true, grid: true });
    }
  };

  // Today funtion
  const infoDate = (dateInfoItem, category) => {
    const { month, days, year } = calcDate(dateInfoItem);
    if (days === 0 && month === 0 && year === 0) {
      return `Today in ${category}`;
    }
    if (month < 12) {
      return month === 1
        ? `${month} month ago in ${category}`
        : `${month} month ago in ${category}`;
    } else if (days < 31) {
      return days === 1
        ? `${days} days ago in ${category}`
        : `${days} days ago in ${category}`;
    } else {
      return year === 1
        ? `${year} year ago in ${category}`
        : `${year} years ago in ${category}`;
    }
  };

  return (
    <div>
      <Nav />
      <Header />
      {/* Center All objects */}
      <div className="max-centered">
        <BannerTop />
        <main role="main">
          <div className="cards-to-vote">
            <div className="cards-head">
              <h2 className="card-votes__title">Previous Rulings</h2>
              <select
                className="select-cards__button"
                onClick={toggleListOrGrid}
                onChange={toggleListOrGrid}
                name="SelectTypeView"
              >
                <option value="list">List</option>
                <option value="grid">Grid</option>
              </select>
            </div>
            <ul
              className={
                selectInfo.list
                  ? "card-votes__list card-votes__grid "
                  : "card-votes__grid "
              }
            >
              <div>
                {/* Map objects call obejects json*/}
                {data?.data &&
                  data.data.map(
                    (
                      {
                        picture,
                        lastUpdated,
                        name,
                        description,
                        category,
                        votes: { negative, positive },
                      },
                      index
                    ) => {
                      return (
                        <li key={index} className="card-votes__li">
                          <Card
                            index={index}
                            cardImageUrl={picture}
                            cardImageDescription={name}
                            description={textLength(description, 70)}
                            title={textLength(name, 21)}
                            textDate={infoDate(lastUpdated, category)}
                            iconHandUrl={
                              positive > negative ? "like.png" : "dislike.png"
                            }
                            iconHandDescription={
                              positive > negative ? "Ganando" : "Perdiendo"
                            }
                            iconHandModifier={
                              positive > negative ? "blue" : "yellow"
                            }
                            percentageDislike={calcPercentage(
                              negative + positive,
                              negative
                            )}
                            percentageLike={calcPercentage(
                              negative + positive,
                              positive
                            )}
                            vote={updateLike}
                          />
                        </li>
                      );
                    }
                  )}
              </div>
            </ul>
          </div>
        </main>
        <BannerBottom />
        <Footer />
      </div>
    </div>
  );
};

export default App;
