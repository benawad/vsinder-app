import React, { useContext } from "react";
import { Text } from "react-native";
import { FlatList, TouchableOpacity } from "react-native";
import { ThemeContext } from "../../ThemeProvider";
import { vscodeThemes } from "../../themes";
import { Cell } from "../../ui/Cell";
import { MyButton } from "../../ui/MyButton";
import { MyHeader } from "../../ui/MyHeader";
import { MyText } from "../../ui/MyText";
import { ScreenWrapper } from "../../ui/ScreenWrapper";

interface ChangeThemeProps {}

export const ChangeTheme: React.FC<ChangeThemeProps> = ({}) => {
  return (
    <ScreenWrapper noPadding>
      <FlatList
        data={vscodeThemes}
        keyExtractor={({ name }) => name}
        renderItem={({ item }) => {
          return <Cell onPress={() => setTheme(item.name)}>{item.name}</Cell>;
        }}
      />
    </ScreenWrapper>
  );
};
