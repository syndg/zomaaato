import { FieldValues, FieldPath, ControllerProps } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CustomRadioProps {
  label: string;
  options: { type: string; label: string }[];
}

const CustomRadio = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  options,
  ...props
}: Omit<ControllerProps<TFieldValues, TName>, "render"> & CustomRadioProps) => {
  return (
    <FormField
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormMessage />
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              {options.map((option) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <RadioGroupItem value={option.type} />
                  </FormControl>
                  <FormLabel className="font-normal">{option.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
      {...props}
    />
  );
};

export default CustomRadio;
