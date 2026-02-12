"use client";
import { Button, TransparentButton } from "@/components/button";
import colors from "@/lib/color";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled, { keyframes } from "styled-components";
export default function OnBoardingPage() {
    const [onBoardingStep, setOnBoardingStep] = useState<0 | 1 | 2 | 3>(0);

    const [touchStart, setTouchStart] = useState<number | null>(null);
    const router = useRouter();
    const stepInfo = [
        {
            title: "Chaque pas compte",
            description:
                "Avec D-KTIV, transformez vos déplacements en actions solidaires.",
        },
        {
            title: "Agissez pour le collectif",
            description:
                "Créez des liens et soutenez des initiatives locales qui font la différence.",
        },
        {
            title: "Rejoignez le mouvement",
            description:
                "Commencez à marcher et faites partie d&apos;un mouvement engagé, pas à pas !",
        },
    ];

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStart === null) return;

        const touchEnd = e.changedTouches[0].clientX;
        const diff = touchStart - touchEnd;

        const threshold = 80; // distance minimale

        if (diff > threshold) {
            // swipe left
            setOnBoardingStep(
                (prev) => ({ 0: 0, 1: 2, 2: 3, 3: 3 })[prev] as 0 | 1 | 2 | 3,
            );
        }

        if (diff < -threshold) {
            // swipe right
            setOnBoardingStep(
                (prev) => ({ 0: 0, 1: 0, 2: 1, 3: 2 })[prev] as 0 | 1 | 2 | 3,
            );
        }

        setTouchStart(null);
    };

    return (
        <OnBoarding
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            $onBoardingStep={onBoardingStep}>
            {onBoardingStep == 0 ? (
                <>
                    <LogoBackground
                        src="/images/logo/logo-background.svg"
                        alt="Logo Background"
                    />
                    <Content>
                        <h1>Bienvenue sur DKTIV !</h1>
                        <p className="regular-18">
                            Transformez chaque pas en une action solidaire et
                            redonnez vie à votre quartier.
                        </p>

                        <Button
                            onClick={() => {
                                setOnBoardingStep(1);
                            }}
                            $cta>
                            Commencer
                        </Button>
                        <OrSeparator>
                            <Line />
                            <p>Ou</p>
                            <Line />
                        </OrSeparator>

                        <Button disabled>Devenir prestataire</Button>
                    </Content>
                </>
            ) : (
                <Content>
                    <h1>{stepInfo[onBoardingStep - 1].title}</h1>
                    <p>{stepInfo[onBoardingStep - 1].description}</p>

                    <OnBoardingNavigation>
                        <Stepper>
                            <StepperItem>
                                <StepperItemFiller />
                            </StepperItem>
                            <StepperItem>
                                {(onBoardingStep == 2 ||
                                    onBoardingStep == 3) && (
                                    <StepperItemFiller />
                                )}
                            </StepperItem>
                            <StepperItem>
                                {onBoardingStep == 3 && <StepperItemFiller />}
                            </StepperItem>
                        </Stepper>

                        {onBoardingStep != 3 ? (
                            <Indicator
                                onClick={() =>
                                    setOnBoardingStep(
                                        (prev) => (prev + 1) as 0 | 1 | 2 | 3,
                                    )
                                }>
                                Swipe ou clique <br /> pour continuer
                            </Indicator>
                        ) : (
                            <>
                                <SuitButton
                                    onClick={() =>
                                        router.push("/auth/sign-up")
                                    }>
                                    C'est parti
                                </SuitButton>
                            </>
                        )}
                    </OnBoardingNavigation>
                </Content>
            )}
        </OnBoarding>
    );
}
const OnBoarding = styled.main<{ $onBoardingStep: 0 | 1 | 2 | 3 }>`
    color: ${colors.base.white};
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
    background: ${({ $onBoardingStep }) =>
        $onBoardingStep == 0
            ? colors.base.black
            : `url("/images/on-boarding/step-${$onBoardingStep}.webp")`};
    background-size: cover;
    button {
        width: 100%;
    }
`;

const OrSeparator = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 1rem 0;
`;

const Line = styled.div`
    width: 100%;
    height: 1px;
    background-color: ${colors.base.white};
`;

const Content = styled.section`
    padding: 16px;
    z-index: 1000;

    p {
        margin-bottom: 24px;
    }
`;

const LogoBackground = styled.img`
    position: absolute;
    right: 0;
    top: 10%;
    width: 50%;
    z-index: 0;
`;

const Stepper = styled.div`
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    width: 60%;
    height: 4px;
    display: grid;
`;

const StepperItem = styled.div`
    background-color: grey;
    width: 100%;
    height: 100%;
    border-radius: 16px;
`;

const FillerAppearAnimation = keyframes`
    from  {
        transform: scaleX(0)
    }

    to {
        transform: scaleX(100%)
    }
`;
const StepperItemFiller = styled.div`
    width: 100%;
    height: 100%;
    transform-origin: center left;
    background-color: ${colors.primary.yellow};
    animation: ${FillerAppearAnimation} 500ms;
`;

const OnBoardingNavigation = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const BlinkAnimation = keyframes`
    from {
        opacity: 1;
    }

    to {
        opacity: 0.5;
    }
`;

const Indicator = styled(TransparentButton)`
    width: auto !important;
    padding: 16px 8px;
    color: white;
    line-height: 1.3;
    padding: 4px 0;
    animation: ${BlinkAnimation} 800ms infinite alternate-reverse;
`;

const SuitButton = styled(Button)`
    width: auto !important;
    padding: 8px 16px;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: auto;
`;
