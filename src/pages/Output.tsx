import { useState } from "react";
import { Link } from "react-router-dom";
import Social from "../components/Social";

export default function Output(props: any) {
  //const url: string = "http://54.67.69.32:80/";
  //console.log(props.location.state);
  const aiData = props.location.state.data;
  console.log(aiData);

  return (
    <div className="output">
      <h1>결과</h1>
      {aiData.products.map((aiData: any) => (
        <div key={props.location.state.id}>
          <p>{aiData.data[1]}</p>
        </div>
      ))}
      {/*data.map((data) => (
        <div key={data.id}>
          <img className="output-img" src={data.image} />
          <p>오늘 당신의 무드는 </p>
          <p>🕶 우주 최강 힙스터 무드 🕶</p>
          <p>
            <p>{data[1]}%</p>
            <p>{data[2]}%</p>
            <p>{data[3]}%</p>
            <p>{data[4]}%</p>
            <p>{data[5]}%</p>
            <p>{data[6]}%</p>
            <p>{data[7]}%</p>
          </p>
          설명~~
        </div>
      ))*/}
      <Social />
      <div className="button">
        <Link to="/" className="text-link">
          다시 테스트하기
        </Link>
      </div>
    </div>
  );
}
