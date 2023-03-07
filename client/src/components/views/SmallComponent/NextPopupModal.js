import ModalComponent from "./ModalComponent";
import { Link, useNavigate } from "react-router-dom";

const NextPopupModal = (props) => {
  const pageName = props;

  let navigation = useNavigate();

  return (
    <>
      <div className="pageAlarm">
        <p>'예'를 누르면 더 이상 정보를 수정할 수 없습니다.</p>
        <p>개인 정보를 수정하려면 '마이페이지'를 찾길 바랍니다.</p>
        <p>다음 페이지로 넘어가겠습니까?</p>
        <button
          className="leftButton"
          onClick={() => {
            navigation("/detailProfile");
            console.log(pageName);
          }}
        >
          예
        </button>
        <button className="rightButton" onClick={() => {}}>
          아니오
        </button>
      </div>
    </>
  );
};

export default NextPopupModal;
