import { useState } from "react";
import CharacterForm from "./CharacterForm";

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
    "zarya"
];

interface VideoData
{
    character: string
    user: string
}

export default function MainForm() {
    const [video, setVideo] = useState<VideoData | null>(null);

    return <>
        {
            video ?
            <div className="container box ">
                <video controls>
                    <source src={`/data/${video.user}/${video.character}.mp4`} type="video/mp4" />
                </video>
            </div>
            : <></>
        }
        <div className="container box flex">
            { characters.map(x => <CharacterForm setVideo={(user) => { setVideo({ character: x, user: user }) }} name={x} displayName={x} />) }
        </div>
    </>
}