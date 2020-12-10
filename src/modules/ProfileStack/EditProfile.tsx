import format from "date-fns/format";
import { Formik } from "formik";
import React, { useRef } from "react";
import { Platform, ScrollView, View } from "react-native";
import { useMutation, useQuery, useQueryCache } from "react-query";
const yup = require("yup");
import { initialProfileData } from "../../constants";
import { DatePickerField } from "../../form-fields/DatePickerField";
import { FlairSelectField } from "../../form-fields/FlairSelectField";
import { RadioGroupField } from "../../form-fields/RadioGroupField";
import { TextField } from "../../form-fields/TextField";
import { defaultMutationFn } from "../../Providers";
import { registerForPushNotifications } from "../../registerForPushNotifications";
import { MeResponse } from "../../types";
import { CheckboxWithLabel } from "../../ui/CheckboxWithLabel";
import { ErrorText } from "../../ui/ErrorText";
import { Flair } from "../../ui/Flair";
import { FormSpacer } from "../../ui/FormSpacer";
import { FullscreenLoading } from "../../ui/FullscreenLoading";
import { KeyboardAwareScrollView } from "../../ui/KeyboardAwareScrollView";
import { Label } from "../../ui/Label";
import { LoadingButton } from "../../ui/LoadingButton";
import { LocationAutocomplete } from "../../ui/LocationAutocomplete";
import { MyTextInput } from "../../ui/MyTextInput";
import { ScreenWrapper } from "../../ui/ScreenWrapper";
import { getAge, userToInitialFormData } from "../../utils";
import { ProfileStackNav } from "./ProfileNav";

const schema = yup.object().shape({
  displayName: yup.string().required().max(50),
  bio: yup.string().required().max(150),
  ageRangeMax: yup.number().required().min(18).max(150),
  ageRangeMin: yup.number().required().min(18).max(150),
});

