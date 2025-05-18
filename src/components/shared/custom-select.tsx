import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Dispatch, SetStateAction } from 'react';

type SelectItemType = {
  value: string;
  label: string;
};
export default function CustomSelect({
  value,
  setValue,
  values,
  placeholder,
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  values: SelectItemType[];
  placeholder: string;
}) {
  return (
    <Select onValueChange={(value) => setValue(value)}>
      <SelectTrigger className="w-[180px] ">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{placeholder}</SelectLabel>
          {values.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
