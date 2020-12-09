import React, { useContext } from "react";
import { Text } from "react-native";
import { FlatList, TouchableOpacity } from "react-native";
import { ThemeContext } from "../../ThemeProvider";
import { vscodeThemes } from "../../themes";
import { MyButton } from "../../ui/MyButton";
import { MyHeader } from "../../ui/MyHeader";
import { MyText } from "../../ui/MyText";
import { ScreenWrapper } from "../../ui/ScreenWrapper";

interface ChangeThemeProps {}

export const ChangeTheme: React.FC<ChangeThemeProps> = ({}) => {
  const [{ editorForeground }, setTheme] = useContext(ThemeContext);
  return (
    <ScreenWrapper noPadding>
      <FlatList
        data={vscodeThemes}
        keyExtractor={({ name }) => name}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{
                borderBottomColor: editorForeground,
                borderBottomWidth: 1,
                padding: 16,
              }}
              onPress={() => setTheme(item.name)}
            >
              <MyText style={{ fontSize: 18 }}>{item.name}</MyText>
            </TouchableOpacity>
          );
        }}
      />
    </ScreenWrapper>
  );
};
