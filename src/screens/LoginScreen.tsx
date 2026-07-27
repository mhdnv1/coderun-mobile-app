import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import { colors } from "../config/theme";
import { useAuth } from "../features/auth/AuthProvider";
import { validateEmail, validatePassword } from "../features/auth/validation";
import { signIn } from "../shared/api/mockApi";

export function LoginScreen() {
  const router = useRouter();
  const { setSession } = useAuth();
  const [formError, setFormError] = useState("");

  const loginMutation = useMutation({
    mutationFn: signIn,
    onSuccess: async (session) => {
      await setSession(session);
      router.replace("/contacts");
    },
    onError: () => {
      setFormError("Invalid email or password");
    },
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setFormError("");
      await loginMutation.mutateAsync({
        email: value.email.trim(),
        password: value.password,
      });
    },
  });

  return (
    <View className="flex-1 items-center justify-center bg-app-bg px-4">
      <View className="flex w-full max-w-[357px] flex-col gap-[34px]">
        <View className="border-b border-login-border pb-[26px]">
          <Text className="text-center text-[41px] font-bold text-surface">
            CodeRun
          </Text>
          <Text className="text-center text-[20px] font-bold text-surface">
            Digital Calling Card
          </Text>
        </View>
        <View className="flex flex-col gap-[28px]">
          <Text className="text-center text-[20px] font-bold text-surface">
            LOGIN
          </Text>
          {formError ? (
            <Text className="rounded-[8px] border border-danger-light bg-danger-dark px-3 py-2 text-center text-[13px] text-danger-light">
              {formError}
            </Text>
          ) : null}
          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) => validateEmail(value),
              onSubmit: ({ value }) => validateEmail(value),
            }}
          >
            {(field) => (
              <View className="flex flex-col gap-[10px]">
                <Text className="text-[15px] text-surface">Email</Text>
                <TextInput
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onBlur={field.handleBlur}
                  onChangeText={(value) => {
                    setFormError("");
                    field.handleChange(value);
                  }}
                  placeholder="Enter your Email"
                  placeholderTextColor={colors.muted}
                  value={field.state.value}
                  className="rounded-[8px] border border-login-border px-[13px] py-[15px] text-surface"
                />
                <FieldError message={field.state.meta.errors[0]} />
              </View>
            )}
          </form.Field>
          <form.Field
            name="password"
            validators={{
              onChange: ({ value }) => validatePassword(value),
              onSubmit: ({ value }) => validatePassword(value),
            }}
          >
            {(field) => (
              <View className="flex flex-col gap-[10px]">
                <Text className="text-[15px] text-surface">Password</Text>
                <TextInput
                  onBlur={field.handleBlur}
                  onChangeText={(value) => {
                    setFormError("");
                    field.handleChange(value);
                  }}
                  placeholder="Enter your Password"
                  placeholderTextColor={colors.muted}
                  secureTextEntry
                  value={field.state.value}
                  className="rounded-[8px] border border-login-border px-[13px] py-[15px] text-surface"
                />
                <FieldError message={field.state.meta.errors[0]} />
              </View>
            )}
          </form.Field>
        </View>
        <View className="flex gap-[28px]">
          <Text className="text-[15px] font-bold text-surface">
            Forgot Password?
          </Text>
          <Pressable
            accessibilityRole="button"
            disabled={loginMutation.isPending}
            onPress={form.handleSubmit}
            className={`rounded-[8px] py-[15px] ${
              loginMutation.isPending ? "bg-brand-disabled" : "bg-brand"
            }`}
          >
            <Text className="text-center font-bold text-surface">
              {loginMutation.isPending ? "LOGGING IN..." : "LOGIN"}
            </Text>
          </Pressable>
          <Text className="text-center text-login-border">
            No Account? <Text className="text-surface">Register</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

function FieldError({ message }: { message: unknown }) {
  if (!message) {
    return null;
  }

  return (
    <Text className="text-[13px] text-danger-light">{String(message)}</Text>
  );
}
