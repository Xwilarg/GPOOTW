import { forwardRef } from "react";
import owData from "../data/data.json";

interface CharacterFormProps
{
    name: string
    displayName: string
    setVideo: (user: string) => void
}

const CharacterForm = forwardRef((
    { name, displayName, setVideo }: CharacterFormProps,
    _
) => {
    let validUsers = owData.filter(x => x.characters.includes(name));

    return <div className="card box">
        <img className="card-img" src={`/img/characters/${name}.png`} />
        <div className="card-name">{ displayName }</div>
        <div className="flex">
            { validUsers.map(x => <div className="button" onClick={() => { setVideo(x.name) }}><img  className="profile-img" src={`data/profiles/${x.image}`} /></div>) }
        </div>
    </div>
});

export default CharacterForm;