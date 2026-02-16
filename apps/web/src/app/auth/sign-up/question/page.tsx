"use client";
import colors from "@/lib/color";
import React, { useState } from "react";
import styled from "styled-components";
import OnBoardingQuestion from "./on-boarding-question";
import { Button } from "@/components/button";

export default function AuthQuestion() {
    const [favoriteActivity, setFavoriteActivity] = useState<string[]>([]);
    const [userDisponiblity, setUserDisponiblity] = useState<string[]>([]);
    const [firstTime, setFirstTime] = useState<string[]>([]);
    const [authQuestionStep, setAuthQuestionStep] = useState<number>(0);
    return (
        <Main>
            <Stepper>
                <StepperBar />
            </Stepper>

            <h2>{OnBoardingQuestion[authQuestionStep].title}</h2>

            <p
                className="regular-16"
                style={{ color: colors.tertiary.grey500 }}>
                Plusieurs réponses possibles
            </p>

            <SelectSection>
                {OnBoardingQuestion[authQuestionStep].possibility.map(
                    (possiblity, i) => (
                        <SelectButton
                            className="medium-16"
                            key={i}
                            $selected={
                                {
                                    0: favoriteActivity.includes(possiblity),
                                    1: userDisponiblity.includes(possiblity),
                                    2: firstTime.includes(possiblity),
                                }[authQuestionStep] ?? false
                            }
                            onClick={() => {
                                switch (authQuestionStep) {
                                    case 0:
                                        if (
                                            favoriteActivity.includes(
                                                possiblity,
                                            )
                                        ) {
                                            setFavoriteActivity((prev) =>
                                                prev.filter(
                                                    (favorite) =>
                                                        favorite != possiblity,
                                                ),
                                            );
                                        } else {
                                            setFavoriteActivity((prev) => [
                                                ...prev,
                                                possiblity,
                                            ]);
                                        }
                                        break;
                                    case 1:
                                        if (
                                            userDisponiblity.includes(
                                                possiblity,
                                            )
                                        ) {
                                            setUserDisponiblity((prev) =>
                                                prev.filter(
                                                    (favorite) =>
                                                        favorite != possiblity,
                                                ),
                                            );
                                        } else {
                                            setUserDisponiblity([possiblity]);
                                        }
                                        break;

                                    case 2:
                                        if (firstTime.includes(possiblity)) {
                                            setFirstTime((prev) =>
                                                prev.filter(
                                                    (favorite) =>
                                                        favorite != possiblity,
                                                ),
                                            );
                                        } else {
                                            setFirstTime([possiblity]);
                                        }
                                        break;
                                }
                            }}>
                            {possiblity}
                        </SelectButton>
                    ),
                )}
            </SelectSection>

            <ButtonStepContainer>
                <Button
                    className="medium-16"
                    style={{ color: "black", fontSize: "16px", flex: 1 }}
                    onClick={() => {
                        setAuthQuestionStep((prev) =>
                            prev > 0 ? prev - 1 : prev,
                        );
                    }}>
                    Retour
                </Button>
                <Button
                    className="medium-16"
                    $cta
                    disabled={
                        {
                            0: favoriteActivity.length <= 0,
                            1: userDisponiblity.length <= 0,
                            2: firstTime.length <= 0,
                        }[authQuestionStep]
                    }
                    style={{ fontSize: "16px", flex: 2 }}
                    onClick={() => {
                        setAuthQuestionStep((prev) =>
                            prev < OnBoardingQuestion.length - 1
                                ? prev + 1
                                : prev,
                        );
                    }}>
                    Suivant
                </Button>
            </ButtonStepContainer>
        </Main>
    );
}
const Main = styled.main`
    display: flex;
    flex-direction: column;
    padding: 24px;
    min-height: 100vh;
    box-sizing: border-box;
`;

const StepperBar = styled.div``;
const Stepper = styled.div``;

const SelectSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const SelectButton = styled.button<{ $selected: boolean }>`
    width: max-content;
    background-color: ${({ $selected }) =>
        $selected ? colors.opacity.blue25 : colors.tertiary.grey200};

    border: none;
    border-radius: 8px;
    padding: 12px 24px;
`;

const ButtonStepContainer = styled.div`
    display: flex;
    gap: 8px;
    margin-top: auto;
`;
