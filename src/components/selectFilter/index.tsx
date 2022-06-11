import { ContainerOption, SelectOption } from "./style";
type Props = {
  valueInitial: string;
  options: string[];
  setValueFilter: Function;
  label?: string;
};
const SelectFilter = ({
  valueInitial,
  options,
  setValueFilter,
  label,
}: Props) => {
  let initial = `${valueInitial}`.toLocaleUpperCase();

  return (
    <ContainerOption>
      {label && <label>{label}</label>}
      <SelectOption
        onChange={(e) => {
          
          setValueFilter(e.target.value);
        }}
      >
        {options.map((item: string) => {
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
export default SelectFilter;
