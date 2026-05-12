import { useEffect, useState } from "react";
import CharacterForm from "./CharacterForm";
import { useSearchParams } from "react-router";
import owData from "../data/data.json";

class CharacterData
{
    constructor(name: string, displayName: string) {
        this.name = name;
        this.displayName = displayName;
    }

    name: string
    displayName: string
}

let characters = [
    new CharacterData("domina", "Domina"),
    new CharacterData("doomfist", "Doomfist"),
    new CharacterData("dva", "D.VA"),
    new CharacterData("hazard", "Hazard"),
    new CharacterData("junker_queen", "Junker Queen"),
    new CharacterData("mauga", "Mauga"),
    new CharacterData("orisa", "Orisa"),
    new CharacterData("ramattra", "Ramattra"),
    new CharacterData("reinhardt", "Reinhardt"),
    new CharacterData("roadhog", "Roadhog"),
    new CharacterData("sigma", "Sigma"),
    new CharacterData("winston", "Winston"),
    new CharacterData("wrecking_ball", "Wreacking Ball"),
    new CharacterData("zarya", "Zarya"),

    new CharacterData("anran", "Anran"),
    new CharacterData("ashe", "Ashe"),
    new CharacterData("bastion", "Bastion"),
    new CharacterData("cassidy", "Cassidy"),
    new CharacterData("echo", "Echo"),
    new CharacterData("emre", "Emre"),
    new CharacterData("freja", "Freja"),
    new CharacterData("genji", "Genji"),
    new CharacterData("hanzo", "Hanzo"),
    new CharacterData("junkrat", "Junkrat"),
    new CharacterData("mei", "Mei"),
    new CharacterData("pharah", "Pharah"),
    new CharacterData("reaper", "Reaper"),
    new CharacterData("sierra", "Sierra"),
    new CharacterData("sojourn", "Sojourn"),
    new CharacterData("soldier_76", "Soldier: 76"),
    new CharacterData("sombra", "Sombra"),
    new CharacterData("symmetra", "Symmetra"),
    new CharacterData("torbjorn", "Torbjörn"),
    new CharacterData("tracer", "Tracer"),
    new CharacterData("vendetta", "Vendetta"),
    new CharacterData("venture", "Venture"),
    new CharacterData("widowmaker", "Widowmaker"),

    new CharacterData("ana", "Ana"),
    new CharacterData("baptiste", "Baptiste"),
    new CharacterData("brigitte", "Brigitte"),
    new CharacterData("illari", "Illari"),
    new CharacterData("jetpack_cat", "Jetpack Cat"),
    new CharacterData("juno", "Juno"),
    new CharacterData("kiriko", "Kiriko"),
    new CharacterData("lifeweaver", "Lifeweaver"),
    new CharacterData("lucio", "Lúcio"),
    new CharacterData("mercy", "Mercy",),
    new CharacterData("mizuki", "Miyuki"),
    new CharacterData("moira", "Moira"),
    new CharacterData("wuyang", "Wuyang"),
    new CharacterData("zenyatta", "Zenyatta")
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
    let filterUser = owData.map(x => x.name);
    const targetCharacter = searchParams.get("c");
    if (targetCharacter)
    {
        const target = owData.find(x => x.name === targetCharacter);
        if (target)
        {
            allCharacters = characters.filter(x => target.characters.some(y => y.name === x.name));
            filterUser = [ targetCharacter ];
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
                    owData.filter(x => filterUser.includes(x.name)).sort((a, b) => {
                        return b.characters.reduce((sum, x) => sum + x.kill + (x.ultkill * .85) + x.shutdown, 0) - a.characters.reduce((sum, x) => sum + x.kill + (x.ultkill * .85) + x.shutdown, 0)
                    }).map(x => {
                        const ow = stats.find(y => x.battle_username == y.username)
                        if (!ow) {
                            return <div className="box">
                                <h2>{x.display_name}</h2>
                                <span className="debug-score">{Math.round(x.characters.reduce((sum, x) => sum + x.kill + (x.ultkill * .85) + x.shutdown, 0))} points</span>
                            </div>;
                        }
                        return <div className="box" style={{
                            backgroundImage: `url("${ow.namecard}")`
                        }}>
                            <h2>{x.display_name}</h2>
                            <img className="avatar" src={ow.avatar} />
                            <div className="flex all-ranks">
                                <div className="flex-col">
                                    <h3>Tank</h3>
                                    <img className="rank" src={ow.competitive.pc.tank.rank_icon} />
                                    <img className="tier" src={ow.competitive.pc.tank.tier_icon} />
                                </div>
                                <div className="flex-col">
                                    <h3>Damage</h3>
                                    <img className="rank" src={ow.competitive.pc.damage.rank_icon} />
                                    <img className="tier" src={ow.competitive.pc.damage.tier_icon} />
                                </div>
                                <div className="flex-col">
                                    <h3>Support</h3>
                                    <img className="rank" src={ow.competitive.pc.support.rank_icon} />
                                    <img className="tier" src={ow.competitive.pc.support.tier_icon} />
                                </div>
                            </div>
                            <span className="debug-score">{Math.round(x.characters.reduce((sum, x) => sum + x.kill + (x.ultkill * .85) + x.shutdown, 0))} points</span>
                        </div>;
                    })
                }
            </div>
        }
        <div className="container box flex">
            { allCharacters.map(x => <CharacterForm key={x.name} setVideo={(user) => {
                setVideo({ character: x.name, user: user })
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }} name={x.name} displayName={x.displayName} />) }
        </div>
    </>
}