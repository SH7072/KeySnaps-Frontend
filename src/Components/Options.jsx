import { Button } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { useEffect, useRef } from "react";

const Options = () => {

    // const diffRef = useRef(null);
    // const easyRef = useRef(null);
    // const medRef = useRef(null);
    // const hardRef = useRef(null);

    // const onMouseOverDiff = () => {
    //     easyRef.current.style.display = 'block';
    //     medRef.current.style.display = 'block';
    //     hardRef.current.style.display = 'block';
    //     diffRef.current.style.left = "-100px";

    //     return () => {
    //         easyRef.current.style.display = 'none';
    //         medRef.current.style.display = 'none';
    //         hardRef.current.style.display = 'none';
    //         diffRef.current.style.left = "0px";
    //     }
    // }

    const { hovered, ref } = useHover();

    console.log(hovered);

    return (
        <>
            <div
                style={{ display: 'flex', flexDirection: 'row' }}

            // onMouseOver={onMouseOverDiff}

            >
                <Button ref={ref} variant="outline" radius={"md"}>Difficulty</Button>
                {hovered ? <Button variant="outline" radius={"lg"}>Easy</Button> : <></>}
                {hovered ? <Button variant="outline" radius={"lg"}>Medium</Button> : <></>}
                {hovered ? <Button variant="outline" radius={"lg"}>Hard</Button> : <></>}
            </div>
        </>
    );
}

export default Options;