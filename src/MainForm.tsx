import { useState } from "react";
import CharacterForm from "./CharacterForm";
import { useSearchParams } from "react-router";
import owData from "../data/data.json";

let characters = [
    "domina",
    "doomfist",
    "dva",
    "hazard",
    "junker_queen",
    "mauga",
    "orisa",
    "ramattra",
    "reinhardt",
    "roadhog",
    "sigma",
    "winston",
    "wrecking_ball",
    "zarya",

    "anran",
    "ashe",
    "bastion",
    "cassidy",
    "echo",
    "emre",
    "freja",
    "genji",
    "hanzo",
    "junkrat",
    "mei",
    "pharah",
    "reaper",
    "sierra",
    "sojourn",
    "soldier_76",
    "sombra",
    "symmetra",
    "torbjorn",
    "tracer",
    "vendetta",
    "venture",
    "widowmaker",

    "ana",
    "baptiste",
    "brigitte",
    "illari",
    "jetpack_cat",
    "juno",
    "kiriko",
    "lifeweaver",
    "lucio",
    "mercy",
    "mizuki",
    "moira",
    "wuyang",
    "zenyatta"
];

interface VideoData
{
    character: string
    user: string
}

export default function MainForm() {
    const [video, setVideo] = useState<VideoData | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();

    let allCharacters;
    const targetCharacter = searchParams.get("c");
    if (targetCharacter)
    {
        const target = owData.find(x => x.name === targetCharacter);
        if (target)
        {
            allCharacters = characters.filter(x => target.characters.includes(x));
        }
        else allCharacters = characters;
    }
    else allCharacters = characters;

    return <>
        {
            video ?
            <div className="container box ">
                <video controls key={`${video.user}/${video.character}`}>
                    <source src={`/data/${video.user}/${video.character}.mp4`} type="video/mp4" />
                </video>
            </div>
            : <></>
        }
        <div className="container box flex">
            { allCharacters.map(x => <CharacterForm key={x} setVideo={(user) => {
                setVideo({ character: x, user: user })
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }} name={x} displayName={x} />) }
        </div>
    </>
}