import React from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { useQuery, useQueryCache } from "react-query";
import { useTheme } from "../../hooks/useTheme";
import { MeResponse } from "../../types";
import { Avatar } from "../../ui/Avatar";
import { Cog } from "../../ui/Cog";
import { Flair } from "../../ui/Flair";
import { FullscreenLoading } from "../../ui/FullscreenLoading";
import { MyButton } from "../../ui/MyButton";
import { MyText } from "../../ui/MyText";
import { ScreenWrapper } from "../../ui/ScreenWrapper";
import { genId, getAge } from "../../utils";
import { ProfileStackNav } from "./ProfileNav";
import { useCodeImgs } from "./useCodeImgs";
import { SimpleLineIcons } from "@expo/vector-icons";
import { setTokens } from "../../Providers";

export const ViewProfile: React.FC<ProfileStackNav<"viewProfile">> = ({
  navigation,
}) => {
  const { buttonBackground } = useTheme();
  const { data } = useQuery<MeResponse>("/me");
  const cache = useQueryCache();

  if (!data?.user) {
    return <FullscreenLoading />;
  }

  const { user } = data;

  return (
    <ScreenWrapper>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          width: "100%",
        }}
      >
        <MyText>{user.numLikes} likes</MyText>
        <View style={{ height: 28, marginLeft: "auto", flexDirection: "row" }}>
          <Cog />
          <TouchableOpacity
            style={{ paddingLeft: 10 }}
            onPress={() => {
              Alert.alert(
                "Do you want to logout?",
                "",
                [
                  {
                    text: "Cancel",
                    onPress: () => {},
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () => {
                      setTokens("", "");
                      cache.setQueryData<MeResponse>("/me", { user: null });
                    },
                  },
                ],
                { cancelable: false }
              );
            }}
          >
            <SimpleLineIcons name="logout" size={27} color={buttonBackground} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate(`viewCard`, { id: user.id })}
        >
          <Avatar size={100} src={user.photoUrl} />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MyText style={{ marginTop: 10, fontSize: 22, fontWeight: "600" }}>
            {user.displayName}, {getAge(new Date(user.birthday))}
          </MyText>
          {user.flair ? (
            <View style={{ marginLeft: 4, marginTop: 10 }}>
              <Flair name={user.flair as any} />
            </View>
          ) : null}
        </View>
        <View style={{ width: "100%", marginTop: 20 }}>
          <MyButton
            style={{ width: "100%" }}
            onPress={() => navigation.navigate("editProfile")}
            secondary
          >
            edit profile
          </MyButton>
        </View>
        <View style={{ width: "100%", marginTop: 20 }}>
          <MyButton
            style={{ width: "100%" }}
            onPress={() => {
              useCodeImgs.getState().set({
                codeImgs: user.codeImgIds.map((value) => ({
                  value,
                  tmpId: genId(),
                })),
              });
              navigation.navigate("manageCodePics");
            }}
            secondary
          >
            edit code pics
          </MyButton>
        </View>
      </View>
    </ScreenWrapper>
  );
};
