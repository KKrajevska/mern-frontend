import styled from "@emotion/styled";
import { PlaceT } from "lib/types";
import React, { FC, useState } from "react";
import { Button } from "shared/components/FormElements/Button";
import { Card } from "shared/components/UI/Card";
import { Map } from "shared/components/UI/Map";
import { Modal } from "shared/components/UI/Modal";

interface PlaceItemT {
  place: PlaceT;
}

export const PlaceItem: FC<PlaceItemT> = ({ place }) => {
  const [showMap, setShowMap] = useState<boolean>(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  return (
    <>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        modalOverlay={{
          header: place.address,
          children: (
            <MapCointainer>
              <Map center={place.location} zoom={16} />
            </MapCointainer>
          ),
          padding: "0",
          textAlign: "right",
          footer: <Button onClick={closeMapHandler}>CLOSE</Button>,
        }}
      ></Modal>
      <LI>
        <Card padding={"0"}>
          <Image>
            <Img src={place.imageUrl} alt={place.title} />
          </Image>
          <Info>
            <H2>{place.title}</H2>
            <H3>{place.address}</H3>
            <P>{place.description}</P>
          </Info>
          <Actions>
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            <Button to={`/places/${place.id}`}>EDIT</Button>
            <Button danger>DELETE</Button>
          </Actions>
        </Card>
      </LI>
    </>
  );
};

const LI = styled.li`
  margin: 1rem 0;
`;

const Image = styled.div`
  width: 100%;
  height: 12.5rem;
  margin-right: 1.5rem;
  @media (min-width: 768px) {
    height: 20rem;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  padding: 1rem;
  text-align: center;
`;

const Actions = styled.div`
  padding: 1rem;
  text-align: center;
  border-top: 1px solid #ccc;
`;

const H2 = styled.h2`
  margin: 0 0 0.5rem 0;
`;

const H3 = styled.h3`
  margin: 0 0 0.5rem 0;
`;

const P = styled.p`
  margin: 0 0 0.5rem 0;
`;

const MapCointainer = styled.div`
  height: 15rem;
  width: 100%;
`;
