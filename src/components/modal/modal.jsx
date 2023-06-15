import { useModalStore } from "../../store/store";
function Modal() {
  const {
    isOpen,
    closeModal,
    modalType,
    style,
    title,
    content,
    onClose = closeModal,
  } = useModalStore();

  const renderContent = () => {
    switch (modalType) {
      case "schedule":
        return <div>{content}</div>;
      case "comment":
        return <div>{content}</div>;
      case "info":
        return <div>{content}</div>;
      case "updateUserInfo":
        return <div>{content}</div>;
      default:
        return null;
    }
  };

  return (
    <>
      {isOpen && (
        <div>
          <style>
            {`
            .modal {
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 100%;
              height: 100%;
              overflow: auto;
              background-color: #B09FCE;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
              z-index: 9999;
            }
  
            .modalContent {
              width: 100%;
              height: 100%;
              padding: 20px;
              display: grid;
              grid-template-rows : 1fr 15fr;
            }
            .modalhead {
              width: 100%;
              height: 100%;
            }
            .modalCloseBtn {
              position: absolute;
              top: 10px;
              right: 10px;
              background-color: transparent;
              border: none;
              cursor: pointer;
              
            }
            .modalCloseBtn>img {
              width: 30px;
              height: 30px;
            }

            .modalBody {
              margin-top: 20px;
            }
  
            .modalScrollable {
              max-height: 100%;
              overflow-y: auto;
            }
  
            .modalInner {
              white-space: pre-wrap;
            }
            `}
          </style>
          <div className="modal" style={{ ...style }}>
            <div className="modalContent">
              <div className="modalhead">
                <div className="modaltitle text-center font-bold">{title}</div>
                <button className="modalCloseBtn" onClick={onClose}>
                  <img src="/public/assets/close.webp" alt="Close" />
                </button>
              </div>
              <div className="modalBody">
                <div className="modalScrollable">
                  <div
                    className="modalInner"
                    style={{
                      width: "100%",
                      height: "100%",
                      color: "black",
                      overflowY: "auto",
                    }}
                  >
                    {renderContent()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
