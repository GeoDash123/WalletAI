import { Colors } from "@/constants/colors";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View } from "react-native";

type Props = {
  value: string;
  items: string[];
  onChange: (value: string) => void;
};

export default function Select({ value, items, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Picker selectedValue={value} onValueChange={(value) => onChange(value)}>
        {items.map((item) => (
          <Picker.Item key={item} label={item} value={item} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
  },
});
