import {
  SwitchCustomContainer,
  SwitchCustomInput,
  SwitchCustomSpan,
  Container,
} from "./style";

type Props = {
  label?: string;
  register?: any;
  setValue: Function;
  initialValue?: boolean;
};

const SwitchCustom = ({  label, setValue,initialValue }: Props) => {
  return (
    <Container>
      {label ? <label>Premium</label> : null}

      <SwitchCustomContainer>
          
        <SwitchCustomInput
          type="checkbox"
        defaultChecked={initialValue}
          onChange={(e) => setValue(e.target.checked)}
        />
        <SwitchCustomSpan></SwitchCustomSpan>
      </SwitchCustomContainer>
    </Container>
  );
};

export default SwitchCustom;
