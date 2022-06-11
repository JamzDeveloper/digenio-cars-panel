import { Button, Input, Modal, Text } from "@nextui-org/react";
import { ConfigInitial } from "../../models/ConfigInitialType";
import { FormNewProperty } from "./style";

type Props = {
  visibleModal: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleModalToggle: () => void;
  dataConfigInitial: ConfigInitial | null;
  setDataConfigInitial: Function;
};
const ModalConfigInitial = ({
  visibleModal,
  handleModalToggle,
  onSubmit,
  dataConfigInitial,
  setDataConfigInitial,
}: Props) => {
  return (
    <Modal
      closeButton
      aria-labelledby="modal"
      open={visibleModal}
      onClose={handleModalToggle}
    >
      <Modal.Header>
        <Text>Config Initial</Text>
      </Modal.Header>
      <Modal.Body>
        <FormNewProperty onSubmit={onSubmit}>
          <Input
            value={dataConfigInitial?.name}
            label="Name Config"
            onChange={(e) =>
              setDataConfigInitial({
                ...dataConfigInitial,
                name: e.target.value,
              })
            }
          />

          <Input
            value={dataConfigInitial?.initial_user_credits}
            onChange={(e) =>
              setDataConfigInitial({
                ...dataConfigInitial,
                initial_user_credits: parseInt(e.target.value),
              })
            }
            type="number"
            label="Credit User"
          />
          <Input
            value={dataConfigInitial?.initial_months_limit}
            onChange={(e) =>
              setDataConfigInitial({
                ...dataConfigInitial,
                initial_months_limit: parseInt(e.target.value),
              })
            }
            type="number"
            label="Moths Limit"
          />
          <Button style={{ marginTop: "20px" }} type={"submit"}>
            SUBMIT
          </Button>
        </FormNewProperty>
      </Modal.Body>
    </Modal>
  );
};

export default ModalConfigInitial;
