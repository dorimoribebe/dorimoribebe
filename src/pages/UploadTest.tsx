import { useState } from "react";
import axios from "axios";
import imageCompression from "browser-image-compression";

export default function Upload() {
  const url: string = "http://54.67.69.32:5000/";
  const now = Date.now();
  const [file, setFile] = useState("");
  const [fileList, setFileList] = useState("");
  // const [now, setNow] = useState("");

  const onLoadFile = (e: any) => {
    const file = e.target.files[0];
    const fileList = e.target.files;
    setFile(file);
    setFile(fileList);
    console.log(file);
    console.log(fileList);
  };
  const onSubmit = async () => {
    actionImgCompress(fileList);
  };

  const actionImgCompress = async (fileSrc: any) => {
    console.log("압축 시작");

    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      // 압축 결과
      const compressedFile = await imageCompression(fileSrc, options);

      // const reader = new FileReader();
      // reader.readAsDataURL(compressedFile);
      // reader.onloadend = () => {
      //   const base64data = reader.result;
      //   imageHandling(base64data);
      // };
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("images", file);

    const options = {
      url: url,
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      data: formData,
    };

    try {
      axios.post(url, options).then((res) => {
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
      <form onSubmit={handleSubmit}>
        <input id="file" type="file" name="file" onChange={onLoadFile} />
        <button type="submit" className="button">
          ai하두알룩에게 사진 보내기🤖
        </button>
      </form>
    </div>
  );
}
