import Select from "react-select";

import { FileType } from "../../models/Types";

import {
  Button,
  Modal,
  Input,
  Switch,
  Text,
  Textarea,
} from "@nextui-org/react";
import Image from "next/image";
import {
  Container,
  ContainerImage,
  ContainerColumnNewProperty,
  Form,
  InputFile,
  ContainerOption,
  Buttoncustom,
  ContainerDetails,
  ContainerDetailsItem,
} from "./style";
import Add from "../../assets/svg-components/add";
import { useState, useEffect } from "react";
import { Plan } from "../../models/Plan";
import { arrayCurrency } from "../../helpers/currency";

type Props = {
  visibleModal: boolean;
  handleModalToggle: () => void;

  plan: Plan;
  setPlan: Function;
  image: FileType;
  setImage: Function;
  handleSubmit: (e: React.FormEvent) => void;
};

type TypeOption = {
  value: string;
  label: string;
};
const ModalPlan = ({
  visibleModal,
  handleModalToggle,

  plan,
  setPlan,
  image,
  setImage,
  handleSubmit,
}: Props) => {
  const [arrayDetails, setArrayDetails] = useState<string[]>([]);
  const [elementDetail, setElementDetail] = useState<string>("");
  const [arrayCurrentOptions, setArrayCurrentOptions] = useState<TypeOption[]>(
    []
  );
  useEffect(() => {
    if (plan.details) {
      setArrayDetails(plan.details);
    } else {
      setArrayDetails([]);
    }
  }, [visibleModal]);

  useEffect(() => {
    const arrayOptions = arrayCurrency.map((item: string) => {
      return {
        value: item.toLocaleUpperCase(),
        label: item.toLocaleUpperCase(),
      };
    });

    setArrayCurrentOptions(arrayOptions);
  }, []);
  const handleImage = (e: any) => {
    const file = (e.target as any).files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage({ file: file, profileImg: reader.result });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const deleteImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setImage({ file: null, profileImg: null });
  };

  return (
    <Modal
      closeButton
      aria-labelledby="modal"
      open={visibleModal}
      onClose={handleModalToggle}
      width="700px"
    >
      <Modal.Header>
        <Text size={30} weight="bold">
          Plan
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Form style={{ height: "100%" }} onSubmit={handleSubmit}>
          <Container>
            <ContainerColumnNewProperty style={{ height: "300px" }}>
              <ContainerImage>
                <Image
                  width={320}
                  height={180}
                  objectFit="contain"
                  src={
                    !image?.profileImg
                      ? "/images/Imagenotavailable.png"
                      : image?.profileImg
                  }
                  alt=""
                />

                {image?.file || image.profileImg ? (
                  <button type="button" onClick={deleteImage}>
                    X
                  </button>
                ) : null}
              </ContainerImage>
              <Button style={{ marginTop: "15px", padding: "0px" }}>
                <label
                  htmlFor="btn-file"
                  style={{ width: "316px", cursor: "pointer" }}
                >
                  Select File
                </label>
                <InputFile id="btn-file" onChange={handleImage} type={"file"} />
              </Button>
            </ContainerColumnNewProperty>

            <ContainerColumnNewProperty>
              <div>
                <Input
                  label="Name Value"
                  value={plan.name || ""}
                  onChange={(e) => {
                    setPlan({ ...plan, name: e.target.value });
                  }}
                  placeholder="Name Value"
                />
              </div>
              <div>
                <Input
                  label="Type Plan"
                  value={plan.type_plan || ""}
                  onChange={(e) => {
                    setPlan({ ...plan, type_plan: e.target.value });
                  }}
                  placeholder="Type Plan"
                />
              </div>
              <ContainerOption>
                <label>Currency Price</label>
                <Select
                  value={{
                    value: plan.price?.currency,
                    label: plan.price?.currency,
                  }}
                  onChange={(e: any) => {
                    setPlan({
                      ...plan,
                      price: {
                        ...plan.price,
                        currency: e.value,
                      },
                    });
                  }}
                  options={arrayCurrentOptions as TypeOption[]}
                />
              </ContainerOption>
              <div>
                <Input
                  label="Price value"
                  value={plan.price?.value}
                  placeholder="Price value"
                  onChange={(e) => {
                    setPlan({
                      ...plan,
                      price: {
                        ...plan.price,
                        value: parseFloat(e.target.value),
                      },
                    });
                  }}
                  type={"number"}
                />
              </div>
            </ContainerColumnNewProperty>
          </Container>

          <Container style={{ width: "100%" }}>
            <ContainerColumnNewProperty>
              <div>
                <Input
                  label="Quality Products"
                  placeholder="Quality Products"
                  value={plan.credits}
                  onChange={(e) => {
                    setPlan({ ...plan, credits: parseInt(e.target.value) });
                  }}
                  type={"number"}
                />
              </div>
              <div>
                <Input
                  label="Number of  Months"
                  value={plan.plan_time}
                  onChange={(e) => {
                    setPlan({ ...plan, plan_time: parseInt(e.target.value) });
                  }}
                  placeholder="Number of  Months"
                  type={"number"}
                />
              </div>
              <ContainerOption>
                <label>
                  <Text>Featured Products</Text>
                </label>
                <Switch
                  checked={plan.featured_products}
                  onChange={(e) => {
                    setPlan({ ...plan, featured_products: e.target.checked });
                  }}
                />
              </ContainerOption>
            </ContainerColumnNewProperty>
            <ContainerColumnNewProperty>
              <div>
                <Textarea
                  label="Description"
                  value={plan.description || ""}
                  onChange={(e) => {
                    setPlan({ ...plan, description: e.target.value });
                  }}
                  placeholder="Description"
                />
              </div>
              <div>
                <Input
                  label="add details"
                  contentRightStyling={false}
                  value={elementDetail}
                  onChange={(e) => {
                    setElementDetail(e.target.value);
                  }}
                  contentRight={
                    <Buttoncustom
                      onClick={(e) => {
                        e.preventDefault();
                        if (elementDetail) {
                          setPlan({
                            ...plan,
                            details: [...arrayDetails, elementDetail],
                          });
                          setArrayDetails([...arrayDetails, elementDetail]);
                        }
                        setElementDetail("");
                      }}
                      aria-label="delete details"
                      aria-labelledby="delete details"
                    >
                      <Add />
                    </Buttoncustom>
                  }
                />
              </div>
            </ContainerColumnNewProperty>
          </Container>
          <Container
            style={{ justifyContent: "center", flexDirection: "column" }}
          >
            <Text size={25} weight={"bold"}>
              Details
            </Text>
            <ContainerDetails>
              {plan.details
                ? arrayDetails.map((item, index) => {
                    return (
                      <ContainerDetailsItem key={index}>
                        <Text>{item}</Text>
                        <Buttoncustom
                          onClick={(e) => {
                            e.preventDefault();
                            setArrayDetails(
                              arrayDetails.filter((name, i) => i !== index)
                            );
                            setPlan({
                              ...plan,
                              details: arrayDetails.filter(
                                (name, i) => i !== index
                              ),
                            });
                          }}
                        >
                          x
                        </Buttoncustom>
                      </ContainerDetailsItem>
                    );
                  })
                : null}
            </ContainerDetails>
          </Container>
          <Button type="submit" style={{ marginTop: "50px" }}>
            <Text color="#ffffff">Save</Text>
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalPlan;
