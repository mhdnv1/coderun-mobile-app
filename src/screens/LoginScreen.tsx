import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import { login } from "../features/auth/authSlice";
import {
  validateLoginForm,
  type LoginErrors,
} from "../features/auth/validation";
import { useLoginUserMutation } from "../services/authApi";
import { useAppDispatch } from "../store/hooks";

export function LoginScreen() {
  const dispatch = useAppDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [formError, setFormError] = useState("");

  const handleLogin = async () => {
    const validationErrors = validateLoginForm(email, password);
    setErrors(validationErrors);
    setFormError("");

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      const result = await loginUser({
        email: email.trim(),
        password,
      }).unwrap();

      dispatch(login(result));
    } catch {
      setFormError("Invalid email or password");
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-[#010827] px-4">
      <View className="flex w-full max-w-[357px] flex-col gap-[34px]">
        <View className="border-b border-[#928787] pb-[26px]">
          <Text className="text-center text-[41px] font-bold text-[#fff]">
            CodeRun
          </Text>
          <Text className="text-center text-[20px] font-bold text-[#fff]">
            Digital Calling Card
          </Text>
        </View>
        <View className="flex flex-col gap-[28px]">
          <Text className="text-center text-[20px] font-bold text-[#fff]">
            LOGIN
          </Text>
          {formError ? (
            <Text className="rounded-[8px] border border-[#FCA5A5] bg-[#450A0A] px-3 py-2 text-center text-[13px] text-[#FCA5A5]">
              {formError}
            </Text>
          ) : null}
          <View className="flex flex-col gap-[10px]">
            <Text className="text-[15px] text-[#FFFFFF]">Email</Text>
            <TextInput
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(value) => {
                setEmail(value);
                setFormError("");
                setErrors((currentErrors) => ({
                  ...currentErrors,
                  email: undefined,
                }));
              }}
              placeholder="Enter your Email"
              placeholderTextColor="#928787"
              value={email}
              className="rounded-[8px] border border-[#928787] px-[13px] py-[15px] text-[#fff]"
            />
            {errors.email ? (
              <Text className="text-[13px] text-[#FCA5A5]">{errors.email}</Text>
            ) : null}
          </View>
          <View className="flex flex-col gap-[10px]">
            <Text className="text-[15px] text-[#FFFFFF]">Password</Text>
            <TextInput
              onChangeText={(value) => {
                setPassword(value);
                setFormError("");
                setErrors((currentErrors) => ({
                  ...currentErrors,
                  password: undefined,
                }));
              }}
              placeholder="Enter your Password"
              placeholderTextColor="#928787"
              secureTextEntry
              value={password}
              className="rounded-[8px] border border-[#928787] px-[13px] py-[15px] text-[#fff]"
            />
            {errors.password ? (
              <Text className="text-[13px] text-[#FCA5A5]">
                {errors.password}
              </Text>
            ) : null}
          </View>
        </View>
        <View className="flex gap-[28px]">
          <Text className="text-[15px] font-bold text-[#fff]">
            Forgot Password?
          </Text>
          <Pressable
            accessibilityRole="button"
            disabled={isLoading}
            onPress={handleLogin}
            className={`rounded-[8px] py-[15px] ${
              isLoading ? "bg-[#5B2B70]" : "bg-[#9B0DD9]"
            }`}
          >
            <Text className="text-center font-bold text-[#fff]">
              {isLoading ? "LOGGING IN..." : "LOGIN"}
            </Text>
          </Pressable>
          <Text className="text-center text-[#928787]">
            No Account? <Text className="text-[#fff]">Register</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
