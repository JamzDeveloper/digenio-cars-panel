import { ContainerOption, SelectOption } from "./style";

import { Value } from "../../models/PropertyType";
import { useId } from "@react-aria/utils";
type Props = {
  valueInitial: string;
  option: string[];
  onChangeCapure: (e: any) => void;
  label?: string;
};
const SelectPropertyValue = (props: Props) => {
  const { valueInitial, option, onChangeCapure, label } = props;


  return (
    <ContainerOption>
      {label && <label>{label}</label>}
      <SelectOption onClickCapture={onChangeCapure}>
        {option.map((item: string, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </SelectOption>
    </ContainerOption>
  );
};
export default SelectPropertyValue;
