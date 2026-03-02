"use client";
import { Button, SocialButton, TransparentButton } from "@/components/button";
import { Form, Label } from "@/components/form";
import colors from "@/lib/color";
import { apiUrl } from "@/lib/api";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

export default function SignupPage() {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
    };
    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
    };
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = {
            email,
            password,
        };

        try {
            const response = await fetch(apiUrl("/auth/login"), {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();

                toast.success("Connexion reussie");

                return router.push(`/`);
            }

            toast.error("L'email ou le mot de passe est invalide");
        } catch (error) {
            toast.error(
                "Une erreur est survenue, veuiller réessayer plus tard",
            );
        }
    };

    return (
        <Main>
            <TransparentButton onClick={() => router.push("/auth/sign-in")}>
                <ArrowLeft />
            </TransparentButton>
            <Form onSubmit={handleSubmit}>
                <h2>Se connecter</h2>

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
                </Label>

                <Button $cta>Connexion</Button>
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
