"use client";
import { Button, SocialButton, TransparentButton } from "@/components/button";
import { Form, Label } from "@/components/form";
import colors from "@/lib/color";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import validator from "validator";

export default function SignupPage() {
    const router = useRouter();
    const [code1, setCode1] = useState<number>();
    const [code2, setCode2] = useState<number>();
    const [code3, setCode3] = useState<number>();
    const [code4, setCode4] = useState<number>();
    const [code5, setCode5] = useState<number>();

    const [canSubmit, setCanSubmit] = useState<boolean>(false);

    const [resendTimer, setResendTimer] = useState<number>(30);

    useEffect(() => {
        if (resendTimer > 0) {
            const interval = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    });
    return (
        <Main>
            <TransparentButton onClick={() => router.push("/auth/sign-up")}>
                <ArrowLeft />
            </TransparentButton>
            <Form
                onSubmit={(e) => {
                    e.preventDefault();
                    const payload = `${code1}${code2}${code3}${code4}${code5}`;
                    router.push("/auth/sign-up/document");
                }}>
                <h2>Renseigne le code</h2>
                <p
                    className="regular-16"
                    style={{ color: colors.tertiary.grey500 }}>
                    Tu as reçu un code de vérification sur ton adresse mail
                    sophiedubois@gmail.com
                </p>

                <InputContainer>
                    <Input
                        type="number"
                        onChange={(e) => setCode1(parseInt(e.target.value))}
                        required
                    />
                    <Input
                        type="number"
                        onChange={(e) => setCode2(parseInt(e.target.value))}
                        required
                    />
                    <Input
                        type="number"
                        onChange={(e) => setCode3(parseInt(e.target.value))}
                        required
                    />
                    <Input
                        type="number"
                        onChange={(e) => setCode4(parseInt(e.target.value))}
                        required
                    />
                    <Input
                        type="number"
                        onChange={(e) => setCode5(parseInt(e.target.value))}
                        required
                    />
                </InputContainer>

                <p
                    className="medium-16"
                    style={{ color: colors.tertiary.grey500, margin: 0 }}>
                    Tu n&apos;as pas reçu le code de sécurité ?
                    <br />
                    <span
                        className="medium-16"
                        style={{ color: colors.tertiary.grey400 }}>
                        Renvoyer le code
                        {resendTimer > 0 ? (
                            `dans ${resendTimer}s`
                        ) : (
                            <TransparentButton
                                type="button"
                                className="medium-16"
                                style={{ color: colors.tertiary.grey400 }}>
                                : cliquer ici
                            </TransparentButton>
                        )}
                    </span>
                </p>

                <Button $cta disabled={canSubmit}>
                    Vérifier
                </Button>
            </Form>
        </Main>
    );
}
const Main = styled.main`
    display: flex;
    flex-direction: column;
    padding: 24px;
    min-height: 100vh;
`;

const InputContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
`;

const Input = styled.input`
    width: 100%;
    height: 56px;
    border-radius: 6px;
    border: 1px solid ${colors.tertiary.grey300};
    text-align: center;
    outline: none;

    &:focus {
        border: 1px solid ${colors.tertiary.grey400};
    }

    &:valid {
        border: 1px solid ${colors.tertiary.grey400};
    }
`;