export const EditProfile: React.FC<ProfileStackNav<"editProfile">> = ({
  navigation,
}) => {
  const scrollView = useRef<ScrollView>(null);
  const { data, isLoading } = useQuery<MeResponse>("/me");
  const cache = useQueryCache();
  const [mutate, { isLoading: mutIsLoading }] = useMutation(defaultMutationFn);

  if (isLoading) {
    return <FullscreenLoading />;
  }

  return (
    <ScreenWrapper>
      <Formik
        initialValues={
          data?.user ? userToInitialFormData(data.user) : initialProfileData
        }
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={schema}
        onSubmit={async ({ sendNotifs, ...values }) => {
          const d: any = {
            ...values,
            ageRangeMax: parseInt(values.ageRangeMax),
            ageRangeMin: parseInt(values.ageRangeMin),
            birthday: format(values.birthday, "yyyy-MM-dd"),
          };

          if (data!.user!.hasPushToken !== sendNotifs) {
            if (sendNotifs) {
              const t = await registerForPushNotifications();
              if (t) {
                d.pushToken = t;
              }
            } else {
              d.pushToken = null;
            }
          }
          try {
            const { user } = await mutate(["/user", d, "PUT"]);
            cache.setQueryData("/me", { user });
            cache.invalidateQueries("/feed");
            if (data!.user!.codeImgIds.length) {
              navigation.goBack();
            } else {
              navigation.navigate(`codeSnippeter`, { replace: true });
            }
          } catch {}
        }}
      >
        {({ values, setFieldValue, handleSubmit, errors }) => {
          const age = getAge(values.birthday);
          const tooYoung = age < 18 && Platform.OS === "ios";
          return (
            <KeyboardAwareScrollView
              ref={scrollView}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <FormSpacer>
                <TextField name="displayName" label="Name" />
              </FormSpacer>
              <FormSpacer>
                <TextField name="bio" label="Bio" multiline />
              </FormSpacer>
              <FormSpacer>
                <FlairSelectField
                  name="flair"
                  label={
                    values.flair ? (
                      <Flair name={values.flair as any} />
                    ) : (
                      "Flair"
                    )
                  }
                />
              </FormSpacer>
              <FormSpacer>
                <DatePickerField
                  name="birthday"
                  label={`Birthday (used to compute age: ${age})`}
                />
                {tooYoung ? (
                  <ErrorText>
                    You need to be 18 or older to use the app.
                  </ErrorText>
                ) : null}
              </FormSpacer>
              <FormSpacer>
                <RadioGroupField
                  name="goal"
                  label="I'm looking for:"
                  onValue={(v) => {
                    if (v === "friendship") {
                      values.ageRangeMin = initialProfileData.ageRangeMin;
                      values.ageRangeMax = initialProfileData.ageRangeMax;
                    }
                  }}
                  options={[
                    ...(age >= 18
                      ? [
                          {
                            label: "love",
                            value: "love",
                          },
                        ]
                      : []),
                    { label: "friendship", value: "friendship" },
                  ]}
                />
              </FormSpacer>
              {values.goal === "love" ? (
                <>
                  <FormSpacer>
                    <RadioGroupField
                      name="gender"
                      label="Your Gender:"
                      options={[
                        { label: "male", value: "male" },
                        { label: "female", value: "female" },
                      ]}
                    />
                  </FormSpacer>
                  <FormSpacer>
                    <RadioGroupField
                      name="genderToShow"
                      label="Show me code from:"
                      options={[
                        { label: "males", value: "male" },
                        { label: "females", value: "female" },
                        { label: "everyone", value: "everyone" },
                      ]}
                    />
                  </FormSpacer>
                  <FormSpacer>
                    <View style={{ marginBottom: 8 }}>
                      <Label>Age Range: </Label>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <MyTextInput
                        keyboardType="numeric"
                        value={values.ageRangeMin}
                        onChangeText={(x) => setFieldValue("ageRangeMin", x)}
                      />
                      <MyTextInput
                        style={{ marginLeft: 16 }}
                        keyboardType="numeric"
                        value={"" + values.ageRangeMax}
                        onChangeText={(x) => setFieldValue("ageRangeMax", x)}
                      />
                    </View>
                    {errors.ageRangeMax ? (
                      <ErrorText style={{ marginTop: 8 }}>
                        {errors.ageRangeMax}
                      </ErrorText>
                    ) : null}
                    {errors.ageRangeMin ? (
                      <ErrorText style={{ marginTop: 4 }}>
                        {errors.ageRangeMin}
                      </ErrorText>
                    ) : null}
                  </FormSpacer>
                  <FormSpacer>
                    <View style={{ marginBottom: 4 }}>
                      <Label>City: </Label>
                    </View>
                    <LocationAutocomplete
                      defaultValue={values.location}
                      onFocus={() => {
                        scrollView.current?.scrollToEnd();
                      }}
                      onLocation={(x) => {
                        setFieldValue("location", x);
                      }}
                    />
                    <View style={{ marginTop: 6 }}>
                      <CheckboxWithLabel
                        checked={values.global}
                        onPress={() => setFieldValue("global", !values.global)}
                        label="see people from around the world after you've run out of profiles nearby"
                      />
                    </View>
                  </FormSpacer>
                </>
              ) : null}
              <FormSpacer>
                <View style={{ marginBottom: 4 }}>
                  <Label>Notifications: </Label>
                </View>
                <CheckboxWithLabel
                  checked={values.sendNotifs}
                  onPress={() =>
                    setFieldValue("sendNotifs", !values.sendNotifs)
                  }
                  label="send me them on new matches/messages"
                />
              </FormSpacer>
              <View style={{ paddingTop: 10 }}>
                {tooYoung ? null : (
                  <LoadingButton
                    isLoading={mutIsLoading}
                    onPress={() => handleSubmit()}
                  >
                    {data!.user!.codeImgIds.length ? "save" : "next"}
                  </LoadingButton>
                )}
              </View>
              <View style={{ height: 30 }} />
            </KeyboardAwareScrollView>
          );
        }}
      </Formik>
    </ScreenWrapper>
  );
};
