import React, { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";
import getCroppedImage from './getCroppedImage';
import {
  PopupButton,
  PopupContainer,
  PopupForm,
  PopupHeader,
  PopupSelector,
  PopupTextInput,
} from "./Reusables/reusables";

const CropperContainer: React.FC<{}> = (props) => {
  const { children } = props;
  return (
    <main
      style={{
        position: "relative",
        height: "350px",
        backgroundColor: "#2a2c30",
      }}
    >
      {children}
    </main>
  );
};

const CropperButton: React.FC<{Submit: () => void}> = (props) => {
  const { Submit } = props;
  return (
    <button 
      onClick={Submit}
      style={{
        backgroundColor: '#44b581',
        color: '#fff',
        fontWeight: 'bold',
        border: 'none',
        padding: '12px 0',
        margin: '10px 3%',
        borderRadius: '10px'
      }}
    >
      Finalize
    </button>
  )
}

const CreatePopup: React.FC<{
  Submit: (event: any, name: string, profile: string) => void;
}> = (props) => {
  const { Submit } = props;
  const [name, SetName] = useState<string>("");
  const [profile, SetProfile] = useState<string>("");
  const [zoom, setZoom] = useState<number>(1);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 10, y: 10 });
  const [cropper, SetCropper] = useState<boolean>(false);
  const [croppedAreaPixel, setCroppedAreaPixel] = useState<Area | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const InputRef = useRef(null);

  const HandleNameChange = (event: any): void => {
    const value = event.target.value;
    SetName(value);
  };

  const ReadFile = (event: any) => {
    const img_file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      // @ts-ignore
      SetProfile(reader.result);
      SetCropper(true);
    };
    reader.readAsDataURL(img_file);
  };

  const SelectProfileHandler = () => {
    if (InputRef !== null) {
      // @ts-ignore
      InputRef.current.click();
    }
  };

  const onCropComplete = useCallback((Area: Area, AreaPixels: Area) => {}, []);

  const FinalizeCropping = async() => {
    // @ts-ignore
    const cropped_image: string = getCroppedImage(profile, croppedAreaPixel);
    setCroppedImage(cropped_image);
    SetCropper(false);
  };

  let PopupContents = () => {
    return (
      <React.Fragment>
        <PopupForm Submit={(e: any) => Submit(e, name, profile)}>
          <PopupTextInput
            name="group-name"
            placeholder="Group Name"
            type="text"
            value={name}
            handleChange={HandleNameChange}
            id="group-name-input"
          />
          <input hidden type="file" ref={InputRef} onChange={ReadFile} />
          <PopupSelector title="Select Profile" Submit={SelectProfileHandler} />
          <PopupButton title="Create" />
        </PopupForm>
      </React.Fragment>
    );
  };

  const CropChangeHandler = (location: Point) => {
    if (location.x !== crop.x || location.y !== crop.y) {
      setCrop(location);
    }
  }

  console.log(crop);

  if (cropper && profile.length > 10) {
    PopupContents = () => {
      return (
        <React.Fragment>
          <CropperContainer>
            <Cropper
              image={profile}
              crop={crop}
              zoom={zoom}
              aspect={37.7777 / 45}
              onCropChange={(location: Point) => console.log(location)}
              onCropComplete={onCropComplete}
              onZoomChange={(zoom_count: number) => setZoom(zoom_count)}
            />
          </CropperContainer>
          <CropperButton Submit={FinalizeCropping}/>
        </React.Fragment>
      );
    };
  }

  return (
    <React.Fragment>
      <PopupContainer>
        <PopupHeader title="Create Team" />
        <PopupContents />
      </PopupContainer>
    </React.Fragment>
  );
};

export default React.memo(CreatePopup);