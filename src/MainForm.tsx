import { useEffect, useState } from "react";
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

interface OWData
{
    username: string
    avatar: string
    namecard: string
    competitive: any
}

export default function MainForm() {
    const [video, setVideo] = useState<VideoData | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [stats, setStats] = useState<OWData[]>([]);

    useEffect(() => {
        fetch('/php/stats.php')
        .then(x => x.json())
        .then(json => setStats(json.data))
    }, [])

    let allCharacters = characters;
    let battleUsers = owData.map(x => x.battle_username);
    const targetCharacter = searchParams.get("c");
    if (targetCharacter)
    {
        const target = owData.find(x => x.name === targetCharacter);
        if (target)
        {
            allCharacters = characters.filter(x => target.characters.includes(x));
            battleUsers = [ target.battle_username ];
        }
    }

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
        {

            <div className="container box flex profile-summary">
                {
                    stats.filter(x => battleUsers.includes(x.username)).sort((a: OWData, b: OWData) => {
                        return owData.find(x => x.battle_username === b.username)!.characters.length - owData.find(x => x.battle_username === a.username)!.characters.length
                    }).map(x => <div className="box" style={{
                        backgroundImage: `url("${x.namecard}")`
                    }}>
                        <h2>{x.username}</h2>
                        <img className="avatar" src={x.avatar} />
                        <div className="flex all-ranks">
                            <div className="flex-col">
                                <h3>Tank</h3>
                                <img className="rank" src={x.competitive.pc.tank.rank_icon} />
                                <img className="tier" src={x.competitive.pc.tank.tier_icon} />
                            </div>
                            <div className="flex-col">
                                <h3>Damage</h3>
                                <img className="rank" src={x.competitive.pc.damage.rank_icon} />
                                <img className="tier" src={x.competitive.pc.damage.tier_icon} />
                            </div>
                            <div className="flex-col">
                                <h3>Support</h3>
                                <img className="rank" src={x.competitive.pc.support.rank_icon} />
                                <img className="tier" src={x.competitive.pc.support.tier_icon} />
                            </div>
                        </div>
                    </div>)
                }
            </div>
        }
        <div className="container box flex">
            { allCharacters.map(x => <CharacterForm key={x} setVideo={(user) => {
                setVideo({ character: x, user: user })
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }} name={x} displayName={x} />) }
        </div>
    </>
}