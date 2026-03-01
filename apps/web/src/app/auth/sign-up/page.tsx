"use client";
import { Button, SocialButton, TransparentButton } from "@/components/button";
import { Form, Label } from "@/components/form";
import { apiUrl } from "@/lib/api";
import colors from "@/lib/color";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import validator from "validator";

export default function SignupPage() {
    const router = useRouter();
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [pseudo, setPseudo] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [canSubmit, setCanSubmit] = useState<boolean>(false);

    const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
        setCanSubmit(
            validator.isEmail(email) && validator.isLength(password, 10),
        );
    };
    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
        setCanSubmit(
            validator.isEmail(email) && validator.isLength(password, 10),
        );
    };
    const handleSubmit = async (
        e: import("react").FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault();

        const payload = {
            firstName,
            lastName,
            pseudo,
            email,
            password,
        };

        const response = await fetch(apiUrl("/auth/sign-up"), {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        router.push(`/auth/sign-up/code?email=${encodeURIComponent(email)}`);
    };
    const handleChangeFirstname = (e: ChangeEvent<HTMLInputElement>): void =>
        setFirstName(e.target.value);
    const handleChangeLastname = (e: ChangeEvent<HTMLInputElement>): void =>
        setLastName(e.target.value);
    const handleChangePseudo = (e: ChangeEvent<HTMLInputElement>): void =>
        setPseudo(e.target.value);
    return (
        <Main>
            <TransparentButton onClick={() => router.push("/")}>
                <ArrowLeft />
            </TransparentButton>
            <Form onSubmit={handleSubmit}>
                <h2>Créer ton compte</h2>

                <Label className="regular-16">
                    Prénom
                    <input
                        type="text"
                        placeholder="John"
                        onChange={handleChangeFirstname}
                        className="regular-16"
                        required
                    />
                </Label>

                <Label className="regular-16">
                    Nom
                    <input
                        type="text"
                        placeholder="Doe"
                        onChange={handleChangeLastname}
                        className="regular-16"
                        required
                    />
                </Label>

                <Label className="regular-16">
                    Pseudo
                    <input
                        type="pseudo"
                        placeholder="JohnD"
                        onChange={handleChangePseudo}
                        className="regular-16"
                        required
                    />
                </Label>

                <Label className="regular-16">
                    E-mail
                    <input
                        type="email"
                        placeholder="john.doe@gmail.com"
                        onChange={handleChangeEmail}
                        className="regular-16"
                        required
                    />
                </Label>
                <Label className="regular-16">
                    Mot de passe
                    <input
                        type="password"
                        placeholder="**********"
                        onChange={handleChangePassword}
                        className="regular-16"
                        required
                    />
                    <p className="caption-regular">
                        Utilise au moins 10 charactères
                    </p>
                </Label>

                <Button $cta disabled={!canSubmit}>
                    Inscription
                </Button>
            </Form>

            <OrSeparator>
                <Line />
                <p className="medium-16">Ou</p>
                <Line />
            </OrSeparator>

            <div>
                <SocialButton>
                    <Image
                        src="/images/icon/apple.png"
                        alt="Apple"
                        width={19.45}
                        height={24}
                    />
                    Continuer avec Apple
                </SocialButton>
                <SocialButton>
                    <Image
                        src="/images/icon/google.png"
                        alt="Google"
                        width={24}
                        height={24}
                    />
                    Continuer avec Google
                </SocialButton>
            </div>

            <ConnectLink className="regular-16">
                Déjà un compte ? <Link href="/auth/sign-in">Me connecter</Link>
            </ConnectLink>
        </Main>
    );
}

const OrSeparator = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 2.5rem 0;
    color: ${colors.base.black};
    font-weight: 500;
`;

const Line = styled.div`
    width: 100%;
    height: 1px;
    background-color: ${colors.tertiary.grey300};
`;

const Main = styled.main`
    display: flex;
    flex-direction: column;
    padding: 24px;
    min-height: 100vh;
`;

const ConnectLink = styled.p`
    justify-self: flex-end;
    align-self: center;
    font-weight: 400;
    color: ${colors.base.black};
    a {
        font-weight: bold;
        color: ${colors.base.black};
    }
`;
