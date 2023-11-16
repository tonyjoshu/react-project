import { useAtomValue } from "jotai";
import { useRef } from "react";
import { useEffect, useState } from "react";
import ButtonStyled from "src/application/shared/components/ButtonStyled";
import Column from "src/application/shared/components/Column";
import GridStyled from "src/application/shared/components/GridStyled";
import CustomImageSelector from "src/application/shared/components/image-select-custom";
import InputFieldCustom from "src/application/shared/components/input-field-cutom";
import Label from "src/application/shared/components/Label";
import ModalPopUp from "src/application/shared/components/ModalPopUp";
import Row from "src/application/shared/components/Row";
import { adminTokenConfig } from "src/config/jotai/atoms";
import URLS from "src/config/urls/urls";
import apiCall from "src/helper_functions/api_call";
import { uploadImageToCloudinary } from "src/helper_functions/upload_to_cloudinary";

export default function Partners() {
  const partnersHook = usePartnersHook();

  return (
    <Column>
      <Row j_between>
        <Label a_s_left xLarge xBold text={"Partners"} color={"grey"} />
        <ButtonStyled
          onClick={partnersHook.handleOpenModal}
          style={{ width: "fit-content" }}
        >
          Add new partner
        </ButtonStyled>
      </Row>

      {partnersHook.loading ? (
        <Label text={"loading partners ..."} />
      ) : (
        <>
          <GridStyled
            style={{
              gridTemplateColumns: "repeat(4, 1fr)",
              width: "100%",
            }}
          >
            {partnersHook.partnersList?.map((partner, index) => {
              return (
                <Column
                  alignCenter
                  key={index}
                  style={{
                    width: 250,
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    overflow: "clip",
                    border: `1px solid #85F4FF`,
                  }}
                >
                  <h2
                    style={{
                      fontWeight: 800,
                      width: "100%",
                      backgroundColor: "whitesmoke",
                      paddingBlock: 20,
                      textAlign: "center",
                      color: "#212121",
                    }}
                  >
                    {partner?.name}
                  </h2>
                  <div
                    style={{
                      height: 200,
                      aspectRatio: 1,
                      backgroundColor: "#fff",
                    }}
                  >
                    <img
                      src={partner?.logo}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </Column>
              );
            })}
          </GridStyled>
        </>
      )}

      <ModalPopUp
        open={partnersHook.openModal}
        handleClose={partnersHook.handleCloseModal}
        children={
          <>
            {partnersHook.loadingModal ? (
              <Column a_center j_center style={{ padding: 50 }}>
                <Label text={"adding partner ..."} />
              </Column>
            ) : (
              <Column>
                <Label
                  a_s_left
                  xBold
                  xLarge
                  color={"grey"}
                  text={"Adding a partner"}
                />
                <InputFieldCustom
                  label={"Partner name"}
                  value={partnersHook.name}
                  setter={partnersHook.setName}
                  placeholder={"enter partner's name"}
                />
                <CustomImageSelector
                  buttonLabel={"Select partner image"}
                  image={partnersHook.image}
                  setter={partnersHook.setImage}
                  imageFileSetter={partnersHook.setImageFile}
                  picInputRef={partnersHook.picInputRef}
                  noHelper
                />
                <br />
                <ButtonStyled
                  onClick={partnersHook.handleConfirmAddPartner}
                  style={{}}
                >
                  Confirm add partner
                </ButtonStyled>
              </Column>
            )}
          </>
        }
      />
    </Column>
  );
}

function usePartnersHook() {
  const { config } = useAtomValue(adminTokenConfig);

  const [partnersList, setPartnersList] = useState([]);
  const [loading, setLoading] = useState(false);

  const picInputRef = useRef(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState();
  const [imageFile, setImageFile] = useState();

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setName("");
    setImage();
    setImageFile();
  };

  // for re-running the useeffect
  const [reRun, setRerun] = useState(0);

  const [loadingModal, setLoadingModal] = useState(false);

  const handleConfirmAddPartner = async () => {
    if (name === "") return;
    if (imageFile === null) return;

    setLoadingModal(true);
    const secure_url = await uploadImageToCloudinary(imageFile);

    if (secure_url === "") {
      alert("something went wrong when uploading image");
      setLoadingModal(false);
      handleCloseModal();
      return;
    }

    const response = await apiCall({
      url: URLS.addPartner,
      method: "post",
      body: { name: name, logo: secure_url },
      config: config,
      tokenRequired: true,
    });

    setLoadingModal(false);
    handleCloseModal();
    setRerun((prev) => prev + 1);
  };

  useEffect(() => {
    const api_call = async () => {
      setLoading(true);
      const response = await apiCall({ url: URLS.partners });
      if (response.status === 200) {
        setPartnersList((prev) => {
          prev = response.data;
          return prev;
        });
      }
      setLoading(false);
    };
    api_call();
  }, [reRun]);

  return {
    loading,
    partnersList,
    openModal,
    handleOpenModal,
    handleCloseModal,
    name,
    setName,
    image,
    setImage,
    imageFile,
    setImageFile,
    picInputRef,
    handleConfirmAddPartner,
    loadingModal,
  };
}
