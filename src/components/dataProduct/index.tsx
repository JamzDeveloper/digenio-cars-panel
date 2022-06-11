import { Divider, Text, Image as ImageNextUI } from "@nextui-org/react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import moment from "moment";
import { Product as ProductType } from "../../models/ProductType";

import {
  ContainerDataPrincipal,
  ContainerDataPrincipalLeft,
  ContainerDataProduct,
  ContainerDescription,
  ContainerMedia,
  ContainerFirstRow,
  SaleStatuContainer,
  Subtitle,
  Title,
  ContainerTitle,
  ContainerDataUser,
  ContainerDetailProduct,
  ContainerFeatures,
  ContainerImages,
} from "./style";
import Image from "next/image";

type Props = {
  product?: ProductType;
};

const DataProduct = ({ product }: Props) => {
  return (
    <ContainerDataProduct>
      <ContainerDataPrincipal>
        <ContainerMedia>
          <div>
            {!product?.media ? (
              <ContainerImages>
                <Image
                  width={320}
                  height={180}
                  src={"/images/Imagenotavailable.png"}
                  alt=""
                ></Image>
              </ContainerImages>
            ) : (
              <Carousel
                infiniteLoop={true}
                autoPlay={true}
                emulateTouch={false}
                showThumbs={false}
                width={520}
              >
                {product?.media?.map((media) => (
                  <ImageNextUI
                    width={520}
                    src={`${process.env.NEXT_PUBLIC_URL}/images/${media.url}`}
                    key={media.filename}
                    alt={media.filename}
                  />
                ))}
              </Carousel>
            )}
          </div>
        </ContainerMedia>
        <ContainerDataPrincipalLeft>
          <ContainerFirstRow>
            <ContainerTitle>
              <Title>{product?.name}</Title>
              <Subtitle>
                <p>
                  publisher: {moment(product?.publisher).format("DD/MM/YYYY")}
                </p>
                <p>Ad number: {product?.ad_number}</p>
                <p>
                  {product?.price?.currency} {product?.price?.value}
                </p>
              </Subtitle>
            </ContainerTitle>
            <SaleStatuContainer
              saleStatus={product?.saleStatus == "SOLD" ? true : false}
            >
              <p>{product?.saleStatus}</p>
            </SaleStatuContainer>
          </ContainerFirstRow>
          <Divider color="default" />
          <ContainerDataUser>
            <Text transform="capitalize">
              {product?.location?.country} {product?.location?.city}
            </Text>

            {product?.negotiated ? (
              <Text transform="capitalize">Negotiated</Text>
            ) : (
              <Text transform="capitalize">Not Negotiated</Text>
            )}

            <Text>User : {product?.user?.name}</Text>
          </ContainerDataUser>
          <ContainerDescription>
            <p>{product?.description}</p>
          </ContainerDescription>
          <ContainerTitle>
            <Text
              style={{
                marginBottom: "10px",
                fontWeight: "500",
                fontSize: "1.7rem",
              }}
              transform="capitalize"
            >
              products details
            </Text>
          </ContainerTitle>
          <ContainerDetailProduct>
            <div>
              <Text transform="capitalize">
                <span style={{ fontWeight: "bold" }}>Category : </span>{" "}
                {product?.detail_product?.category?.name}
              </Text>
              <Text transform="capitalize">
                <span style={{ fontWeight: "bold" }}>Brand : </span>
                {product?.detail_product?.brand?.name}
              </Text>
              <Text transform="capitalize">
                <span style={{ fontWeight: "bold" }}>model :</span>
                {product?.detail_product?.model?.name}
              </Text>
              <Text transform="capitalize">
                <span style={{ fontWeight: "bold" }}>
                  manufacturing year :{" "}
                </span>
                {product?.detail_product?.manufacturing_year}
              </Text>
              <Text transform="capitalize">
                <span style={{ fontWeight: "bold" }}>mileage : </span>
                {product?.detail_product?.mileage}
              </Text>
              <Text transform="capitalize">
                <span style={{ fontWeight: "bold" }}>body type : </span>
                {product?.detail_product?.body_type?.name}
              </Text>
            </div>
            <div>
              <Text transform="capitalize">
                <span style={{ fontWeight: "bold" }}>drive type : </span>
                {product?.detail_product?.drive_type?.name}
              </Text>
              <Text transform="capitalize">
                <span style={{ fontWeight: "bold" }}>engine : </span>{" "}
                {product?.detail_product?.engine}
              </Text>
              <Text transform="capitalize">
                <span style={{ fontWeight: "bold" }}>transmission : </span>
                {product?.detail_product?.transmission?.name}
              </Text>
              <Text transform="capitalize">
                <span style={{ fontWeight: "bold" }}>fuel type : </span>
                {product?.detail_product?.fuel_type?.name}
              </Text>
              <Text transform="capitalize">
                <span style={{ fontWeight: "bold" }}>city mpg : </span>{" "}
                {product?.detail_product?.city_mpg}
              </Text>
            </div>
            <div>
              <Text transform="capitalize">
                <span style={{ fontWeight: "bold" }}>highway mpg : </span>
                {product?.detail_product?.highway_mpg}
              </Text>
              <Text transform="capitalize">
                <span style={{ fontWeight: "bold" }}>interior_color: </span>
                {product?.detail_product?.interior_color}
              </Text>
              <Text transform="capitalize">
                <span style={{ fontWeight: "bold" }}>exterior_color: </span>
                {product?.detail_product?.exterior_color}
              </Text>
              <Text>
                <span style={{ fontWeight: "bold" }}>Vin: </span>
                {product?.detail_product?.vin}
              </Text>
              <Text transform="capitalize">
                <span style={{ fontWeight: "bold" }}>condition: </span>
                {product?.detail_product?.condition}
              </Text>
            </div>
          </ContainerDetailProduct>
        </ContainerDataPrincipalLeft>
      </ContainerDataPrincipal>
      <Divider color="default" />
      <ContainerTitle style={{ width: "100%", marginTop: "15px" }}>
        <Text
          style={{
            marginBottom: "10px",
            fontWeight: "500",
            fontSize: "1.7rem",
          }}
          transform="capitalize"
        >
          features
        </Text>
      </ContainerTitle>

      <ContainerFeatures>
        {product?.detail_product?.features?.map((feature, index) => (
          <div key={index}>
            <Text transform="capitalize">{feature.key}</Text>
            <ul>
              {feature.value?.map((value, index) => (
                <li key={index}>{value}</li>
              ))}
            </ul>
          </div>
        ))}
      </ContainerFeatures>
    </ContainerDataProduct>
  );
};
export default DataProduct;
