import { useState } from "react";
import { Button, Image, Input, Text, Switch } from "@nextui-org/react";
import {
  Form,
  ContainerNewUser,
  ColumnNewUser,
  ContainerImage,
  InputFile,
} from "./style";

import { User as NewUserType } from "../../models/UserType";
import { useForm } from "react-hook-form";
import SelelectCustom from "../selectCustmon";
import { FileTypeInput as FileType } from "../../models/Types";
import { CREATEUSER } from "./mutation.graphql";
import { useMutation } from "@apollo/client";
import SwitchCustom from "../switchCustom";

export const FormNewUser = () => {
  const [statePremium, setStatePremium] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewUserType>({
    defaultValues: {
      credits: 0,
      premiun: statePremium,
    },
  });

  const [image, setImage] = useState<FileType>();
  const [creteUser, { loading, error }] = useMutation(CREATEUSER);

  const onSubmit = async (dataInput: NewUserType) => {

    if (dataInput) {
      const response = await creteUser({
        variables: {
          data: {
            username: dataInput.username,
            name: dataInput.name,
            email: dataInput.email,
            password: dataInput.password,
            gender: dataInput.gender,
            credits: parseInt(dataInput.credits!.toString()),
            type_user: dataInput.type_user,
            type_account: dataInput.type_account,
            publication_limit: dataInput.publication_limit,
            premiun: statePremium,
            phone_number: {
              number: dataInput.phone_number!.number,
              country_code: parseInt(
                dataInput.phone_number!.country_code.toString()
              ),
            },
          },
          file: image?.file,
        },
      });
      if (response) {
        setStatePremium(false);
        reset();
        setImage({
          file: null,
          profileImg: null,
        });
        alert("Usuario creado");
      }
    }
  };

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
    <Form method="POST" onSubmit={handleSubmit(onSubmit)}>
      <ContainerNewUser>
        <ColumnNewUser>
          <ContainerImage>
            <Image
              width={320}
              height={180}
              objectFit="cover"
              src={
                !image?.profileImg
                  ? "/images/Imagenotavailable.png"
                  : image?.profileImg
              }
              alt=""
            />
            {image?.file ? <button onClick={deleteImage}>X</button> : null}
          </ContainerImage>
          <Button style={{ marginTop: "15px" }}>
            <label htmlFor="btn-file">Select File</label>
            <InputFile id="btn-file" onChange={handleImage} type={"file"} />
          </Button>
        </ColumnNewUser>
        <ColumnNewUser>
          {console.log(errors)}
          <Input
            clearable
            label="Username"
            placeholder="Username"
            {...register("username", { required: true })}
          />
          <Input
            clearable
            label="Email"
            placeholder="Email"
            type={"email"}
            {...register("email", { required: true })}
          />
          <Input
            clearable
            label="Password"
            placeholder="Password"
            {...register("password", { required: true })}
          />

          <SelelectCustom
            label="Type User"
            valueInitial="USER"
            option={["USER", "ADMIN", "WRITER", "SUPER_ADMIN"]}
            register={{
              ...register("type_user", { required: true }),
            }}
          />
        </ColumnNewUser>
        <ColumnNewUser>
          <Input
            clearable
            label="Name"
            placeholder="Name"
            {...register("name", { required: true })}
          />
          <Input
            clearable
            label="Country Code"
            placeholder="Code"
            type={"number"}
            {...register("phone_number.country_code", { required: true })}
          />
          <Input
            clearable
            label="Phone"
            placeholder="Phone"
            type={"number"}
            {...register("phone_number.number", { required: true })}
          />
          <SelelectCustom
            label="Gender"
            valueInitial="Other"
            option={["Other", "Male", "Female"]}
            register={{
              ...register("gender"),
            }}
          />

          <SelelectCustom
            label="Type Account"
            valueInitial="PARTICULAR"
            option={["PARTICULAR", "CONCESSIONAIRE"]}
            register={{
              ...register("type_account", { required: true }),
            }}
          />
        </ColumnNewUser>

        <ColumnNewUser>
          <Input
            width="186px"
            label="Publication Limit"
            type="date"
            {...register("publication_limit", { required: true })}
          />
          <Input
            label="Credits"
            placeholder="Credits"
            type={"number"}
            {...register("credits", { required: true })}
          />

          <SwitchCustom label="Premium" setValue={setStatePremium} />
        </ColumnNewUser>
      </ContainerNewUser>
      <Button
        type="submit"
        onClick={() => {
          console.log("hello");
        }}
      >
        <Text color="#ffffff">Save</Text>
      </Button>
    </Form>
  );
};
export default FormNewUser;
