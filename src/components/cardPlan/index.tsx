import { useState } from "react";

import {
  ButtonSeeMore,
  ContainerCard,
  ContainerCardActions,
  ContainerDescriptionContent,
  ContainerDescriptionPlan,
  ContainerImg,
  ContainerMenuOptions,
  ContainerNamePlan,
  ContainerPrice,
  ContainerStatus,
  ElementDescription,
  MoreInformation,
} from "./style";
import { EditIcon } from "../../assets/svg-components/editIcon";
import { DeleteIcon } from "../../assets/svg-components/deleteIcon";
import PointOption from "../../assets/svg-components/PointOption";
import { Props } from "./type";
import ProductIcon from "./../../assets/svg-components/AddProduct";
import TimeIcon from "./../../assets/svg-components/Time";
import StarIcon from "../../assets/svg-components/Star";
import { Image, Switch } from "@nextui-org/react";
import OnOff from "../../assets/svg-components/OnOff";

const CardPlan = ({ dataPlan, deletePlan, toggleActive, editPlan }: Props) => {
  const [stateMenu, setStateMenu] = useState<boolean>(false);
  const [stateMoreInformation, setStateMoreInformation] =
    useState<boolean>(false);

  const details = dataPlan.details?.reduce((acc, curr) => {
    return acc + `${curr[0].toLocaleUpperCase()}${curr.substring(1)}` + ", ";
  }, "");

  return (
    <ContainerCard>
      <ContainerStatus>
        <Switch
          checked={dataPlan.state}
          onChange={() => toggleActive(dataPlan._id!)}
          iconOff={<OnOff color="#d91d00" />}
          iconOn={<OnOff color=" #00a706" />}
          initialChecked={dataPlan.state}
        ></Switch>
      </ContainerStatus>
      <ContainerCardActions stateMenu={stateMenu}>
        <div onClick={() => setStateMenu(!stateMenu)}>
          <PointOption width="30" height="6" />
        </div>
        <ContainerMenuOptions stateMenu={stateMenu}>
          <li>
            <button
              style={{ border: "none", background: "none", cursor: "pointer" }}
              onClick={() => {
                editPlan(dataPlan);
              }}
            >
              <EditIcon size={20} fill="#0070f3" />
            </button>
          </li>
          <li>
            <button
              style={{ border: "none", background: "none", cursor: "pointer" }}
              onClick={() => deletePlan(dataPlan._id!)}
            >
              <DeleteIcon size={20} fill="#d91d00" />
            </button>
          </li>
        </ContainerMenuOptions>
      </ContainerCardActions>
      <ContainerImg>
        <Image
          src={
            dataPlan.image
              ? `${process.env.NEXT_PUBLIC_URL}/images/${dataPlan.image}`
              : "/images/Imagenotavailable.png"
          }
          alt="image Plan"
        />
      </ContainerImg>
      <ContainerNamePlan>
        <p>{dataPlan.name}</p>
        <span>{dataPlan.type_plan}</span>
      </ContainerNamePlan>
      <ContainerDescriptionPlan>
        <ContainerDescriptionContent>
          <ElementDescription>
            <div>
              <ProductIcon width={20} height={20} color="#00A411" />
              <span>{dataPlan.credits}</span>
            </div>
            <p>Products</p>
          </ElementDescription>

          <ElementDescription>
            <div>
              <TimeIcon width={20} height={20} color="#009BFF" />{" "}
              <span>{dataPlan.plan_time}</span>
            </div>
            <p>Month</p>
          </ElementDescription>
          <ElementDescription>
            <div>
              <StarIcon width={20} height={20} color="#e5e619" />
              <span>{dataPlan.featured_products ? "Yes" : "Not"}</span>
            </div>
            <p>Featured Products </p>
          </ElementDescription>
        </ContainerDescriptionContent>
        <ContainerPrice>
          <p>{`$ ${dataPlan.price?.value} ${dataPlan.price?.currency}`}</p>
        </ContainerPrice>
        <ButtonSeeMore
          onClick={() => setStateMoreInformation(!stateMoreInformation)}
        >
          See more
        </ButtonSeeMore>
        <MoreInformation stateMoreInformation={stateMoreInformation}>
          <h3>Description</h3>
          <p>{dataPlan.description}</p>
          <h3>Details</h3>
          <p>{details}</p>
        </MoreInformation>
      </ContainerDescriptionPlan>
    </ContainerCard>
  );
};

export default CardPlan;
