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
        <FormItem className="grid gap-3">
          <FormLabel className="font-semibold text-lg">{label}</FormLabel>
          <FormMessage />
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="grid"
            >
              {options.map((option) => (
                <FormItem
                  key={option.type}
                  className="flex items-center gap-2 text-gray-800"
                >
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
