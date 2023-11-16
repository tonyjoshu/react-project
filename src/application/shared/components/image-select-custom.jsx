import Column from "./Column";
import Label from "./Label";
import ButtonStyled from "./ButtonStyled";
import Row from "./Row";
import { RiImageAddLine } from "react-icons/ri";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";

export default function CustomImageSelector({
  picInputRef,
  image,
  setter,
  buttonLabel,
  imageFileSetter,
  noHelper,
  width = "100%",
}) {
  const handleChange = (event) => {
    const fileToUpload = event.target.files[0];
    imageFileSetter(fileToUpload);
    setter(URL.createObjectURL(fileToUpload));
  };

  return (
    <Column style={{ width: width }}>
      {!noHelper && <Label small noWrap text={"Manager's profile image"} />}
      {image ? (
        <div
          style={{
            height: 250,
            aspectRatio: 1,
            borderRadius: "50%",
            overflow: "clip",
          }}
        >
          <img
            src={image}
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
            alt={""}
          />
        </div>
      ) : (
        <Label small noWrap text={"No image selected"} />
      )}
      <input
        type={"file"}
        accept={"image/*"}
        ref={picInputRef}
        onChange={handleChange}
        style={{ display: "none" }}
      />
      <ButtonStyled
        style={{
          width: "100%",
          backgroundColor: "whitesmoke",
          border: `1px solid ${"#85F4FF"}`,
          color: "#212121",
        }}
        onClick={() => picInputRef.current.click()}
      >
        <Row j_center a_center gap={10}>
          <RiImageAddLine style={{ fontSize: "large" }} />
          <Label noWrap text={image ? "Change image" : buttonLabel} />
        </Row>
      </ButtonStyled>
    </Column>
  );
}
