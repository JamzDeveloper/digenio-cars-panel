import { Button, Input, Modal, Text } from "@nextui-org/react";
import { FormNewProperty } from "../../styles/style.properties";

type Props = {
  visibleModal: boolean;
  handleModalToggle: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  nameNewProperty: string;
  setNameNewProperty: (nameNewProperty: string) => void;
  errorNewProperty: string;
};

const ModalProperty = ({
  visibleModal,
  handleModalToggle,
  onSubmit,
  nameNewProperty,
  setNameNewProperty,
  errorNewProperty,
}: Props) => {
  return (
    <Modal
      closeButton
      aria-labelledby="modal"
      open={visibleModal}
      onClose={handleModalToggle}
    >
      <Modal.Header>
        <Text>Property</Text>
      </Modal.Header>
      <Modal.Body>
        <FormNewProperty method="POST" onSubmit={onSubmit}>
          <Input
            label="Name Property"
            type="text"
            placeholder="Name Property"
            value={nameNewProperty}
            onChange={(e) => setNameNewProperty(e.target.value.toLocaleUpperCase())}
          />
          {errorNewProperty ? (
            <Text color="red">{errorNewProperty}</Text>
          ) : null}
          <Button style={{ marginTop: "15px" }} type="submit">
            SUBMIT
          </Button>
        </FormNewProperty>
      </Modal.Body>
    </Modal>
  );
};

export default ModalProperty;
