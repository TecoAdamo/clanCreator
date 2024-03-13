import React from "react";
import { TextInput, TextInputProps } from "react-native";

type Props = TextInputProps & {
    inputRef?: React.RefObject<TextInput>
}

export function Input({ inputRef, ...rest }: Props) {
    return (
        <TextInput
            ref={inputRef}
            placeholderTextColor="#9ca3af"
            {...rest}
        />
    );
}


