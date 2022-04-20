import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Upload = ({ match }: any) => {
  const url: string = "http://8f83-121-66-139-243.ngrok.io";
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const date = Date.now();
  const data = {
    id: date,
  };
  const onLoadFile = (e: any) => {
    const file = e.target.files[0];
    const fileName = e.target.files[0].name;
    setFile(file);
    setFileName(fileName);
    console.log(`file: ${file}, fileName: ${fileName}`);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("images", file);
    formData.append("fileName", fileName);
    formData.append("data", JSON.stringify(data));
    try {
      axios.post(url, formData).then((res) => {
        console.log(res);
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="upload">
      <h1>사진 업로드</h1>
      <h3>
        데일리룩 사진을 첨부하면, <br />
        ai 하두알룩이 오늘의 무드를 분석해줘요!
        <br />
        전신사진일 수록 정확도가 높아진답니다.
      </h3>
      <form onSubmit={handleSubmit} encType="multipart/formdata">
        <input id="file" type="file" name="file" onChange={onLoadFile} />
        <button type="submit" className="button">
          <Link to={`/output/${data.id}`} className="text-link">
            ai하두알룩에게 사진 보내기🤖
          </Link>
        </button>
      </form>
    </div>
  );
};

export default Upload;
