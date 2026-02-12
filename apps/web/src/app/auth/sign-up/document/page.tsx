"use client";
import { Button, TransparentButton } from "@/components/button";
import colors from "@/lib/color";
import { ArrowLeft, CheckIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

export default function DocumentPage() {
    const router = useRouter();
    const [documentScanStep, setDocumentScanStep] = useState<
        "selection" | "passport" | "identity-card"
    >("selection");

    const [selectedPreview, setSelectedPreview] = useState<number>(0);

    const [photos, setPhotos] = useState<string[]>([]);

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [rectoVerso, setRectoVerso] = useState<
        "recto" | "verso" | "end" | "post-check"
    >("recto");
    const streamRef = useRef<MediaStream | null>(null);
    useEffect(() => {
        if (documentScanStep === "selection") return;

        let isActive = true;
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: "environment",
                        width: { ideal: 1280 },
                        height: { ideal: 800 },
                    },
                });

                if (!isActive) {
                    stream.getTracks().forEach((t) => t.stop());

                    return;
                }

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error("Erreur caméra :", error);
            }
        };

        startCamera();

        return () => {
            isActive = false;

            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
                streamRef.current = null;
            }
        };
    }, [documentScanStep]);

    const takePhoto = () => {
        const video = videoRef.current;
        if (!video) return;

        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = canvas.toDataURL("image/png");

        setPhotos((prev) => [...prev, imageData]);

        if (rectoVerso == "recto") {
            setRectoVerso("verso");
        } else {
            setRectoVerso("end");
        }
    };
    return (
        <Main>
            {documentScanStep != "selection" && (
                <TransparentButton
                    onClick={() => setDocumentScanStep("selection")}>
                    <ArrowLeft />
                </TransparentButton>
            )}
            {documentScanStep === "selection" ? (
                <>
                    <h2>Choisis le document à vérifier</h2>

                    <p
                        className="regular-16"
                        style={{ color: colors.tertiary.grey500 }}>
                        Pour garantir votre sécurité et prévenir la fraude, nous
                        devons vérifier votre identité. Vos données ne seront
                        pas stockées.
                    </p>

                    <DocButton
                        onClick={() => setDocumentScanStep("identity-card")}>
                        <Image
                            src="/images/icon/carte-identite.svg"
                            width={25}
                            height={25}
                            alt=""
                        />
                        Carte d&apos;identité
                    </DocButton>
                    <DocButton onClick={() => setDocumentScanStep("passport")}>
                        <Image
                            src="/images/icon/passeport.svg"
                            width={25}
                            height={25}
                            alt=""
                        />
                        Passeport
                    </DocButton>

                    <Link href="/auth/sign-up/preference">Faire plus tard</Link>
                </>
            ) : (
                <CameraStep>
                    <h2>Vérifie ton identité</h2>
                    <CamArea>
                        {rectoVerso == "recto" || rectoVerso == "verso" ? (
                            <CameraResult ref={videoRef} autoPlay playsInline />
                        ) : (
                            <FinalPreviewWrapper>
                                <PreviewWrapper
                                    $selectedImage={selectedPreview}>
                                    {photos.map((photo, id) => (
                                        <FinalPreviewImage
                                            $checked={
                                                rectoVerso === "post-check"
                                            }
                                            src={photo}
                                            alt="preview"
                                            key={id}
                                        />
                                    ))}

                                    {rectoVerso == "post-check" && (
                                        <CheckIndicator>
                                            <CheckIcon color="#fff" />
                                        </CheckIndicator>
                                    )}
                                </PreviewWrapper>
                                {rectoVerso == "end" && (
                                    <PreviewThumbnailContainer>
                                        {photos.map((photo, id) => (
                                            <img
                                                src={photo}
                                                onClick={() =>
                                                    setSelectedPreview(id)
                                                }
                                                alt="preview"
                                                key={id}
                                            />
                                        ))}
                                    </PreviewThumbnailContainer>
                                )}
                            </FinalPreviewWrapper>
                        )}
                        <Instruction className="medium-20">
                            {
                                {
                                    recto: "Placez le devant de votre document dans le cadre",
                                    verso: "Placez l'arrière de votre document dans le cadre",
                                    end: "Assurez-vous que vos informations sont claires et visibles",
                                    "post-check": "Enregistrement terminé",
                                }[rectoVerso]
                            }
                        </Instruction>
                        {(rectoVerso == "recto" || rectoVerso == "verso") && (
                            <>
                                <PreviewList>
                                    {photos.map((photo, id) => (
                                        <img
                                            src={photo}
                                            alt="preview"
                                            key={id}
                                        />
                                    ))}
                                </PreviewList>
                            </>
                        )}
                    </CamArea>
                    {rectoVerso != "end" ? (
                        rectoVerso != "post-check" && (
                            <BottomArea>
                                <PhotoButton onClick={takePhoto}>
                                    <div />
                                </PhotoButton>
                            </BottomArea>
                        )
                    ) : (
                        <>
                            <Button
                                $cta
                                style={{
                                    width: "100%",
                                    margin: "64px 0 8px 0",
                                    fontSize: "16px",
                                }}
                                onClick={() => {
                                    setRectoVerso("post-check");
                                    setTimeout(() => {
                                        router.push("/sign-up/question");
                                    }, 5000);
                                }}>
                                Soumettre les photos
                            </Button>
                            <Button
                                style={{
                                    width: "100%",
                                    margin: " 8px 0",
                                    color: colors.primary.blue,
                                    borderColor: colors.primary.blue,
                                    fontSize: "16px",
                                }}
                                onClick={() => {
                                    setRectoVerso("recto");
                                    setDocumentScanStep("selection");
                                    setPhotos([]);
                                }}>
                                Repprendre les photos
                            </Button>
                        </>
                    )}
                </CameraStep>
            )}
        </Main>
    );
}
const Main = styled.main`
    display: flex;
    flex-direction: column;
    padding: 24px;
    box-sizing: border-box;
    min-height: 100vh;
`;

