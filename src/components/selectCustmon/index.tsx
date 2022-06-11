import { ContainerOption, SelectOption } from "./style";

type Props = {
  valueInitial: string;
  option: string[];
  register: any;
  label?: string;
};
const SelelectCustom = (props: Props) => {
  const { valueInitial } = props;

  let initial = `${valueInitial}`.toLocaleUpperCase();
  return (
    <ContainerOption>
      {props.label && <label>{props.label}</label>}
      <SelectOption {...props.register} >
        {props.option.map((item: string) => {
          item = item.toLocaleUpperCase();
          if (initial == item) {
            return (
              <option key={item} selected value={item}>
                {item}
              </option>
            );
          } else {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          }
        })}
      </SelectOption>
    </ContainerOption>
  );
};
export default SelelectCustom;
