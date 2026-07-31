import { Colors } from "@/constants/colors";
import { Dropdown } from "react-native-element-dropdown";
import { StyleSheet } from "react-native";

type Props = {
  value: string;
  items: string[];
  onChange: (value: string) => void;
};

export default function Select({
  value,
  items,
  onChange,
}: Props) {
  const data = items.map((item) => ({
    label: item,
    value: item,
  }));

  return (
    <Dropdown
      style={styles.dropdown}
      data={data}
      labelField="label"
      valueField="value"
      value={value}
      placeholder="Selecciona una categoría"
      onChange={(item) => onChange(item.value)}
    />
  );
}

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 52,
    marginBottom: 15,
  },
});