const DocButton = styled(Button)`
    width: 100%;
    display: flex;
    align-items: center;
    border: 1px solid ${colors.tertiary.grey300};
    font-size: 16px;
    color: ${colors.base.black};
    margin: 16px 0;
    gap: 8px;
`;

const CameraResult = styled.video`
    width: 100%;
    aspect-ratio: 1.586;
    object-fit: cover;
    border-radius: 8px;
    background-color: ${colors.base.black};
`;

const PhotoButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 64px;
    height: 64px;
    background-color: ${colors.base.black};
    border-radius: 100%;
    justify-self: flex-end;
    div {
        width: 75%;
        height: 75%;
        border: 2px solid white;
        border-radius: 100%;
    }
    margin-top: auto;
`;

const CameraStep = styled.section`
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const Instruction = styled.p`
    text-align: center;
    width: 80%;
    margin: auto;
    margin-top: 16px;
`;

const BottomArea = styled.div`
    position: absolute;
    bottom: 45px;
`;

const CamArea = styled.div``;

const PreviewList = styled.ul`
    display: flex;
    gap: 8px;
    img {
        width: 40%;
        aspect-ratio: 1.586;
        object-fit: cover;
        overflow: hidden;
    }
`;

const FinalPreviewWrapper = styled.article`
    width: 100%;
    height: max-content;
    overflow: hidden;
    position: relative;
`;

const PreviewThumbnailContainer = styled.div`
    position: absolute;
    bottom: 0;
    z-index: 10;
    width: 100%;
    height: 60px;
    background-color: #0000009d;
    display: flex;
    padding: 4px;
    gap: 8px;
    img {
        width: 25%;
        aspect-ratio: 1.586;
        border-radius: 4%;
        box-shadow: 0 1px 3px white;
    }
`;

const BoundAndApear = keyframes`


    from {
        transform: translate(-50%, -50%) rotateX(0deg)
    }

    to {
        transform: translate(-50%, -50%) rotateZ(360deg)

    }
`;

const CheckIndicator = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;

    width: 48px;
    height: 48px;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #10b981;
    animation: ${BoundAndApear} 2s infinite;
    transform-origin: center center;
`;

const PreviewWrapper = styled.div<{
    $selectedImage: number;
}>`
    width: 100%;
    display: flex;
    transform: translateX(-${({ $selectedImage }) => $selectedImage * 100}%);

    transition: 500ms;
`;

const FinalPreviewImage = styled.img<{ $checked?: boolean }>`
    width: 100%;
    ${({ $checked }) => $checked && "border: 3px solid #10b981;"}
    box-sizing: border-box;
    aspect-ratio: 1.586;
    object-fit: cover;
    border-radius: 8px;
    float: right;
`;
