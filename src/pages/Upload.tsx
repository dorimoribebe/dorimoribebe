import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

const Upload = ({ match }: any) => {
  //http://54.67.69.32:443/ -> 아마 https
  //http://54.67.69.32:80/ -> http
  //http://8f83-121-66-139-243.ngrok.io -> 서버님 노트북 로컬
  //http://43bb-121-66-139-243.ngrok.io
  const url: string = "http://93fb-121-66-139-243.ngrok.io";
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [aiData, setAiData] = useState();
  const [isShown, setIsShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

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
    setImageSrc(URL.createObjectURL(file));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("images", file);
    formData.append("fileName", fileName);
    formData.append("data", JSON.stringify(data));

    try {
      setLoading(true);
      axios
        .post(url, formData) //
        .then((res) => {
          setLoading(false);
          console.log(res);
          setAiData(res.data);
          setIsShow(true);
        })
        .catch(function (error) {
          setLoading(false);
          
          if (error.response) {
            // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답
            alert("서버에 문제가 생겼어요😥 페이지 새로고침 후 이용해주세요 (500)");
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // 요청이 이루어 졌으나 응답을 받지 못함
            alert("응답할 수 없어요😥 페이지 새로고침 후 이용해주세요(400)");
            console.log(error.request);
          } else {
            // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
            alert("요청 설정 중에 문제가 발생했어요😥 페이지 새로고침 후 이용해주세요(400)");
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    } catch (e) {
      console.log(e);
      alert("에러가 발생했어요😥 페이지 새로고침 후 이용해주세요. 문제가 지속될 시 관리자에게 문의 바랍니다🙏");
    }
  };

  if (loading) {
    return (
      <div>
        <div>
          <h2>ai하두알룩이 분석하고 있어요!🤖</h2>
          <div className="spinner">
            <ReactLoading
              type="spin"
              color="fff"
              height={"30%"}
              width={"30%"}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="upload" hidden={isShown}>
        <h1>사진 업로드</h1>
        <div className="contents">
          <h3>
            데일리룩 사진을 첨부하면, <br />
            ai 하두알룩이 오늘의 무드를 분석해줘요!
            <br />
            전신사진일 수록 정확도가 높아진답니다.
          </h3>

          <form onSubmit={handleSubmit} encType="multipart/formdata">
            <input
              id="file"
              type="file"
              name="file"
              required
              onChange={onLoadFile}
            />
            <div>
              {imageSrc && (
                <img className="preview" src={imageSrc} alt="preview-img" />
              )}
            </div>
            <div>
              <button type="submit" className="button">
                ai하두알룩에게 사진 보내기🤖
              </button>
            </div>
          </form>
        </div>
      </div>
      <div hidden={!isShown}>
        <h1>결과 보러 가기🎈</h1>
        <h3>
          ai 하두알룩이 분석을 마쳤어요.
          <br />
          결과 페이지에서 데일리룩 분석을 확인해보러 가요!
        </h3>
        <Link
          to={{
            pathname: `/output/${data.id}`,
            state: [
              {
                id: data.id,
                data: aiData,
              },
            ],
          }}
          className="text-link"
        >
          <h2>
            <div className="button">Let's Go!🚀</div>
          </h2>
        </Link>
      </div>
    </>
  );
};

export default Upload;
