import { Image, Input, Text, Button } from "@nextui-org/react";
import { useContext, useState } from "react";
import {
  ContainerColummEditUser,
  ContainerEditUser,
  ContainerOption,
  Form,
  ContainerImage,
  InputFile,
} from "./style";
import SelelectCustom from "../selectCustmon";
import { User } from "../../models/UserType";
import moment from "moment";
import { InputEditUser } from "../../types/type.user";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { UPDATEUSER } from "../../graphql/mutation/mutation.user";
import { UsersDataContext } from "../../context/usersData";
import SwitchCustom from "../switchCustom";
import { FileTypeInput } from "../../models/Types";

type Props = {
  data?: User;
};
const FormEditUser = ({ data }: Props) => {
  const { updateOneUser } = useContext(UsersDataContext);
  const [statePremium, setStatePremium] = useState(data?.premiun);
  const [image, setImage] = useState<FileTypeInput>({
    file: null,
    profileImg: "/images/Imagenotavailable.png",
  });

  const [saveUser, { loading, error }] = useMutation(UPDATEUSER);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputEditUser>({
    defaultValues: {
      name: data?.name,
      username: data?.username,
      email: data?.email,
      type_account: data?.type_account,
      type_user: data?.type_user,
      gender: data?.gender,
      phone_number: data?.phone_number,
      credits: data?.credits,
      recovery_code: data?.recovery_code,
      publication_limit: moment(data?.publication_limit).format("YYYY-MM-DD"),
      premiun: data?.premiun,
    },
  });
  const onSubmit: any = async (dataInput: InputEditUser) => {
    if (dataInput) {
      const response = await saveUser({
        variables: {
          data: {
            name: dataInput.name,
            username: dataInput.username,
            email: dataInput.email,
            type_account: dataInput.type_account,
            type_user: dataInput.type_user,
            gender: dataInput.gender,
            credits: dataInput.credits,
            publication_limit: moment(dataInput.publication_limit).format(),
            recovery_code: dataInput.recovery_code,
            premiun: statePremium,
            phone_number: {
              number: dataInput.phone_number!.number,
              country_code: parseInt(
                dataInput.phone_number!.country_code.toString()
              ),
            },
          },
          updateUserByAdminId: `${data!._id}`,
        },
      });

      if (response) {
        updateOneUser(response.data.updateUserByAdmin);
        alert("Usuario actualizado");
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
      <ContainerEditUser>
        <ContainerColummEditUser>
          <ContainerImage>
            <Image
              width={320}
              height={180}
              maxDelay={10000}
              src={
                data?.photo
                  ? `${process.env.NEXT_PUBLIC_URL}/images/${data.photo}`
                  : image?.profileImg
              }
              alt={data?.name}
            />
      
          </ContainerImage>
        </ContainerColummEditUser>
        <ContainerColummEditUser>
          <Input
            clearable
            label="Username"
            initialValue={data?.username}
            placeholder="Username"
            {...register("username", { required: true })}
          />
          <Input
            clearable
            label="Email"
            placeholder="Email"
            type={"email"}
            initialValue={data?.email}
            {...register("email", { required: true })}
          />
          <Input
            clearable
            label="Name"
            placeholder="Name"
            initialValue={data?.name}
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
          <ContainerOption>
            <label>Type Account</label>

            <SelelectCustom
              valueInitial={data?.type_account as string}
              option={["PARTICULAR", "CONCESSIONAIRE"]}
              register={{
                ...register("type_account", { required: true }),
              }}
            />
          </ContainerOption>
        </ContainerColummEditUser>
        <ContainerColummEditUser>
          <ContainerOption>
            <label>Type User</label>
            <SelelectCustom
              valueInitial={data?.type_user as string}
              option={["USER", "ADMIN", "WRITER", "SUPER_ADMIN"]}
              register={{
                ...register("type_user", { required: true }),
              }}
            />
          </ContainerOption>
          <Input
            label="Credits"
            placeholder="Credits"
            type={"number"}
            initialValue={data?.credits?.toString()}
            {...register("credits", { required: true })}
          />
          <Input
            width="186px"
            label="Publication Limit"
            type="date"
            {...register("publication_limit", { required: true })}
          />
          <Input
            label="Recovery Code "
            placeholder="Recovery Code"
            type={"number"}
            initialValue={data?.recovery_code?.toString()}
            {...register("recovery_code", { required: false })}
          />
          <SwitchCustom
            initialValue={data?.premiun}
            label="Premium"
            setValue={setStatePremium}
          />
        </ContainerColummEditUser>
      </ContainerEditUser>

      <Button type="submit">
        <Text>Save</Text>
      </Button>
    </Form>
  );
};
export default FormEditUser;
