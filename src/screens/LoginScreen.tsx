import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import { login } from "../features/auth/authSlice";
import { useAppDispatch } from "../store/hooks";

type LoginErrors = {
  email?: string;
  password?: string;
};

const MIN_PASSWORD_LENGTH = 6;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginScreen() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});

  const handleLogin = () => {
    const validationErrors = validateLoginForm(email, password);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    dispatch(login({ email: email.trim() }));
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
          <View className="flex flex-col gap-[10px]">
            <Text className="text-[15px] text-[#FFFFFF]">Email</Text>
            <TextInput
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(value) => {
                setEmail(value);
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
              <Text className="text-[13px] text-[#FCA5A5]">
                {errors.email}
              </Text>
            ) : null}
          </View>
          <View className="flex flex-col gap-[10px]">
            <Text className="text-[15px] text-[#FFFFFF]">Password</Text>
            <TextInput
              onChangeText={(value) => {
                setPassword(value);
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
            onPress={handleLogin}
            className="rounded-[8px] bg-[#9B0DD9] py-[15px]"
          >
            <Text className="text-center font-bold text-[#fff]">LOGIN</Text>
          </Pressable>
          <Text className="text-center text-[#928787]">
            No Account? <Text className="text-[#fff]">Register</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

function validateLoginForm(email: string, password: string) {
  const nextErrors: LoginErrors = {};
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    nextErrors.email = "Email is required";
  } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
    nextErrors.email = "Enter a valid email";
  }

  if (!password) {
    nextErrors.password = "Password is required";
  } else if (password.length < MIN_PASSWORD_LENGTH) {
    nextErrors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
  }

  return nextErrors;
}
