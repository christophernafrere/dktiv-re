"use client";
import CalendarIcon from "@/icon/calendar-icon";
import HomeIcon from "@/icon/home-icon";
import PinMapIcon from "@/icon/pin-map-icon";
import TicketIcon from "@/icon/ticket-icon";
import colors from "@/lib/color";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";

export default function TabBar() {
    const pathName = usePathname();
    return (
        <Wrapper>
            <Tab href="/" $selected={pathName === "/" || pathName === ""}>
                <HomeIcon
                    color={
                        pathName === "/" || pathName === ""
                            ? colors.base.black
                            : colors.base.white
                    }
                />
            </Tab>
            <Tab href="mission/map" $selected={pathName === "/mission/map"}>
                <PinMapIcon
                    color={
                        pathName === "/mission/map"
                            ? colors.base.black
                            : colors.base.white
                    }
                />
            </Tab>
            <Tab href="/calendar" $selected={pathName === "/calendar"}>
                <CalendarIcon
                    color={
                        pathName === "/calendar"
                            ? colors.base.black
                            : colors.base.white
                    }
                />
            </Tab>
            <Tab href="/ticket" $selected={pathName === "/ticket"}>
                <TicketIcon
                    color={
                        pathName === "/ticket"
                            ? colors.base.black
                            : colors.base.white
                    }
                />
            </Tab>
        </Wrapper>
    );
}

const Wrapper = styled.nav`
    position: fixed;
    left: 50%;
    bottom: 24px;
    transform: translateX(-50%);
    width: 90%;
    height: 8rem;
    border-radius: 120px;
    background-color: ${colors.base.black};

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    box-sizing: border-box;
`;

const Tab = styled(Link)<{ $selected?: boolean }>`
    background-color: ${({ $selected }) =>
        $selected ? colors.primary.yellow : "transparent"};
    width: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    height: 6rem;
    border-radius: 50%;
    color: ${({ $selected }) =>
        $selected ? colors.base.black : colors.base.white};

    svg {
        transform: scale(2);
    }
`;
